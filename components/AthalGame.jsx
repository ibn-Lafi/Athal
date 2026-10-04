'use client';
import React,{useMemo,useState}from'react';
import{Coffee,Gift,RotateCw,Trophy,UserRound,Share2,X,Home,WalletCards,Layers3,ChevronLeft,CircleHelp,Ticket}from'lucide-react';

const SEGMENTS=[
 {type:'points',value:10},{type:'points',value:20},{type:'coffee'},{type:'points',value:30},{type:'points',value:50},
 {type:'points',value:10},{type:'points',value:100},{type:'points',value:20},{type:'points',value:30},{type:'points',value:200},
 {type:'points',value:50},{type:'coffee'},{type:'points',value:20},{type:'points',value:100},{type:'points',value:10},
 {type:'harvest'},{type:'points',value:50},{type:'points',value:30},{type:'points',value:20},{type:'points',value:10}
];
const COLORS=['#51372c','#c49a67','#795746','#ead8bd','#9f7658'];
const leaders=[['HUS****',620],['ABD****',570],['SAR****',490],['MOH****',430],['FAI****',390]];
function Brand(){return <div className="brand"><b>أثل</b><small>ATHL ROASTERY</small></div>}
function Wheel({rotation=0,mini=false}){
 const wheel=useMemo(()=>SEGMENTS.map((s,i)=>({...s,color:COLORS[i%COLORS.length]})),[]);
 return <div className={'wheelShell '+(mini?'mini':'')}>
  <div className="wheelPointer"/>
  <div className="prizeWheel" style={{transform:`rotate(${rotation}deg)`}}>
   <div className="wheelColor"/>
   {wheel.map((s,i)=><div className="wheelSlice" key={i} style={{'--i':i}}>
    <span className={'sliceContent '+s.type}>{s.type==='coffee'?<Coffee/>:s.type==='harvest'?<><span className="beanMark">◆</span><small>محصول</small></>:<b>{s.value}</b>}</span>
   </div>)}
   <div className="wheelHub"><span>أ</span></div>
  </div>
 </div>
}
export default function AthalGame(){
 const[view,setView]=useState('home'),[tries,setTries]=useState(3),[total,setTotal]=useState(0),[rotation,setRotation]=useState(0),[spinning,setSpinning]=useState(false),[result,setResult]=useState(null),[coffee,setCoffee]=useState(0),[harvest,setHarvest]=useState(0);
 const rank=1+leaders.filter(x=>x[1]>total).length;
 const spin=()=>{if(spinning||tries<=0)return;setResult(null);setSpinning(true);const index=Math.floor(Math.random()*SEGMENTS.length),segment=SEGMENTS[index],center=index*18+9,current=((rotation%360)+360)%360,target=(360-center+360)%360,delta=(target-current+360)%360;setRotation(rotation+2160+delta);setTimeout(()=>{setSpinning(false);setTries(v=>v-1);setResult(segment);if(segment.type==='points')setTotal(v=>v+segment.value);if(segment.type==='coffee')setCoffee(v=>v+1);if(segment.type==='harvest')setHarvest(v=>v+1);navigator.vibrate?.([25,30,60])},4200)};
 const share=async()=>{try{if(navigator.share)await navigator.share({title:'تحدي أثل',text:'جرّب عجلة أثل',url:location.href});else await navigator.clipboard.writeText(location.href)}catch{}};
 return <main className="athlApp" dir="rtl">
  <header className="appTop"><Brand/><button className="avatar" onClick={()=>setView('account')}><UserRound/></button></header>
  <div className="screen">
   {view==='home'&&<><div className="titleRow"><div><small>افتتاح أثل</small><h1>المكافآت</h1></div><button className="help"><CircleHelp/> معرفة المزيد</button></div>
    <section className="balanceCard"><div className="balanceIcon"><Trophy/></div><div><strong>{total}</strong><span> نقطة</span><small>إجمالي نقاطك في المسابقة</small></div></section>
    <button className="spinPromo" onClick={()=>setView('wheel')}><div className="promoWheel"><Wheel mini/></div><div><b>جرّب حظك!</b><span>{tries>0?`لديك ${tries} دورات متاحة`:'انتهت دوراتك الحالية'}</span></div><ChevronLeft/></button>
    <div className="sectionHead"><h2>جوائزك</h2><span>يتم حفظها في حسابك</span></div>
    <section className="prizeCards"><article><Coffee/><div><small>قهوة مجانية</small><b>{coffee}</b></div></article><article><Gift/><div><small>محصول أثل</small><b>{harvest}</b></div></article></section>
    <section className="rankMini"><div><Trophy/><span><small>ترتيبك الحالي</small><b>#{rank}</b></span></div><button onClick={()=>setView('leaders')}>عرض المتصدرين <ChevronLeft/></button></section>
   </>}
   {view==='wheel'&&<><div className="subTitle"><button onClick={()=>setView('home')}><X/></button><div><small>المحاولة {4-tries} من 3</small><h1>عجلة أثل</h1></div><span>{total} نقطة</span></div>
    <section className="gameCard"><p>لف العجلة واربح نقاطًا أو جوائز فورية</p><Wheel rotation={rotation}/><div className="resultSlot">{result&&!spinning&&(result.type==='points'?<><small>أضفنا إلى رصيدك</small><b>+{result.value} نقطة</b></>:result.type==='coffee'?<><small>مبروك!</small><b>☕ فزت بكوب قهوة</b></>:<><small>مبروك!</small><b>◆ فزت بمحصول أثل</b></>)}</div><button className="primary" disabled={spinning||tries<=0} onClick={spin}>{spinning?<><RotateCw className="spinIcon"/> جاري الدوران</>:tries>0?<><RotateCw/> لف العجلة</>:'انتهت المحاولات'}</button><small className="gameNote">كل دورة تُستخدم مرة واحدة فقط</small></section>
   </>}
   {view==='leaders'&&<><div className="subTitle"><button onClick={()=>setView('home')}><X/></button><div><small>افتتاح أثل</small><h1>المتصدرون</h1></div></div><section className="leaderCard">{leaders.map((x,i)=><div key={x[0]}><b>#{i+1}</b><span>{x[0]}</span><strong>{x[1]}</strong></div>)}<div className="me"><b>#{rank}</b><span>أنت</span><strong>{total}</strong></div></section></>}
   {view==='account'&&<><div className="subTitle"><button onClick={()=>setView('home')}><X/></button><div><small>حساب المسابقة</small><h1>حسابي</h1></div></div><section className="accountCard"><Brand/><div className="accountGrid"><div><strong>{total}</strong><small>نقطة</small></div><div><strong>{tries}</strong><small>دورة متبقية</small></div><div><strong>{coffee}</strong><small>كوب قهوة</small></div><div><strong>{harvest}</strong><small>محصول</small></div></div><button className="secondary" onClick={share}><Share2/> مشاركة التحدي</button></section></>}
  </div>
  <nav className="bottomNav"><button className={view==='home'?'active':''} onClick={()=>setView('home')}><Home/><span>الرئيسية</span></button><button className={view==='wheel'?'active':''} onClick={()=>setView('wheel')}><Ticket/><span>العجلة</span></button><button className={view==='leaders'?'active':''} onClick={()=>setView('leaders')}><Trophy/><span>الترتيب</span></button><button onClick={share}><Layers3/><span>مشاركة</span></button></nav>
 </main>
}