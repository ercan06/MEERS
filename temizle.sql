-- Tamamlandi siparişleri temizle (test amaçlı)
DELETE FROM siparisler WHERE durum = 'tamamlandi';

-- Masaları sıfırla
UPDATE masalar SET durum='bos', garson_id=NULL, garson_ad='-', toplam=0, sure=0 
WHERE durum != 'bos';

-- Kontrol
SELECT no, durum, garson_ad, toplam FROM masalar ORDER BY no;
