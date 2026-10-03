# ATHL Modular Environment

The fallback production environment is generated in Unity from reusable track tiles.

## Track tile
Create a prefab with:
- TrackTile
- ModularTrackBuilder
- a child named ContentRoot for pooled gameplay objects

Recommended tile length: 24m.

Use 3–4 prefab variations and set a different `variation` value on each ModularTrackBuilder. Press **Build ATHL Track Tile** from the component context menu.

## Palette
Create **Create > Athal > Environment Palette** and assign URP materials for:
road, lanes, curb, dark/light plaster, wood, ATHL cream, palm trunk/leaves and mountains.

## Horizon
Mountains and the sunset live outside recycled track tiles. Attach HorizonEnvironment to them so distant scenery follows only a small fraction of runner Z, creating parallax.

## Lighting
Use one Directional Light and WorldLighting. The defaults target the warm sunset/desert direction from the approved ATHL concept art.

Generated primitives are placeholders only. Final FBX/GLB modular market pieces can replace each decoration while TrackTile, EndlessTrack and SpawnDirector remain unchanged.
