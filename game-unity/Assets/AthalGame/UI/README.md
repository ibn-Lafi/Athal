# ATHL HUD + Web Flow

## Unity Canvas
Use a Screen Space Overlay Canvas with a full-screen SafeArea root and attach SafeAreaFitter.

Create four panels:
- ReadyPanel
- RunningPanel
- PausePanel
- ResultPanel

Assign them to GameHud. RunningPanel contains score, combo and pause controls.

## Competition flow
1. Next.js authorizes initial play.
2. Unity starts the run.
3. On GameOver, Unity emits `run-ended`.
4. If visitor registration is not known, Unity also emits `registration-required`.
5. Next.js opens name + Saudi mobile + OTP UI and preserves the first run result.
6. After successful registration, Next.js calls `SetRegistered("true")`.
7. Before later attempts, Next.js applies attempt/referral rules and only then calls `StartAuthorizedRun()`.

## Browser event
AthalBridge.jslib emits:
`window.addEventListener("athal-game", handler)`

When embedded in an iframe it also sends a same-origin `postMessage` with source `athal-unity`.

## Security
RunResult is client telemetry, not authoritative competition scoring. The production API must validate attempt ownership, run/session IDs and anti-cheat signals before leaderboard points are accepted.
