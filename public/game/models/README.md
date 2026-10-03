# Athal game asset contract

The reference artwork is the visual target. Procedural geometry is fallback only.

## Runner
File: `public/game/models/athl-runner.glb`
- Rigged Saudi Athal barista matching the approved character sheet.
- White thobe, tan apron with brown straps, beige ATHL cap, red/white shemagh, beard and brown/white shoes.
- Origin at ground between the feet. Character faces -Z.
- Real-world height target: 1.75 m.
- Required animation clips: `Idle`, `Run`, `Jump`, `Slide` (Roll/Duck accepted as alias).
- One skeleton. Avoid separate animation-only GLBs.
- PBR materials. Prefer baked detail over expensive shaders.
- Max target: 12 MB, 2K textures.

## World
`athl-street.glb`: Saudi/desert market corridor matching the approved game render. Modular 12 m tile, center aligned, forward -Z. Keep collision meshes out of the render asset; gameplay uses engine hitboxes.

## Props
`athl-train.glb`, `coffee.glb`, `cake.glb`, `coffee-bag.glb`.
Use centered origins and PBR materials. Props should be low enough complexity for repeated mobile rendering.

## Export
GLB 2.0, meters, applied transforms, no cameras/lights, no hidden geometry. Use compressed textures where the production pipeline supports them. Do not bake copyrighted Subway Surfers assets into any file.
