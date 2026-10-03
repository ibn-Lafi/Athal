using System.Collections;
using Athal.Game.Core;
using Athal.Game.World;
using UnityEngine;

namespace Athal.Game.Gameplay
{
    public enum CollectibleType { Coffee, Cake, CoffeeBag }

    [RequireComponent(typeof(Collider))]
    public sealed class Collectible : MonoBehaviour
    {
        [SerializeField] CollectibleType type;
        [SerializeField] Transform visual;
        [SerializeField] ParticleSystem collectVfx;
        [SerializeField] AudioSource collectAudio;
        [SerializeField] float spinSpeed = 105f;
        [SerializeField] float bobHeight = .12f;
        [SerializeField] float bobSpeed = 3.4f;

        PooledObject pooled;
        Vector3 baseLocalPosition;
        bool collected;

        public int Points => type switch
        {
            CollectibleType.Cake => 3,
            CollectibleType.CoffeeBag => 5,
            _ => 1
        };

        void Awake()
        {
            pooled = GetComponent<PooledObject>();
            if (visual != null) baseLocalPosition = visual.localPosition;
            GetComponent<Collider>().isTrigger = true;
        }

        void OnEnable()
        {
            collected = false;
            if (visual != null)
            {
                visual.gameObject.SetActive(true);
                visual.localPosition = baseLocalPosition;
            }
        }

        void Update()
        {
            if (visual == null || collected) return;
            visual.Rotate(0f, spinSpeed * Time.deltaTime, 0f, Space.World);
            var p = baseLocalPosition;
            p.y += Mathf.Sin(Time.time * bobSpeed) * bobHeight;
            visual.localPosition = p;
        }

        void OnTriggerEnter(Collider other)
        {
            if (collected || !other.CompareTag("Player")) return;
            collected = true;
            GameManager.Instance?.AddPickup(Points);
            if (visual != null) visual.gameObject.SetActive(false);
            if (collectVfx != null) collectVfx.Play();
            if (collectAudio != null) collectAudio.Play();
            StartCoroutine(ReturnAfterEffects());
        }

        IEnumerator ReturnAfterEffects()
        {
            float wait = 0f;
            if (collectVfx != null) wait = Mathf.Max(wait, collectVfx.main.duration);
            if (collectAudio != null && collectAudio.clip != null) wait = Mathf.Max(wait, collectAudio.clip.length);
            if (wait > 0f) yield return new WaitForSeconds(Mathf.Min(wait, .65f));
            pooled?.Release();
        }
    }
}
