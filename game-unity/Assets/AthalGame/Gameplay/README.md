# ATHL Gameplay Props

Production logic is separated from the 3D art.

## Collectibles
- Coffee cup: +1
- Cake: +3
- Coffee bag: +5

Each collectible prefab uses:
- trigger Collider
- PooledObject
- Collectible
- optional ParticleSystem / AudioSource / CollectibleVfx
- Visual child containing the replaceable 3D model

## Obstacles
- ATHLTrain: ObstacleType.Train
- JumpBarrier: ObstacleType.JumpBarrier
- SlideBarrier: ObstacleType.SlideBarrier

Obstacle colliders belong to the gameplay root, not to imported art. Imported meshes should have their own colliders disabled.

## Placeholder factory
PropFactory is an editor-only scene helper for quickly generating rough geometry. It is not final art. The final ATHL train, barriers, cup, cake and coffee bag should replace only each Visual child.

## Pooling
Create one ObjectPool for each SpawnKind and assign the matching prefab. Then bind all six pools in SpawnDirector.

This keeps gameplay allocation-free during the run after pools are warmed.
