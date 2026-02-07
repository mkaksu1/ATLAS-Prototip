"use client";

import Link from "next/link";
import {
  EnvelopeIcon,
  FolderIcon,
  MapPinIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  VideoCameraIcon,
  LanguageIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  CreditCardIcon,
  SparklesIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const allApps = [
  { name: "Mail", Icon: EnvelopeIcon, href: "/mail", color: "from-blue-500 to-blue-600", description: "E-posta yönetimi" },
  { name: "Drive", Icon: FolderIcon, href: "/drive", color: "from-yellow-500 to-yellow-600", description: "Bulut depolama" },
  { name: "Harita", Icon: MapPinIcon, href: "/harita", color: "from-green-500 to-green-600", description: "Harita ve navigasyon" },
  { name: "Dokümanlar", Icon: DocumentTextIcon, href: "/dokumanlar", color: "from-purple-500 to-purple-600", description: "Belge editörü" },
  { name: "Takvim", Icon: CalendarIcon, href: "/takvim", color: "from-red-500 to-red-600", description: "Takvim ve etkinlikler" },
  { name: "Toplantı", Icon: VideoCameraIcon, href: "/toplanti", color: "from-indigo-500 to-indigo-600", description: "Video konferans" },
  { name: "Ekip", Icon: UserGroupIcon, href: "/ekip", color: "from-pink-500 to-pink-600", description: "Ekip yönetimi" },
  { name: "Çeviri", Icon: LanguageIcon, href: "/ceviri", color: "from-cyan-500 to-cyan-600", description: "Çeviri hizmeti" },
  { name: "Kişiler", Icon: UserIcon, href: "/kisiler", color: "from-teal-500 to-teal-600", description: "İletişim yönetimi" },
  { name: "ATLAS Chat", Icon: ChatBubbleLeftRightIcon, href: "/chat", color: "from-emerald-500 to-emerald-600", description: "Anlık mesajlaşma" },
  { name: "Alışveriş", Icon: ShoppingBagIcon, href: "/alisveris", color: "from-orange-500 to-orange-600", description: "E-ticaret platformu" },
  { name: "FinansATLAS", Icon: BanknotesIcon, href: "/finans", color: "from-amber-500 to-amber-600", description: "Finansal piyasalar" },
  { name: "ATLAS Pay", Icon: CreditCardIcon, href: "/pay", color: "from-violet-500 to-violet-600", description: "Dijital cüzdan" },
  { name: "ATLAS.AI", Icon: SparklesIcon, href: "/ai", color: "from-fuchsia-500 to-fuchsia-600", description: "Yapay zeka asistanı" },
];

export default function AllAppsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = allApps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/30">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/40 blur-3xl" style={{animationDuration: '8s'}} />
        <div className="absolute -right-40 bottom-40 h-[32rem] w-[32rem] animate-pulse rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 blur-3xl" style={{animationDuration: '10s'}} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:px-3 sm:py-2"
              >
                <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Ana Sayfa</span>
              </Link>
              <div className="hidden h-6 w-px bg-slate-200 sm:block" />
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Tüm Uygulamalar</h1>
            </div>

            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Uygulama ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12">
        {/* Stats */}
        <div className="mb-6 flex flex-wrap items-center gap-4 sm:mb-8 sm:gap-6">
          <div className="rounded-xl border border-slate-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur-sm">
            <p className="text-sm text-slate-600">Toplam Uygulama</p>
            <p className="text-2xl font-bold text-slate-900">{allApps.length}</p>
          </div>
          {searchQuery && (
            <div className="rounded-xl border border-blue-200 bg-blue-50/80 px-5 py-3 shadow-sm backdrop-blur-sm">
              <p className="text-sm text-blue-700">Arama Sonucu</p>
              <p className="text-2xl font-bold text-blue-900">{filteredApps.length}</p>
            </div>
          )}
        </div>

        {/* Apps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredApps.map(({ name, Icon, href, color, description }) => (
            <Link
              key={name}
              href={href as any}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:scale-105 hover:border-transparent hover:shadow-2xl"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity group-hover:opacity-5`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg transition group-hover:scale-110 group-hover:shadow-xl`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Name */}
                <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-slate-800">
                  {name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 group-hover:text-slate-700">
                  {description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-400 transition group-hover:text-slate-900">
                  <span>Uygulamayı Aç</span>
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredApps.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-12 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <MagnifyingGlassIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">Sonuç bulunamadı</h3>
            <p className="text-sm text-slate-600">
              "{searchQuery}" için eşleşen uygulama bulunamadı. Farklı bir arama deneyin.
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-white/80 px-6 py-3 font-semibold text-slate-700 shadow-md backdrop-blur-sm transition hover:scale-105 hover:bg-white hover:shadow-xl"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </main>
    </div>
  );
}
