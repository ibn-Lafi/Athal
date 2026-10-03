using UnityEngine;

namespace Athal.Game.World
{
    public sealed class HorizonEnvironment : MonoBehaviour
    {
        [SerializeField] Transform runner;
        [SerializeField] Transform mountains;
        [SerializeField] Transform sun;
        [SerializeField] float mountainFollow = .12f;

        Vector3 mountainStart;

        void Start()
        {
            if(mountains!=null) mountainStart=mountains.position;
        }

        void LateUpdate()
        {
            if(runner==null||mountains==null)return;
            var p=mountainStart;
            p.z=mountainStart.z+runner.position.z*mountainFollow;
            mountains.position=p;
        }

        public void FaceSunToward(Vector3 point)
        {
            if(sun!=null)sun.LookAt(point);
        }
    }
}
