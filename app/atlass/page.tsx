"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CameraIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  FilmIcon,
  UserIcon,
  Bars3Icon,
  MusicalNoteIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

type Post = {
  id: number;
  username: string;
  avatar: string;
  image: string;
  likes: number;
  caption: string;
  time: string;
  liked?: boolean;
};

type Reel = {
  id: number;
  username: string;
  avatar: string;
  gradient: string;
  caption: string;
  music: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
  saved?: boolean;
};

const gradients = [
  "from-pink-500 via-rose-500 to-orange-500",
  "from-purple-500 via-pink-500 to-red-500",
  "from-blue-500 via-purple-500 to-pink-500",
  "from-green-500 via-teal-500 to-cyan-500",
  "from-yellow-500 via-orange-500 to-red-500",
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-cyan-500 via-blue-500 to-purple-500",
  "from-red-500 via-pink-500 to-purple-500",
  "from-emerald-500 via-green-500 to-teal-500",
  "from-fuchsia-500 via-purple-500 to-violet-500",
  "from-amber-500 via-orange-500 to-pink-500",
  "from-lime-500 via-green-500 to-emerald-500",
];

const generateReels = (startId: number, count: number): Reel[] => {
  const usernames = ["atlas_official", "teknoloji_tr", "dijital_hayat", "yazilim_dev", "trend_konular", "viral_icerik", "kesfet_dunyasi", "atlas_kullanici"];
  const captions = [
    "ATLAS ile hayat daha kolay! 🚀 #ATLAS #Teknoloji",
    "Bu özelliği kesinlikle denemelisiniz! ✨",
    "Viral olacak içerik geliyor 🔥 #Keşfet #Trend",
    "Yapay zeka ile geleceği şekillendiriyoruz 🤖",
    "Muhteşem bir deneyim! #ATLASS #Sosyal",
    "Bugünün trendi! 🌟 Siz de katılın!",
    "İnanılmaz performans 📱 #Tech #Innovation",
    "Paylaşmayı unutmayın! ❤️ #Viral #Trending",
  ];
  const musics = [
    "Orijinal Ses - ATLAS",
    "Trend Müzik 🎵",
    "Viral Ses 2026",
    "Popular Song Mix",
    "ATLAS Official Sound",
    "Trending Audio",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    username: usernames[Math.floor(Math.random() * usernames.length)],
    avatar: gradients[Math.floor(Math.random() * gradients.length)],
    gradient: gradients[Math.floor(Math.random() * gradients.length)],
    caption: captions[Math.floor(Math.random() * captions.length)],
    music: musics[Math.floor(Math.random() * musics.length)],
    likes: Math.floor(Math.random() * 50000) + 1000,
    comments: Math.floor(Math.random() * 5000) + 100,
    shares: Math.floor(Math.random() * 2000) + 50,
  }));
};

const stories = [
  { username: "atlas_official", avatar: "from-blue-500 to-purple-600" },
  { username: "teknoloji", avatar: "from-green-500 to-emerald-600" },
  { username: "yazilim", avatar: "from-fuchsia-500 to-pink-600" },
  { username: "dijital", avatar: "from-amber-500 to-orange-600" },
  { username: "finans", avatar: "from-violet-500 to-purple-600" },
];

const feedPosts: Post[] = [
  {
    id: 1,
    username: "atlas_official",
    avatar: "from-blue-500 to-purple-600",
    image: "from-blue-400 to-purple-500",
    likes: 1248,
    caption: "ATLAS ekosistemi artık 15+ uygulama ile hizmetinizde! 🚀 #ATLAS #Teknoloji",
    time: "2 saat önce",
  },
  {
    id: 2,
    username: "teknoloji_tr",
    avatar: "from-green-500 to-emerald-600",
    image: "from-cyan-400 to-blue-500",
    likes: 892,
    caption: "Yapay zeka ile kod yazmak artık çok kolay! ATLAS.AI denemelisiniz ✨",
    time: "4 saat önce",
    liked: true,
  },
  {
    id: 3,
    username: "dijital_donusum",
    avatar: "from-fuchsia-500 to-pink-600",
    image: "from-purple-400 to-pink-500",
    likes: 2156,
    caption: "ATLAS Video platformu yayında! Türkiye'nin yerli video platformu 🎬",
    time: "6 saat önce",
  },
  {
    id: 4,
    username: "finans_pro",
    avatar: "from-amber-500 to-yellow-600",
    image: "from-orange-400 to-red-500",
    likes: 745,
    caption: "FinansATLAS ile piyasaları takip etmek çok kolay 📊📈 #Finans #Borsa",
    time: "8 saat önce",
  },
];

