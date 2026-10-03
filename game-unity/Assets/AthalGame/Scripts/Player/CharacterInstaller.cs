using UnityEngine;

namespace Athal.Game.Player
{
    public sealed class CharacterInstaller : MonoBehaviour
    {
        [Header("Visual only — gameplay stays on parent")]
        [SerializeField] GameObject characterPrefab;
        [SerializeField] Transform visualAnchor;
        [SerializeField] Vector3 localPosition = Vector3.zero;
        [SerializeField] Vector3 localEuler = Vector3.zero;
        [SerializeField] Vector3 localScale = Vector3.one;

        GameObject instance;

        public GameObject Install()
        {
            if (characterPrefab == null || visualAnchor == null) return null;
            if (instance != null) Destroy(instance);

            instance = Instantiate(characterPrefab, visualAnchor);
            instance.transform.localPosition = localPosition;
            instance.transform.localRotation = Quaternion.Euler(localEuler);
            instance.transform.localScale = localScale;

            DisableGameplayColliders(instance);
            return instance;
        }

        void Start() => Install();

        static void DisableGameplayColliders(GameObject root)
        {
            foreach (var collider in root.GetComponentsInChildren<Collider>(true))
                collider.enabled = false;
        }
    }
}
