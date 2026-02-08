"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LanguageIcon,
  ArrowsRightLeftIcon,
  SpeakerWaveIcon,
  DocumentDuplicateIcon,
  ClockIcon,
  StarIcon,
  XMarkIcon,
  MicrophoneIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type Translation = {
  id: number;
  fromLang: string;
  toLang: string;
  sourceText: string;
  translatedText: string;
  timestamp: string;
  isFavorite: boolean;
};

const languages = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "İngilizce", flag: "🇬🇧" },
  { code: "ar", name: "Arapça", flag: "🇸🇦" },
  { code: "de", name: "Almanca", flag: "🇩🇪" },
  { code: "fr", name: "Fransızca", flag: "🇫🇷" },
  { code: "es", name: "İspanyolca", flag: "🇪🇸" },
  { code: "ru", name: "Rusça", flag: "🇷🇺" },
  { code: "zh", name: "Çince", flag: "🇨🇳" },
  { code: "ja", name: "Japonca", flag: "🇯🇵" },
  { code: "ko", name: "Korece", flag: "🇰🇷" },
  { code: "it", name: "İtalyanca", flag: "🇮🇹" },
  { code: "pt", name: "Portekizce", flag: "🇵🇹" },
];

const recentTranslations: Translation[] = [
  {
    id: 1,
    fromLang: "Türkçe",
    toLang: "İngilizce",
    sourceText: "Merhaba dünya",
    translatedText: "Hello world",
    timestamp: "5 dakika önce",
    isFavorite: true,
  },
  {
    id: 2,
    fromLang: "İngilizce",
    toLang: "Türkçe",
    sourceText: "Good morning",
    translatedText: "Günaydın",
    timestamp: "1 saat önce",
    isFavorite: false,
  },
  {
    id: 3,
    fromLang: "Türkçe",
    toLang: "Almanca",
    sourceText: "Teşekkür ederim",
    translatedText: "Danke schön",
    timestamp: "2 saat önce",
    isFavorite: true,
  },
];

