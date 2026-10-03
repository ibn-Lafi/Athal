'use client';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {Environment,Text} from '@react-three/drei';
import {useRef} from 'react';
import * as THREE from 'three';
import {LANES as lanes,ASSETS} from '../lib/game/config';
import {AnimatedModel,useOptionalGLTF} from './game/GLBAsset';


function AssetSlot({url,children,modelProps={},...props}){
 const gltf=useOptionalGLTF(url);
 return <group {...props}>{gltf?<primitive object={gltf.scene.clone(true)} {...modelProps}/>:children}</group>
}
function RunnerAsset({lane,jump,slide,playing,elevated}){
 const gltf=useOptionalGLTF(ASSETS.character);
 const root=useRef();
 const state=jump?'jump':slide?'slide':playing?'run':'idle';
 useFrame((_,d)=>{if(!root.current)return;root.current.position.x=THREE.MathUtils.lerp(root.current.position.x,lanes[lane],Math.min(1,d*12));root.current.position.y=THREE.MathUtils.lerp(root.current.position.y,(elevated?1.55:0)+(jump?1.15:0),Math.min(1,d*9));root.current.rotation.z=THREE.MathUtils.lerp(root.current.rotation.z,(lane-1)*-.08,d*8)});
 if(!gltf)return <AthlRunner lane={lane} jump={jump} slide={slide} elevated={elevated} playing={playing}/>;
 return <group ref={root} position={[0,0,2.55]}><AnimatedModel url={ASSETS.character} state={state} scale={1.1} rotation={[0,Math.PI,0]}/></group>
}

