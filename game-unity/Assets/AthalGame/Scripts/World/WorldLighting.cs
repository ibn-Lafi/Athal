using UnityEngine;
using UnityEngine.Rendering;

namespace Athal.Game.World
{
    public sealed class WorldLighting : MonoBehaviour
    {
        [SerializeField] Light sun;
        [SerializeField] Color sunColor = new(1f,.73f,.48f);
        [SerializeField] Color ambientColor = new(.58f,.43f,.34f);
        [SerializeField, Range(0f,2f)] float sunIntensity = 1.25f;

        void Awake()
        {
            RenderSettings.ambientMode = AmbientMode.Flat;
            RenderSettings.ambientLight = ambientColor;
            RenderSettings.fog = true;
            RenderSettings.fogColor = new Color(.72f,.57f,.43f);
            RenderSettings.fogMode = FogMode.Linear;
            RenderSettings.fogStartDistance = 32f;
            RenderSettings.fogEndDistance = 82f;

            if(sun!=null)
            {
                sun.type=LightType.Directional;
                sun.color=sunColor;
                sun.intensity=sunIntensity;
                sun.shadows=LightShadows.Soft;
            }
        }
    }
}
