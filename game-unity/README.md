# Athal Runner — Unity WebGL

Production game runtime for the Athal opening competition.

## Runtime
- Unity 6 / C#
- Universal Render Pipeline
- New Input System
- WebGL target
- Next.js remains the competition/account shell.

## Core implemented
- Game state: Ready / Running / Paused / GameOver
- 3-lane runner controller
- Keyboard controls for editor testing
- Mobile swipe input
- Jump and slide with CharacterController
- Progressive run speed
- Pickup scoring and combo multipliers

## Scene setup
Create a scene named `Game`.
1. Add an empty `GameManager` object and attach `GameManager.cs`.
2. Add the runner with CharacterController, Animator, `RunnerController`, `SwipeInput`, and tag it `Player`.
3. Assign the runner reference on `SwipeInput`.
4. Obstacles use tag `Obstacle` and non-trigger colliders.
5. Collectibles use trigger colliders plus `Pickup`; coffee=1, cake=3, coffee bag=5.

The final ATHL runner model should use Animator parameters:
`Speed` float, `Grounded` bool, `Jump` trigger, `Sliding` bool, `Lane` int.

Next production layer: endless track tiles + object pooling + spawn patterns.
