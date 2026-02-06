"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Squares2X2Icon,
  EnvelopeIcon,
  FolderIcon,
  MapPinIcon,
  DocumentTextIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  BellIcon,
  UserGroupIcon,
  ChartBarIcon,
  CloudIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const appLinks = [
  { name: "Mail", Icon: EnvelopeIcon, href: "/mail", color: "from-blue-500 to-blue-600" },
  { name: "Drive", Icon: FolderIcon, href: "/drive", color: "from-yellow-500 to-yellow-600" },
  { name: "Harita", Icon: MapPinIcon, href: "/harita", color: "from-green-500 to-green-600" },
  { name: "Dokümanlar", Icon: DocumentTextIcon, href: "/dokumanlar", color: "from-purple-500 to-purple-600" },
  { name: "Takvim", Icon: CalendarIcon, href: "/takvim", color: "from-red-500 to-red-600" },
  { name: "Toplantı", Icon: VideoCameraIcon, href: "/toplanti", color: "from-indigo-500 to-indigo-600" },
  { name: "Ekip", Icon: UserGroupIcon, href: "/ekip", color: "from-pink-500 to-pink-600" },
  { name: "Raporlar", Icon: ChartBarIcon, href: "/raporlar", color: "from-orange-500 to-orange-600" },
  { name: "Bulut", Icon: CloudIcon, href: "/bulut", color: "from-cyan-500 to-cyan-600" },
  { name: "Güvenlik", Icon: ShieldCheckIcon, href: "/guvenlik", color: "from-emerald-500 to-emerald-600" },
  { name: "Bildirimler", Icon: BellIcon, href: "/bildirimler", color: "from-amber-500 to-amber-600" },
  { name: "Ayarlar", Icon: Cog6ToothIcon, href: "/ayarlar", color: "from-slate-500 to-slate-600" },
];

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-white to-slate-50/30">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/40 blur-3xl" style={{animationDuration: '8s'}} />
        <div className="absolute -right-40 bottom-40 h-[32rem] w-[32rem] animate-pulse rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl" style={{animationDuration: '10s'}} />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 animate-pulse rounded-full bg-gradient-to-br from-amber-100/30 to-orange-100/30 blur-3xl" style={{animationDuration: '12s'}} />
      </div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-end gap-3 px-6 py-5">
        <Link
          href="/mail"
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-sm"
        >
          ATLASmail
        </Link>
        <Link
          href="#"
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-sm"
        >
          Görüntüler
        </Link>
        
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-all duration-200 hover:scale-110 hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-50 hover:text-slate-900 hover:shadow-md active:scale-95"
            aria-label="Uygulamalar"
          >
            <Squares2X2Icon className="h-6 w-6 transition-transform duration-200 group-hover:rotate-180" />
          </button>
          
          {open && (
            <>
              <div 
                className="fixed inset-0 z-[100]" 
                onClick={() => setOpen(false)}
              />
              <div className="absolute right-0 z-[110] mt-2 w-[420px] animate-in fade-in slide-in-from-top-2 rounded-3xl border border-slate-200/60 bg-white/95 p-6 shadow-2xl backdrop-blur-xl duration-200">
                <div className="mb-5 flex items-center justify-between">
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
                
                <div className="grid grid-cols-4 gap-2">
                  {appLinks.map(({ name, Icon, href, color }) => (
                    <Link
                      key={name}
                      href={href}
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
                
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <Link
                    href="/tum-uygulamalar"
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Tüm uygulamaları gör
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        <button className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-sm font-bold text-white shadow-lg shadow-slate-900/20 ring-2 ring-white transition-all duration-300 hover:scale-110 hover:shadow-xl hover:ring-4 hover:ring-slate-200 active:scale-95">
          AT
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-40">
        <div className="w-full max-w-2xl space-y-8 text-center">
          {/* Logo */}
          <div className="space-y-3">
            <h1 className="animate-in fade-in slide-in-from-bottom-4 bg-gradient-to-r from-[#0B1B3D] via-[#2d5a9f] to-[#0B1B3D] bg-clip-text text-[5.5rem] font-black italic tracking-tight text-transparent drop-shadow-2xl duration-700 md:text-[7rem]">
              ATLAS
            </h1>
            <p className="animate-in fade-in slide-in-from-bottom-4 text-base font-semibold italic tracking-wide text-slate-600 duration-700 delay-100 md:text-lg">
              Araştır • Bul • Öğren
            </p>
          </div>

          {/* Search Box */}
          <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto w-full duration-700 delay-200">
            <div className="group relative overflow-hidden rounded-full border-2 border-slate-200/60 bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 transition hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center gap-4 px-7 py-5">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:text-slate-600 group-hover:rotate-12" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="ATLAS'ta ara veya bir URL gir"
                  className="w-full border-none bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                />
                {searchValue && (
                  <button
                    onClick={() => setSearchValue("")}
                    className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 px-7 py-3.5 text-sm font-semibold text-slate-800 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/50 transition hover:shadow-xl hover:shadow-slate-900/20 active:scale-95">
                <span className="relative z-10">ATLAS'ta Ara</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition group-hover:opacity-100" />
              </button>
              <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 px-7 py-3.5 text-sm font-semibold text-slate-800 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/50 transition hover:shadow-xl hover:shadow-slate-900/20 active:scale-95">
                <span className="relative z-10">Şansımı Dene</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 transition group-hover:opacity-100" />
              </button>
            </div>
          </div>

          {/* Info Text */}
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-2 duration-700 delay-300">
            <p className="text-sm font-medium text-slate-600">
              Türkiye'nin Milli Arama Motoru
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700 transition-all duration-200 hover:scale-110 hover:bg-green-200 hover:shadow-md cursor-default">Yerli</span>
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700 transition-all duration-200 hover:scale-110 hover:bg-blue-200 hover:shadow-md cursor-default">Güvenli</span>
              <span className="rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-700 transition-all duration-200 hover:scale-110 hover:bg-purple-200 hover:shadow-md cursor-default">Güçlü</span>
            </div>
          </div>
        </div>
      </main>

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
