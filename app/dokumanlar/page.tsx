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
  ArrowDownTrayIcon,
  ShareIcon,
  XMarkIcon,
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
  pdfUrl?: string;
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
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
    pdfUrl: "https://calibre-ebook.com/downloads/demos/demo.docx",
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
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
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
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
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
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3, 5]));
  const [selectedType, setSelectedType] = useState("Tümü");
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Tüm Dokümanlar");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

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
    
    // Filter by menu
    let matchesMenu = true;
    if (selectedMenu === "Benimle Paylaşılan") {
      matchesMenu = doc.shared;
    } else if (selectedMenu === "Yıldızlılar") {
      matchesMenu = favorites.has(doc.id);
    } else if (selectedMenu === "Son Düzenlenenler") {
      matchesMenu = doc.lastEdited.includes("saat") || doc.lastEdited.includes("gün");
    }
    
    // Filter by type
    let matchesType = true;
    if (selectedType !== "Tümü") {
      const typeMap: Record<string, Document["type"][]> = {
        "Doküman": ["doc"],
        "Tablo": ["sheet"],
        "Sunum": ["slide"],
        "PDF": ["pdf"],
      };
      const allowedTypes = typeMap[selectedType];
      if (allowedTypes) {
        matchesType = allowedTypes.includes(doc.type);
      }
    }
    
    return matchesSearch && matchesMenu && matchesType;
  });

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
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white overflow-hidden transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
              <DocumentTextIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-black italic bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] bg-clip-text text-transparent">ATLAS Dokümanlar</span>
          </Link>
        </div>

        {/* New Document Button */}
        <div className="border-b border-slate-200 p-4">
          <button 
            onClick={() => setShowNewDocModal(true)}
            className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni Doküman</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 border-b border-slate-200 px-3 py-3">
          {menuItems.map(({ name, icon: Icon, count, active }) => (
            <button
              key={name}
              onClick={() => setSelectedMenu(name)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                selectedMenu === name
                  ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-lg"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1 text-left">{name}</span>
              {count && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    selectedMenu === name ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
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
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                    selectedType === type.name
                      ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white font-semibold shadow-md"
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
        <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="relative flex-1 max-w-xl">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Doküman ara..."
                  className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#2d4a7c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg p-1.5 transition ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg p-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md"
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
              {selectedMenu} ({filteredDocuments.length})
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
                    onClick={() => setSelectedDocument(doc)}
                    className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-md cursor-pointer"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(doc.id);
                        }}
                        className={`rounded-lg p-2 transition ${
                          isFavorited ? "text-yellow-500" : "text-slate-300 opacity-0 group-hover:opacity-100 hover:text-yellow-500"
                        }`}
                        title={isFavorited ? "Yıldızdan kaldır" : "Yıldızla"}
                      >
                        {isFavorited ? (
                          <StarSolidIcon className="h-5 w-5" />
                        ) : (
                          <StarIcon className="h-5 w-5" />
                        )}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`${doc.title} paylaşılıyor...`);
                        }}
                        className="rounded-lg p-2 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-blue-50 hover:text-blue-600"
                        title="Paylaş"
                      >
                        <ShareIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`${doc.title} indiriliyor...`);
                        }}
                        className="rounded-lg p-2 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-green-50 hover:text-green-600"
                        title="İndir"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(doc.id);
                        }}
                        className="rounded-lg p-2 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                        title="Sil"
                      >
                        <TrashIcon className="h-5 w-5" />
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
                    onClick={() => setSelectedDocument(doc)}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-lg cursor-pointer"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(doc.id);
                        }}
                        className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 backdrop-blur-sm transition hover:bg-white"
                      >
                        {isFavorited ? (
                          <StarSolidIcon className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <StarIcon className="h-4 w-4 text-slate-600" />
                        )}
                      </button>
                      
                      {/* Hover Actions Overlay */}
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`${doc.title} paylaşılıyor...`);
                          }}
                          className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition hover:bg-white hover:scale-110"
                          title="Paylaş"
                        >
                          <ShareIcon className="h-4 w-4 text-slate-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`${doc.title} indiriliyor...`);
                          }}
                          className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition hover:bg-white hover:scale-110"
                          title="İndir"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4 text-slate-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(doc.id);
                          }}
                          className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition hover:bg-white hover:scale-110"
                          title="Sil"
                        >
                          <TrashIcon className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
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

      {/* New Document Modal */}
      {showNewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Yeni Doküman Oluştur</h2>
              <button
                onClick={() => setShowNewDocModal(false)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  alert("Yeni doküman oluşturuluyor...");
                  setShowNewDocModal(false);
                }}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-blue-500 hover shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <DocumentIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Doküman</h3>
                  <p className="text-sm text-slate-500">Metin belgesi oluştur</p>
                </div>
              </button>

              <button
                onClick={() => {
                  alert("Yeni tablo oluşturuluyor...");
                  setShowNewDocModal(false);
                }}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-green-500 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <TableCellsIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Tablo</h3>
                  <p className="text-sm text-slate-500">Excel benzeri hesap çizelgesi</p>
                </div>
              </button>

              <button
                onClick={() => {
                  alert("Yeni sunum oluşturuluyor...");
                  setShowNewDocModal(false);
                }}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-orange-500 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <PresentationChartBarIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Sunum</h3>
                  <p className="text-sm text-slate-500">Slayt tabanlı sunum</p>
                </div>
              </button>

              <button
                onClick={() => {
                  alert("Dosya yükleme başlatılıyor...");
                  setShowNewDocModal(false);
                }}
                className="group flex w-full items-center gap-4 rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-purple-500 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <FolderIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Dosya Yükle</h3>
                  <p className="text-sm text-slate-500">Bilgisayardan dosya ekle</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] rounded-2xl bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getDocumentColor(selectedDocument.type)}`}>
                  {(() => {
                    const Icon = getDocumentIcon(selectedDocument.type);
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{selectedDocument.title}</h3>
                  <p className="text-sm text-slate-500">{selectedDocument.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedDocument.pdfUrl && (
                  <a
                    href={selectedDocument.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                  >
                    Yeni Sekmede Aç
                  </a>
                )}
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden bg-slate-50">
              {selectedDocument.pdfUrl ? (
                <div className="h-full w-full">
                  {selectedDocument.type === "pdf" ? (
                    <iframe
                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedDocument.pdfUrl)}&embedded=true`}
                      className="h-full w-full border-0"
                      title={selectedDocument.title}
                    />
                  ) : selectedDocument.type === "doc" ? (
                    <div className="h-full overflow-auto p-8">
                      <div className="mx-auto max-w-4xl rounded-xl bg-white p-12 shadow-lg">
                        <h1 className="mb-6 text-3xl font-bold text-slate-900">{selectedDocument.title}</h1>
                        <div className="prose prose-slate max-w-none">
                          <p className="text-slate-600 leading-relaxed">
                            {selectedDocument.description}
                          </p>
                          <h2 className="mt-8 text-2xl font-bold text-slate-900">Giriş</h2>
                          <p className="text-slate-600 leading-relaxed">
                            Bu doküman, {selectedDocument.title.toLowerCase()} hakkında detaylı bilgiler içermektedir. 
                            ATLAS platformu üzerinde oluşturulmuş ve {selectedDocument.owner} tarafından hazırlanmıştır.
                          </p>
                          <h2 className="mt-8 text-2xl font-bold text-slate-900">İçerik</h2>
                          <p className="text-slate-600 leading-relaxed">
                            Doküman içeriği burada görüntülenmektedir. Bu bir demo görünümdür ve gerçek doküman içeriği 
                            yüklendiğinde burada tam olarak gösterilecektir.
                          </p>
                          <ul className="list-disc pl-6 text-slate-600">
                            <li>Detaylı analiz ve raporlar</li>
                            <li>Stratejik öneriler ve eylem planları</li>
                            <li>Veri tabloları ve grafikler</li>
                            <li>Sonuç ve değerlendirmeler</li>
                          </ul>
                          <h2 className="mt-8 text-2xl font-bold text-slate-900">Sonuç</h2>
                          <p className="text-slate-600 leading-relaxed">
                            Bu doküman ATLAS platformunda düzenlenebilir ve paylaşılabilir formattadır.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : selectedDocument.type === "sheet" ? (
                    <div className="h-full overflow-auto p-8">
                      <div className="mx-auto max-w-6xl">
                        <div className="mb-4 rounded-xl bg-white p-4 shadow-lg">
                          <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-slate-900">{selectedDocument.title}</h1>
                            <div className="flex gap-2">
                              <button className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600">
                                Excel'e Aktar
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-slate-100">
                                  <th className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-900">Ay</th>
                                  <th className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-900">Satış</th>
                                  <th className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-900">Gelir</th>
                                  <th className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-900">Büyüme</th>
                                  <th className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-900">Hedef</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="hover:bg-slate-50">
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">Ocak</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">1,234</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">$456,789</td>
                                  <td className="border border-slate-300 px-4 py-3 text-green-600 font-semibold">+12%</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">$500,000</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">Şubat</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">1,567</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">$523,456</td>
                                  <td className="border border-slate-300 px-4 py-3 text-green-600 font-semibold">+15%</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">$550,000</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">Mart</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">1,890</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">$678,901</td>
                                  <td className="border border-slate-300 px-4 py-3 text-green-600 font-semibold">+21%</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-700">$600,000</td>
                                </tr>
                                <tr className="bg-slate-100 font-bold">
                                  <td className="border border-slate-300 px-4 py-3 text-slate-900">Toplam</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-900">4,691</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-900">$1,659,146</td>
                                  <td className="border border-slate-300 px-4 py-3 text-green-600">+16%</td>
                                  <td className="border border-slate-300 px-4 py-3 text-slate-900">$1,650,000</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="border-t border-slate-300 p-4 text-sm text-slate-600">
                            <p>💡 <strong>Not:</strong> Bu bir demo görünümdür. Gerçek veri yüklendiğinde tüm tablolar ve grafikler burada görüntülenecektir.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selectedDocument.type === "slide" ? (
                    <div className="h-full overflow-auto p-8">
                      <div className="mx-auto max-w-5xl space-y-6">
                        {/* Slide 1 */}
                        <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] p-12 shadow-2xl">
                          <div className="flex h-full flex-col items-center justify-center text-center text-white">
                            <h1 className="mb-4 text-5xl font-black">{selectedDocument.title}</h1>
                            <p className="text-xl opacity-90">{selectedDocument.description}</p>
                            <div className="mt-8 text-sm opacity-75">
                              {selectedDocument.owner} • {selectedDocument.lastEdited}
                            </div>
                          </div>
                        </div>
                        {/* Slide 2 */}
                        <div className="aspect-video overflow-hidden rounded-xl bg-white p-12 shadow-2xl">
                          <h2 className="mb-6 text-3xl font-bold text-slate-900">Temel Özellikler</h2>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="rounded-lg bg-blue-50 p-6">
                              <div className="mb-2 text-4xl">🚀</div>
                              <h3 className="mb-2 font-bold text-slate-900">Hızlı ve Güvenilir</h3>
                              <p className="text-sm text-slate-600">Yüksek performans ve güvenlik</p>
                            </div>
                            <div className="rounded-lg bg-green-50 p-6">
                              <div className="mb-2 text-4xl">💡</div>
                              <h3 className="mb-2 font-bold text-slate-900">Kolay Kullanım</h3>
                              <p className="text-sm text-slate-600">Sezgisel arayüz tasarımı</p>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-6">
                              <div className="mb-2 text-4xl">📊</div>
                              <h3 className="mb-2 font-bold text-slate-900">Detaylı Analiz</h3>
                              <p className="text-sm text-slate-600">Kapsamlı raporlama araçları</p>
                            </div>
                            <div className="rounded-lg bg-orange-50 p-6">
                              <div className="mb-2 text-4xl">🔒</div>
                              <h3 className="mb-2 font-bold text-slate-900">Tam Güvenlik</h3>
                              <p className="text-sm text-slate-600">Enterprise-grade koruma</p>
                            </div>
                          </div>
                        </div>
                        {/* Slide 3 */}
                        <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-12 shadow-2xl">
                          <div className="flex h-full flex-col items-center justify-center text-center text-white">
                            <h2 className="mb-6 text-4xl font-bold">Sonuç</h2>
                            <p className="mb-8 max-w-2xl text-xl opacity-90">
                              Bu sunum ATLAS platformunda oluşturulmuştur ve etkileşimli özellikler içerir.
                            </p>
                            <div className="text-sm opacity-75">
                              Slayt 3 / 3
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${getDocumentColor(selectedDocument.type)}`}>
                      {(() => {
                        const Icon = getDocumentIcon(selectedDocument.type);
                        return <Icon className="h-10 w-10" />;
                      })()}
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      {selectedDocument.title}
                    </h3>
                    <p className="mb-4 text-sm text-slate-600 max-w-md">
                      {selectedDocument.description}
                    </p>
                    <p className="text-sm text-slate-500">
                      Bu doküman tipinin önizlemesi mevcut değil.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                      <button
                        onClick={() => alert(`${selectedDocument.title} indiriliyor...`)}
                        className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-6 py-2.5 font-semibold text-white transition hover:shadow-lg"
                      >
                        İndir
                      </button>
                      <button
                        onClick={() => alert(`${selectedDocument.title} paylaşılıyor...`)}
                        className="rounded-lg border-2 border-slate-200 px-6 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Paylaş
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <span>{selectedDocument.owner}</span>
                  <span>•</span>
                  <span>{selectedDocument.lastEdited}</span>
                  <span>•</span>
                  <span>{selectedDocument.size}</span>
                </div>
                {selectedDocument.shared && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <UserGroupIcon className="h-4 w-4" />
                    <span>{selectedDocument.sharedWith} kişi ile paylaşılıyor</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-2 text-lg font-bold text-slate-900">Dokümanı Sil</h3>
            <p className="mb-6 text-sm text-slate-600">
              Bu dokümanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  alert("Doküman silindi!");
                  setShowDeleteConfirm(null);
                }}
                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 font-semibold text-white transition hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
