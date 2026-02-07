"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  CloudIcon,
  ClockIcon,
  StarIcon,
  TrashIcon,
  UsersIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  ListBulletIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  FolderIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ArchiveBoxIcon,
  ArrowDownTrayIcon,
  ArrowUpOnSquareIcon,
  PencilIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid, FolderIcon as FolderIconSolid } from "@heroicons/react/24/solid";

type FileItem = {
  id: number;
  name: string;
  type: "folder" | "document" | "image" | "video" | "audio" | "archive";
  size?: string;
  modified: string;
  owner: string;
  starred: boolean;
  shared: boolean;
};

const files: FileItem[] = [
  {
    id: 1,
    name: "Projeler",
    type: "folder",
    modified: "Bugün, 14:30",
    owner: "Ben",
    starred: true,
    shared: false,
  },
  {
    id: 2,
    name: "2026 Stratejik Plan.docx",
    type: "document",
    size: "2.4 MB",
    modified: "Bugün, 10:15",
    owner: "Ben",
    starred: false,
    shared: true,
  },
  {
    id: 3,
    name: "Ekip Fotoğrafları",
    type: "folder",
    modified: "Dün, 16:20",
    owner: "Ben",
    starred: false,
    shared: true,
  },
  {
    id: 4,
    name: "Sunum_Q1_2026.pdf",
    type: "document",
    size: "5.8 MB",
    modified: "5 Şub",
    owner: "Ahmet Yılmaz",
    starred: true,
    shared: true,
  },
  {
    id: 5,
    name: "Promo_Video_Final.mp4",
    type: "video",
    size: "124 MB",
    modified: "4 Şub",
    owner: "Ben",
    starred: false,
    shared: false,
  },
  {
    id: 6,
    name: "Logo_Variants.zip",
    type: "archive",
    size: "8.2 MB",
    modified: "3 Şub",
    owner: "Ben",
    starred: false,
    shared: false,
  },
  {
    id: 7,
    name: "Kampanya_Gorsel_01.png",
    type: "image",
    size: "3.1 MB",
    modified: "2 Şub",
    owner: "Zeynep Demir",
    starred: false,
    shared: true,
  },
  {
    id: 8,
    name: "Arşiv 2025",
    type: "folder",
    modified: "1 Şub",
    owner: "Ben",
    starred: false,
    shared: false,
  },
  {
    id: 9,
    name: "Sözleşme_Taslak_v3.docx",
    type: "document",
    size: "1.2 MB",
    modified: "28 Oca",
    owner: "Ben",
    starred: true,
    shared: true,
  },
  {
    id: 10,
    name: "Podcast_Episode_12.mp3",
    type: "audio",
    size: "28.5 MB",
    modified: "25 Oca",
    owner: "Ben",
    starred: false,
    shared: false,
  },
];

const menuItems = [
  { name: "Dosyalarım", Icon: FolderIcon, active: true },
  { name: "Paylaşılanlar", Icon: UsersIcon, active: false },
  { name: "Son Kullanılan", Icon: ClockIcon, active: false },
  { name: "Yıldızlı", Icon: StarIcon, active: false },
  { name: "Çöp Kutusu", Icon: TrashIcon, active: false },
  { name: "Depolama", Icon: CloudIcon, active: false },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return FolderIconSolid;
    case "document":
      return DocumentTextIcon;
    case "image":
      return PhotoIcon;
    case "video":
      return VideoCameraIcon;
    case "audio":
      return MusicalNoteIcon;
    case "archive":
      return ArchiveBoxIcon;
    default:
      return DocumentTextIcon;
  }
};

const getFileColor = (type: string) => {
  switch (type) {
    case "folder":
      return "text-blue-600";
    case "document":
      return "text-blue-500";
    case "image":
      return "text-green-500";
    case "video":
      return "text-red-500";
    case "audio":
      return "text-purple-500";
    case "archive":
      return "text-orange-500";
    default:
      return "text-slate-500";
  }
};

const getFileBg = (type: string) => {
  switch (type) {
    case "folder":
      return "bg-blue-50";
    case "document":
      return "bg-blue-50";
    case "image":
      return "bg-green-50";
    case "video":
      return "bg-red-50";
    case "audio":
      return "bg-purple-50";
    case "archive":
      return "bg-orange-50";
    default:
      return "bg-slate-50";
  }
};

