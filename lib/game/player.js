export const JUMP_MS=760;
export const SLIDE_MS=620;
export const PLATFORM_MS=1450;

export function jumpHeight(progress){
 const p=Math.max(0,Math.min(1,progress));
 return Math.sin(Math.PI*p)*1.28;
}

export function playerState({jumpStarted,slideStarted,now=performance.now()}){
 const jumpProgress=jumpStarted?Math.min(1,(now-jumpStarted)/JUMP_MS):1;
 const slideProgress=slideStarted?Math.min(1,(now-slideStarted)/SLIDE_MS):1;
 return{
  jumping:!!jumpStarted&&jumpProgress<1,
  sliding:!!slideStarted&&slideProgress<1,
  jumpProgress,
  jumpY:jumpStarted&&jumpProgress<1?jumpHeight(jumpProgress):0
 };
}
