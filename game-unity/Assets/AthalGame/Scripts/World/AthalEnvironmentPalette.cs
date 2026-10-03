using UnityEngine;

namespace Athal.Game.World
{
    [CreateAssetMenu(menuName = "Athal/Environment Palette", fileName = "AthalEnvironmentPalette")]
    public sealed class AthalEnvironmentPalette : ScriptableObject
    {
        public Material road;
        public Material lane;
        public Material curb;
        public Material plasterDark;
        public Material plasterLight;
        public Material wood;
        public Material athlCream;
        public Material palmTrunk;
        public Material palmLeaf;
        public Material mountain;
    }
}
