'use client';
import React,{useState}from'react';

import{Gamepad2,Trophy,UserRound,Share2,Sparkles,Gift,Users,Copy,Check,ArrowRight,Droplets}from'lucide-react';
import dynamic from 'next/dynamic';
const V60Scene=dynamic(()=>import('./V60Scene'),{ssr:false});


const leaders=[
['HA','HUS**** ALA****',203190],['AA','ABD******* ALH*****',147316],['SA','SAR** ALD*****',139173],['AA','ABD******* ALM***',129745],['F*','FAI*** ** QUR****',129658],['MA','MAT** ALJ******',129500],['MA','MOH**** ALS****',124143],['AA','ABR** ALM******',106766],['RH','RAM* HAB***',105723],['MA','MAS**** ALS*****',105539],['JA','JEL** ALH****',105180]
];

function Logo({large=false}){return <div className={'athalLogo '+(large?'large':'')}><span>أثل</span><small>ATHL</small></div>}

function App(){
 const[tab,setTab]=useState('game'),[tries,setTries]=useState(2),[score,setScore]=useState(0),[playing,setPlaying]=useState(false),[registered,setRegistered]=useState(false),[phone,setPhone]=useState(''),[copied,setCopied]=useState(false),[pouring,setPouring]=useState(false),[water,setWater]=useState(0);
 const play=()=>{if(!registered){setTab('account');return}if(!tries||playing)return;setPlaying(true);setTries(x=>x-1);setTimeout(()=>{setScore(Math.floor(65000+Math.random()*95000));setPlaying(false)},1100)};
 React.useEffect(()=>{if(!pouring)return;const t=setInterval(()=>setWater(v=>Math.min(300,v+2.4)),50);return()=>clearInterval(t)},[pouring]);
 const share=async()=>{const data={title:'تحدّي محمصة أثل',text:'نافسني في تحدّي أثل واربح!',url:location.origin+'?ref=ATHL24'};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(data.url);setCopied(true);setTimeout(()=>setCopied(false),1800)}}catch{}};
 return <main>
  <header>
   <div className="brand"><Logo/><div><b>محمصة أثل</b><small>ATHL ROASTERY</small></div></div>
   <button className="profile" onClick={()=>setTab('account')} aria-label="الحساب"><UserRound/></button>
  </header>
  <section className="screen">
   {tab==='game'&&<div className="gamePage">
    <div className="intro"><span className="pill"><Sparkles/> تحدّي أثل</span><h1>نافس واربح</h1><p>اختبر سرعتك، اجمع أعلى نتيجة<br/>وادخل لوحة المتصدرين.</p></div>
    <div className="brew3d"><V60Scene pouring={pouring}/><div className="brewHud"><span><small>الميزان</small><strong>{water.toFixed(1)}g</strong></span><span><small>الهدف</small><strong>300g</strong></span></div><div className="brewStep"><b>الصبة الأولى</b><small>اضغط باستمرار وحاول الوصول للوزن بدقة</small></div><button className={"pourBtn "+(pouring?"pouring":"")} onPointerDown={()=>setPouring(true)} onPointerUp={()=>setPouring(false)} onPointerCancel={()=>setPouring(false)} onPointerLeave={()=>setPouring(false)}><Droplets/>{pouring?"استمر…":"اضغط واستمر للصب"}</button></div><div className="quickStats">
     <div><span className="statIcon"><Gamepad2/></span><p><small>فرص اللعب</small><strong>{tries}</strong></p></div>
     <div><span className="statIcon"><Trophy/></span><p><small>أفضل نتيجة</small><strong>{score?score.toLocaleString('en-US'):'—'}</strong></p></div>
    </div>
    <button className="invite" onClick={share}><span className="inviteIcon">{copied?<Check/>:<Share2/>}</span><span><b>{copied?'تم نسخ الرابط':'ضاعف فرصك'}</b><small>كل صديق يسجل من رابطك = فرصتين إضافية</small></span><ArrowRight className="inviteArrow"/></button>
   </div>}
   {tab==='leaders'&&<div className="leaderPage">
    <div className="pageTop"><span className="pill"><Trophy/> المنافسة</span><h1>لوحة المتصدرين</h1><p>أعلى النتائج في تحدّي محمصة أثل</p></div>
    <div className="podium">
     <div className="pod second"><span>AA</span><b>2</b><small>147,316</small></div>
     <div className="pod first"><i>✦</i><span>HA</span><b>1</b><small>203,190</small></div>
     <div className="pod third"><span>SA</span><b>3</b><small>139,173</small></div>
    </div>
    <div className="board">{leaders.slice(3).map((x,j)=>{const i=j+3;return <div className="row" key={i}><b className="rank">{i+1}</b><span className="avatar">{x[0]}</span><strong className="masked">{x[1]}</strong><span className="points"><i>✦</i>{x[2].toLocaleString('en-US')}</span></div>})}</div>
   </div>}
   {tab==='account'&&!registered&&<div className="signup">
    <div className="signupHero"><Logo large/><span className="pill">أهلًا بك في التحدّي</span><h1>سجّل والعب</h1><p>ابدأ بفرصتين مجانًا، وشارك رابطك<br/>لتحصل على فرص أكثر.</p></div>
    <div className="benefits"><div><Gift/><span><b>فرصتان مجانًا</b><small>مباشرة بعد التسجيل</small></span></div><div><Users/><span><b>ادعُ أصحابك</b><small>+2 فرصة عن كل تسجيل</small></span></div></div>
    <div className="form"><label>رقم الجوال</label><div className="phone"><span>+966</span><input inputMode="numeric" maxLength="10" placeholder="5X XXX XXXX" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))}/></div><button onClick={()=>{if(phone.length>=9){setRegistered(true);setTab('game')}}}>متابعة <ArrowRight/></button><small>نسخة تجريبية — لن يتم إرسال رمز تحقق الآن</small></div>
   </div>}
   {tab==='account'&&registered&&<div className="accountPage">
    <div className="accountHero"><Logo large/><h1>أهلًا بك</h1><p dir="ltr">+966 {phone}</p></div>
    <div className="accountCards"><div><Gamepad2/><span><small>فرصك الحالية</small><strong>{tries} فرص</strong></span></div><div><Trophy/><span><small>أفضل نتيجة</small><strong>{score?score.toLocaleString('en-US'):'لم تلعب بعد'}</strong></span></div></div>
    <div className="refCard"><span className="refIcon"><Gift/></span><h2>زِد فرصك</h2><p>شارك رابطك. كل شخص جديد يسجل عن طريقك يضيف لك فرصتين.</p><div className="refLink"><code>athal.app/?ref=ATHL24</code><button onClick={share}>{copied?<Check/>:<Copy/>}</button></div></div>
   </div>}
  </section>
  <nav>{[['game',Gamepad2,'اللعبة'],['leaders',Trophy,'الترتيب'],['account',UserRound,'حسابي']].map(([id,Icon,label])=><button className={tab===id?'on':''} onClick={()=>setTab(id)} key={id}><Icon/><span>{label}</span></button>)}</nav>
 </main>
}
export default App;