# ATLAS.AI - GitHub Models Entegrasyonu

## GitHub Models API Kurulumu

ATLAS.AI şimdi GitHub Models kullanarak gerçek AI yanıtları veriyor! Kurulum için:

### 1. GitHub Token Alın

1. GitHub'da [Personal Access Token](https://github.com/settings/tokens) sayfasına gidin
2. **Generate new token (classic)** butonuna tıklayın
3. Token açıklaması: `ATLAS AI Models`
4. **models:read** iznini seçin
5. Token'ı oluşturun ve kopyalayın

### 2. Environment Variable'ı Ayarlayın

Proje klasöründeki `.env.local` dosyasını açın ve token'ınızı ekleyin:

```
GITHUB_TOKEN=ghp_your_token_here
```

### 3. Geliştirme Sunucusunu Yeniden Başlatın

Terminal'de:

```bash
npm run dev
```

### 4. Test Edin!

- Ana sayfadan bir soru yazın
- "ATLAS.AI'ya Sor" butonuna tıklayın
- Gerçek AI yanıtları görün!

## Özellikler

✅ GitHub Models (GPT-4o) entegrasyonu  
✅ Gerçek zamanlı AI yanıtları  
✅ Konuşma geçmişi  
✅ Türkçe destek  
✅ Ücretsiz rate limitler (faturalama için paid usage aktif edilebilir)

## Rate Limits

GitHub Models ücretsiz kullanımda rate limit vardır. Daha yüksek limitler için [paid usage](https://github.com/marketplace/models) aktif edilebilir.

## Sorun Giderme

**"GitHub token yapılandırılmamış" hatası alıyorsanız:**
- `.env.local` dosyasının proje kök dizininde olduğundan emin olun
- Token'ın doğru kopyalandığından emin olun
- Geliştirme sunucusunu yeniden başlatın

**"Unauthorized" hatası alıyorsanız:**
- Token'ın `models:read` iznine sahip olduğundan emin olun
- Token'ın süresinin dolmadığından emin olun
