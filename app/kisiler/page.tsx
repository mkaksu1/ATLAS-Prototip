"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  StarIcon,
  EllipsisVerticalIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  TagIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  location: string;
  avatar: string;
  category: string;
  isFavorite: boolean;
  notes: string;
};

const contacts: Contact[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@atlas.gov.tr",
    phone: "+90 555 123 4567",
    company: "ATLAS",
    position: "Proje Müdürü",
    location: "Ankara",
    avatar: "AY",
    category: "İş",
    isFavorite: true,
    notes: "Proje yöneticisi",
  },
  {
    id: 2,
    name: "Fatma Demir",
    email: "fatma.demir@tech.com",
    phone: "+90 555 234 5678",
    company: "TechCorp",
    position: "Yazılım Geliştirici",
    location: "İstanbul",
    avatar: "FD",
    category: "İş",
    isFavorite: true,
    notes: "Senior developer",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    email: "mehmet.k@example.com",
    phone: "+90 555 345 6789",
    company: "Freelance",
    position: "Tasarımcı",
    location: "İzmir",
    avatar: "MK",
    category: "Kişisel",
    isFavorite: false,
    notes: "UI/UX tasarımcı",
  },
  {
    id: 4,
    name: "Ayşe Şahin",
    email: "ayse.sahin@data.com",
    phone: "+90 555 456 7890",
    company: "DataLab",
    position: "Veri Analisti",
    location: "Ankara",
    avatar: "AŞ",
    category: "İş",
    isFavorite: false,
    notes: "",
  },
  {
    id: 5,
    name: "Zeynep Arslan",
    email: "zeynep.a@gmail.com",
    phone: "+90 555 567 8901",
    company: "",
    position: "",
    location: "Antalya",
    avatar: "ZA",
    category: "Aile",
    isFavorite: true,
    notes: "Kardeş",
  },
  {
    id: 6,
    name: "Can Öztürk",
    email: "can.ozturk@backend.io",
    phone: "+90 555 678 9012",
    company: "Backend Solutions",
    position: "Backend Developer",
    location: "İstanbul",
    avatar: "CÖ",
    category: "İş",
    isFavorite: false,
    notes: "",
  },
  {
    id: 7,
    name: "Elif Koç",
    email: "elif.koc@devops.com",
    phone: "+90 555 789 0123",
    company: "CloudOps",
    position: "DevOps Engineer",
    location: "Bursa",
    avatar: "EK",
    category: "İş",
    isFavorite: false,
    notes: "",
  },
  {
    id: 8,
    name: "Burak Yıldız",
    email: "burak.y@security.com",
    phone: "+90 555 890 1234",
    company: "SecureNet",
    position: "Güvenlik Uzmanı",
    location: "Ankara",
    avatar: "BY",
    category: "İş",
    isFavorite: false,
    notes: "Cybersecurity",
  },
];

const categories = ["Tümü", "İş", "Kişisel", "Aile", "Favoriler"];

