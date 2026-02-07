"use client";

import { useState } from "react";
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

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = () => {
    // Simulated translation
    if (sourceText.trim()) {
      setTranslatedText(`[${targetLang}] ${sourceText}`);
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
        <div className="flex flex-1 overflow-hidden">
          {/* Source Text */}
          <div className="flex flex-1 flex-col border-r border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                {sourceText && (
                  <>
                    <button className="rounded-lg p-2 transition hover:bg-slate-100">
                      <SpeakerWaveIcon className="h-5 w-5 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setSourceText("")}
                      className="rounded-lg p-2 transition hover:bg-slate-100"
                    >
                      <XMarkIcon className="h-5 w-5 text-slate-600" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 p-6">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Çevrilecek metni girin..."
                className="h-full w-full resize-none border-none text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
              <p className="text-sm text-slate-500">{sourceText.length} / 5000</p>
              <button
                onClick={handleTranslate}
                disabled={!sourceText.trim()}
                className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 active:scale-95"
              >
                Çevir
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center bg-slate-50 px-2">
            <button
              onClick={handleSwapLanguages}
              className="rounded-full bg-white p-3 shadow-md transition hover:scale-110 hover:shadow-lg active:scale-95"
            >
              <ArrowsRightLeftIcon className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* Target Text */}
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                {translatedText && (
                  <>
                    <button className="rounded-lg p-2 transition hover:bg-slate-100">
                      <SpeakerWaveIcon className="h-5 w-5 text-slate-600" />
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(translatedText)}
                      className="rounded-lg p-2 transition hover:bg-slate-100"
                      title="Kopyala"
                    >
                      <DocumentDuplicateIcon className="h-5 w-5 text-slate-600" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 bg-blue-50/30 p-6">
              {translatedText ? (
                <div className="text-lg text-slate-900">{translatedText}</div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <LanguageIcon className="mx-auto h-16 w-16 text-slate-300" />
                    <p className="mt-4 text-sm text-slate-500">
                      Çeviri burada görünecek
                    </p>
                  </div>
                </div>
              )}
            </div>
            {translatedText && (
              <div className="flex items-center justify-end border-t border-slate-200 px-6 py-4">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <StarIcon className="h-4 w-4" />
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