function CameraRig({lane,playing}){const{camera}=useThree();useFrame(({clock},d)=>{const bob=playing?Math.sin(clock.elapsedTime*12)*.025:0;camera.position.x=THREE.MathUtils.lerp(camera.position.x,(lane-1)*.16,d*3);camera.position.y=THREE.MathUtils.lerp(camera.position.y,3.25+bob,d*4);camera.lookAt(0,.9,-2.8)});return null}
function AthlRunner({lane,jump,slide,playing,elevated}){
 const root=useRef(),leftLeg=useRef(),rightLeg=useRef(),leftArm=useRef(),rightArm=useRef(),scarf=useRef();
 useFrame(({clock},d)=>{if(!root.current)return;const t=clock.elapsedTime*13,run=playing?Math.sin(t):0;root.current.position.x=THREE.MathUtils.lerp(root.current.position.x,lanes[lane],Math.min(1,d*12));root.current.position.y=THREE.MathUtils.lerp(root.current.position.y,(elevated?1.55:0)+(jump?1.15:0),Math.min(1,d*9));root.current.rotation.z=THREE.MathUtils.lerp(root.current.rotation.z,(lane-1)*-.11,d*8);root.current.rotation.x=THREE.MathUtils.lerp(root.current.rotation.x,playing?-.045:0,d*5);root.current.scale.y=THREE.MathUtils.lerp(root.current.scale.y,slide?.55:1,d*12);if(leftLeg.current)leftLeg.current.rotation.x=run*.62;if(rightLeg.current)rightLeg.current.rotation.x=-run*.62;if(leftArm.current)leftArm.current.rotation.x=-run*.55;if(rightArm.current)rightArm.current.rotation.x=run*.55;if(scarf.current)scarf.current.rotation.z=Math.sin(t*.35)*.08});
 return <group ref={root} position={[0,0,2.55]} scale={1.12}>
   <group ref={leftLeg} position={[-.18,.43,0]}><mesh castShadow position={[0,-.34,0]}><capsuleGeometry args={[.105,.58,7,14]}/><meshStandardMaterial color="#f4f0e8" roughness={.7}/></mesh><mesh castShadow position={[0,-.72,.12]}><boxGeometry args={[.27,.16,.5]}/><meshStandardMaterial color="#47372e"/></mesh></group>
   <group ref={rightLeg} position={[.18,.43,0]}><mesh castShadow position={[0,-.34,0]}><capsuleGeometry args={[.105,.58,7,14]}/><meshStandardMaterial color="#f4f0e8" roughness={.7}/></mesh><mesh castShadow position={[0,-.72,.12]}><boxGeometry args={[.27,.16,.5]}/><meshStandardMaterial color="#47372e"/></mesh></group>
   <mesh castShadow position={[0,1.18,0]}><capsuleGeometry args={[.34,.9,10,20]}/><meshStandardMaterial color="#f5f1e9" roughness={.72}/></mesh>
   <mesh castShadow position={[0,1.17,.24]}><boxGeometry args={[.68,.82,.09]}/><meshStandardMaterial color="#c7a27b" roughness={.9}/></mesh>
   <mesh position={[-.28,1.48,.3]} rotation={[0,0,-.14]}><boxGeometry args={[.075,.76,.05]}/><meshStandardMaterial color="#604536"/></mesh><mesh position={[.28,1.48,.3]} rotation={[0,0,.14]}><boxGeometry args={[.075,.76,.05]}/><meshStandardMaterial color="#604536"/></mesh>
   <Text position={[0,1.2,.3]} fontSize={.13} color="#5c4132">أثل</Text>
   <group ref={leftArm} position={[-.42,1.38,0]} rotation={[0,0,.1]}><mesh castShadow position={[0,-.28,0]}><capsuleGeometry args={[.1,.5,7,14]}/><meshStandardMaterial color="#f5f1e9"/></mesh><mesh position={[0,-.61,.02]}><sphereGeometry args={[.115,16,12]}/><meshStandardMaterial color="#bd815d"/></mesh></group>
   <group ref={rightArm} position={[.42,1.38,0]} rotation={[0,0,-.1]}><mesh castShadow position={[0,-.28,0]}><capsuleGeometry args={[.1,.5,7,14]}/><meshStandardMaterial color="#f5f1e9"/></mesh><mesh position={[0,-.61,.02]}><sphereGeometry args={[.115,16,12]}/><meshStandardMaterial color="#bd815d"/></mesh></group>
   <mesh castShadow position={[0,1.96,0]}><sphereGeometry args={[.36,28,20]}/><meshStandardMaterial color="#c68a65"/></mesh>
   <mesh position={[0,1.98,-.27]}><sphereGeometry args={[.34,20,14]}/><meshStandardMaterial color="#2e211c"/></mesh>
   <group ref={scarf} position={[0,1.86,-.3]}><mesh rotation={[.15,0,0]}><coneGeometry args={[.46,.95,4]}/><meshStandardMaterial color="#b53f35" roughness={.85}/></mesh><mesh position={[0,-.05,-.02]} rotation={[0,0,.78]}><boxGeometry args={[.72,.035,.02]}/><meshStandardMaterial color="#f2e5d8"/></mesh><mesh position={[0,-.28,-.02]} rotation={[0,0,.78]}><boxGeometry args={[.58,.035,.02]}/><meshStandardMaterial color="#f2e5d8"/></mesh></group>
   <mesh castShadow position={[0,2.22,.02]} rotation={[.04,0,0]}><cylinderGeometry args={[.37,.4,.2,28]}/><meshStandardMaterial color="#d8c19f" roughness={.85}/></mesh><mesh position={[0,2.19,.31]} rotation={[.25,0,0]}><boxGeometry args={[.55,.08,.38]}/><meshStandardMaterial color="#604536"/></mesh><Text position={[0,2.24,.2]} fontSize={.1} color="#4f3527">أثل</Text>
 </group>
}

