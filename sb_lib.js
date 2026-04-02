const SB_URL="https://vdrjyngywjzuniwvsjtk.supabase.co";
const SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg";
const SB={
  h:{"apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg","Content-Type":"application/json"},
  async get(t,q){try{const r=await fetch(SB_URL+"/rest/v1/"+t+"?"+(q||""),{headers:this.h});if(!r.ok)return[];return r.json()}catch(e){return[]}},
  async post(t,d){try{const r=await fetch(SB_URL+"/rest/v1/"+t,{method:"POST",headers:{...this.h,"Prefer":"return=representation"},body:JSON.stringify(d)});return r.json()}catch(e){return null}},
  async patch(t,q,d){try{const r=await fetch(SB_URL+"/rest/v1/"+t+"?"+q,{method:"PATCH",headers:{...this.h,"Prefer":"return=representation"},body:JSON.stringify(d)});return r.json()}catch(e){return null}},
  async del(t,q){try{await fetch(SB_URL+"/rest/v1/"+t+"?"+q,{method:"DELETE",headers:this.h})}catch(e){}}
};
function parseUrunler(u){if(!u)return[];if(typeof u==="string"){try{u=JSON.parse(u)}catch(e){return[]}}if(!Array.isArray(u))return[];return u.map(function(x){if(typeof x==="string")return{ad:x,adet:1,em:"",fiyat:0};return{ad:x.ad||"",adet:x.adet||1,em:x.em||"",fiyat:x.fiyat||0}})};
