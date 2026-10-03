using UnityEngine;

namespace Athal.Game.World
{
    public sealed class DefaultPatterns : MonoBehaviour
    {
        // Editor helper: use these layouts when creating SpawnPattern assets.
        // Every row leaves at least one viable lane.
        public static readonly (SpawnKind kind, int lane, float z)[][] Layouts =
        {
            new[]{(SpawnKind.Coffee,1,2f),(SpawnKind.Coffee,1,5f),(SpawnKind.Cake,1,8f)},
            new[]{(SpawnKind.Barrier,1,3f),(SpawnKind.Coffee,0,4f),(SpawnKind.CoffeeBag,0,8f)},
            new[]{(SpawnKind.Train,0,2f),(SpawnKind.Coffee,1,3f),(SpawnKind.Cake,1,7f)},
            new[]{(SpawnKind.Train,2,2f),(SpawnKind.Barrier,0,5f),(SpawnKind.CoffeeBag,1,8f)},
            new[]{(SpawnKind.Train,0,2f),(SpawnKind.Train,2,2f),(SpawnKind.Coffee,1,3f),(SpawnKind.CoffeeBag,1,9f)}
        };
    }
}
