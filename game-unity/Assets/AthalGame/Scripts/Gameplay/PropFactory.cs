using Athal.Game.World;
using UnityEngine;

namespace Athal.Game.Gameplay
{
    public sealed class PropFactory : MonoBehaviour
    {
        [SerializeField] Material athlCream;
        [SerializeField] Material athlBrown;
        [SerializeField] Material coffeeDark;
        [SerializeField] Material cakeMaterial;

        [ContextMenu("Create Placeholder Prefabs In Scene")]
        public void CreatePlaceholders()
        {
            CreateCollectible("CoffeeCup", CollectibleType.Coffee, PrimitiveType.Cylinder, new Vector3(.34f,.42f,.34f), athlCream);
            CreateCollectible("Cake", CollectibleType.Cake, PrimitiveType.Cylinder, new Vector3(.48f,.26f,.48f), cakeMaterial);
            CreateCollectible("CoffeeBag", CollectibleType.CoffeeBag, PrimitiveType.Cube, new Vector3(.48f,.65f,.25f), athlBrown);

            CreateObstacle("JumpBarrier", ObstacleType.JumpBarrier, new Vector3(1.05f,.52f,.34f), .52f);
            CreateObstacle("SlideBarrier", ObstacleType.SlideBarrier, new Vector3(1.15f,.28f,.34f), 1.55f);
            CreateObstacle("ATHLTrain", ObstacleType.Train, new Vector3(1.28f,1.55f,5.2f), 1.55f);
        }

        void CreateCollectible(string name, CollectibleType type, PrimitiveType primitive, Vector3 scale, Material mat)
        {
            var root = new GameObject(name);
            root.transform.SetParent(transform, false);
            var trigger = root.AddComponent<SphereCollider>(); trigger.radius = .48f; trigger.isTrigger = true;
            var visualRoot = new GameObject("Visual").transform; visualRoot.SetParent(root.transform, false);
            var mesh = GameObject.CreatePrimitive(primitive); mesh.transform.SetParent(visualRoot, false); mesh.transform.localScale = scale;
            if (mat != null) mesh.GetComponent<Renderer>().sharedMaterial = mat;
            DestroyImmediate(mesh.GetComponent<Collider>());
            var c = root.AddComponent<Collectible>();
            var so = new UnityEditor.SerializedObject(c);
            so.FindProperty("type").enumValueIndex = (int)type;
            so.FindProperty("visual").objectReferenceValue = visualRoot;
            so.ApplyModifiedPropertiesWithoutUndo();
        }

        void CreateObstacle(string name, ObstacleType type, Vector3 size, float y)
        {
            var root = new GameObject(name); root.transform.SetParent(transform, false);
            var trigger = root.AddComponent<BoxCollider>(); trigger.isTrigger = true; trigger.size = size; trigger.center = new Vector3(0,y,0);
            var visual = GameObject.CreatePrimitive(PrimitiveType.Cube); visual.name = "Visual"; visual.transform.SetParent(root.transform, false);
            visual.transform.localPosition = new Vector3(0,y,0); visual.transform.localScale = size;
            if (athlBrown != null) visual.GetComponent<Renderer>().sharedMaterial = athlBrown;
            DestroyImmediate(visual.GetComponent<Collider>());
            var obstacle = root.AddComponent<Obstacle>();
            var so = new UnityEditor.SerializedObject(obstacle);
            so.FindProperty("type").enumValueIndex = (int)type;
            so.ApplyModifiedPropertiesWithoutUndo();
        }
    }
}
