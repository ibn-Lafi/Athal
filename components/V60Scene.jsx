'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {Environment,ContactShadows,Text} from '@react-three/drei';
import {useRef} from 'react';
import * as THREE from 'three';

function Scale({value=0,time=0}){
 return <group position={[0,-1.02,0]}>
  <mesh castShadow><boxGeometry args={[2.15,.22,1.72]}/><meshPhysicalMaterial color="#151515" metalness={.7} roughness={.18}/></mesh>
  <mesh position={[0,.13,.03]}><boxGeometry args={[1.82,.055,1.25]}/><meshStandardMaterial color="#252525" metalness={.75} roughness={.16}/></mesh>
  <mesh position={[0,.15,.67]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[1.45,.28]}/><meshBasicMaterial color="#050706"/></mesh>
  <Text position={[-.32,.158,.675]} rotation={[-Math.PI/2,0,0]} fontSize={.15} color="#d7f5df" anchorX="center">{value.toFixed(1)} g</Text>
  <Text position={[.43,.158,.675]} rotation={[-Math.PI/2,0,0]} fontSize={.105} color="#9fb6a5" anchorX="center">{Math.floor(time/60)}:{String(time%60).padStart(2,'0')}</Text>
  <mesh position={[-.78,.15,.67]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.055,24]}/><meshBasicMaterial color="#7e8d80"/></mesh>
  <mesh position={[.78,.15,.67]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.055,24]}/><meshBasicMaterial color="#7e8d80"/></mesh>
 </group>
}
function Grinder({active=false}){
 const burr=useRef();
 useFrame((_,d)=>{if(active&&burr.current)burr.current.rotation.y+=d*18});
 return <group position={[0,-.12,0]}>
  <mesh castShadow position={[0,-.58,0]}><cylinderGeometry args={[.58,.68,.28,40]}/><meshStandardMaterial color="#242321" metalness={.55} roughness={.24}/></mesh>
  <mesh castShadow position={[0,.18,0]}><cylinderGeometry args={[.43,.5,1.25,40]}/><meshStandardMaterial color="#35322f" metalness={.5} roughness={.23}/></mesh>
  <mesh ref={burr} position={[0,.85,0]}><cylinderGeometry args={[.46,.35,.22,32]}/><meshStandardMaterial color="#171716" metalness={.72} roughness={.2}/></mesh>
  <mesh position={[0,1.17,0]}><cylinderGeometry args={[.55,.4,.52,36]}/><meshPhysicalMaterial color="#77716a" transparent opacity={.42} roughness={.12} transmission={.55}/></mesh>
  <mesh position={[0,1.22,0]}><cylinderGeometry args={[.42,.35,.28,32]}/><meshStandardMaterial color="#69402a" roughness={.9}/></mesh>
  <mesh position={[0,-.02,.5]}><boxGeometry args={[.42,.2,.06]}/><meshBasicMaterial color={active?"#b7f1c4":"#0a0c0a"}/></mesh>
 </group>
}
function Kettle({pouring}){
 const g=useRef(); useFrame((_,d)=>{if(g.current)g.current.rotation.z=THREE.MathUtils.lerp(g.current.rotation.z,pouring?-.55:0,Math.min(1,d*5))});
 return <group ref={g} position={[2.05,1.15,.15]}><mesh castShadow><sphereGeometry args={[.72,40,30]}/><meshPhysicalMaterial color="#20201e" metalness={.78} roughness={.2}/></mesh><mesh position={[-.7,.28,0]} rotation={[0,0,.32]}><cylinderGeometry args={[.13,.27,1.45,28]}/><meshStandardMaterial color="#272724" metalness={.8} roughness={.18}/></mesh><mesh position={[-1.28,.56,0]} rotation={[0,0,1.3]}><cylinderGeometry args={[.065,.11,.7,20]}/><meshStandardMaterial color="#242421" metalness={.82} roughness={.15}/></mesh><mesh position={[.72,.12,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.58,.085,18,40,Math.PI*1.35]}/><meshStandardMaterial color="#171715"/></mesh></group>
}
function Brewer(){
 return <group position={[0,.15,0]}><mesh position={[0,-.55,0]}><cylinderGeometry args={[.63,.52,.45,40]}/><meshPhysicalMaterial color="#e8e1d6" transparent opacity={.35} transmission={.75}/></mesh><mesh position={[0,-.35,0]}><cylinderGeometry args={[.49,.47,.18,40]}/><meshStandardMaterial color="#5c2f1f"/></mesh><mesh position={[0,.25,0]}><cylinderGeometry args={[.7,.25,.72,40,1,true]}/><meshPhysicalMaterial color="#f4eee5" transparent opacity={.62} transmission={.7} side={THREE.DoubleSide}/></mesh><mesh position={[0,.48,0]}><cylinderGeometry args={[.56,.22,.35,40]}/><meshStandardMaterial color="#5b3828" roughness={.9}/></mesh></group>
}
function Water({pouring}){return <mesh position={[-.02,1.12,.02]}><cylinderGeometry args={[.025,.045,1.4,14]}/><meshPhysicalMaterial color="#bce9f3" transparent opacity={pouring?.72:0} transmission={.7}/></mesh>}
export default function V60Scene({stage='dose',value=0,pouring=false,grinding=false,time=0}){
 const grind=stage==='grind';
 return <Canvas shadows dpr={[1,1.6]} camera={{position:[0,1.25,5.3],fov:39}}><color attach="background" args={['#ead9bd']}/><ambientLight intensity={1.25}/><directionalLight castShadow position={[-3,5,4]} intensity={2.4}/><mesh receiveShadow position={[0,-1.25,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[10,10]}/><meshStandardMaterial color="#d7b98c"/></mesh>{grind?<Grinder active={grinding}/>:<><Scale value={value} time={time}/><Brewer/><Kettle pouring={pouring}/><Water pouring={pouring}/></>}<ContactShadows position={[0,-1.23,0]} opacity={.35} scale={7} blur={2.8}/><Environment preset="studio"/></Canvas>
}