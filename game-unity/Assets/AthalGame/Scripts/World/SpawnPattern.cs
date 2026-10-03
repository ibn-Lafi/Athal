using System;
using UnityEngine;

namespace Athal.Game.World
{
    [CreateAssetMenu(menuName = "Athal/Spawn Pattern", fileName = "SpawnPattern")]
    public sealed class SpawnPattern : ScriptableObject
    {
        [Serializable]
        public struct Entry
        {
            public SpawnKind kind;
            [Range(0, 2)] public int lane;
            [Min(0f)] public float z;
        }

        [Min(0)] public int minimumDifficulty;
        public Entry[] entries;
    }

    public enum SpawnKind
    {
        Coffee,
        Cake,
        CoffeeBag,
        Barrier,
        HighBarrier,
        Train
    }
}
