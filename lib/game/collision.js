const PICKUPS=new Set(['coffee','cake','bag','roofCoffee','roofCake']);

export const HITBOXES={
 train:{near:1.35,far:3.05},
 platform:{near:1.45,far:2.85},
 barrier:{near:1.6,far:2.75,minJump:0.48},
 highbar:{near:1.55,far:2.8},
 pickup:{near:1.25,far:3.15}
};

export function isPickup(type){return PICKUPS.has(type)}
export function isRoofPickup(type){return type==='roofCoffee'||type==='roofCake'}

export function collisionFor(object,player){
 if(object.lane!==player.lane)return'none';
 const box=HITBOXES[isPickup(object.type)?'pickup':object.type];
 if(!box||object.depth<=box.near||object.depth>=box.far)return'none';

 if(isPickup(object.type)){
  if(isRoofPickup(object.type)&&!player.elevated)return'none';
  return'collect';
 }
 if(object.type==='train')return'hit';
 if(object.type==='barrier')return player.jumpY>=box.minJump?'clear':'hit';
 if(object.type==='highbar')return player.sliding?'clear':'hit';
 if(object.type==='platform')return player.jumpY>=.42||player.elevated?'mount':'hit';
 return'none';
}
