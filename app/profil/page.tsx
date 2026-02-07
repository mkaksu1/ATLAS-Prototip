"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  CalendarIcon,
  CameraIcon,
  PencilSquareIcon,
  KeyIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function ProfilPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"genel" | "guvenlik" | "gizlilik" | "cihazlar">("genel");

  const user = {
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@atlas.gov.tr",
    phone: "+90 555 123 4567",
    title: "Proje Müdürü",
    department: "Dijital Dönüşüm Ofisi",
    location: "Ankara, Türkiye",
    joinDate: "15 Ocak 2024",
    avatar: "AY",
  };

  const recentActivity = [
    { action: "Drive'da 5 dosya yüklendi", time: "2 saat önce", icon: "upload" },
    { action: "Toplantıya katıldı: Proje Kickoff", time: "5 saat önce", icon: "meeting" },
    { action: "12 e-posta okundu", time: "Dün", icon: "mail" },
    { action: "Profil fotoğrafı güncellendi", time: "3 gün önce", icon: "profile" },
  ];

  const connectedDevices = [
    { name: "Windows PC", location: "Ankara", lastActive: "Şimdi aktif", type: "desktop" },
    { name: "iPhone 14 Pro", location: "Ankara", lastActive: "5 dakika önce", type: "mobile" },
    { name: "MacBook Pro", location: "İstanbul", lastActive: "2 gün önce", type: "desktop" },
  ];

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
              <UserCircleIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Profil</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="border-b border-slate-200 p-4">
          <div className="relative mb-4 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white shadow-lg">
              {user.avatar}
            </div>
            <button className="absolute bottom-0 right-[90px] rounded-full bg-white p-2 shadow-lg transition hover:scale-110">
              <CameraIcon className="h-4 w-4 text-slate-600" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm text-slate-600">{user.email}</p>
            <button className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Profili Düzenle
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("genel")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                activeTab === "genel"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <UserCircleIcon className="h-5 w-5" />
              Genel Bilgiler
            </button>
            <button
              onClick={() => setActiveTab("guvenlik")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                activeTab === "guvenlik"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ShieldCheckIcon className="h-5 w-5" />
              Güvenlik
            </button>
            <button
              onClick={() => setActiveTab("gizlilik")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                activeTab === "gizlilik"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <KeyIcon className="h-5 w-5" />
              Gizlilik
            </button>
            <button
              onClick={() => setActiveTab("cihazlar")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                activeTab === "cihazlar"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <DevicePhoneMobileIcon className="h-5 w-5" />
              Cihazlarım
            </button>
          </nav>
        </div>

        {/* Quick Stats */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Hesap İstatistikleri</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Aktif Oturumlar</span>
                <span className="text-lg font-bold text-slate-900">3</span>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Kullanılan Depolama</span>
                <span className="text-lg font-bold text-slate-900">24.5 GB</span>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Hesap Yaşı</span>
                <span className="text-lg font-bold text-slate-900">1 yıl</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <p className="text-xs text-slate-500">
            Üyelik: {user.joinDate}
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-6 py-4 gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeTab === "genel" && "Genel Bilgiler"}
              {activeTab === "guvenlik" && "Güvenlik Ayarları"}
              {activeTab === "gizlilik" && "Gizlilik Ayarları"}
              {activeTab === "cihazlar" && "Bağlı Cihazlar"}
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Ana Sayfaya Dön
          </Link>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "genel" && (
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Kişisel Bilgiler</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <UserCircleIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Ad Soyad</p>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                    </div>
                    <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
                      Düzenle
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <EnvelopeIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">E-posta</p>
                      <p className="font-semibold text-slate-900">{user.email}</p>
                    </div>
                    <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
                      Düzenle
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <PhoneIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Telefon</p>
                      <p className="font-semibold text-slate-900">{user.phone}</p>
                    </div>
                    <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
                      Düzenle
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <MapPinIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Konum</p>
                      <p className="font-semibold text-slate-900">{user.location}</p>
                    </div>
                    <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
                      Düzenle
                    </button>
                  </div>
                </div>
              </div>

              {/* Work Info */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">İş Bilgileri</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <BriefcaseIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Ünvan</p>
                      <p className="font-semibold text-slate-900">{user.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <BriefcaseIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Departman</p>
                      <p className="font-semibold text-slate-900">{user.department}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Son Aktiviteler</h2>
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <ClockIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "guvenlik" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Şifre ve Kimlik Doğrulama</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <KeyIcon className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">Şifre</p>
                        <p className="text-sm text-slate-500">Son değişiklik: 30 gün önce</p>
                      </div>
                    </div>
                    <button className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2 text-sm font-semibold text-white transition hover:scale-105">
                      Değiştir
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">İki Faktörlü Doğrulama</p>
                        <p className="text-sm text-green-600">Aktif</p>
                      </div>
                    </div>
                    <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Yönet
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <DevicePhoneMobileIcon className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">Güvenlik Anahtarları</p>
                        <p className="text-sm text-slate-500">2 anahtar kayıtlı</p>
                      </div>
                    </div>
                    <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Görüntüle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gizlilik" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Gizlilik Tercihleri</h2>
                <div className="space-y-4">
                  {[
                    { label: "Aktivite geçmişini kaydet", enabled: true },
                    { label: "Kişiselleştirilmiş reklamlar", enabled: false },
                    { label: "Konum geçmişi", enabled: true },
                    { label: "Sesli etkinlik kayıtları", enabled: false },
                  ].map((pref, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                      <p className="font-medium text-slate-900">{pref.label}</p>
                      <button
                        className={`relative h-6 w-11 rounded-full transition ${
                          pref.enabled ? "bg-blue-600" : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                            pref.enabled ? "left-[22px]" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "cihazlar" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Bağlı Cihazlar</h2>
                <div className="space-y-3">
                  {connectedDevices.map((device, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                      <div className="flex items-center gap-3">
                        {device.type === "desktop" ? (
                          <ComputerDesktopIcon className="h-6 w-6 text-slate-600" />
                        ) : (
                          <DevicePhoneMobileIcon className="h-6 w-6 text-slate-600" />
                        )}
                        <div>
                          <p className="font-medium text-slate-900">{device.name}</p>
                          <p className="text-sm text-slate-500">{device.location} • {device.lastActive}</p>
                        </div>
                      </div>
                      <button className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100">
                        Kaldır
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
