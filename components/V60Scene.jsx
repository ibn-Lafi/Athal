'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {Environment,ContactShadows} from '@react-three/drei';
import {useRef} from 'react';
import * as THREE from 'three';

function Kettle({pouring}){
 const g=useRef();
 useFrame((_,d)=>{if(g.current){const target=pouring?-0.55:0;g.current.rotation.z=THREE.MathUtils.lerp(g.current.rotation.z,target,Math.min(1,d*5));}});
 return <group ref={g} position={[2.05,1.15,0.15]}>
  <mesh castShadow><sphereGeometry args={[.72,40,30]}/><meshPhysicalMaterial color="#20201e" metalness={.78} roughness={.2}/></mesh>
  <mesh position={[-.7,.28,0]} rotation={[0,0,.32]} castShadow><cylinderGeometry args={[.13,.27,1.45,28]}/><meshStandardMaterial color="#272724" metalness={.8} roughness={.18}/></mesh>
  <mesh position={[-1.28,.56,0]} rotation={[0,0,1.3]}><cylinderGeometry args={[.065,.11,.7,20]}/><meshStandardMaterial color="#242421" metalness={.82} roughness={.15}/></mesh>
  <mesh position={[.72,.12,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.58,.085,18,40,Math.PI*1.35]}/><meshStandardMaterial color="#171715" metalness={.5} roughness={.3}/></mesh>
  <mesh position={[0,.68,0]}><cylinderGeometry args={[.26,.34,.14,32]}/><meshStandardMaterial color="#171715" metalness={.7} roughness={.22}/></mesh>
 </group>
}
function Brewer(){
 return <group position={[0,-.05,0]}>
  <mesh position={[0,-1.13,0]} castShadow><cylinderGeometry args={[.82,.68,.13,40]}/><meshStandardMaterial color="#171716" metalness={.35} roughness={.3}/></mesh>
  <mesh position={[0,-1.02,.68]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.78,.25]}/><meshBasicMaterial color="#0d0e0d"/></mesh>
  <mesh position={[0,-.82,0]} castShadow><cylinderGeometry args={[.63,.52,.45,40]}/><meshPhysicalMaterial color="#e8e1d6" transparent opacity={.35} roughness={.08} transmission={.75}/></mesh>
  <mesh position={[0,-.66,0]}><cylinderGeometry args={[.49,.47,.18,40]}/><meshStandardMaterial color="#5c2f1f" roughness={.35}/></mesh>
  <mesh position={[0,-.22,0]} castShadow><cylinderGeometry args={[.7,.25,.72,40,1,true]}/><meshPhysicalMaterial color="#f4eee5" transparent opacity={.62} roughness={.08} transmission={.7} side={THREE.DoubleSide}/></mesh>
  <mesh position={[0,.02,0]}><cylinderGeometry args={[.56,.22,.35,40]}/><meshStandardMaterial color="#5b3828" roughness={.9}/></mesh>
  <mesh position={[0,.18,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.72,.055,16,48]}/><meshStandardMaterial color="#f4eee5" metalness={.05} roughness={.2}/></mesh>
 </group>
}
function Water({pouring}){
 const m=useRef();
 useFrame(({clock})=>{if(m.current)m.current.material.opacity=pouring?.7+Math.sin(clock.elapsedTime*16)*.08:0});
 return <mesh ref={m} position={[-.02,.92,.02]} rotation={[0,0,.08]}><cylinderGeometry args={[.025,.045,1.45,14]}/><meshPhysicalMaterial color="#bce9f3" transparent opacity={0} transmission={.7} roughness={.05}/></mesh>
}
export default function V60Scene({pouring=false}){
 return <Canvas shadows dpr={[1,1.65]} camera={{position:[0,1.25,5.3],fov:39}}>
  <color attach="background" args={['#ead9bd']}/><ambientLight intensity={1.3}/><directionalLight castShadow position={[-3,5,4]} intensity={2.4}/>
  <mesh receiveShadow position={[0,-1.25,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[10,10]}/><meshStandardMaterial color="#d7b98c" roughness={.8}/></mesh>
  <Brewer/><Kettle pouring={pouring}/><Water pouring={pouring}/><ContactShadows position={[0,-1.23,0]} opacity={.35} scale={7} blur={2.8}/><Environment preset="studio"/>
 </Canvas>
}