"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  PencilSquareIcon,
  InboxIcon,
  StarIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  TrashIcon,
  FolderIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const emails = [
  {
    id: 1,
    from: "BT Operasyon",
    subject: "Haftalık bakım penceresi",
    preview: "Bu hafta Cumartesi gecesi 02:00-04:00 arası sunucu bakımı yapılacaktır...",
    time: "10:30",
    read: false,
    starred: false,
  },
  {
    id: 2,
    from: "Güvenlik Ekibi",
    subject: "SIEM rapor özeti",
    preview: "Son 24 saatte tespit edilen güvenlik olaylarının özeti ektedir. İncelemenizi...",
    time: "08:15",
    read: true,
    starred: true,
  },
  {
    id: 3,
    from: "Satınalma Departmanı",
    subject: "Yeni tedarikçi sözleşmesi",
    preview: "Ekteki sözleşme taslağını inceleyerek geri bildirimlerinizi iletebilir misiniz?",
    time: "Dün",
    read: true,
    starred: false,
  },
  {
    id: 4,
    from: "Ürün Yönetimi",
    subject: "Q1 Roadmap güncellemesi",
    preview: "2026 Q1 hedeflerimiz ve yol haritası güncellemesi toplantı notları...",
    time: "Dün",
    read: false,
    starred: true,
  },
  {
    id: 5,
    from: "İnsan Kaynakları",
    subject: "Eğitim planı ve sertifikalar",
    preview: "Yıllık eğitim programı ve sertifika takvimi hazırlandı. Katılım için...",
    time: "5 Şub",
    read: true,
    starred: false,
  },
  {
    id: 6,
    from: "Müşteri Başarı",
    subject: "Pilot müşteri geri bildirimi",
    preview: "Beta testlerinden olumlu geri dönüşler aldık. Detaylı rapor ekte...",
    time: "4 Şub",
    read: true,
    starred: false,
  },
];

const menuItems = [
  { name: "Gelen Kutusu", Icon: InboxIcon, count: 12, active: true },
  { name: "Yıldızlı", Icon: StarIcon, count: null, active: false },
  { name: "Gönderilenler", Icon: PaperAirplaneIcon, count: null, active: false },
  { name: "Taslaklar", Icon: DocumentIcon, count: 3, active: false },
  { name: "Çöp Kutusu", Icon: TrashIcon, count: null, active: false },
  { name: "Klasörler", Icon: FolderIcon, count: null, active: false },
];

export default function MailPage() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [starredEmails, setStarredEmails] = useState<number[]>(
    emails.filter((e) => e.starred).map((e) => e.id)
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSelect = (id: number) => {
    setSelectedEmails((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleStar = (id: number) => {
    setStarredEmails((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md">
              <span className="text-sm font-bold">AT</span>
            </div>
            <span className="text-lg font-bold text-slate-900">ATLASmail</span>
          </Link>
        </div>

        {/* Compose Button */}
        <div className="p-4">
          <button className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <PencilSquareIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni E-posta</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {menuItems.map(({ name, Icon, count, active }) => (
            <button
              key={name}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1 text-left">{name}</span>
              {count && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    active ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Settings */}
        <div className="border-t border-slate-200 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100">
            <Cog6ToothIcon className="h-5 w-5" />
            <span>Ayarlar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="E-postalarda ara"
                className="w-48 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 lg:w-96"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
              <ArrowPathIcon className="h-5 w-5" />
            </button>
            <button className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 sm:block">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-3 py-2 sm:px-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
            />
            <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
              <TrashIcon className="h-4 w-4" />
            </button>
            <button className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 sm:block">
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="hidden items-center gap-2 text-xs text-slate-600 sm:flex">
            <span>1-6 / 12</span>
            <button className="rounded p-1 transition hover:bg-slate-100">
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button className="rounded p-1 transition hover:bg-slate-100">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => {
            const isSelected = selectedEmails.includes(email.id);
            const isStarred = starredEmails.includes(email.id);
            return (
              <div
                key={email.id}
                className={`group flex cursor-pointer items-center gap-2 border-b border-slate-100 px-3 py-3 transition-all duration-150 hover:bg-slate-50 hover:shadow-sm sm:gap-4 sm:px-6 ${
                  isSelected ? "bg-blue-50" : email.read ? "bg-white" : "bg-blue-50/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(email.id)}
                  className="h-4 w-4 flex-shrink-0 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(email.id);
                  }}
                  className="flex-shrink-0 text-slate-400 transition hover:text-yellow-500"
                >
                  {isStarred ? (
                    <StarIconSolid className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
                  ) : (
                    <StarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span
                    className={`flex-shrink-0 truncate text-xs sm:w-44 sm:text-sm ${
                      email.read ? "font-normal text-slate-600" : "font-semibold text-slate-900"
                    }`}
                  >
                    {email.from}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm sm:inline ${
                        email.read ? "font-normal text-slate-900" : "font-semibold text-slate-900"
                      }`}
                    >
                      {email.subject}
                    </span>
                    <span className="hidden text-sm text-slate-500 sm:ml-2 sm:inline">— {email.preview}</span>
                  </div>
                  <span className="flex-shrink-0 text-xs text-slate-500">{email.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
