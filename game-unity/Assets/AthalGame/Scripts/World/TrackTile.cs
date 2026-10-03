using UnityEngine;

namespace Athal.Game.World
{
    public sealed class TrackTile : MonoBehaviour
    {
        [field: SerializeField] public float Length { get; private set; } = 24f;
        [SerializeField] Transform contentRoot;

        public void Place(float startZ)
        {
            transform.position = new Vector3(0f, 0f, startZ);
            gameObject.SetActive(true);
        }

        public void ClearSpawned()
        {
            if (contentRoot == null) return;
            for (int i = contentRoot.childCount - 1; i >= 0; i--)
            {
                var pooled = contentRoot.GetChild(i).GetComponent<PooledObject>();
                if (pooled != null) pooled.Release();
            }
        }

        public Transform ContentRoot => contentRoot != null ? contentRoot : transform;
    }
}
