'use client';
import React,{useState}from'react';

import{Gamepad2,Trophy,UserRound,Share2,Sparkles,Gift,Users,Copy,Check,ArrowRight,Droplets,X}from'lucide-react';
import dynamic from 'next/dynamic';
const CoffeeLabScene=dynamic(()=>import('./CoffeeLabScene'),{ssr:false});


const leaders=[
['HA','HUS**** ALA****',203190],['AA','ABD******* ALH*****',147316],['SA','SAR** ALD*****',139173],['AA','ABD******* ALM***',129745],['F*','FAI*** ** QUR****',129658],['MA','MAT** ALJ******',129500],['MA','MOH**** ALS****',124143],['AA','ABR** ALM******',106766],['RH','RAM* HAB***',105723],['MA','MAS**** ALS*****',105539],['JA','JEL** ALH****',105180]
];

function Logo({large=false}){return <div className={'athalLogo '+(large?'large':'')}><span>أثل</span><small>ATHL</small></div>}

function App(){
 const[tab,setTab]=useState('game'),[tries,setTries]=useState(2),[score,setScore]=useState(0),[playing,setPlaying]=useState(false),[registered,setRegistered]=useState(false),[phone,setPhone]=useState(''),[copied,setCopied]=useState(false),[gamePoints,setGamePoints]=useState(0),[labStep,setLabStep]=useState(0),[lab,setLab]=useState({dose:18,ratio:16,grind:'متوسط',temp:92,pours:3}),[labScore,setLabScore]=useState(100000);
 const play=()=>{if(!registered){setTab('account');return}if(!tries||playing)return;setPlaying(true);setTries(x=>x-1);setTimeout(()=>{setScore(Math.floor(65000+Math.random()*95000));setPlaying(false)},1100)};
 const share=async()=>{const data={title:'تحدّي محمصة أثل',text:'نافسني في تحدّي أثل واربح!',url:location.origin+'?ref=ATHL24'};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(data.url);setCopied(true);setTimeout(()=>setCopied(false),1800)}}catch{}};
 return <main>
  
  <section className="screen fullGameScreen"><div className="gameTopHud"><button onClick={()=>setTab('account')}><UserRound/></button><button onClick={()=>setTab('leaders')}><Trophy/></button><span className="hudMetric"><Gamepad2/><b>{tries}</b></span><span className="hudMetric"><Sparkles/><b>{gamePoints.toLocaleString()}</b></span></div>
   {tab==='game'&&<div className="gamePage">
    <div className="labGame"><CoffeeLabScene temp={lab.temp}/><div className="labMission"><small>حالة اليوم</small><b>حلاوة أعلى · حموضة أقل · جسم متوسط</b><span>إثيوبي مغسول — تحميص فاتح</span></div><div className="labControls"><div><label>الجرعة</label><button onClick={()=>setLab(x=>({...x,dose:x.dose===20?15:x.dose+1}))}>{lab.dose}g</button></div><div><label>النسبة</label><button onClick={()=>setLab(x=>({...x,ratio:x.ratio===17?15:x.ratio+1}))}>1:{lab.ratio}</button></div><div><label>الطحنة</label><button onClick={()=>setLab(x=>({...x,grind:x.grind==='متوسط'?'متوسط ناعم':x.grind==='متوسط ناعم'?'خشن':'متوسط'}))}>{lab.grind}</button></div><div><label>الحرارة</label><button onClick={()=>setLab(x=>({...x,temp:x.temp===96?88:x.temp+4}))}>{lab.temp}°</button></div></div><button className="labBrew" onClick={()=>{const penalty=Math.abs(lab.dose-18)*3500+Math.abs(lab.ratio-16)*5000+Math.abs(lab.temp-92)*900+(lab.grind==='متوسط ناعم'?0:7000);setLabScore(Math.max(0,100000-penalty));setLabStep(1)}}>حضّر الوصفة</button>{labStep>0&&<div className="labResult"><b>{labScore.toLocaleString()} نقطة</b><span>{labScore>90000?'قريب جدًا من الهدف':'الوصفة تحتاج تعديل'}</span><small>غيّر متغيرين فقط وحاول رفع نتيجتك</small></div>}</div>}</div>}
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
  
 </main>
}
export default App;