using UnityEngine;

namespace Athal.Game.World
{
    [ExecuteAlways]
    public sealed class ModularTrackBuilder : MonoBehaviour
    {
        [SerializeField] AthalEnvironmentPalette palette;
        [SerializeField] float length = 24f;
        [SerializeField] float laneWidth = 1.5f;
        [SerializeField] int variation;
        [SerializeField] bool rebuild;

        Transform generated;

        void OnValidate()
        {
            if (!rebuild) return;
            rebuild = false;
            Build();
        }

        [ContextMenu("Build ATHL Track Tile")]
        public void Build()
        {
            Clear();
            generated = new GameObject("GeneratedEnvironment").transform;
            generated.SetParent(transform, false);

            float roadWidth = laneWidth * 3f + .45f;
            Box("Road", new Vector3(0f,-.12f,length*.5f), new Vector3(roadWidth,.22f,length), palette?.road);

            for (int lane = 0; lane < 3; lane++)
            {
                float x = (lane - 1) * laneWidth;
                Box("Lane_"+lane,new Vector3(x,.015f,length*.5f),new Vector3(laneWidth-.08f,.025f,length),palette?.lane);
            }

            for (int divider = -1; divider <= 1; divider += 2)
            {
                float x = divider * laneWidth * .5f;
                for (float z=1.5f; z<length; z+=3f)
                    Box("LaneMark",new Vector3(x,.04f,z),new Vector3(.035f,.018f,1.65f),palette?.athlCream);
            }

            BuildSide(-1, roadWidth, length);
            BuildSide(1, roadWidth, length);
        }

        void BuildSide(int side,float roadWidth,float tileLength)
        {
            float sidewalkX = side * (roadWidth*.5f + .65f);
            Box("Curb",new Vector3(sidewalkX,.03f,tileLength*.5f),new Vector3(1.25f,.28f,tileLength),palette?.curb);

            float facadeX = side * (roadWidth*.5f + 2.05f);
            float[] blocks = {3.8f,7.8f,12.1f,16.2f,20.2f};
            for(int i=0;i<blocks.Length;i++)
            {
                float h=2.7f+((i+variation)%3)*.32f;
                var mat=((i+variation)%2==0)?palette?.plasterDark:palette?.plasterLight;
                Box("MarketFacade",new Vector3(facadeX,h*.5f,blocks[i]),new Vector3(2.5f,h,3.35f),mat);
                Box("Awning",new Vector3(side*(roadWidth*.5f+1.05f),1.95f,blocks[i]),new Vector3(.85f,.12f,1.9f),palette?.wood);
                Box("ATHLSign",new Vector3(side*(roadWidth*.5f+1.02f),2.42f,blocks[i]),new Vector3(.08f,.55f,1.25f),palette?.athlCream);
            }

            if(variation%2==0){Palm(side*(roadWidth*.5f+1.1f),5.7f);Flag(side*(roadWidth*.5f+1.05f),14.3f);}
            else{Flag(side*(roadWidth*.5f+1.05f),4.8f);Palm(side*(roadWidth*.5f+1.1f),17.8f);}
        }

        void Palm(float x,float z)
        {
            var root=new GameObject("Palm").transform;root.SetParent(generated,false);root.localPosition=new Vector3(x,0,z);
            Cylinder(root,"Trunk",new Vector3(0,1.15f,0),.11f,.17f,2.3f,palette?.palmTrunk);
            for(int i=0;i<7;i++)
            {
                var leaf=Box("Leaf",Vector3.zero,new Vector3(.08f,.035f,1.35f),palette?.palmLeaf,root);
                leaf.localPosition=new Vector3(0,2.35f,0);
                leaf.localRotation=Quaternion.Euler(38f,i*(360f/7f),0);
            }
        }

        void Flag(float x,float z)
        {
            var root=new GameObject("ATHLFlag").transform;root.SetParent(generated,false);root.localPosition=new Vector3(x,0,z);
            Cylinder(root,"Pole",new Vector3(0,1.55f,0),.025f,.03f,3.1f,palette?.wood);
            Box("Flag",new Vector3(.32f,2.45f,0),new Vector3(.64f,.58f,.025f),palette?.athlCream,root);
        }

        Transform Box(string name,Vector3 pos,Vector3 scale,Material material,Transform parent=null)
        {
            var go=GameObject.CreatePrimitive(PrimitiveType.Cube);go.name=name;go.transform.SetParent(parent??generated,false);
            go.transform.localPosition=pos;go.transform.localScale=scale;
            Apply(go,material);return go.transform;
        }

        void Cylinder(Transform parent,string name,Vector3 pos,float top,float bottom,float height,Material material)
        {
            var go=GameObject.CreatePrimitive(PrimitiveType.Cylinder);go.name=name;go.transform.SetParent(parent,false);
            go.transform.localPosition=pos;go.transform.localScale=new Vector3(Mathf.Max(top,bottom)*2f,height*.5f,Mathf.Max(top,bottom)*2f);Apply(go,material);
        }

        static void Apply(GameObject go,Material material)
        {
            if(material!=null)go.GetComponent<Renderer>().sharedMaterial=material;
            var collider=go.GetComponent<Collider>();if(collider!=null)DestroyImmediate(collider);
        }

        [ContextMenu("Clear Generated Environment")]
        public void Clear()
        {
            var child=transform.Find("GeneratedEnvironment");
            if(child!=null)DestroyImmediate(child.gameObject);
            generated=null;
        }
    }
}
