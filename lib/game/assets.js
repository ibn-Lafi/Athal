export const GAME_ASSETS={
 character:{
  url:'/game/models/athl-runner.glb',
  kind:'animated',
  requiredAnimations:{
   idle:['idle'],
   run:['run','running'],
   jump:['jump'],
   slide:['slide','roll','duck']
  },
  target:{maxFileMB:12,maxTexture:2048,scaleMeters:1.75,forward:'-Z'}
 },
 environment:{url:'/game/models/athl-street.glb',kind:'static',target:{maxFileMB:18,maxTexture:2048}},
 train:{url:'/game/models/athl-train.glb',kind:'static',target:{maxFileMB:5,maxTexture:1024}},
 coffee:{url:'/game/models/coffee.glb',kind:'static',target:{maxFileMB:1,maxTexture:1024}},
 cake:{url:'/game/models/cake.glb',kind:'static',target:{maxFileMB:1,maxTexture:1024}},
 bag:{url:'/game/models/coffee-bag.glb',kind:'static',target:{maxFileMB:1,maxTexture:1024}}
};

export function animationCoverage(asset,gltf){
 if(!asset?.requiredAnimations)return{valid:true,missing:[]};
 const names=(gltf?.animations||[]).map(a=>a.name.toLowerCase());
 const missing=Object.entries(asset.requiredAnimations).filter(([,aliases])=>!aliases.some(a=>names.some(n=>n.includes(a)))).map(([state])=>state);
 return{valid:missing.length===0,missing};
}
