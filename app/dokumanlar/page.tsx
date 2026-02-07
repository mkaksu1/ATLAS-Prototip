"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  FolderIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  TrashIcon,
  Squares2X2Icon,
  ListBulletIcon,
  PlusIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  DocumentIcon,
  PresentationChartBarIcon,
  TableCellsIcon,
  DocumentChartBarIcon,
  PhotoIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

type Document = {
  id: number;
  title: string;
  type: "doc" | "sheet" | "slide" | "pdf" | "image" | "other";
  lastEdited: string;
  owner: string;
  shared: boolean;
  sharedWith?: number;
  size: string;
  description: string;
  thumbnail: string;
};

const documents: Document[] = [
  {
    id: 1,
    title: "ATLAS Strateji Raporu 2026",
    type: "doc",
    lastEdited: "2 saat önce",
    owner: "Ahmet Yılmaz",
    shared: true,
    sharedWith: 12,
    size: "2.4 MB",
    description: "Kurumsal vizyon, hedefler ve büyüme stratejisi",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400",
  },
  {
    id: 2,
    title: "Q1 Satış Verileri",
    type: "sheet",
    lastEdited: "5 saat önce",
    owner: "Ayşe Demir",
    shared: true,
    sharedWith: 8,
    size: "1.2 MB",
    description: "2026 birinci çeyrek satış analizi ve tahminler",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
  },
  {
    id: 3,
    title: "Ürün Tanıtım Sunumu",
    type: "slide",
    lastEdited: "1 gün önce",
    owner: "Mehmet Can",
    shared: false,
    size: "8.5 MB",
    description: "Yeni ürün özellikleri ve roadmap sunumu",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
  },
  {
    id: 4,
    title: "Güvenlik Politikası",
    type: "pdf",
    lastEdited: "2 gün önce",
    owner: "Zeynep Kaya",
    shared: true,
    sharedWith: 45,
    size: "892 KB",
    description: "Bilgi güvenliği standartları ve prosedürler",
    thumbnail: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?w=400",
  },
  {
    id: 5,
    title: "API Dokümantasyonu",
    type: "doc",
    lastEdited: "3 gün önce",
    owner: "Can Yıldız",
    shared: true,
    sharedWith: 23,
    size: "3.1 MB",
    description: "RESTful API endpoints ve kullanım örnekleri",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400",
  },
  {
    id: 6,
    title: "Kullanıcı Eğitim Materyali",
    type: "slide",
    lastEdited: "5 gün önce",
    owner: "Selin Özkan",
    shared: false,
    size: "12.3 MB",
    description: "Yeni kullanıcılar için onboarding sunumu",
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400",
  },
  {
    id: 7,
    title: "Bütçe Planlaması 2026",
    type: "sheet",
    lastEdited: "1 hafta önce",
    owner: "Ali Aksoy",
    shared: true,
    sharedWith: 6,
    size: "2.8 MB",
    description: "Yıllık bütçe dağılımı ve harcama takibi",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
  },
  {
    id: 8,
    title: "Müşteri Geri Bildirimleri",
    type: "doc",
    lastEdited: "1 hafta önce",
    owner: "Elif Şahin",
    shared: false,
    size: "1.5 MB",
    description: "Anket sonuçları ve analiz notları",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
  },
  {
    id: 9,
    title: "Proje Zaman Çizelgesi",
    type: "pdf",
    lastEdited: "2 hafta önce",
    owner: "Burak Çelik",
    shared: true,
    sharedWith: 15,
    size: "654 KB",
    description: "Gantt chart ve milestone takip dokümanı",
    thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400",
  },
  {
    id: 10,
    title: "Pazarlama Kampanya Raporu",
    type: "slide",
    lastEdited: "2 hafta önce",
    owner: "Deniz Aydın",
    shared: true,
    sharedWith: 19,
    size: "15.7 MB",
    description: "Dijital kampanya metrikleri ve ROI analizi",
    thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400",
  },
];

const menuItems = [
  { name: "Tüm Dokümanlar", icon: DocumentTextIcon, count: 10, active: true },
  { name: "Son Düzenlenenler", icon: ClockIcon, count: null, active: false },
  { name: "Benimle Paylaşılan", icon: UserGroupIcon, count: 7, active: false },
  { name: "Yıldızlılar", icon: StarIcon, count: 3, active: false },
  { name: "Çöp Kutusu", icon: TrashIcon, count: 2, active: false },
];

const documentTypes = [
  { name: "Tümü", count: 10, active: true },
  { name: "Doküman", icon: DocumentIcon, count: 3 },
  { name: "Tablo", icon: TableCellsIcon, count: 2 },
  { name: "Sunum", icon: PresentationChartBarIcon, count: 3 },
  { name: "PDF", icon: DocumentChartBarIcon, count: 2 },
];

