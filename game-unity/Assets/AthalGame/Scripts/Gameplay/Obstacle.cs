using Athal.Game.Core;
using Athal.Game.Player;
using UnityEngine;

namespace Athal.Game.Gameplay
{
    public enum ObstacleType { Train, JumpBarrier, SlideBarrier }

    public sealed class Obstacle : MonoBehaviour
    {
        [SerializeField] ObstacleType type = ObstacleType.Train;

        void OnTriggerEnter(Collider other)
        {
            if (!other.CompareTag("Player")) return;
            var runner = other.GetComponentInParent<RunnerController>();
            if (runner == null || runner.IsHit) return;

            bool cleared = type switch
            {
                ObstacleType.JumpBarrier => runner.IsAirborne,
                ObstacleType.SlideBarrier => runner.IsSliding,
                _ => false
            };

            if (!cleared) runner.Hit();
        }
    }
}
