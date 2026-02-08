"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Squares2X2Icon,
  EnvelopeIcon,
  FolderIcon,
  MapPinIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  LanguageIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  CreditCardIcon,
  SparklesIcon,
  PlayCircleIcon,
  BoltIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

const appLinks = [
  { name: "Mail", Icon: EnvelopeIcon, href: "/mail", color: "from-blue-500 to-blue-600" },
  { name: "Drive", Icon: FolderIcon, href: "/drive", color: "from-yellow-500 to-yellow-600" },
  { name: "Harita", Icon: MapPinIcon, href: "/harita", color: "from-green-500 to-green-600" },
  { name: "Dokümanlar", Icon: DocumentTextIcon, href: "/dokumanlar", color: "from-purple-500 to-purple-600" },
  { name: "Takvim", Icon: CalendarIcon, href: "/takvim", color: "from-red-500 to-red-600" },
  { name: "Toplantı", Icon: VideoCameraIcon, href: "/toplanti", color: "from-indigo-500 to-indigo-600" },
  { name: "Ekip", Icon: UserGroupIcon, href: "/ekip", color: "from-pink-500 to-pink-600" },
  { name: "Çeviri", Icon: LanguageIcon, href: "/ceviri", color: "from-cyan-500 to-cyan-600" },
  { name: "Kişiler", Icon: UserIcon, href: "/kisiler", color: "from-teal-500 to-teal-600" },
  { name: "ATLAS Chat", Icon: ChatBubbleLeftRightIcon, href: "/chat", color: "from-emerald-500 to-emerald-600" },
  { name: "Alışveriş", Icon: ShoppingBagIcon, href: "/alisveris", color: "from-orange-500 to-orange-600" },
  { name: "FinansATLAS", Icon: BanknotesIcon, href: "/finans", color: "from-amber-500 to-amber-600" },
  { name: "ATLAS Pay", Icon: CreditCardIcon, href: "/pay", color: "from-violet-500 to-violet-600" },
  { name: "ATLAS.AI", Icon: SparklesIcon, href: "/ai", color: "from-fuchsia-500 to-fuchsia-600" },
  { name: "ATLAS Video", Icon: PlayCircleIcon, href: "/video", color: "from-rose-500 to-rose-600" },
  { name: "ATLAS Pulse", Icon: BoltIcon, href: "/pulse", color: "from-cyan-500 to-blue-600" },
  { name: "ATLASS", Icon: CameraIcon, href: "/atlass", color: "from-pink-500 to-rose-600" },
];

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("atlas_visited");
    if (!hasVisited) {
      setShowWelcomeDialog(true);
      localStorage.setItem("atlas_visited", "true");
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-white to-slate-50/30">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/40 blur-3xl" style={{animationDuration: '8s'}} />
        <div className="absolute -right-40 bottom-40 h-[32rem] w-[32rem] animate-pulse rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl" style={{animationDuration: '10s'}} />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-br from-amber-100/30 to-orange-100/30 blur-3xl" style={{animationDuration: '12s'}} />
      </div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-end gap-2 px-3 py-4 sm:gap-3 sm:px-6 sm:py-5">
        <Link
          href="/mail"
          className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-sm sm:block"
        >
          ATLASmail
        </Link>
        <Link
          href={("/ai" as any)}
          className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-sm md:block"
        >
          ATLAS.AI
        </Link>
        
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-900/30 active:scale-95"
            aria-label="Uygulamalar"
          >
            <Squares2X2Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
            <span className="hidden sm:inline">Uygulamalar</span>
          </button>
          
          {open && (
            <>
              <div 
                className="fixed inset-0 z-[100]" 
                onClick={() => setOpen(false)}
              />
              <div className="fixed left-3 right-3 bottom-3 top-auto sm:absolute sm:left-auto sm:right-0 sm:bottom-auto sm:top-auto z-[110] sm:mt-2 w-auto sm:max-w-[420px] max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-100px)] animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-top-2 rounded-3xl border border-slate-200/60 bg-white/95 shadow-2xl backdrop-blur-xl duration-200 flex flex-col overflow-hidden">
                <div className="flex-shrink-0 p-4 sm:p-6 pb-3 sm:pb-4 flex items-center justify-between border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-900">
                    ATLAS Uygulamaları
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-3 sm:pt-4">
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {appLinks.map(({ name, Icon, href, color }) => (
                      <Link
                        key={name}
                        href={href as any}
                        onClick={() => setOpen(false)}
                        className="group flex flex-col items-center gap-2 rounded-2xl p-3 transition hover:bg-slate-50/80"
                      >
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg shadow-slate-900/10 transition group-hover:scale-110 group-hover:shadow-xl`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-center text-xs font-medium leading-tight text-slate-700">
                          {name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="flex-shrink-0 border-t border-slate-100 p-4 sm:p-6 pt-3 sm:pt-4">
                  <Link
                    href={("/uygulamalar" as any)}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Tüm uygulamaları gör
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenProfile((v) => !v)}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-sm font-bold text-white shadow-lg shadow-slate-900/20 ring-2 ring-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:ring-4 hover:ring-slate-200 active:scale-95"
            aria-label="Profil"
          >
            AT
          </button>

          {openProfile && (
            <>
              <div 
                className="fixed inset-0 z-[100]" 
                onClick={() => setOpenProfile(false)}
              />
              <div className="absolute right-0 z-[110] mt-2 w-[calc(100vw-1.5rem)] max-w-80 animate-in fade-in slide-in-from-top-2 rounded-2xl border border-slate-200/60 bg-white/95 shadow-2xl backdrop-blur-xl duration-200">
                {/* Profile Header */}
                <div className="border-b border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white shadow-lg">
                      AT
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">Ahmet Yılmaz</p>
                      <p className="text-sm text-slate-600">ahmet.yilmaz@atlas.gov.tr</p>
                    </div>
                  </div>
                  <Link
                    href={("/profil" as any)}
                    onClick={() => setOpenProfile(false)}
                    className="mt-3 flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Profili Yönet
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="p-3">
                  <Link
                    href={("/profil" as any)}
                    onClick={() => setOpenProfile(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span>Hesap Ayarları</span>
                  </Link>
                  <Link
                    href={("/profil" as any)}
                    onClick={() => setOpenProfile(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span>Gizlilik ve Güvenlik</span>
                  </Link>
                  <Link
                    href="/drive"
                    onClick={() => setOpenProfile(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p>Depolama</p>
                      <p className="text-xs text-slate-500">24.5 GB / 100 GB</p>
                    </div>
                  </Link>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 p-3">
                  <button
                    onClick={() => setOpenProfile(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-4 pb-20">
        <div className="w-full max-w-2xl space-y-10 text-center">
          {/* Logo */}
          <div className="space-y-4 sm:space-y-5">
            <h1 className="animate-in fade-in slide-in-from-bottom-4 bg-gradient-to-r from-[#0B1B3D] via-[#2d5a9f] to-[#0B1B3D] bg-clip-text text-6xl font-black italic tracking-tight text-transparent drop-shadow-2xl duration-700 sm:text-[5.5rem] md:text-[7rem]">
              ATLAS
            </h1>
            <p className="animate-in fade-in slide-in-from-bottom-4 text-sm font-semibold italic tracking-wide text-slate-600 duration-700 delay-100 sm:text-base md:text-lg">
              Araştır • Bul • Öğren
            </p>
          </div>

          {/* Search Box */}
          <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto w-full duration-700 delay-200">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (searchValue.trim()) {
                window.location.href = `/arama?q=${encodeURIComponent(searchValue)}`;
              }
            }}>
              <div className="group relative overflow-hidden rounded-full border-2 border-slate-200/60 bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 transition hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-7 sm:py-5">
                  <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0 text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:text-slate-600 group-hover:rotate-12" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="ATLAS'ta ara veya bir URL gir"
                    className="w-full border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 sm:text-base"
                  />
                  {searchValue && (
                    <button
                      type="button"
                      onClick={() => setSearchValue("")}
                      className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 flex justify-center gap-3 sm:mt-8 sm:gap-4">
                <button type="submit" className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-800 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/50 transition hover:shadow-xl hover:shadow-slate-900/20 active:scale-95 sm:px-7 sm:py-3.5 sm:text-sm">
                  <span className="relative z-10">ATLAS'ta Ara</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition group-hover:opacity-100" />
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const query = searchValue.trim() ? `?q=${encodeURIComponent(searchValue)}` : '';
                    window.location.href = `/ai${query}`;
                  }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-800 shadow-lg shadow-900/10 ring-1 ring-slate-200/50 transition hover:shadow-xl hover:shadow-slate-900/20 active:scale-95 sm:px-7 sm:py-3.5 sm:text-sm"
                >
                  <span className="relative z-10">ATLAS.AI'ya Sor</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 transition group-hover:opacity-100" />
                </button>
              </div>
            </form>
          </div>

          {/* Info Text */}
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-2 duration-700 delay-300">
            <p className="text-sm font-medium text-slate-600">
              Türkiye'nin Dijital Ekosistemi
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700 transition-all duration-200 hover:scale-110 hover:bg-green-200 hover:shadow-md cursor-default">Yerli</span>
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 transition-all duration-200 hover:scale-110 hover:bg-blue-200 hover:shadow-md cursor-default">Güvenli</span>
              <span className="rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-700 transition-all duration-200 hover:scale-110 hover:bg-purple-200 hover:shadow-md cursor-default">Güçlü</span>
            </div>
          </div>
        </div>
      </main>

      {/* Welcome Dialog */}
      {showWelcomeDialog && (
        <>
          <div 
            className="fixed inset-0 z-[200] bg-slate-900/25 backdrop-blur-[2px] transition-opacity duration-200"
            onClick={() => setShowWelcomeDialog(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-[210] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] shadow-lg">
                    <span className="text-xl font-black italic text-white">A</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">ATLAS'a Hoşgeldiniz</h2>
                    <p className="text-sm text-slate-500">Türkiye'nin Dijital Platformu</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWelcomeDialog(false)}
                  className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 active:scale-95"
                  aria-label="Kapat"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 border border-blue-100/50 shadow-sm">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Bu çalışma <span className="font-bold text-blue-700">Turkcell Yarının Teknoloji Liderleri</span> yarışması için hazırlanmıştır.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 border border-purple-100/50 shadow-sm">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Squares2X2Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        <span className="font-bold">17 farklı konsept uygulamayı</span> keşfetmeyi unutmayın! Mail, AI asistanı, video platformu ve daha fazlası...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => setShowWelcomeDialog(false)}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-900/30 active:scale-95"
              >
                Keşfetmeye Başla
              </button>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="px-6 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
              <a href="#" className="transition-all duration-200 hover:text-[#0B1B3D] hover:font-semibold hover:underline hover:underline-offset-2">Hakkında</a>
              <a href="#" className="transition-all duration-200 hover:text-[#0B1B3D] hover:font-semibold hover:underline hover:underline-offset-2">Reklamcılık</a>
              <a href="#" className="transition-all duration-200 hover:text-[#0B1B3D] hover:font-semibold hover:underline hover:underline-offset-2">İşletme</a>
              <a href="#" className="transition-all duration-200 hover:text-[#0B1B3D] hover:font-semibold hover:underline hover:underline-offset-2">Arama nasıl çalışır</a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
              <a href="#" className="transition-all duration-200 hover:text-[#0B1B3D] hover:font-semibold hover:underline hover:underline-offset-2">Gizlilik</a>
              <a href="#" className="transition-all duration-200 hover:text-[#0B1B3D] hover:font-semibold hover:underline hover:underline-offset-2">Şartlar</a>
              <a href="#" className="transition-all duration-200 hover:text-[#0B1B3D] hover:font-semibold hover:underline hover:underline-offset-2">Ayarlar</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