export default function DrivePage() {
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [starredFiles, setStarredFiles] = useState<number[]>(
    files.filter((f) => f.starred).map((f) => f.id)
  );
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSelect = (id: number) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredFiles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((f) => f.id));
    }
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
              <CloudIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Drive</span>
          </Link>
        </div>

        {/* New Button */}
        <div className="p-4">
          <button className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {menuItems.map(({ name, Icon, active }) => (
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
            </button>
          ))}
        </nav>

        {/* Storage Info */}
        <div className="border-t border-slate-200 p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Depolama</span>
              <span className="font-medium text-slate-900">12.4 GB / 50 GB</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-700"
                style={{ width: "24.8%" }}
              />
            </div>
            <button className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50">
              Depolama Satın Al
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-slate-900">Dosyalarım</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Dosyalarda ara..."
                className="w-72 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Settings */}
            <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
              <Cog6ToothIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-2.5">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedFiles.length === files.length}
              onChange={selectAll}
              className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 transition focus:ring-2 focus:ring-blue-500/20"
            />
            {selectedFiles.length > 0 && (
              <>
                <span className="text-sm font-medium text-slate-700">
                  {selectedFiles.length} seçili
                </span>
                <div className="ml-2 flex gap-1">
                  <button className="rounded p-1.5 text-slate-600 transition hover:bg-slate-200">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                  <button className="rounded p-1.5 text-slate-600 transition hover:bg-slate-200">
                    <ArrowUpOnSquareIcon className="h-5 w-5" />
                  </button>
                  <button className="rounded p-1.5 text-slate-600 transition hover:bg-slate-200">
                    <StarIcon className="h-5 w-5" />
                  </button>
                  <button className="rounded p-1.5 text-slate-600 transition hover:bg-slate-200">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Filter */}
            <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              <FunnelIcon className="h-4 w-4" />
              Filtrele
            </button>

            {/* View Mode Toggle */}
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded p-1.5 transition ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded p-1.5 transition ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Files List/Grid */}
        <div className="flex-1 overflow-y-auto bg-white">
          {viewMode === "list" ? (
            <div className="divide-y divide-slate-100">
              {/* Table Header */}
              <div className="flex items-center gap-4 bg-slate-50/80 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                <div className="w-10"></div>
                <div className="flex-1">Ad</div>
                <div className="w-32">Sahip</div>
                <div className="w-32">Değiştirilme</div>
                <div className="w-24 text-right">Boyut</div>
                <div className="w-10"></div>
              </div>

              {/* File Rows */}
              {files.map((file) => {
                const FileIcon = getFileIcon(file.type);
                const isSelected = selectedFiles.includes(file.id);
                const isStarred = starredFiles.includes(file.id);

                return (
                  <div
                    key={file.id}
                    className={`group flex cursor-pointer items-center gap-4 px-6 py-3 transition hover:bg-slate-50 ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                    onClick={() => toggleSelect(file.id)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 transition focus:ring-2 focus:ring-blue-500/20"
                    />
                    <div className="flex flex-1 items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getFileBg(file.type)}`}>
                        <FileIcon className={`h-5 w-5 ${getFileColor(file.type)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{file.name}</span>
                          {file.shared && (
                            <UsersIcon className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-32 text-sm text-slate-600">{file.owner}</div>
                    <div className="w-32 text-sm text-slate-600">{file.modified}</div>
                    <div className="w-24 text-right text-sm text-slate-600">
                      {file.size || "—"}
                    </div>
                    <div className="flex w-10 items-center justify-end gap-1">
                      <button
                        onClick={(e) => toggleStar(file.id, e)}
                        className="rounded p-1 opacity-0 transition hover:bg-slate-200 group-hover:opacity-100"
                      >
                        {isStarred ? (
                          <StarIconSolid className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <StarIcon className="h-5 w-5 text-slate-400" />
                        )}
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="rounded p-1 opacity-0 transition hover:bg-slate-200 group-hover:opacity-100"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5 text-slate-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {files.map((file) => {
                const FileIcon = getFileIcon(file.type);
                const isSelected = selectedFiles.includes(file.id);
                const isStarred = starredFiles.includes(file.id);

                return (
                  <div
                    key={file.id}
                    onClick={() => toggleSelect(file.id)}
                    className={`group relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-lg ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className={`flex h-40 items-center justify-center ${getFileBg(file.type)}`}>
                      <FileIcon className={`h-16 w-16 ${getFileColor(file.type)}`} />
                    </div>

                    {/* Info */}
                    <div className="border-t border-slate-100 p-3">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <h3 className="flex-1 text-sm font-medium text-slate-900 line-clamp-2">
                          {file.name}
                        </h3>
                        <button
                          onClick={(e) => toggleStar(file.id, e)}
                          className="shrink-0 rounded p-1 transition hover:bg-slate-100"
                        >
                          {isStarred ? (
                            <StarIconSolid className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <StarIcon className="h-4 w-4 text-slate-400 opacity-0 transition group-hover:opacity-100" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{file.modified}</span>
                        {file.size && (
                          <>
                            <span>•</span>
                            <span>{file.size}</span>
                          </>
                        )}
                      </div>
                      {file.shared && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                          <UsersIcon className="h-3.5 w-3.5" />
                          <span>Paylaşıldı</span>
                        </div>
                      )}
                    </div>

                    {/* Selection checkbox */}
                    <div className="absolute left-3 top-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className={`h-5 w-5 cursor-pointer rounded border-slate-300 bg-white text-blue-600 shadow-sm transition focus:ring-2 focus:ring-blue-500/20 ${
                          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>

                    {/* Context menu */}
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-3 top-3 rounded-lg bg-white p-1.5 opacity-0 shadow-sm transition hover:bg-slate-50 group-hover:opacity-100"
                    >
                      <EllipsisVerticalIcon className="h-4 w-4 text-slate-600" />
                    </button>
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
