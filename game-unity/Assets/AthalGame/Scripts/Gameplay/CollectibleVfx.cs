using UnityEngine;

namespace Athal.Game.Gameplay
{
    public sealed class CollectibleVfx : MonoBehaviour
    {
        [SerializeField] Light glow;
        [SerializeField] float minIntensity = .45f;
        [SerializeField] float maxIntensity = 1.25f;
        [SerializeField] float pulseSpeed = 4f;

        void Update()
        {
            if (glow == null) return;
            float t = (Mathf.Sin(Time.time * pulseSpeed) + 1f) * .5f;
            glow.intensity = Mathf.Lerp(minIntensity, maxIntensity, t);
        }
    }
}
