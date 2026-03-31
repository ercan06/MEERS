
const SUPA_URL = "https://vdrjyngywjzuniwvsjtk.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg";
const SB = {
  h: {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg",
    "Content-Type": "application/json"
  },
  async get(t, q) {
    try {
      const r = await fetch(SUPA_URL+"/rest/v1/"+t+"?"+(q||""), {headers:this.h});
      if(!r.ok) return [];
      return await r.json();
    } catch(e) { console.error("SB.get hatasi:", e); return []; }
  },
  async post(t, d) {
    try {
      const r = await fetch(SUPA_URL+"/rest/v1/"+t, {
        method:"POST",
        headers:Object.assign({},this.h,{"Prefer":"return=representation"}),
        body:JSON.stringify(d)
      });
      return await r.json();
    } catch(e) { console.error("SB.post hatasi:", e); return null; }
  },
  async patch(t, q, d) {
    try {
      const r = await fetch(SUPA_URL+"/rest/v1/"+t+"?"+q, {
        method:"PATCH",
        headers:Object.assign({},this.h,{"Prefer":"return=representation"}),
        body:JSON.stringify(d)
      });
      return await r.json();
    } catch(e) { console.error("SB.patch hatasi:", e); return null; }
  },
  async del(t, q) {
    try {
      await fetch(SUPA_URL+"/rest/v1/"+t+"?"+q, {method:"DELETE",headers:this.h});
    } catch(e) { console.error("SB.del hatasi:", e); }
  }
};
function parseUrunler(u) {
  if(!u) return [];
  if(typeof u === "string") { try { u = JSON.parse(u); } catch(e) { return []; } }
  if(!Array.isArray(u)) return [];
  return u.map(function(x) {
    if(typeof x === "string") return {ad:x, adet:1, em:"", not:""};
    return {ad:x.ad||"", adet:x.adet||1, em:x.em||"", not:x.not||""};
  });
}
function urunMetin(urunler) {
  var arr = parseUrunler(urunler);
  if(!arr.length) return "Siparis yok";
  return arr.map(function(u) { return (u.em?" ":"") + u.ad + " x" + u.adet; }).join(", ");
}
