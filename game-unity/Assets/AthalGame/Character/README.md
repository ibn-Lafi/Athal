# ATHL Runner Character Contract

Drop the final character prefab/model in this folder and assign it to CharacterInstaller.

## Required visual details
- Saudi male barista
- white thobe
- tan/beige apron
- dark brown leather apron straps
- red/white shemagh
- beige ATHL cap
- dark beard/moustache
- brown/white sneakers
- ATHL marks on cap/apron/back where applicable

## Rig
Humanoid rig, one skeleton, root at ground between feet, forward +Z in Unity, real-world scale around 1.75m.

## Animation clips
- Idle
- Run (loop)
- Jump
- Slide
- Hit

## Animator parameters
- Speed : Float
- Grounded : Bool
- Jump : Trigger
- Sliding : Bool
- Hit : Trigger
- Lane : Int

The CharacterController and gameplay scripts stay on the parent Runner object.
The imported character is visual-only. CharacterInstaller disables colliders found inside the visual prefab so imported meshes cannot change gameplay collision behavior.
