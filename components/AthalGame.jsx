'use client';
import React,{useEffect,useRef,useState}from'react';
import{Trophy,UserRound,Share2,Coffee,Sparkles,X,Play,Gift}from'lucide-react';

const leaders=[['HA','HUS****',486],['AA','ABD****',459],['SA','SAR****',431],['MA','MOH****',407],['FA','FAI****',389],['RA','RAM****',371],['NO','NOU****',350],['KA','KHA****',338]];

function Logo(){return <div className="athalLogo"><span>أثل</span><small>ATHL</small></div>}
function Harvest({onFinish}){
 const[playing,setPlaying]=useState(false),[time,setTime]=useState(25),[score,setScore]=useState(0),[combo,setCombo]=useState(0),[basket,setBasket]=useState(50),[items,setItems]=useState([]);
 const id=useRef(0);
 useEffect(()=>{if(!playing)return;const t=setInterval(()=>setTime(v=>{if(v<=1){setPlaying(false);setTimeout(()=>onFinish(score),0);return 0}return v-1}),1000);return()=>clearInterval(t)},[playing,score,onFinish]);
 useEffect(()=>{if(!playing)return;const spawn=setInterval(()=>{const r=Math.random();setItems(a=>[...a,{id:++id.current,x:8+Math.random()*84,y:-8,type:r>.91?'gold':r<.13?'bad':'bean',speed:1.2+Math.random()*1.1}])},420);const fall=setInterval(()=>setItems(a=>{const next=[];for(const it of a){const n={...it,y:it.y+it.speed};if(n.y>79&&n.y<91&&Math.abs(n.x-basket)<12){if(n.type==='bad'){setScore(s=>Math.max(0,s-3));setCombo(0)}else{const base=n.type==='gold'?5:1;setCombo(c=>c+1);setScore(s=>s+base+(combo>=8?2:combo>=4?1:0))}continue}if(n.y<105)next.push(n)}return next}),35);return()=>{clearInterval(spawn);clearInterval(fall)}},[playing,basket,combo]);
 const move=e=>{const r=e.currentTarget.getBoundingClientRect();const p=Math.max(8,Math.min(92,((e.clientX-r.left)/r.width)*100));setBasket(p)};
 const start=()=>{setScore(0);setCombo(0);setItems([]);setTime(25);setPlaying(true)};
 return <div className="harvest" onPointerMove={e=>playing&&move(e)} onPointerDown={e=>playing&&move(e)}>
  <div className="harvestSky"><div className="roasterySign"><Logo/><small>حصاد أثل</small></div></div>
  <div className="roundHud"><span><small>الجولة</small><b>{score}</b></span><span><small>الوقت</small><b>{time}s</b></span><span><small>COMBO</small><b>×{combo>=8?3:combo>=4?2:1}</b></span></div>
  {items.map(it=><span key={it.id} className={'fallItem '+it.type} style={{left:it.x+'%',top:it.y+'%'}}>{it.type==='gold'?'✦':it.type==='bad'?'●':'☕'}</span>)}
  <div className="basket" style={{left:basket+'%'}}><Coffee/><b>أثل</b></div>
  {!playing&&<div className="startRound"><span className="miniBean">☕</span><h1>حصاد أثل</h1><p>التقط حبوب القهوة، حافظ على الـCombo<br/>وتجنب الحبوب المحروقة.</p><div className="legend"><span>☕ +1</span><span>✦ +5</span><span>● −3</span></div><button onClick={start}><Play/> ابدأ الجولة</button><small>حرّك إصبعك يمين ويسار أثناء اللعب</small></div>}
 </div>
}
export default function App(){
 const[tab,setTab]=useState('game'),[registered,setRegistered]=useState(false),[phone,setPhone]=useState(''),[tries,setTries]=useState(3),[total,setTotal]=useState(0),[last,setLast]=useState(null),[shared,setShared]=useState(false);
 const rank=1+leaders.filter(x=>x[2]>total).length;
 const finish=pts=>{setTotal(v=>v+pts);setTries(v=>Math.max(0,v-1));setLast(pts)};
 const share=async()=>{const url=location.origin+'?ref=ATHL24';try{if(navigator.share)await navigator.share({title:'حصاد أثل',text:'تقدر تتجاوز نتيجتي في افتتاح أثل؟',url});else await navigator.clipboard.writeText(url);setShared(true)}catch{}};
 if(!registered)return <main className="harvestApp"><div className="registerScreen"><Logo/><span className="eventTag">تحدّي افتتاح أثل</span><h1>سجّل ونافس</h1><p>ابدأ بـ3 محاولات واجمع أعلى رصيد.</p><div className="phone"><span>+966</span><input inputMode="numeric" maxLength="10" placeholder="5X XXX XXXX" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))}/></div><button onClick={()=>phone.length>=9&&setRegistered(true)}>دخول التحدي</button><small>نسخة تجريبية — التحقق بالجوال عند ربط النظام</small></div></main>;
 return <main className="harvestApp"><div className="topGameHud"><button onClick={()=>setTab('account')}><UserRound/></button><button onClick={()=>setTab('leaders')}><Trophy/></button><span><Sparkles/><b>{total}</b></span><span><Trophy/><b>#{rank}</b></span><span><Coffee/><b>{tries}</b></span></div>
 {tab==='game'&&<><Harvest onFinish={finish}/><button className="shareOrb" onClick={share}><Share2/></button>{last!==null&&<div className="lastScore"><small>آخر جولة</small><b>+{last}</b></div>}{tries===0&&<div className="noTries"><Gift/><h2>خلصت محاولاتك</h2><b>{total} نقطة · المركز #{rank}</b><p>شارك رابطك. عند تسجيل صديق جديد تحصل على محاولة إضافية.</p><button onClick={share}><Share2/> شارك التحدي</button><small>في النسخة النهائية لا تُضاف المحاولة إلا بعد إحالة موثقة.</small></div>}</>}
 {tab==='leaders'&&<div className="panel"><button className="close" onClick={()=>setTab('game')}><X/></button><div className="panelTitle"><Trophy/><small>افتتاح أثل</small><h1>المتصدرون</h1><p>أعلى مجموع نقاط من جميع المحاولات</p></div><div className="topThree">{leaders.slice(0,3).map((x,i)=><div key={x[1]} className={'place p'+(i+1)}><b>{i+1}</b><span>{x[0]}</span><strong>{x[2]}</strong><small>نقطة</small></div>)}</div><div className="rankList">{leaders.slice(3).map((x,i)=><div key={x[1]}><b>{i+4}</b><span className="avatar">{x[0]}</span><strong>{x[1]}</strong><em>{x[2]}</em></div>)}</div><div className="myRank"><span>ترتيبك الآن</span><b>#{rank}</b><strong>{total} نقطة</strong></div></div>}
 {tab==='account'&&<div className="panel"><button className="close" onClick={()=>setTab('game')}><X/></button><div className="accountSimple"><Logo/><h1>حسابك</h1><p dir="ltr">+966 {phone}</p><div><span><small>النقاط</small><b>{total}</b></span><span><small>المركز</small><b>#{rank}</b></span><span><small>المحاولات</small><b>{tries}</b></span></div><button onClick={share}><Share2/> {shared?'تمت المشاركة':'شارك لتحصل على محاولات'}</button></div></div>}
 </main>
}