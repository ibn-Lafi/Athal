using UnityEngine;

namespace Athal.Game.World
{
    public sealed class RecycleBehindRunner : MonoBehaviour
    {
        [SerializeField] Transform runner;
        [SerializeField] float distanceBehind = 8f;
        PooledObject pooled;

        void Awake() => pooled = GetComponent<PooledObject>();

        void Update()
        {
            if (runner != null && transform.position.z < runner.position.z - distanceBehind)
                pooled?.Release();
        }
    }
}
