using Athal.Game.World;
using UnityEngine;

namespace Athal.Game.Gameplay
{
    public sealed class GameplayProp : MonoBehaviour
    {
        [SerializeField] Transform visualRoot;
        [SerializeField] Vector3 visualOffset;
        [SerializeField] Vector3 visualEuler;
        [SerializeField] Vector3 visualScale = Vector3.one;

        void OnEnable()
        {
            if (visualRoot == null) return;
            visualRoot.localPosition = visualOffset;
            visualRoot.localRotation = Quaternion.Euler(visualEuler);
            visualRoot.localScale = visualScale;
        }

        public void ReplaceVisual(GameObject prefab)
        {
            if (prefab == null || visualRoot == null) return;
            for (int i = visualRoot.childCount - 1; i >= 0; i--)
                Destroy(visualRoot.GetChild(i).gameObject);

            var instance = Instantiate(prefab, visualRoot);
            instance.transform.SetLocalPositionAndRotation(Vector3.zero, Quaternion.identity);
            instance.transform.localScale = Vector3.one;

            foreach (var c in instance.GetComponentsInChildren<Collider>(true))
                c.enabled = false;
        }
    }
}
