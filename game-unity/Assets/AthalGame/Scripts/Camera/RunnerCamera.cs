using Athal.Game.Core;
using UnityEngine;

namespace Athal.Game.Camera
{
    [RequireComponent(typeof(UnityEngine.Camera))]
    public sealed class RunnerCamera : MonoBehaviour
    {
        [SerializeField] Transform target;
        [SerializeField] Vector3 offset = new(0f, 3.25f, -6.8f);
        [SerializeField] Vector3 lookOffset = new(0f, 1.05f, 5.5f);
        [SerializeField] float followSharpness = 7f;
        [SerializeField] float lookSharpness = 8f;
        [SerializeField] float baseFov = 55f;
        [SerializeField] float maxFov = 63f;
        [SerializeField] float maxSpeed = 17f;

        UnityEngine.Camera cam;
        Vector3 lookPoint;

        void Awake() => cam = GetComponent<UnityEngine.Camera>();

        void LateUpdate()
        {
            if (target == null) return;
            float speed = GameManager.Instance != null ? GameManager.Instance.Speed : 0f;
            float pace = Mathf.InverseLerp(8f, maxSpeed, speed);

            Vector3 desired = target.position + offset;
            desired.y -= pace * .18f;
            desired.z += pace * .35f;

            float moveT = 1f - Mathf.Exp(-followSharpness * Time.unscaledDeltaTime);
            transform.position = Vector3.Lerp(transform.position, desired, moveT);

            Vector3 desiredLook = target.position + lookOffset + Vector3.forward * (pace * 1.4f);
            float lookT = 1f - Mathf.Exp(-lookSharpness * Time.unscaledDeltaTime);
            lookPoint = Vector3.Lerp(lookPoint == Vector3.zero ? desiredLook : lookPoint, desiredLook, lookT);
            transform.rotation = Quaternion.LookRotation(lookPoint - transform.position, Vector3.up);

            cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, Mathf.Lerp(baseFov, maxFov, pace), moveT);
        }
    }
}
