'use client';
import {useEffect,useState} from 'react';
import {GAME_ASSETS} from '../../lib/game/assets';

const essential=['character','environment','train','coffee','cake','bag'];

export function useGamePreloader(){
 const[status,setStatus]=useState({ready:false,progress:0,available:0,total:essential.length});
 useEffect(()=>{let live=true,done=0,available=0;
  const update=()=>{if(live)setStatus({ready:done===essential.length,progress:Math.round(done/essential.length*100),available,total:essential.length})};
  Promise.all(essential.map(async key=>{try{const r=await fetch(GAME_ASSETS[key].url,{method:'HEAD',cache:'no-store'});if(r.ok)available++}catch{}finally{done++;update()}})).finally(()=>update());
  const timeout=setTimeout(()=>{if(live)setStatus(s=>({...s,ready:true,progress:100}))},3500);
  return()=>{live=false;clearTimeout(timeout)};
 },[]);
 return status;
}

export default function GameLoader({progress=0}){
 return <div className="gameLoader" role="status" aria-live="polite"><div className="gameLoaderMark"><span>أثل</span><small>ATHL ROASTERY</small></div><div className="gameLoaderTitle">تحدي افتتاح أثل</div><div className="gameLoaderTrack"><i style={{width:`${progress}%`}}/></div><b>{progress}%</b><small>نجهّز المسار…</small></div>
}
