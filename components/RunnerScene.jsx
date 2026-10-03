'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {Environment,Text} from '@react-three/drei';
import {useRef} from 'react';
import * as THREE from 'three';

const lanes=[-1.55,0,1.55];
function Player({lane,jump,slide}){
 const g=useRef();
 useFrame((_,d)=>{if(!g.current)return;g.current.position.x=THREE.MathUtils.lerp(g.current.position.x,lanes[lane],Math.min(1,d*10));g.current.position.y=THREE.MathUtils.lerp(g.current.position.y,jump?1.15:0,Math.min(1,d*8));g.current.scale.y=THREE.MathUtils.lerp(g.current.scale.y,slide?.48:1,Math.min(1,d*12))});
 return <group ref={g} position={[0,0,2.2]}><mesh castShadow position={[0,.62,0]}><capsuleGeometry args={[.28,.7,8,16]}/><meshStandardMaterial color="#5b4031"/></mesh><mesh castShadow position={[0,1.28,0]}><sphereGeometry args={[.3,24,18]}/><meshStandardMaterial color="#d8ad86"/></mesh><mesh position={[0,.76,.29]}><boxGeometry args={[.48,.26,.04]}/><meshStandardMaterial color="#f1e0c7"/></mesh><Text position={[0,.76,.32]} fontSize={.11} color="#5b4031">أثل</Text></group>
}
function Track(){
 return <>{[-1.55,0,1.55].map((x,i)=><group key={i}><mesh receiveShadow position={[x,-.06,-7]}><boxGeometry args={[1.42,.12,28]}/><meshStandardMaterial color={i===1?"#9b7450":"#a77e57"} roughness={.85}/></mesh><mesh position={[x-.71,.02,-7]}><boxGeometry args={[.035,.03,28]}/><meshStandardMaterial color="#d7bd95"/></mesh></group>)}</>
}
function Item({o}){
 const x=lanes[o.lane],z=4-o.depth;
 if(o.type==='barrier')return <group position={[x,.38,z]}><mesh castShadow><boxGeometry args={[1.05,.78,.3]}/><meshStandardMaterial color="#4c3529"/></mesh><Text position={[0,.05,.17]} fontSize={.13} color="#f0dfc5">أثل</Text></group>;
 if(o.type==='cake')return <group position={[x,.45,z]}><mesh castShadow><cylinderGeometry args={[.34,.38,.32,24]}/><meshStandardMaterial color="#d9a978"/></mesh><mesh position={[0,.18,0]}><cylinderGeometry args={[.34,.34,.08,24]}/><meshStandardMaterial color="#f2e0c7"/></mesh></group>;
 if(o.type==='bag')return <group position={[x,.48,z]}><mesh castShadow><boxGeometry args={[.55,.8,.18]}/><meshStandardMaterial color="#6b4936"/></mesh><Text position={[0,.05,.1]} fontSize={.12} color="#f5e7d1">أثل</Text></group>;
 return <group position={[x,.46,z]}><mesh castShadow><cylinderGeometry args={[.3,.24,.48,28]}/><meshStandardMaterial color="#f1e2cc"/></mesh><mesh position={[.31,.05,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.16,.045,12,24]}/><meshStandardMaterial color="#f1e2cc"/></mesh><mesh position={[0,.25,0]}><cylinderGeometry args={[.25,.25,.035,24]}/><meshStandardMaterial color="#4c2c1e"/></mesh></group>
}
export default function RunnerScene({lane=1,jump=false,slide=false,objects=[]}){
 return <Canvas shadows dpr={[1,1.55]} camera={{position:[0,3.4,7.2],fov:52}}><color attach="background" args={['#d7b27d']}/><fog attach="fog" args={['#d7b27d',10,26]}/><ambientLight intensity={1.25}/><directionalLight castShadow position={[-4,8,5]} intensity={2.4}/><Track/>{objects.map(o=><Item key={o.id} o={o}/>)}<Player lane={lane} jump={jump} slide={slide}/><Environment preset="sunset"/></Canvas>
}