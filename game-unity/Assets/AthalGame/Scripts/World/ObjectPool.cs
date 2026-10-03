using System.Collections.Generic;
using UnityEngine;

namespace Athal.Game.World
{
    public sealed class ObjectPool : MonoBehaviour
    {
        [SerializeField] GameObject prefab;
        [SerializeField, Min(1)] int initialSize = 12;
        readonly Queue<GameObject> available = new();

        void Awake()
        {
            for (int i = 0; i < initialSize; i++) Create();
        }

        GameObject Create()
        {
            var item = Instantiate(prefab, transform);
            item.SetActive(false);
            var member = item.GetComponent<PooledObject>() ?? item.AddComponent<PooledObject>();
            member.Bind(this);
            available.Enqueue(item);
            return item;
        }

        public GameObject Get(Vector3 position, Quaternion rotation)
        {
            if (available.Count == 0) Create();
            var item = available.Dequeue();
            item.transform.SetPositionAndRotation(position, rotation);
            item.SetActive(true);
            return item;
        }

        public void Release(GameObject item)
        {
            if (!item.activeSelf) return;
            item.SetActive(false);
            item.transform.SetParent(transform, false);
            available.Enqueue(item);
        }
    }

    public sealed class PooledObject : MonoBehaviour
    {
        ObjectPool owner;
        public void Bind(ObjectPool pool) => owner = pool;
        public void Release() => owner?.Release(gameObject);
    }
}