export default function DokumanlarPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3, 5]));
  const [selectedType, setSelectedType] = useState("Tümü");

  const getDocumentIcon = (type: Document["type"]) => {
    switch (type) {
      case "doc":
        return DocumentIcon;
      case "sheet":
        return TableCellsIcon;
      case "slide":
        return PresentationChartBarIcon;
      case "pdf":
        return DocumentChartBarIcon;
      case "image":
        return PhotoIcon;
      default:
        return ArchiveBoxIcon;
    }
  };

  const getDocumentColor = (type: Document["type"]) => {
    switch (type) {
      case "doc":
        return "text-blue-600 bg-blue-50";
      case "sheet":
        return "text-green-600 bg-green-50";
      case "slide":
        return "text-orange-600 bg-orange-50";
      case "pdf":
        return "text-red-600 bg-red-50";
      case "image":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-slate-50/50 overflow-hidden">
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md">
              <DocumentTextIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Dokümanlar</span>
          </Link>
        </div>

        {/* New Document Button */}
        <div className="border-b border-slate-200 p-4">
          <button className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni Doküman</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 border-b border-slate-200 px-3 py-3">
          {menuItems.map(({ name, icon: Icon, count, active }) => (
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

        {/* Document Types */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Doküman Tipleri
          </h3>
          <div className="space-y-1">
            {documentTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.name}
                  onClick={() => setSelectedType(type.name)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    selectedType === type.name
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="flex-1 text-left">{type.name}</span>
                  {type.count && (
                    <span className="text-xs text-slate-400">{type.count}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Storage Info */}
          <div className="mt-6 rounded-lg bg-slate-100 p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-600">Depolama</span>
              <span className="font-semibold text-slate-900">48.5 GB / 100 GB</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[48.5%] rounded-full bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c]"></div>
            </div>
            <p className="mt-2 text-xs text-slate-500">51.5 GB alan mevcut</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-xl">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Doküman ara..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded p-1.5 transition ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded p-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Squares2X2Icon className="h-4 w-4" />
                </button>
              </div>

              <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
                <FunnelIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Documents List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Tüm Dokümanlar ({filteredDocuments.length})
            </h2>
            <p className="text-sm text-slate-500">Son güncelleme: Bugün, 14:32</p>
          </div>

          {viewMode === "list" ? (
            <div className="space-y-2">
              {filteredDocuments.map((doc) => {
                const Icon = getDocumentIcon(doc.type);
                const isFavorited = favorites.has(doc.id);

                return (
                  <div
                    key={doc.id}
                    className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-md"
                  >
                    {/* Document Icon */}
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${getDocumentColor(doc.type)}`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Document Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 truncate">{doc.title}</h3>
                        {doc.shared && (
                          <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                            <UserGroupIcon className="h-3 w-3" />
                            {doc.sharedWith}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 truncate">{doc.description}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                        <span>{doc.owner}</span>
                        <span>•</span>
                        <span>{doc.lastEdited}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(doc.id)}
                        className={`rounded-lg p-2 transition ${
                          isFavorited ? "text-yellow-500" : "text-slate-300 opacity-0 group-hover:opacity-100 hover:text-yellow-500"
                        }`}
                      >
                        {isFavorited ? (
                          <StarSolidIcon className="h-5 w-5" />
                        ) : (
                          <StarIcon className="h-5 w-5" />
                        )}
                      </button>
                      <button className="rounded-lg p-2 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-600">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDocuments.map((doc) => {
                const Icon = getDocumentIcon(doc.type);
                const isFavorited = favorites.has(doc.id);

                return (
                  <div
                    key={doc.id}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-lg"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={doc.thumbnail}
                        alt={doc.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                      <div className={`absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg ${getDocumentColor(doc.type)} shadow-md`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <button
                        onClick={() => toggleFavorite(doc.id)}
                        className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 backdrop-blur-sm transition hover:bg-white"
                      >
                        {isFavorited ? (
                          <StarSolidIcon className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <StarIcon className="h-4 w-4 text-slate-600" />
                        )}
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="mb-1 font-semibold text-slate-900 line-clamp-1">{doc.title}</h3>
                      <p className="mb-2 text-xs text-slate-500 line-clamp-2">{doc.description}</p>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{doc.owner}</span>
                        {doc.shared && (
                          <span className="flex items-center gap-1">
                            <UserGroupIcon className="h-3 w-3" />
                            {doc.sharedWith}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 text-xs text-slate-400">{doc.lastEdited}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
