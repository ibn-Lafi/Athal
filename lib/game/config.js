export const LANES=[-1.48,0,1.48];
export const START_SPEED=.16;
export const MAX_SPEED=.34;
export const SPAWN_MS=700;
export const TICK_MS=32;
export const PLAYER_HIT_MIN=1.5;
export const PLAYER_HIT_MAX=2.9;

export const ASSETS={
 character:'/game/models/athl-runner.glb',
 train:'/game/models/athl-train.glb',
 environment:'/game/models/athl-street.glb',
 coffee:'/game/models/coffee.glb',
 cake:'/game/models/cake.glb',
 bag:'/game/models/coffee-bag.glb'
};

export function createSpawn(idStart=0){
 let id=idStart;
 const r=Math.random();
 const type=r<.07?'platform':r<.13?'train':r<.21?'highbar':r<.30?'barrier':r<.47?'cake':r<.61?'bag':'coffee';
 const lane=Math.floor(Math.random()*3);
 const batch=[{id:++id,lane,depth:24,type}];
 if(type==='platform')batch.push(
  {id:++id,lane,depth:27,type:'roofCoffee'},
  {id:++id,lane,depth:30,type:'roofCake'},
  {id:++id,lane,depth:33,type:'roofCoffee'}
 );
 else if(!['barrier','highbar','train'].includes(type)&&Math.random()>.38)batch.push(
  {id:++id,lane,depth:27,type:'coffee'},
  {id:++id,lane,depth:30,type:'coffee'}
 );
 return{batch,lastId:id};
}

export function pointsFor(type){return(type==='coffee'||type==='roofCoffee')?1:(type==='cake'||type==='roofCake')?3:5}
export function comboBonus(combo){return combo>=8?2:combo>=4?1:0}
export function multiplier(combo){return combo>=8?3:combo>=4?2:1}
