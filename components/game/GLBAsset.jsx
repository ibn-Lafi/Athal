'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {useFrame} from '@react-three/fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

const cache=new Map();

export function useOptionalGLTF(url){
 const[data,setData]=useState(()=>cache.get(url)||null);
 useEffect(()=>{let live=true;if(!url||cache.has(url)){setData(cache.get(url)||null);return()=>{live=false}};
  const loader=new GLTFLoader();
  loader.load(url,g=>{cache.set(url,g);if(live)setData(g)},undefined,()=>{cache.set(url,null);if(live)setData(null)});
  return()=>{live=false};
 },[url]);
 return data;
}

function findClip(clips,names){
 const wanted=names.map(n=>n.toLowerCase());
 return clips.find(c=>wanted.some(n=>c.name.toLowerCase().includes(n)))||null;
}

export function AnimatedModel({url,state='run',scale=1,rotation=[0,0,0],position=[0,0,0]}){
 const gltf=useOptionalGLTF(url),mixer=useRef(),action=useRef();
 const scene=useMemo(()=>gltf?.scene?.clone(true)||null,[gltf]);
 useEffect(()=>{if(!scene||!gltf)return;scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});mixer.current=new THREE.AnimationMixer(scene);return()=>mixer.current?.stopAllAction()},[scene,gltf]);
 useEffect(()=>{if(!mixer.current||!gltf?.animations?.length)return;const map={run:['run','running'],jump:['jump'],slide:['slide','roll','duck'],idle:['idle']};const clip=findClip(gltf.animations,map[state]||map.run)||gltf.animations[0];const next=mixer.current.clipAction(clip);if(action.current!==next){action.current?.fadeOut(.12);next.reset().fadeIn(.12).play();action.current=next}},[state,gltf]);
 useFrame((_,d)=>mixer.current?.update(d));
 if(!scene)return null;
 return <primitive object={scene} scale={scale} rotation={rotation} position={position}/>;
}
