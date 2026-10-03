const C='coffee',K='cake',B='bag',J='barrier',S='highbar',T='train';

const patterns=[
 {min:0,items:[[C,1,24],[C,1,27],[K,1,30],[C,1,33]]},
 {min:0,items:[[J,1,24],[C,0,25],[C,0,28],[B,0,31]]},
 {min:0,items:[[J,0,24],[C,1,25],[K,1,28],[C,1,31]]},
 {min:1,items:[[S,1,24],[C,1,27],[K,1,30]]},
 {min:1,items:[[T,0,24],[C,1,25],[C,1,28],[B,1,31]]},
 {min:1,items:[[T,2,24],[C,1,25],[K,1,28],[C,1,31]]},
 {min:2,items:[[J,0,24],[S,1,29],[C,2,25],[C,2,28],[B,2,31]]},
 {min:2,items:[[T,0,24],[J,1,25],[C,2,25],[K,2,28],[B,2,31]]},
 {min:2,items:[[J,2,24],[C,1,25],[S,1,29],[K,0,26],[B,0,30]]},
 {min:3,items:[[T,0,24],[T,2,24],[C,1,25],[C,1,28],[K,1,31],[B,1,34]]},
 {min:3,items:[[S,0,24],[J,1,27],[T,2,24],[C,0,27],[K,0,31]]}
];

export function createPattern(idStart=0,difficulty=0){
 const available=patterns.filter(p=>p.min<=difficulty);
 const p=available[Math.floor(Math.random()*available.length)];
 let id=idStart;
 return{batch:p.items.map(([type,lane,depth])=>({id:++id,type,lane,depth})),lastId:id};
}
