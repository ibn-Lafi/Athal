using UnityEngine;

namespace Athal.Game.Player
{
    public sealed class RunnerVisual : MonoBehaviour
    {
        [SerializeField] Transform modelRoot;
        [SerializeField] Animator animator;
        [SerializeField] float laneLeanDegrees = 9f;
        [SerializeField] float leanSharpness = 12f;

        float targetLean;

        public Animator Animator => animator;

        void LateUpdate()
        {
            if (modelRoot == null) return;
            var target = Quaternion.Euler(0f, 0f, targetLean);
            modelRoot.localRotation = Quaternion.Slerp(
                modelRoot.localRotation,
                target,
                1f - Mathf.Exp(-leanSharpness * Time.deltaTime)
            );
        }

        public void SetLaneDirection(int direction)
        {
            targetLean = -Mathf.Clamp(direction, -1, 1) * laneLeanDegrees;
            CancelInvoke(nameof(ClearLean));
            Invoke(nameof(ClearLean), .18f);
        }

        void ClearLean() => targetLean = 0f;

        public void SetRun(float speed, bool grounded)
        {
            if (animator == null) return;
            animator.SetFloat(AnimatorIds.Speed, speed, .08f, Time.deltaTime);
            animator.SetBool(AnimatorIds.Grounded, grounded);
        }

        public void SetLane(int lane) => animator?.SetInteger(AnimatorIds.Lane, lane);
        public void Jump() => animator?.SetTrigger(AnimatorIds.Jump);
        public void SetSliding(bool value) => animator?.SetBool(AnimatorIds.Sliding, value);
        public void Hit() => animator?.SetTrigger(AnimatorIds.Hit);

        public void ResetVisual()
        {
            targetLean = 0f;
            if (modelRoot != null) modelRoot.localRotation = Quaternion.identity;
            if (animator != null)
            {
                animator.Rebind();
                animator.Update(0f);
            }
        }
    }

    public static class AnimatorIds
    {
        public static readonly int Speed = Animator.StringToHash("Speed");
        public static readonly int Grounded = Animator.StringToHash("Grounded");
        public static readonly int Jump = Animator.StringToHash("Jump");
        public static readonly int Sliding = Animator.StringToHash("Sliding");
        public static readonly int Hit = Animator.StringToHash("Hit");
        public static readonly int Lane = Animator.StringToHash("Lane");
    }
}
