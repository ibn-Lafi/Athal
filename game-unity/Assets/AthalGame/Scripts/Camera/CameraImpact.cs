using System.Collections;
using UnityEngine;

namespace Athal.Game.Camera
{
    public sealed class CameraImpact : MonoBehaviour
    {
        [SerializeField] float duration = .16f;
        [SerializeField] float strength = .11f;
        Vector3 origin;
        Coroutine routine;

        public void Shake()
        {
            if (routine != null) StopCoroutine(routine);
            routine = StartCoroutine(ShakeRoutine());
        }

        IEnumerator ShakeRoutine()
        {
            float elapsed = 0f;
            origin = transform.localPosition;
            while (elapsed < duration)
            {
                float fade = 1f - elapsed / duration;
                transform.localPosition = origin + Random.insideUnitSphere * strength * fade;
                elapsed += Time.unscaledDeltaTime;
                yield return null;
            }
            transform.localPosition = origin;
            routine = null;
        }
    }
}