export default function AtlassPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState(feedPosts);
  const [currentView, setCurrentView] = useState<"home" | "explore" | "reels" | "messages" | "notifications" | "create" | "profile">("home");
  const [reels, setReels] = useState<Reel[]>(generateReels(1, 20));
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const reelsContainerRef = useRef<HTMLDivElement>(null);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleReelLike = (reelId: number) => {
    setReels(reels.map(reel => 
      reel.id === reelId 
        ? { ...reel, liked: !reel.liked, likes: reel.liked ? reel.likes - 1 : reel.likes + 1 }
        : reel
    ));
  };

  const handleReelSave = (reelId: number) => {
    setReels(reels.map(reel => 
      reel.id === reelId 
        ? { ...reel, saved: !reel.saved }
        : reel
    ));
  };

  const loadMoreReels = () => {
    const newReels = generateReels(reels.length + 1, 10);
    setReels([...reels, ...newReels]);
  };

  useEffect(() => {
    if (currentView === "reels" && reelsContainerRef.current) {
      const container = reelsContainerRef.current;
      
      const handleScroll = () => {
        const scrollPosition = container.scrollTop;
        const reelHeight = container.clientHeight;
        const newIndex = Math.round(scrollPosition / reelHeight);
        
        if (newIndex !== currentReelIndex) {
          setCurrentReelIndex(newIndex);
        }

        // Load more reels when near the end
        if (scrollPosition + reelHeight * 2 >= container.scrollHeight - reelHeight) {
          loadMoreReels();
        }
      };

      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentView, currentReelIndex, reels.length]);

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
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg">
              <CameraIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-black italic bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                ATLASS
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <button 
              onClick={() => setCurrentView("home")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                currentView === "home" 
                  ? "bg-pink-50 text-pink-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <HomeIcon className="h-6 w-6" />
              Ana Sayfa
            </button>
            <button 
              onClick={() => setCurrentView("explore")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                currentView === "explore" 
                  ? "bg-pink-50 text-pink-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
              Keşfet
            </button>
            <button 
              onClick={() => setCurrentView("reels")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                currentView === "reels" 
                  ? "bg-pink-50 text-pink-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FilmIcon className="h-6 w-6" />
              Reels
            </button>
            <button 
              onClick={() => setCurrentView("messages")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                currentView === "messages" 
                  ? "bg-pink-50 text-pink-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <ChatBubbleOvalLeftIcon className="h-6 w-6" />
              Mesajlar
            </button>
            <button 
              onClick={() => setCurrentView("notifications")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                currentView === "notifications" 
                  ? "bg-pink-50 text-pink-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <HeartIcon className="h-6 w-6" />
              Bildirimler
            </button>
            <button 
              onClick={() => setCurrentView("create")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                currentView === "create" 
                  ? "bg-pink-50 text-pink-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <PlusCircleIcon className="h-6 w-6" />
              Oluştur
            </button>
            <button 
              onClick={() => setCurrentView("profile")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                currentView === "profile" 
                  ? "bg-pink-50 text-pink-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <UserIcon className="h-6 w-6" />
              Profil
            </button>
          </div>
        </nav>

        {/* Info */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 p-4">
            <p className="text-xs text-slate-700">
              ATLASS - Anlarınızı paylaşın, keşfedin ve bağlantıda kalın. 📸✨
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <p className="text-xl font-black italic bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              ATLASS
            </p>
            <div className="w-10" />
          </div>
        </header>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          {/* Home View */}
          {currentView === "home" && (
            <div className="mx-auto max-w-2xl">
              {/* Stories */}
              <div className="border-b border-slate-200 bg-white p-4">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {stories.map((story) => (
                    <button key={story.username} className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 p-0.5">
                          <div className={`h-full w-full rounded-full bg-gradient-to-br ${story.avatar} border-2 border-white`} />
                        </div>
                      </div>
                      <p className="text-xs text-slate-700">{story.username}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div key={post.id} className="mb-4 border border-slate-200 bg-white">
                  {/* Post Header */}
                  <div className="flex items-center gap-3 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${post.avatar}`}>
                      <span className="text-sm font-bold text-white">{post.username[0].toUpperCase()}</span>
                    </div>
                    <p className="font-semibold text-slate-900">{post.username}</p>
                  </div>

                  {/* Post Image */}
                  <div className={`aspect-square bg-gradient-to-br ${post.image} flex items-center justify-center`}>
                    <CameraIcon className="h-16 w-16 text-white opacity-50" />
                  </div>

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="transition hover:scale-110"
                      >
                        {post.liked ? (
                          <HeartIconSolid className="h-7 w-7 text-rose-600" />
                        ) : (
                          <HeartIcon className="h-7 w-7 text-slate-900" />
                        )}
                      </button>
                      <button className="transition hover:scale-110">
                        <ChatBubbleOvalLeftIcon className="h-7 w-7 text-slate-900" />
                      </button>
                      <button className="transition hover:scale-110">
                        <PaperAirplaneIcon className="h-7 w-7 text-slate-900" />
                      </button>
                      <button className="ml-auto transition hover:scale-110">
                        <BookmarkIcon className="h-7 w-7 text-slate-900" />
                      </button>
                    </div>

                    <p className="mt-3 font-semibold text-slate-900">{post.likes.toLocaleString('tr-TR')} beğenme</p>
                    <p className="mt-2 text-sm text-slate-900">
                      <span className="font-semibold">{post.username}</span> {post.caption}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">{post.time}</p>
                  </div>

                  {/* Comment Input */}
                  <div className="border-t border-slate-200 p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Yorum ekle..."
                        className="flex-1 border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                      <button className="text-sm font-semibold text-cyan-600">
                        Gönder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reels View */}
          {currentView === "reels" && (
            <div 
              ref={reelsContainerRef}
              className="h-full overflow-y-scroll snap-y snap-mandatory bg-white"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {reels.map((reel, index) => (
                <div 
                  key={reel.id} 
                  className="relative h-full w-full snap-start snap-always flex items-center justify-center bg-white py-4"
                >
                  {/* Vertical Reel Container */}
                  <div className="relative h-full w-full max-w-[420px] mx-4">
                    {/* Reel Video Container with rounded corners and shadow */}
                    <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                      {/* Reel Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${reel.gradient} flex items-center justify-center`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <FilmIcon className="h-24 w-24 text-white opacity-20" />
                          </div>
                        </div>
                      </div>

                      {/* Reel Content Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-transparent to-slate-900/80">
                        {/* Top Bar */}
                        <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between z-10">
                          <div className="flex items-center gap-3">
                            <p className="text-white text-sm font-bold drop-shadow-lg">Reels</p>
                          </div>
                          <button className="rounded-full p-2 text-white backdrop-blur-xl bg-slate-900/20 transition hover:bg-slate-900/40">
                            <EllipsisHorizontalIcon className="h-6 w-6" />
                          </button>
                        </div>

                        {/* Right Side - Actions */}
                        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 z-10">
                          <button 
                            onClick={() => handleReelLike(reel.id)}
                            className="flex flex-col items-center gap-1.5 transition hover:scale-110 active:scale-95"
                          >
                            <div className="rounded-full bg-slate-900/20 backdrop-blur-md p-2.5">
                              {reel.liked ? (
                                <HeartIconSolid className="h-7 w-7 text-rose-500 drop-shadow-lg" />
                              ) : (
                                <HeartIcon className="h-7 w-7 text-white drop-shadow-lg" />
                              )}
                            </div>
                            <span className="text-xs font-bold text-white drop-shadow-lg">
                              {reel.likes > 1000 ? `${(reel.likes / 1000).toFixed(1)}B` : reel.likes}
                            </span>
                          </button>

                          <button className="flex flex-col items-center gap-1.5 transition hover:scale-110 active:scale-95">
                            <div className="rounded-full bg-slate-900/20 backdrop-blur-md p-2.5">
                              <ChatBubbleOvalLeftIcon className="h-7 w-7 text-white drop-shadow-lg" />
                            </div>
                            <span className="text-xs font-bold text-white drop-shadow-lg">
                              {reel.comments > 1000 ? `${(reel.comments / 1000).toFixed(1)}B` : reel.comments}
                            </span>
                          </button>

                          <button className="flex flex-col items-center gap-1.5 transition hover:scale-110 active:scale-95">
                            <div className="rounded-full bg-slate-900/20 backdrop-blur-md p-2.5">
                              <PaperAirplaneIcon className="h-7 w-7 text-white drop-shadow-lg" />
                            </div>
                            <span className="text-xs font-bold text-white drop-shadow-lg">
                              {reel.shares > 1000 ? `${(reel.shares / 1000).toFixed(1)}B` : reel.shares}
                            </span>
                          </button>

                          <button 
                            onClick={() => handleReelSave(reel.id)}
                            className="flex flex-col items-center gap-1.5 transition hover:scale-110 active:scale-95"
                          >
                            <div className="rounded-full bg-slate-900/20 backdrop-blur-md p-2.5">
                              {reel.saved ? (
                                <BookmarkIconSolid className="h-7 w-7 text-amber-400 drop-shadow-lg" />
                              ) : (
                                <BookmarkIcon className="h-7 w-7 text-white drop-shadow-lg" />
                              )}
                            </div>
                          </button>

                          <button className="transition hover:scale-110 active:scale-95">
                            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${reel.avatar} border-3 border-white shadow-lg ring-2 ring-white`} />
                          </button>
                        </div>

                        {/* Bottom Bar - Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
                          <div className="pr-20">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${reel.avatar} border-2 border-white shadow-lg`}>
                                <span className="text-sm font-bold text-white">{reel.username[0].toUpperCase()}</span>
                              </div>
                              <p className="font-bold text-white text-base drop-shadow-lg">{reel.username}</p>
                              <button className="rounded-full border-2 border-white px-5 py-1 text-xs font-bold text-white backdrop-blur-md bg-slate-900/20 transition hover:bg-white hover:text-pink-600 shadow-lg">
                                Takip Et
                              </button>
                            </div>
                            <p className="text-white text-sm mb-2.5 leading-relaxed drop-shadow-lg line-clamp-2">{reel.caption}</p>
                            <div className="flex items-center gap-2.5 text-white text-xs backdrop-blur-md bg-slate-900/20 rounded-full px-3 py-1.5 w-fit">
                              <MusicalNoteIcon className="h-4 w-4 animate-pulse" />
                              <p className="truncate font-medium">{reel.music}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Explore View */}
          {currentView === "explore" && (
            <div className="p-4">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">Keşfet</h2>
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`aspect-square bg-gradient-to-br ${gradients[i % gradients.length]} cursor-pointer transition hover:opacity-80`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages View */}
          {currentView === "messages" && (
            <div className="mx-auto max-w-4xl p-6">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Mesajlar</h2>
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <ChatBubbleOvalLeftIcon className="mx-auto h-16 w-16 text-slate-300" />
                <p className="mt-4 text-lg font-semibold text-slate-900">Mesajlarınız</p>
                <p className="mt-2 text-sm text-slate-500">
                  Arkadaşlarınızla fotoğraf ve video paylaşmak için mesaj gönderin.
                </p>
                <button className="mt-6 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700">
                  Mesaj Gönder
                </button>
              </div>
            </div>
          )}

          {/* Notifications View */}
          {currentView === "notifications" && (
            <div className="mx-auto max-w-2xl p-6">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Bildirimler</h2>
              <div className="space-y-4">
                {[
                  { user: "atlas_official", action: "gönderinizi beğendi", time: "5 dakika önce", avatar: "from-blue-500 to-purple-600" },
                  { user: "teknoloji_tr", action: "sizi takip etmeye başladı", time: "1 saat önce", avatar: "from-green-500 to-emerald-600" },
                  { user: "dijital_hayat", action: "gönderinize yorum yaptı", time: "3 saat önce", avatar: "from-fuchsia-500 to-pink-600" },
                  { user: "yazilim_dev", action: "gönderinizi paylaştı", time: "5 saat önce", avatar: "from-amber-500 to-yellow-600" },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${notif.avatar}`}>
                      <span className="text-sm font-bold text-white">{notif.user[0].toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">
                        <span className="font-semibold">{notif.user}</span> {notif.action}
                      </p>
                      <p className="text-xs text-slate-500">{notif.time}</p>
                    </div>
                    <button className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
                      Takip Et
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create View */}
          {currentView === "create" && (
            <div className="mx-auto max-w-2xl p-6">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Yeni Gönderi Oluştur</h2>
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
                <PlusCircleIcon className="mx-auto h-20 w-20 text-slate-300" />
                <p className="mt-4 text-lg font-semibold text-slate-900">Fotoğraf ve Video Ekle</p>
                <p className="mt-2 text-sm text-slate-500">
                  Bilgisayarınızdan veya telefonunuzdan içerik yükleyin
                </p>
                <button className="mt-6 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 px-8 py-3 text-sm font-bold text-white transition hover:scale-105">
                  Dosya Seç
                </button>
              </div>
            </div>
          )}

          {/* Profile View */}
          {currentView === "profile" && (
            <div className="mx-auto max-w-4xl p-6">
              <div className="mb-8 flex items-center gap-8">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white shadow-xl">
                  AT
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-2xl font-bold text-slate-900">atlas_user</h2>
                  <div className="mb-4 flex gap-6 text-sm">
                    <p><span className="font-semibold">42</span> gönderi</p>
                    <p><span className="font-semibold">1.284</span> takipçi</p>
                    <p><span className="font-semibold">892</span> takip</p>
                  </div>
                  <p className="mb-4 text-sm text-slate-700">
                    ATLAS Kullanıcısı ✨<br />
                    📱 Teknoloji | Yazılım | Dijital<br />
                    🚀 #ATLAS ekosistemini keşfediyorum
                  </p>
                  <button className="rounded-lg bg-slate-200 px-6 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-300">
                    Profili Düzenle
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="grid grid-cols-3 gap-1">
                  {posts.map((post) => (
                    <div 
                      key={post.id}
                      className={`aspect-square bg-gradient-to-br ${post.image} cursor-pointer transition hover:opacity-80`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar - Suggestions (Desktop Only) */}
      {currentView === "home" && (
        <aside className="hidden w-80 overflow-y-auto border-l border-slate-200 bg-white p-6 xl:block">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
              AT
            </div>
            <div>
              <p className="font-semibold text-slate-900">atlas_user</p>
              <p className="text-sm text-slate-500">ATLAS Kullanıcısı</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="mb-4 font-semibold text-slate-900">Önerilen Hesaplar</h3>
            <div className="space-y-4">
              {[
                { username: "atlas_official", name: "ATLAS Resmi", avatar: "from-blue-500 to-purple-600" },
                { username: "teknoloji_haberleri", name: "Teknoloji Haberleri", avatar: "from-green-500 to-emerald-600" },
                { username: "yazilim_dunyasi", name: "Yazılım Dünyası", avatar: "from-fuchsia-500 to-pink-600" },
              ].map((account) => (
                <div key={account.username} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${account.avatar}`}>
                      <span className="text-sm font-bold text-white">{account.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{account.username}</p>
                      <p className="text-xs text-slate-500">{account.name}</p>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-cyan-600 hover:text-cyan-700">
                    Takip Et
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