function Palm({x,z,s=1}){return <group position={[x,0,z]} scale={s}><mesh position={[0,1.2,0]}><cylinderGeometry args={[.12,.18,2.4,10]}/><meshStandardMaterial color="#7b5637"/></mesh>{[0,1,2,3,4,5].map(i=><mesh key={i} position={[0,2.45,0]} rotation={[0,i*Math.PI/3,.72]}><boxGeometry args={[.12,.05,1.65]}/><meshStandardMaterial color="#45613a"/></mesh>)}</group>}
function StreetTile({index}){
 const z=-index*12;
 return <group position={[0,0,z]}>
  <mesh receiveShadow position={[0,-.13,-6]}><boxGeometry args={[5.1,.18,12]}/><meshStandardMaterial color="#a8794d" roughness={.92}/></mesh>
  {lanes.map(x=><mesh key={x} position={[x,-.02,-6]}><boxGeometry args={[1.36,.04,12]}/><meshStandardMaterial color="#bd9061"/></mesh>)}
  {[-.74,.74].map(x=><group key={x}>{[1,4,7,10].map(k=><mesh key={k} position={[x,.02,-k]}><boxGeometry args={[.035,.02,1.25]}/><meshStandardMaterial color="#ead4b0"/></mesh>)}</group>)}
  {[-4.05,4.05].map((x,j)=><group key={j} position={[x,0,-6]}><mesh castShadow position={[0,1.65,0]}><boxGeometry args={[2.5,3.3,10.8]}/><meshStandardMaterial color={index%3===0?'#77503a':index%3===1?'#c18c5e':'#9d6a49'} roughness={.86}/></mesh>{[-3.7,0,3.7].map((dz,k)=><group key={k} position={[j?-.72:.72,2,dz]}><mesh><boxGeometry args={[.72,.95,.06]}/><meshStandardMaterial color="#3e2d25"/></mesh><Text position={[0,0,.04]} fontSize={.15} color="#ead5b7">أثل</Text></group>)}</group>)}
  {index%2===0&&<Palm x={-3.02} z={-3} s={.92}/>}
  {index%3===1&&<Palm x={3.02} z={-8} s={1.04}/>}
 </group>
}
function World({moving}){
 const root=useRef();
 useFrame((_,d)=>{if(!root.current||!moving)return;root.current.position.z+=d*8;const cycle=36;if(root.current.position.z>=12)root.current.position.z-=12;});
 return <group ref={root}>{[0,1,2,3].map(i=><StreetTile key={i} index={i}/>)}</group>
}
function Item({o}){const x=lanes[o.lane],z=4-o.depth;
 if(o.type==='platform')return <group position={[x,.72,z]}><mesh castShadow><boxGeometry args={[1.32,1.45,5.8]}/><meshStandardMaterial color="#5a4033" metalness={.18} roughness={.5}/></mesh><mesh position={[0,.77,0]}><boxGeometry args={[1.2,.12,5.6]}/><meshStandardMaterial color="#c69c69" roughness={.75}/></mesh><Text position={[0,.15,2.93]} fontSize={.18} color="#ead8bc">أثل</Text></group>;
 if(o.type==='roofCoffee'||o.type==='roofCake'){const cake=o.type==='roofCake';return <group position={[x,2.05,z]}>{cake?<><mesh castShadow><cylinderGeometry args={[.32,.36,.34,24]}/><meshStandardMaterial color="#92533a"/></mesh><mesh position={[0,.2,0]}><cylinderGeometry args={[.32,.32,.08,24]}/><meshStandardMaterial color="#f0dfc7"/></mesh></>:<><pointLight color="#ffd76b" intensity={.7} distance={2}/><mesh castShadow><cylinderGeometry args={[.28,.23,.48,24]}/><meshStandardMaterial color="#ead3ae"/></mesh><mesh position={[0,.26,0]}><cylinderGeometry args={[.23,.23,.03,24]}/><meshStandardMaterial color="#42271a"/></mesh></>}</group>};
 if(o.type==='train')return <group position={[x,1.05,z]}><mesh castShadow><boxGeometry args={[1.3,2.1,3.8]}/><meshStandardMaterial color="#4b3930" metalness={.28} roughness={.48}/></mesh><mesh position={[0,.38,1.93]}><boxGeometry args={[.92,.48,.05]}/><meshStandardMaterial color="#201d1b"/></mesh><mesh position={[-.38,-.55,1.96]}><sphereGeometry args={[.13,16,12]}/><meshStandardMaterial emissive="#ffd47a" emissiveIntensity={2} color="#ffd47a"/></mesh><mesh position={[.38,-.55,1.96]}><sphereGeometry args={[.13,16,12]}/><meshStandardMaterial emissive="#ffd47a" emissiveIntensity={2} color="#ffd47a"/></mesh><Text position={[0,.9,1.96]} fontSize={.2} color="#ead7bb">أثل</Text></group>;
 if(o.type==='highbar')return <group position={[x,0,z]}><mesh castShadow position={[-.52,.9,0]}><boxGeometry args={[.14,1.8,.25]}/><meshStandardMaterial color="#604131"/></mesh><mesh castShadow position={[.52,.9,0]}><boxGeometry args={[.14,1.8,.25]}/><meshStandardMaterial color="#604131"/></mesh><mesh castShadow position={[0,1.48,0]}><boxGeometry args={[1.18,.32,.3]}/><meshStandardMaterial color="#d1a46e"/></mesh><Text position={[0,1.48,.16]} fontSize={.12} color="#52372a">أثل</Text></group>;if(o.type==='barrier')return <group position={[x,.34,z]}><mesh castShadow><boxGeometry args={[1.12,.68,.58]}/><meshStandardMaterial color="#5b3e2d"/></mesh><Text position={[0,.08,.33]} fontSize={.17} color="#ead6b8">أثل</Text></group>;if(o.type==='cake')return <group position={[x,.55,z]}><mesh castShadow><cylinderGeometry args={[.33,.38,.35,28]}/><meshStandardMaterial color="#8d5037"/></mesh><mesh position={[0,.21,0]}><cylinderGeometry args={[.33,.33,.09,28]}/><meshStandardMaterial color="#efe0c8"/></mesh></group>;if(o.type==='bag')return <group position={[x,.62,z]}><mesh castShadow><boxGeometry args={[.6,.92,.22]}/><meshStandardMaterial color="#c5a078"/></mesh><Text position={[0,.04,.12]} fontSize={.15} color="#5b3d2d">أثل</Text></group>;return <group position={[x,.55,z]} rotation={[0,(o.depth||0)*.15,0]}><pointLight color="#ffd76b" intensity={.55} distance={1.8}/><mesh castShadow><cylinderGeometry args={[.3,.24,.52,28]}/><meshStandardMaterial color="#e7cfaa"/></mesh><mesh position={[.31,.04,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.15,.04,12,24]}/><meshStandardMaterial color="#e7cfaa"/></mesh><mesh position={[0,.28,0]}><cylinderGeometry args={[.245,.245,.03,28]}/><meshStandardMaterial color="#3f2519"/></mesh><Text position={[0,.03,.25]} fontSize={.09} color="#563929">أثل</Text></group>}
export default function RunnerScene({lane=1,jump=false,slide=false,elevated=false,objects=[],playing=false}){return <Canvas shadows dpr={[1,1.6]} camera={{position:[0,3.25,7.35],fov:54}} gl={{antialias:true,toneMapping:THREE.ACESFilmicToneMapping,toneMappingExposure:1.12}}><color attach="background" args={['#d9b990']}/><fog attach="fog" args={['#d9b990',15,34]}/><ambientLight intensity={1.1}/><hemisphereLight intensity={1.1} color="#fff1d6" groundColor="#65442f"/><directionalLight castShadow position={[-4,9,5]} intensity={2.8} color="#ffd7a2"/><AssetSlot url={ASSETS.environment}><World moving={playing}/></AssetSlot>{objects.map(o=><Item key={o.id} o={o}/>)}<RunnerAsset lane={lane} jump={jump} slide={slide} elevated={elevated} playing={playing}/><CameraRig lane={lane} playing={playing}/><Environment preset="sunset"/></Canvas>}