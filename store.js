// ── LEZZET KEBAP — MERKEZI VERİ KATMANI ──
// Tüm HTML dosyaları bu script'i inline olarak içerir.
// localStorage key: lezzet_kebap_v2
// Her değişiklikten sonra Store.kaydet() çağrılır.
// Başka sekmede değişiklik olunca window storage event ile güncellenir.

(function(){
const KEY = 'lezzet_kebap_v2';

function varsayilan(){
  return {
    // Restoran bilgisi
    restoran: {ad:'Lezzet Kebap', masaSayisi:20, kdv:8, logo:'🍽️'},

    // Menü
    menu: [
      {id:'m1',ad:'Adana Kebap',em:'🥩',kat:'Izgara',fiyat:180,maliyet:65,aktif:true},
      {id:'m2',ad:'Tavuk Sis',em:'🍗',kat:'Izgara',fiyat:160,maliyet:55,aktif:true},
      {id:'m3',ad:'Kofte',em:'🍖',kat:'Izgara',fiyat:150,maliyet:50,aktif:true},
      {id:'m4',ad:'Kasarli Pide',em:'🫓',kat:'Pide',fiyat:120,maliyet:30,aktif:true},
      {id:'m5',ad:'Lahmacun',em:'🫓',kat:'Pide',fiyat:45,maliyet:12,aktif:true},
      {id:'m6',ad:'Etli Pide',em:'🫓',kat:'Pide',fiyat:130,maliyet:35,aktif:true},
      {id:'m7',ad:'Mercimek Corbasi',em:'🍲',kat:'Corbalar',fiyat:60,maliyet:8,aktif:true},
      {id:'m8',ad:'Ezogelin',em:'🍲',kat:'Corbalar',fiyat:55,maliyet:7,aktif:true},
      {id:'m9',ad:'Baklava',em:'🍮',kat:'Tatlilar',fiyat:80,maliyet:20,aktif:true},
      {id:'m10',ad:'Sutlac',em:'🍮',kat:'Tatlilar',fiyat:65,maliyet:15,aktif:true},
      {id:'m11',ad:'Ayran',em:'🥛',kat:'Icecekler',fiyat:25,maliyet:5,aktif:true},
      {id:'m12',ad:'Kola',em:'🥤',kat:'Icecekler',fiyat:35,maliyet:8,aktif:true},
      {id:'m13',ad:'Cay',em:'🍵',kat:'Icecekler',fiyat:15,maliyet:2,aktif:true},
      {id:'m14',ad:'Salgam',em:'🧃',kat:'Icecekler',fiyat:20,maliyet:4,aktif:true},
    ],

    // Stok
    stok: [
      {em:'🥩',ad:'Dana Kiyma',miktar:3.2,max:10,birim:'kg',sinir:3},
      {em:'🍗',ad:'Tavuk Gogsu',miktar:4.5,max:8,birim:'kg',sinir:2},
      {em:'🌾',ad:'Un',miktar:8,max:20,birim:'kg',sinir:4},
      {em:'🧅',ad:'Sogan',miktar:2.1,max:5,birim:'kg',sinir:1},
      {em:'🍅',ad:'Domates',miktar:0.8,max:4,birim:'kg',sinir:1},
      {em:'🫒',ad:'Zeytinyagi',miktar:1.5,max:5,birim:'lt',sinir:1},
      {em:'🥣',ad:'Sutlac Malz.',miktar:6,max:10,birim:'porsiyon',sinir:3},
      {em:'🍵',ad:'Cay',miktar:12,max:30,birim:'porsiyon',sinir:5},
    ],

    // Stok-menü ilişkisi
    stokDusur: {
      'm1':{'Dana Kiyma':0.25},'m2':{'Tavuk Gogsu':0.2},
      'm3':{'Dana Kiyma':0.15,'Sogan':0.05},'m4':{'Un':0.1},
      'm5':{'Un':0.08,'Dana Kiyma':0.1,'Domates':0.1},
      'm6':{'Un':0.1,'Dana Kiyma':0.15},'m9':{},'m10':{'Sutlac Malz.':1},'m13':{'Cay':1}
    },

    // Masalar
    masalar: Array.from({length:20},(_,i)=>({
      no:i+1, durum:'bos', garsonId:null, garsonAd:'-',
      sure:0, siparisler:[], toplam:0,
    })),

    // Siparişler — tüm ekranlar buradan okur
    siparisler: [],

    // Garsonlar
    garsonlar: [
      {id:1,ad:'Zeynep K.',harf:'Z',sifre:'1234',aktif:true},
      {id:2,ad:'Mehmet A.',harf:'M',sifre:'1234',aktif:true},
      {id:3,ad:'Fatma S.',harf:'F',sifre:'1234',aktif:true},
      {id:4,ad:'Can Y.',harf:'C',sifre:'1234',aktif:true},
    ],

    // Shift
    shiftGrid: {},
    shiftAyar: {hedefNetSaat:51,haftaToplamSaat:54,molaSaat:4},

    // Prim ayarları
    primAyar: {oran:10, yorumBonus:20},

    // Hedefler
    hedefler: {gunluk:10000, haftalik:65000, aylik:280000},

    // Müşteri profilleri
    musteriler: {},

    // Stok talepleri
    stokTalepler: [],

    // Savunmalar
    savunmalar: [],

    // Ödeme geçmişi
    odemeler: [],

    // Ciro günlük kayıt
    ciroKayit: {},
  };
}

// ── OKUMA / YAZMA ──
function oku(){
  try{
    const r = localStorage.getItem(KEY);
    if(!r) return null;
    const d = JSON.parse(r);
    // Eksik alanları varsayılanla doldur
    const v = varsayilan();
    Object.keys(v).forEach(k=>{if(d[k]===undefined) d[k]=v[k];});
    return d;
  } catch(e){ return null; }
}
function kaydet(d){
  try{ localStorage.setItem(KEY,JSON.stringify(d)); } catch(e){}
}

let state = oku() || varsayilan();

// ── PUBLIC API ──
window.Store = {
  // Ham erişim
  s: state,

  kaydet(){ kaydet(state); },

  reset(){ state = varsayilan(); kaydet(state); location.reload(); },

  // ── STOK ──
  stokKontrol(menuId, adet=1){
    const dusr = state.stokDusur[menuId];
    if(!dusr) return {ok:true};
    for(const [ad,miktar] of Object.entries(dusr)){
      const item = state.stok.find(x=>x.ad===ad);
      if(item && item.miktar < miktar*adet)
        return {ok:false, sebep:ad+' yetersiz ('+item.miktar+' '+item.birim+' kaldi)'};
    }
    return {ok:true};
  },
  stokDus(menuId, adet=1){
    const dusr = state.stokDusur[menuId];
    if(!dusr) return;
    for(const [ad,miktar] of Object.entries(dusr)){
      const item = state.stok.find(x=>x.ad===ad);
      if(item) item.miktar = Math.max(0,+(item.miktar-miktar*adet).toFixed(2));
    }
    kaydet(state);
  },

  // ── SİPARİŞ ──
  sipEkle(siparis){
    // siparis: {masaNo, garsonId, garsonAd, urunler:[{menuId,ad,adet,fiyat,not}], not}
    const id = 'sp_'+Date.now();
    const toplam = siparis.urunler.reduce((s,u)=>s+u.fiyat*u.adet,0);
    const yeni = {
      id, masaNo:siparis.masaNo,
      garsonId:siparis.garsonId, garsonAd:siparis.garsonAd,
      urunler:siparis.urunler, not:siparis.not||'',
      toplam, durum:'yeni', // yeni > hazirlaniyor > hazir > teslim
      olusturma: Date.now(), guncelleme: Date.now(),
    };
    state.siparisler.push(yeni);
    // Masayı güncelle
    const masa = state.masalar.find(m=>m.no===siparis.masaNo);
    if(masa){
      masa.durum='dolu';
      masa.siparisler.push(id);
      masa.toplam += toplam;
    }
    kaydet(state);
    return yeni;
  },
  sipDurumGuncelle(id, durum){
    const sp = state.siparisler.find(x=>x.id===id);
    if(!sp) return;
    sp.durum = durum;
    sp.guncelleme = Date.now();
    // Hazır olunca stok düş
    if(durum==='hazirlaniyor'){
      sp.urunler.forEach(u=>this.stokDus(u.menuId, u.adet));
    }
    kaydet(state);
  },

  // ── ÖDEME ──
  odemeAl(masaNo, yontem){
    const masa = state.masalar.find(m=>m.no===masaNo);
    if(!masa) return null;
    const toplam = masa.toplam;
    const sps = state.siparisler.filter(s=>masa.siparisler.includes(s.id));
    const odeme = {
      id:'od_'+Date.now(), masaNo, yontem, toplam,
      garsonId:masa.garsonId, garsonAd:masa.garsonAd,
      urunler:sps.flatMap(s=>s.urunler),
      tarih:new Date().toISOString(),
    };
    state.odemeler.push(odeme);
    // Günlük ciro güncelle
    const gun = new Date().toISOString().slice(0,10);
    if(!state.ciroKayit[gun]) state.ciroKayit[gun]={toplam:0,siparisSayisi:0,nakit:0,kart:0};
    state.ciroKayit[gun].toplam += toplam;
    state.ciroKayit[gun].siparisSayisi++;
    if(yontem==='nakit') state.ciroKayit[gun].nakit+=toplam;
    else state.ciroKayit[gun].kart+=toplam;
    // Masayı sıfırla
    masa.durum='bos'; masa.siparisler=[]; masa.toplam=0;
    masa.garsonId=null; masa.garsonAd='-'; masa.sure=0;
    kaydet(state);
    return odeme;
  },

  // ── MÜŞTERİ ──
  musteriGetir(tel){
    if(!state.musteriler[tel]) state.musteriler[tel]={
      tel, ad:'', ziyaret:0, toplamHarcama:0,
      puan:0, seviye:1, streak:0,
      sonZiyaret:null, favoriUrun:null,
      siparisGecmisi:[],
    };
    return state.musteriler[tel];
  },
  musteriGuncelle(tel, data){ Object.assign(state.musteriler[tel]||{},data); kaydet(state); },

  // ── BUGÜN CİRO ──
  bugunCiro(){
    const gun = new Date().toISOString().slice(0,10);
    return state.ciroKayit[gun] || {toplam:0,siparisSayisi:0,nakit:0,kart:0};
  },

  // ── MASA ──
  masaGetir(no){ return state.masalar.find(m=>m.no===no); },
  masaGuncelle(no,data){ const m=state.masalar.find(x=>x.no===no); if(m){Object.assign(m,data);kaydet(state);} },
};

// Diğer sekmeden gelen değişiklikleri dinle
window.addEventListener('storage', e=>{
  if(e.key===KEY && e.newValue){
    try{
      const yeni = JSON.parse(e.newValue);
      Object.assign(state, yeni);
      if(window.onStoreGuncelle) window.onStoreGuncelle();
    } catch(err){}
  }
});

})();