export default function CeviriPage() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("tr");
  const [targetLang, setTargetLang] = useState("en");
  const [favorites, setFavorites] = useState<number[]>(
    recentTranslations.filter((t) => t.isFavorite).map((t) => t.id)
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState("");

  // Clear error when source text changes
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [sourceText]);

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError("Çevrilecek metin giriniz");
      return;
    }

    setIsTranslating(true);
    setError("");
    
    try {
      // Lingva Translate API - Google Translate proxy, ücretsiz ve limitsize
      const encodedText = encodeURIComponent(sourceText);
      const apiUrl = `https://lingva.ml/api/v1/${sourceLang}/${targetLang}/${encodedText}`;
      console.log('Translation request:', { sourceLang, targetLang, apiUrl });
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Çeviri servisi yanıt vermedi');
      }
      
      const data = await response.json();
      console.log('Translation response:', data);
      
      if (data.translation) {
        setTranslatedText(data.translation);
      } else {
        throw new Error('Çeviri başarısız oldu');
      }
    } catch (err) {
      console.error('Translation error:', err);
      setError(err instanceof Error ? err.message : 'Çeviri sırasında bir hata oluştu');
      setTranslatedText('');
    } finally {
      setIsTranslating(false);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const getLanguage = (code: string) => languages.find((l) => l.code === code);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-slate-200 bg-white overflow-hidden transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md">
              <LanguageIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Çeviri</span>
          </Link>
        </div>

        {/* Quick Languages */}
        <div className="border-b border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Hızlı Diller</h3>
          <div className="grid grid-cols-2 gap-2">
            {languages.slice(0, 6).map((lang) => (
              <button
                key={lang.code}
                onClick={() => setTargetLang(lang.code)}
                className={`rounded-lg border p-2.5 text-left transition ${
                  targetLang === lang.code
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="mb-1 text-lg">{lang.flag}</div>
                <p className="text-xs font-medium text-slate-900">{lang.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Translations */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Son Çeviriler</h3>
          <div className="space-y-2">
            {recentTranslations.map((trans) => (
              <div
                key={trans.id}
                className="group rounded-lg border border-slate-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{trans.fromLang}</span>
                    <ArrowsRightLeftIcon className="h-3 w-3" />
                    <span>{trans.toLang}</span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(trans.id)}
                    className="opacity-0 transition group-hover:opacity-100"
                  >
                    {favorites.includes(trans.id) ? (
                      <StarIconSolid className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <StarIcon className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </div>
                <p className="mb-1 text-sm text-slate-900">{trans.sourceText}</p>
                <p className="mb-2 text-sm text-blue-600">{trans.translatedText}</p>
                <p className="flex items-center gap-1 text-xs text-slate-400">
                  <ClockIcon className="h-3 w-3" />
                  {trans.timestamp}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Translation Stats */}
        <div className="border-t border-slate-200 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-50 p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">127</p>
              <p className="text-xs text-blue-600">Çeviri</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{languages.length}</p>
              <p className="text-xs text-green-600">Dil</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Çeviri</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:block rounded-lg p-2 transition hover:bg-slate-100">
              <MicrophoneIcon className="h-5 w-5 text-slate-600" />
            </button>
            <button className="hidden sm:block rounded-lg p-2 transition hover:bg-slate-100">
              <PaperClipIcon className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </header>

        {/* Translation Area */}
        <div className="flex flex-1 overflow-hidden p-4 sm:p-6 gap-4">
          {/* Source Text */}
          <div className="flex flex-1 flex-col rounded-2xl bg-white shadow-lg border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-5 py-4">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1.5">
                {sourceText && (
                  <>
                    <button className="rounded-xl p-2.5 transition-all hover:bg-slate-100 hover:scale-110 active:scale-95 group">
                      <SpeakerWaveIcon className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => setSourceText("")}
                      className="rounded-xl p-2.5 transition-all hover:bg-red-50 hover:scale-110 active:scale-95 group"
                    >
                      <XMarkIcon className="h-5 w-5 text-slate-600 group-hover:text-red-600" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 p-6">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey && sourceText.trim() && !isTranslating) {
                    e.preventDefault();
                    handleTranslate();
                  }
                }}
                placeholder="Çevrilecek metni girin... (Ctrl+Enter ile çevir)"
                className="h-full w-full resize-none border-none text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border-t border-slate-200 px-6 py-4">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-600">
                  <span className={sourceText.length > 4500 ? "text-orange-600" : ""}>{sourceText.length}</span> / 5000
                </p>
                {error && (
                  <p className="mt-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-lg">{error}</p>
                )}
              </div>
              <button
                onClick={handleTranslate}
                disabled={!sourceText.trim() || isTranslating}
                className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition-all hover:shadow-xl hover:shadow-blue-900/40 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-md active:scale-95"
              >
                {isTranslating ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Çevriliyor...
                  </>
                ) : (
                  <>
                    <LanguageIcon className="h-5 w-5" />
                    Çevir
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleSwapLanguages}
              className="rounded-full bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] p-4 shadow-xl shadow-blue-900/30 transition-all hover:shadow-2xl hover:shadow-blue-900/40 hover:scale-110 active:scale-95 group"
            >
              <ArrowsRightLeftIcon className="h-6 w-6 text-white group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Target Text */}
          <div className="flex flex-1 flex-col rounded-2xl bg-white shadow-lg border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 px-5 py-4">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1.5">
                {translatedText && (
                  <>
                    <button className="rounded-xl p-2.5 transition-all hover:bg-slate-100 hover:scale-110 active:scale-95 group">
                      <SpeakerWaveIcon className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(translatedText)}
                      className="rounded-xl p-2.5 transition-all hover:bg-green-50 hover:scale-110 active:scale-95 group"
                      title="Kopyala"
                    >
                      <DocumentDuplicateIcon className="h-5 w-5 text-slate-600 group-hover:text-green-600" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-blue-50/50 to-slate-50/50 p-6">
              {isTranslating ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <svg className="h-16 w-16 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <LanguageIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-slate-600">Çeviriliyor...</p>
                    <p className="mt-1 text-xs text-slate-400">Lütfen bekleyin</p>
                  </div>
                </div>
              ) : translatedText ? (
                <div className="text-lg leading-relaxed text-slate-900">{translatedText}</div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-slate-100 flex items-center justify-center">
                      <LanguageIcon className="h-10 w-10 text-slate-400" />
                    </div>
                    <p className="mt-5 text-sm font-medium text-slate-600">
                      Çeviri burada görünecek
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Metni girdikten sonra Çevir butonuna tıklayın
                    </p>
                  </div>
                </div>
              )}
            </div>
            {translatedText && (
              <div className="flex items-center justify-end bg-gradient-to-r from-slate-50 to-white border-t border-slate-200 px-6 py-4">
                <button className="flex items-center gap-2.5 rounded-xl border-2 border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700 hover:shadow-md hover:scale-105 active:scale-95 group">
                  <StarIcon className="h-5 w-5 group-hover:fill-yellow-400 group-hover:text-yellow-400 transition-all" />
                  Favorilere Ekle
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
