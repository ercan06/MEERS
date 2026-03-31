-- Menü tablosuna resim kolonu ekle
ALTER TABLE menu ADD COLUMN IF NOT EXISTS resim text;
