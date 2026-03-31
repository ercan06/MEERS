// ── SUPABASE KONFIGURASYON ──
const SUPABASE_URL = 'https://vdrjyngywjzuniwvsjtk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcmp5bmd5d2p6dW5pd3ZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4Nzc4MTMsImV4cCI6MjA5MDQ1MzgxM30.pD2vQT62f7XM7yFe_yuddPhJhfRg_1biCZ8ImV4LRjg';

const SB = {
  get headers(){
    return {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json',
    };
  },
  async get(tablo, params=''){
    const r = await fetch(SUPABASE_URL+'/rest/v1/'+tablo+'?'+params, {headers:this.headers});
    if(!r.ok) return [];
    return r.json();
  },
  async post(tablo, data){
    const r = await fetch(SUPABASE_URL+'/rest/v1/'+tablo, {
      method:'POST', headers:{...this.headers,'Prefer':'return=representation'}, body:JSON.stringify(data)
    });
    return r.json();
  },
  async patch(tablo, filter, data){
    const r = await fetch(SUPABASE_URL+'/rest/v1/'+tablo+'?'+filter, {
      method:'PATCH', headers:{...this.headers,'Prefer':'return=representation'}, body:JSON.stringify(data)
    });
    return r.json();
  },
  async delete(tablo, filter){
    await fetch(SUPABASE_URL+'/rest/v1/'+tablo+'?'+filter, {method:'DELETE', headers:this.headers});
  },
  poll(tablo, callback, interval=3000){
    let son = null;
    return setInterval(async ()=>{
      try{
        const veri = await this.get(tablo,'order=updated_at.desc&limit=100');
        const hash = JSON.stringify(veri);
        if(hash !== son){ son=hash; callback(veri); }
      }catch(e){}
    }, interval);
  }
};
