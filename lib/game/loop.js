export const BASE_FRAME_MS=32;
export const SPAWN_EVERY_MS=700;
export const SPEEDUP_EVERY_MS=4500;
export const SPEED_STEP=.012;
export const MAX_FRAME_MS=50;

export function frameScale(deltaMs){return Math.min(MAX_FRAME_MS,Math.max(0,deltaMs))/BASE_FRAME_MS}
export function nextSpeed(speed){return Math.min(.34,speed+SPEED_STEP)}
export function difficultyForWave(wave){return Math.min(3,Math.floor(wave/6))}
