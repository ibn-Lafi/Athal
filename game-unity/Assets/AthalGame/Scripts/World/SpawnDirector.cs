using System;
using System.Collections.Generic;
using Athal.Game.Core;
using UnityEngine;

namespace Athal.Game.World
{
    public sealed class SpawnDirector : MonoBehaviour
    {
        [Serializable]
        public struct PoolBinding
        {
            public SpawnKind kind;
            public ObjectPool pool;
        }

        [SerializeField] SpawnPattern[] patterns;
        [SerializeField] PoolBinding[] pools;
        [SerializeField] float laneWidth = 1.5f;
        [SerializeField] float startOffset = 5f;

        readonly Dictionary<SpawnKind, ObjectPool> lookup = new();
        int wave;

        void Awake()
        {
            foreach (var binding in pools)
                if (binding.pool != null) lookup[binding.kind] = binding.pool;
        }

        public void Populate(TrackTile tile)
        {
            if (patterns == null || patterns.Length == 0) return;
            int difficulty = Mathf.Min(3, wave / 6);
            wave++;

            var candidates = new List<SpawnPattern>();
            foreach (var pattern in patterns)
                if (pattern != null && pattern.minimumDifficulty <= difficulty)
                    candidates.Add(pattern);
            if (candidates.Count == 0) return;

            var selected = candidates[UnityEngine.Random.Range(0, candidates.Count)];
            foreach (var entry in selected.entries)
            {
                if (!lookup.TryGetValue(entry.kind, out var pool)) continue;
                float x = (entry.lane - 1) * laneWidth;
                float z = tile.transform.position.z + startOffset + entry.z;
                var item = pool.Get(new Vector3(x, 0f, z), Quaternion.identity);
                item.transform.SetParent(tile.ContentRoot, true);
            }
        }

        public void ResetWaves() => wave = 0;
    }
}