export default function KisilerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tümü");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>(
    contacts.filter((c) => c.isFavorite).map((c) => c.id)
  );
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "Tümü" ||
      (filterCategory === "Favoriler" && favorites.includes(contact.id)) ||
      contact.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <aside className="flex w-80 flex-col border-r border-slate-200 bg-slate-50/50 overflow-hidden">
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md">
              <UserIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Kişiler</span>
          </Link>
        </div>

        {/* New Contact Button */}
        <div className="border-b border-slate-200 p-4">
          <button className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni Kişi</span>
          </button>
        </div>

        {/* Categories */}
        <div className="border-b border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Kategoriler</h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  filterCategory === cat
                    ? "bg-blue-100 font-medium text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {cat === "Favoriler" ? (
                  <StarIcon className="h-4 w-4" />
                ) : cat === "İş" ? (
                  <BriefcaseIcon className="h-4 w-4" />
                ) : cat === "Aile" ? (
                  <UserGroupIcon className="h-4 w-4" />
                ) : (
                  <TagIcon className="h-4 w-4" />
                )}
                {cat}
                <span className="ml-auto text-xs">
                  {cat === "Tümü"
                    ? contacts.length
                    : cat === "Favoriler"
                    ? favorites.length
                    : contacts.filter((c) => c.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">İstatistikler</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Toplam Kişi</p>
                    <p className="text-lg font-bold text-slate-900">{contacts.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-yellow-100 p-2">
                    <StarIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Favoriler</p>
                    <p className="text-lg font-bold text-slate-900">{favorites.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Şirketler</p>
                    <p className="text-lg font-bold text-slate-900">
                      {new Set(contacts.map((c) => c.company).filter(Boolean)).size}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Kişiler</h1>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {filteredContacts.length} kişi
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Kişi ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-l-lg px-3 py-2 transition ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-r-lg px-3 py-2 transition ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Contacts Grid/List */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                        {contact.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                        {contact.position && (
                          <p className="text-sm text-slate-600">{contact.position}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(contact.id);
                      }}
                      className="rounded p-1 transition hover:bg-slate-100"
                    >
                      {favorites.includes(contact.id) ? (
                        <StarIconSolid className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <StarIcon className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <PhoneIcon className="h-4 w-4" />
                      {contact.phone}
                    </div>
                    {contact.company && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        {contact.company}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPinIcon className="h-4 w-4" />
                      {contact.location}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {contact.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-lg"
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
                    {contact.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                      {contact.position && (
                        <>
                          <span className="text-sm text-slate-500">•</span>
                          <span className="text-sm text-slate-600">{contact.position}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <EnvelopeIcon className="h-3.5 w-3.5" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <PhoneIcon className="h-3.5 w-3.5" />
                        {contact.phone}
                      </div>
                      {contact.company && (
                        <div className="flex items-center gap-1.5">
                          <BuildingOfficeIcon className="h-3.5 w-3.5" />
                          {contact.company}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {contact.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(contact.id);
                    }}
                    className="rounded p-2 transition hover:bg-slate-100"
                  >
                    {favorites.includes(contact.id) ? (
                      <StarIconSolid className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <StarIcon className="h-5 w-5 text-slate-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {filteredContacts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <UserIcon className="h-16 w-16 text-slate-300" />
              <p className="mt-4 text-lg font-medium text-slate-900">Kişi bulunamadı</p>
              <p className="mt-1 text-sm text-slate-500">
                Yeni bir kişi eklemek için "Yeni Kişi" butonunu kullanın.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl animate-in fade-in zoom-in-95 rounded-2xl bg-white shadow-2xl duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900">Kişi Detayları</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="rounded-full p-2 transition hover:bg-slate-100"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white">
                  {selectedContact.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">{selectedContact.name}</h3>
                  {selectedContact.position && (
                    <p className="text-slate-600">{selectedContact.position}</p>
                  )}
                  <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {selectedContact.category}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <EnvelopeIcon className="h-4 w-4" />
                    E-posta
                  </div>
                  <p className="text-slate-900">{selectedContact.email}</p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <PhoneIcon className="h-4 w-4" />
                    Telefon
                  </div>
                  <p className="text-slate-900">{selectedContact.phone}</p>
                </div>

                {selectedContact.company && (
                  <div className="rounded-lg bg-slate-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      Şirket
                    </div>
                    <p className="text-slate-900">{selectedContact.company}</p>
                  </div>
                )}

                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPinIcon className="h-4 w-4" />
                    Konum
                  </div>
                  <p className="text-slate-900">{selectedContact.location}</p>
                </div>

                {selectedContact.notes && (
                  <div className="rounded-lg bg-slate-50 p-4">
                    <div className="mb-2 text-sm font-semibold text-slate-700">Notlar</div>
                    <p className="text-slate-900">{selectedContact.notes}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 border-t border-slate-200 p-6">
              <button className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                <PencilSquareIcon className="inline h-4 w-4 mr-2" />
                Düzenle
              </button>
              <button className="flex-1 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-105 active:scale-95">
                <EnvelopeIcon className="inline h-4 w-4 mr-2" />
                E-posta Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
