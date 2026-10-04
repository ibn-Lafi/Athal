'use client';
import React,{useMemo,useState}from'react';
import{Coffee,Gift,RotateCw,Trophy,UserRound,Share2,X}from'lucide-react';

const SEGMENTS=[
 {type:'points',value:10,label:'10'},{type:'points',value:20,label:'20'},{type:'coffee',label:'كوب'},
 {type:'points',value:30,label:'30'},{type:'points',value:50,label:'50'},{type:'points',value:10,label:'10'},
 {type:'points',value:100,label:'100'},{type:'points',value:20,label:'20'},{type:'points',value:30,label:'30'},
 {type:'points',value:200,label:'200'},{type:'points',value:50,label:'50'},{type:'coffee',label:'كوب'},
 {type:'points',value:20,label:'20'},{type:'points',value:100,label:'100'},{type:'points',value:10,label:'10'},
 {type:'harvest',label:'محصول'},{type:'points',value:50,label:'50'},{type:'points',value:30,label:'30'},
 {type:'points',value:20,label:'20'},{type:'points',value:10,label:'10'}
];
const COLORS=['#6f4a36','#d7b47b','#8e6a4f','#f1ddbd','#5a3b2d'];
const leaders=[['HA','HUS****',620],['AA','ABD****',570],['SA','SAR****',490],['MA','MOH****',430],['FA','FAI****',390]];
function Logo(){return <div className="wheelLogo"><b>أثل</b><small>ATHL ROASTERY</small></div>}
export default function AthalGame(){
 const[tries,setTries]=useState(3),[total,setTotal]=useState(0),[rotation,setRotation]=useState(0),[spinning,setSpinning]=useState(false),[result,setResult]=useState(null),[coffee,setCoffee]=useState(0),[harvest,setHarvest]=useState(0),[tab,setTab]=useState('game');
 const rank=1+leaders.filter(x=>x[2]>total).length;
 const wheel=useMemo(()=>SEGMENTS.map((s,i)=>({...s,color:COLORS[i%COLORS.length]})),[]);
 const spin=()=>{
  if(spinning||tries<=0)return;
  setResult(null);setSpinning(true);
  // Prototype selection. Production must request the winning segment from the server.
  const index=Math.floor(Math.random()*SEGMENTS.length);
  const segment=SEGMENTS[index],center=index*18+9;
  const current=((rotation%360)+360)%360;
  const target=(360-center+360)%360;
  const delta=(target-current+360)%360;
  setRotation(rotation+360*6+delta);
  setTimeout(()=>{
   setSpinning(false);setTries(v=>v-1);setResult(segment);
   if(segment.type==='points')setTotal(v=>v+segment.value);
   if(segment.type==='coffee')setCoffee(v=>v+1);
   if(segment.type==='harvest')setHarvest(v=>v+1);
   if(typeof navigator!=='undefined'&&navigator.vibrate)navigator.vibrate([35,35,70]);
  },4200);
 };
 const share=async()=>{try{if(navigator.share)await navigator.share({title:'عجلة أثل',text:'جرّب حظك في تحدي افتتاح أثل',url:location.href});else await navigator.clipboard.writeText(location.href)}catch{}};
 return <main className="wheelApp" dir="rtl">
  <header className="wheelHeader"><button onClick={()=>setTab('account')}><UserRound/></button><Logo/><button onClick={()=>setTab('leaders')}><Trophy/></button></header>
  <section className="wheelStats"><div><small>مجموع نقاطك</small><strong>{total}</strong></div><i/><div><small>المحاولات</small><strong>{tries}</strong></div></section>
  <section className="wheelStage">
   <div className="wheelPointer"/>
   <div className={'prizeWheel '+(spinning?'isSpinning':'')} style={{transform:`rotate(${rotation}deg)`}}>
    {wheel.map((s,i)=><div className="wheelSlice" key={i} style={{'--i':i,'--c':s.color}}>
      <span className={'sliceContent '+s.type}>{s.type==='coffee'?<Coffee/>:s.type==='harvest'?<><span className="beanIcon">◆</span><small>محصول</small></>:<><b>{s.value}</b><small>نقطة</small></>}</span>
    </div>)}
    <div className="wheelHub"><Logo/></div>
   </div>
  </section>
  <section className="wheelAction">
   {result&&!spinning&&<div className={'spinResult '+result.type}>{result.type==='points'?<><small>أضفنا لرصيدك</small><b>+{result.value} نقطة</b></>:result.type==='coffee'?<><Coffee/><small>مبروك!</small><b>فزت بكوب قهوة</b></>:<><Gift/><small>مبروك!</small><b>فزت بمحصول أثل</b></>}</div>}
   {!result&&<p>{spinning?'العجلة تدور...':'لف العجلة واكتشف نتيجتك'}</p>}
   <button className="spinButton" disabled={spinning||tries<=0} onClick={spin}>{spinning?<><RotateCw className="spinIcon"/> جاري الدوران</>:tries>0?<><RotateCw/> لف العجلة</>:'انتهت المحاولات'}</button>
   <button className="shareButton" onClick={share}><Share2/> مشاركة التحدي</button>
  </section>
  <footer className="prizeBar"><div><Coffee/><span><small>أكواب فزت بها</small><b>{coffee}</b></span></div><div><Gift/><span><small>محاصيل فزت بها</small><b>{harvest}</b></span></div></footer>
  {tab==='leaders'&&<div className="wheelPanel"><button className="panelClose" onClick={()=>setTab('game')}><X/></button><Trophy className="panelIcon"/><small>افتتاح أثل</small><h2>المتصدرون</h2><p>ترتيب أعلى مجموع للنقاط</p><div className="wheelRanks">{leaders.map((x,i)=><div key={x[1]}><b>#{i+1}</b><span>{x[1]}</span><strong>{x[2]}</strong></div>)}</div><div className="yourRank"><span>ترتيبك #{rank}</span><b>{total} نقطة</b></div></div>}
  {tab==='account'&&<div className="wheelPanel"><button className="panelClose" onClick={()=>setTab('game')}><X/></button><UserRound className="panelIcon"/><small>حساب المسابقة</small><h2>جوائزك ونقاطك</h2><div className="accountGrid"><div><strong>{total}</strong><small>نقطة</small></div><div><strong>{coffee}</strong><small>كوب قهوة</small></div><div><strong>{harvest}</strong><small>محصول</small></div><div><strong>{tries}</strong><small>محاولة</small></div></div></div>}
 </main>
}