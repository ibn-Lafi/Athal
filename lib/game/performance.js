export function detectQuality(){
 if(typeof window==='undefined')return'high';
 const nav=navigator||{};
 const memory=nav.deviceMemory||4;
 const cores=nav.hardwareConcurrency||4;
 const mobile=/Android|iPhone|iPad|iPod/i.test(nav.userAgent||'');
 if(memory<=2||cores<=2)return'low';
 if(memory<=4||cores<=4||mobile)return'medium';
 return'high';
}

export const QUALITY={
 low:{dpr:[.85,1],shadows:false,antialias:false,far:28},
 medium:{dpr:[1,1.35],shadows:true,antialias:true,far:31},
 high:{dpr:[1,1.75],shadows:true,antialias:true,far:34}
};

export function qualityConfig(level){return QUALITY[level]||QUALITY.medium}
