using System.Collections.Generic;
using Athal.Game.Core;
using UnityEngine;

namespace Athal.Game.World
{
    public sealed class EndlessTrack : MonoBehaviour
    {
        [SerializeField] Transform runner;
        [SerializeField] TrackTile[] tilePrefabs;
        [SerializeField, Min(3)] int visibleTiles = 6;
        [SerializeField] float recycleBehind = 18f;
        [SerializeField] SpawnDirector spawnDirector;

        readonly Queue<TrackTile> active = new();
        float nextZ;

        void Start()
        {
            if (tilePrefabs == null || tilePrefabs.Length == 0) return;
            for (int i = 0; i < visibleTiles; i++) AddTile(i < 2);
        }

        void Update()
        {
            if (runner == null || active.Count == 0) return;
            var first = active.Peek();
            if (runner.position.z - first.transform.position.z < first.Length + recycleBehind) return;

            active.Dequeue();
            first.ClearSpawned();
            first.Place(nextZ);
            nextZ += first.Length;
            spawnDirector?.Populate(first);
            active.Enqueue(first);
        }

        void AddTile(bool safe)
        {
            var prefab = tilePrefabs[Random.Range(0, tilePrefabs.Length)];
            var tile = Instantiate(prefab, transform);
            tile.Place(nextZ);
            nextZ += tile.Length;
            if (!safe) spawnDirector?.Populate(tile);
            active.Enqueue(tile);
        }
    }
}
