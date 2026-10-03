using System.Collections;
using Athal.Game.Core;
using UnityEngine;
using UnityEngine.InputSystem;

namespace Athal.Game.Player
{
    [RequireComponent(typeof(CharacterController))]
    public sealed class RunnerController : MonoBehaviour
    {
        [SerializeField] float laneWidth = 1.5f;
        [SerializeField] float laneSnap = 14f;
        [SerializeField] float jumpHeight = 1.45f;
        [SerializeField] float gravity = -28f;
        [SerializeField] float slideDuration = .62f;
        [SerializeField] Animator animator;

        CharacterController controller;
        int lane = 1;
        float verticalVelocity;
        bool sliding;
        float standingHeight;
        Vector3 standingCenter;

        void Awake()
        {
            controller = GetComponent<CharacterController>();
            standingHeight = controller.height;
            standingCenter = controller.center;
        }

        void Update()
        {
            if (GameManager.Instance == null || GameManager.Instance.State != GameState.Running) return;

            ReadInput();
            float targetX = (lane - 1) * laneWidth;
            float xVelocity = (targetX - transform.position.x) * laneSnap;

            if (controller.isGrounded && verticalVelocity < 0f) verticalVelocity = -2f;
            verticalVelocity += gravity * Time.deltaTime;

            Vector3 velocity = new Vector3(xVelocity, verticalVelocity, GameManager.Instance.Speed);
            controller.Move(velocity * Time.deltaTime);

            animator?.SetFloat("Speed", GameManager.Instance.Speed);
            animator?.SetBool("Grounded", controller.isGrounded);
        }

        void ReadInput()
        {
            var kb = Keyboard.current;
            if (kb == null) return;
            if (kb.leftArrowKey.wasPressedThisFrame || kb.aKey.wasPressedThisFrame) ChangeLane(-1);
            if (kb.rightArrowKey.wasPressedThisFrame || kb.dKey.wasPressedThisFrame) ChangeLane(1);
            if (kb.upArrowKey.wasPressedThisFrame || kb.spaceKey.wasPressedThisFrame) Jump();
            if (kb.downArrowKey.wasPressedThisFrame || kb.sKey.wasPressedThisFrame) Slide();
        }

        public void ChangeLane(int direction)
        {
            if (sliding && direction == 0) return;
            lane = Mathf.Clamp(lane + direction, 0, 2);
            animator?.SetInteger("Lane", lane);
        }

        public void Jump()
        {
            if (!controller.isGrounded || sliding) return;
            verticalVelocity = Mathf.Sqrt(jumpHeight * -2f * gravity);
            animator?.SetTrigger("Jump");
        }

        public void Slide()
        {
            if (!controller.isGrounded || sliding) return;
            StartCoroutine(SlideRoutine());
        }

        IEnumerator SlideRoutine()
        {
            sliding = true;
            animator?.SetBool("Sliding", true);
            controller.height = standingHeight * .5f;
            controller.center = standingCenter - Vector3.up * standingHeight * .25f;
            yield return new WaitForSeconds(slideDuration);
            controller.height = standingHeight;
            controller.center = standingCenter;
            animator?.SetBool("Sliding", false);
            sliding = false;
        }

        void OnControllerColliderHit(ControllerColliderHit hit)
        {
            if (hit.collider.CompareTag("Obstacle"))
                GameManager.Instance?.EndRun();
        }
    }
}
