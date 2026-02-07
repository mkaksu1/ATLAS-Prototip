"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlayCircleIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  FireIcon,
  ClockIcon,
  FolderIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Video = {
  id: number;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  uploadTime: string;
};

const categories = [
  { name: "Ana Sayfa", icon: HomeIcon },
  { name: "Trendler", icon: FireIcon },
  { name: "İzlenecekler", icon: ClockIcon },
  { name: "Kitaplık", icon: FolderIcon },
  { name: "Beğenilenler", icon: HeartIcon },
];

const trendingVideos: Video[] = [
  {
    id: 1,
    title: "ATLAS Dijital Ekosistem Tanıtımı - Türkiye'nin Milli Platformu",
    channel: "ATLAS Resmi Kanal",
    views: "125B",
    duration: "10:24",
    thumbnail: "from-blue-500 to-purple-600",
    uploadTime: "2 gün önce",
  },
  {
    id: 2,
    title: "Yapay Zeka ile Kod Yazmak - ATLAS.AI ile Python Programlama",
    channel: "Teknoloji Dünyası",
    views: "89B",
    duration: "15:42",
    thumbnail: "from-fuchsia-500 to-pink-600",
    uploadTime: "1 hafta önce",
  },
  {
    id: 3,
    title: "ATLAS Pay Kullanım Rehberi - Dijital Cüzdan Nasıl Kullanılır?",
    channel: "Finans TV",
    views: "67B",
    duration: "8:15",
    thumbnail: "from-violet-500 to-purple-600",
    uploadTime: "3 gün önce",
  },
  {
    id: 4,
    title: "Türkiye'de Teknoloji Devrimi - Yerli Yazılımlar",
    channel: "Teknoloji Haberleri",
    views: "143B",
    duration: "12:30",
    thumbnail: "from-green-500 to-emerald-600",
    uploadTime: "5 gün önce",
  },
  {
    id: 5,
    title: "ATLAS ile Veri Güvenliği - Bulut Depolama Çözümleri",
    channel: "Siber Güvenlik",
    views: "54B",
    duration: "18:05",
    thumbnail: "from-blue-500 to-cyan-600",
    uploadTime: "1 gün önce",
  },
  {
    id: 6,
    title: "E-Ticaret'te Yeni Dönem - ATLAS Alışveriş Platformu",
    channel: "Dijital Ticaret",
    views: "96B",
    duration: "14:20",
    thumbnail: "from-orange-500 to-red-600",
    uploadTime: "4 gün önce",
  },
  {
    id: 7,
    title: "ATLAS Harita ile Konum Paylaşımı ve Navigasyon",
    channel: "Mobil Uygulamalar",
    views: "72B",
    duration: "9:45",
    thumbnail: "from-green-500 to-teal-600",
    uploadTime: "6 gün önce",
  },
  {
    id: 8,
    title: "FinansATLAS - Borsa ve Kripto Para Takibi",
    channel: "Yatırım Akademisi",
    views: "108B",
    duration: "20:15",
    thumbnail: "from-amber-500 to-yellow-600",
    uploadTime: "2 gün önce",
  },
  {
    id: 9,
    title: "ATLAS Chat - Güvenli Mesajlaşma Uygulaması",
    channel: "Sosyal Medya Rehberi",
    views: "81B",
    duration: "7:30",
    thumbnail: "from-emerald-500 to-green-600",
    uploadTime: "1 hafta önce",
  },
  {
    id: 10,
    title: "Dijital Dönüşüm Hikayeleri - ATLAS ile Değişen İşletmeler",
    channel: "İş Dünyası",
    views: "115B",
    duration: "16:50",
    thumbnail: "from-indigo-500 to-blue-600",
    uploadTime: "3 gün önce",
  },
  {
    id: 11,
    title: "ATLAS Dokümanlar - Bulutta Dosya Yönetimi",
    channel: "Verimlilik İpuçları",
    views: "62B",
    duration: "11:25",
    thumbnail: "from-purple-500 to-pink-600",
    uploadTime: "5 gün önce",
  },
  {
    id: 12,
    title: "Video Konferans Eğitimi - ATLAS Toplantı Rehberi",
    channel: "Uzaktan Çalışma",
    views: "93B",
    duration: "13:40",
    thumbnail: "from-indigo-500 to-purple-600",
    uploadTime: "4 gün önce",
  },
];

export default function VideoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Ana Sayfa");

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
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 shadow-lg">
              <PlayCircleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-black italic bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                ATLAS
              </p>
              <p className="text-xs font-semibold text-slate-600">Video</p>
            </div>
          </Link>
        </div>

        {/* Categories */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                  selectedCategory === category.name
                    ? "bg-rose-50 text-rose-600 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <category.icon className="h-5 w-5" />
                {category.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Info */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 p-4">
            <p className="text-xs text-slate-700">
              ATLAS Video - Türkiye'nin yerli video platformu. Güvenli, hızlı ve reklamsız içerik deneyimi.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative flex items-center rounded-full border-2 border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Video ara..."
                  className="ml-3 flex-1 border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Video Grid */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              {selectedCategory === "Ana Sayfa" ? "Önerilen Videolar" : selectedCategory}
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trendingVideos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer rounded-xl bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Thumbnail */}
                  <div className={`relative aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br ${video.thumbnail}`}>
                    <div className="flex h-full items-center justify-center">
                      <PlayCircleIcon className="h-16 w-16 text-white opacity-80 transition group-hover:scale-110 group-hover:opacity-100" />
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-semibold text-white">
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-rose-600">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-600">{video.channel}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <span>{video.views} görüntüleme</span>
                      <span>•</span>
                      <span>{video.uploadTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
