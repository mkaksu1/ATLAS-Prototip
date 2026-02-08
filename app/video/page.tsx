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
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  const getFilteredVideos = () => {
    switch (selectedCategory) {
      case "Trendler":
        return trendingVideos.slice(0, 8).sort((a, b) => parseInt(b.views) - parseInt(a.views));
      case "İzlenecekler":
        return trendingVideos.slice(0, 6);
      case "Kitaplık":
        return trendingVideos.slice(0, 10);
      case "Beğenilenler":
        return trendingVideos.slice(2, 8);
      default:
        return trendingVideos;
    }
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case "Ana Sayfa":
        return "Önerilen Videolar";
      case "Trendler":
        return "Trend Videolar";
      case "İzlenecekler":
        return "İzleme Listem";
      case "Kitaplık":
        return "Kitaplığım";
      case "Beğenilenler":
        return "Beğendiğim Videolar";
      default:
        return selectedCategory;
    }
  };

  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case "Ana Sayfa":
        return "Sizin için seçilmiş en popüler içerikler";
      case "Trendler":
        return "Şu anda en çok izlenen videolar";
      case "İzlenecekler":
        return "Daha sonra izlemek için kaydettiğiniz videolar";
      case "Kitaplık":
        return "Tüm videolarınız ve oynatma listeleriniz";
      case "Beğenilenler":
        return "Beğendiğiniz tüm videolar";
      default:
        return "";
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
            {/* Category Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900">
                {getCategoryTitle()}
              </h2>
              <p className="mt-2 text-slate-600">{getCategoryDescription()}</p>
            </div>

            {/* Empty State for Watch Later */}
            {selectedCategory === "İzlenecekler" && getFilteredVideos().length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <ClockIcon className="h-16 w-16 text-slate-300" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  İzleme listeniz boş
                </h3>
                <p className="mt-2 text-slate-600">
                  Daha sonra izlemek istediğiniz videoları buraya ekleyin
                </p>
              </div>
            )}

            {/* Category Stats */}
            {(selectedCategory === "Kitaplık" || selectedCategory === "Beğenilenler") && (
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Toplam Video</p>
                  <p className="mt-1 text-2xl font-bold text-rose-600">
                    {getFilteredVideos().length}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-600">İzlenme Süresi</p>
                  <p className="mt-1 text-2xl font-bold text-rose-600">24sa 32dk</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-600">Kaydedilen</p>
                  <p className="mt-1 text-2xl font-bold text-rose-600">Bu Ay</p>
                </div>
              </div>
            )}
            
            {/* Video Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {getFilteredVideos().map((video) => (
                <div
                  key={video.id}
                  onClick={() => setPlayingVideo(video)}
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
                    {/* Category Badge */}
                    {selectedCategory === "Beğenilenler" && (
                      <div className="absolute top-2 right-2 rounded-full bg-rose-500 p-1.5">
                        <HeartIcon className="h-4 w-4 fill-white text-white" />
                      </div>
                    )}
                    {selectedCategory === "İzlenecekler" && (
                      <div className="absolute top-2 right-2 rounded-full bg-blue-500 p-1.5">
                        <ClockIcon className="h-4 w-4 text-white" />
                      </div>
                    )}
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
                    
                    {/* Action Buttons */}
                    {selectedCategory !== "Ana Sayfa" && (
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">
                          Oynat
                        </button>
                        <button className="rounded-lg bg-slate-100 p-1.5 text-slate-700 transition hover:bg-slate-200">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-white">
          <div className="w-full max-w-7xl p-4">
            {/* Close Button */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setPlayingVideo(null)}
                className="rounded-lg bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main Video Section */}
              <div className="lg:col-span-2">
                {/* Video Player */}
                <div className={`relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br ${playingVideo.thumbnail} shadow-xl`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm transition hover:bg-white/30">
                      <PlayCircleIcon className="h-20 w-20 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/30">
                      <div className="h-full w-1/3 bg-rose-500" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-white">
                      <span>4:32 / {playingVideo.duration}</span>
                      <div className="flex gap-2">
                        <button className="rounded p-1 hover:bg-white/20">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                          </svg>
                        </button>
                        <button className="rounded p-1 hover:bg-white/20">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="mt-4">
                  <h1 className="text-xl font-bold text-slate-900">{playingVideo.title}</h1>
                  
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-sm font-bold text-white">
                        {playingVideo.channel[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{playingVideo.channel}</p>
                        <p className="text-sm text-slate-600">125B abone</p>
                      </div>
                      <button className="rounded-full bg-rose-600 px-6 py-2 font-semibold text-white transition hover:bg-rose-700">
                        Abone Ol
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                        <HeartIcon className="h-5 w-5" />
                        1.2B
                      </button>
                      <button className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                        <ClockIcon className="h-5 w-5" />
                        Kaydet
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-4 text-sm font-semibold text-slate-900">
                      <span>{playingVideo.views} görüntüleme</span>
                      <span>•</span>
                      <span>{playingVideo.uploadTime}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {playingVideo.title} hakkında detaylı bilgi ve açıklama. ATLAS Video platformunda güvenli ve kaliteli içerikler izleyin.
                      Bu video ATLAS ekosistemi hakkında önemli bilgiler içermektedir. Dijital dönüşüm sürecinde Türkiye'nin milli platformu ATLAS ile tanışın.
                    </p>
                    <button className="mt-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
                      Daha fazla göster
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-900">42 Yorum</h3>
                  
                  {/* Comment Input */}
                  <div className="mt-4 flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                      AT
                    </div>
                    <input
                      type="text"
                      placeholder="Yorum ekle..."
                      className="flex-1 border-b-2 border-slate-200 bg-transparent px-2 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                    />
                  </div>

                  {/* Comments List */}
                  <div className="mt-6 space-y-6">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
                        TH
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">Teknoloji Haberleri</p>
                          <p className="text-xs text-slate-500">2 gün önce</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-700">Harika bir içerik! ATLAS platformu gerçekten çok başarılı 👏</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-600">
                          <button className="flex items-center gap-1 transition hover:text-slate-900">
                            <HeartIcon className="h-4 w-4" />
                            <span>24</span>
                          </button>
                          <button className="font-semibold transition hover:text-slate-900">Yanıtla</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-sm font-bold text-white">
                        FA
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">Finans Analisti</p>
                          <p className="text-xs text-slate-500">1 gün önce</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-700">Türkiye'nin dijital dönüşümünde önemli bir adım 🚀</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-600">
                          <button className="flex items-center gap-1 transition hover:text-slate-900">
                            <HeartIcon className="h-4 w-4" />
                            <span>18</span>
                          </button>
                          <button className="font-semibold transition hover:text-slate-900">Yanıtla</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-sm font-bold text-white">
                        DD
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">Dijital Dönüşüm</p>
                          <p className="text-xs text-slate-500">5 saat önce</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-700">Bu videoyu izlemenizi şiddetle tavsiye ederim, çok faydalı bilgiler var!</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-600">
                          <button className="flex items-center gap-1 transition hover:text-slate-900">
                            <HeartIcon className="h-4 w-4" />
                            <span>31</span>
                          </button>
                          <button className="font-semibold transition hover:text-slate-900">Yanıtla</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Recommended Videos */}
              <div className="lg:col-span-1">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Önerilen Videolar</h3>
                <div className="space-y-3">
                  {trendingVideos.filter(v => v.id !== playingVideo.id).slice(0, 8).map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setPlayingVideo(video)}
                      className="group flex cursor-pointer gap-3 rounded-lg transition hover:bg-slate-50 p-2"
                    >
                      <div className={`relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${video.thumbnail} shadow-sm`}>
                        <div className="flex h-full items-center justify-center">
                          <PlayCircleIcon className="h-10 w-10 text-white opacity-0 transition group-hover:opacity-90" />
                        </div>
                        <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-rose-600">
                          {video.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-600">{video.channel}</p>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
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
          </div>
        </div>
      )}
    </div>
  );
}
