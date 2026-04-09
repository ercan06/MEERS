
const _URL="https://vdrjyngywjzuniwvsjtk.supabase.co",_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg",_H={"apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg","Content-Type":"application/json"};
const SB={
  async get(t,q){try{const r=await fetch(_URL+"/rest/v1/"+t+"?"+(q||""),{headers:_H});return r.ok?r.json():[]}catch(e){return[]}},
  async post(t,d){try{const r=await fetch(_URL+"/rest/v1/"+t,{method:"POST",headers:{..._H,"Prefer":"return=representation"},body:JSON.stringify(d)});return r.json()}catch(e){return null}},
  async patch(t,q,d){try{const r=await fetch(_URL+"/rest/v1/"+t+"?"+q,{method:"PATCH",headers:{..._H,"Prefer":"return=representation"},body:JSON.stringify(d)});return r.json()}catch(e){return null}},
  async del(t,q){try{await fetch(_URL+"/rest/v1/"+t+"?"+q,{method:"DELETE",headers:_H})}catch(e){}}
};
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function urunStr(u){
  if(!u)return"";
  if(typeof u==="string"){try{u=JSON.parse(u)}catch(e){return u}}
  if(!Array.isArray(u))return"";
  return u.map(function(x){return(x.em||"")+" "+(x.ad||x)+" x"+(x.adet||1)}).join(", ");
}
