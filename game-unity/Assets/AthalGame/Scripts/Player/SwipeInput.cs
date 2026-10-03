using UnityEngine;
using UnityEngine.InputSystem;

namespace Athal.Game.Player
{
    public sealed class SwipeInput : MonoBehaviour
    {
        [SerializeField] RunnerController runner;
        [SerializeField] float threshold = 55f;
        Vector2 start;
        bool tracking;

        void Update()
        {
            var touch = Touchscreen.current;
            if (touch == null) return;
            var primary = touch.primaryTouch;

            if (primary.press.wasPressedThisFrame) { start = primary.position.ReadValue(); tracking = true; }
            if (!tracking || !primary.press.wasReleasedThisFrame) return;

            Vector2 delta = primary.position.ReadValue() - start;
            tracking = false;
            if (delta.magnitude < threshold) return;

            if (Mathf.Abs(delta.x) > Mathf.Abs(delta.y)) runner.ChangeLane(delta.x > 0 ? 1 : -1);
            else if (delta.y > 0) runner.Jump();
            else runner.Slide();
        }
    }
}
