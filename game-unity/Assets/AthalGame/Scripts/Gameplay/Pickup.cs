using Athal.Game.Core;
using UnityEngine;

namespace Athal.Game.Gameplay
{
    public sealed class Pickup : MonoBehaviour
    {
        [SerializeField] int points = 1;
        [SerializeField] float spinSpeed = 100f;

        void Update() => transform.Rotate(0f, spinSpeed * Time.deltaTime, 0f, Space.World);

        void OnTriggerEnter(Collider other)
        {
            if (!other.CompareTag("Player")) return;
            GameManager.Instance?.AddPickup(points);
            gameObject.SetActive(false);
        }
    }
}
