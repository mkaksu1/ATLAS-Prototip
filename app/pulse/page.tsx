"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BoltIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  BellIcon,
  EnvelopeIcon,
  UserIcon,
  Bars3Icon,
  HashtagIcon,
  FireIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowPathIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

type Post = {
  id: number;
  author: string;
  username: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  reposts: number;
  verified?: boolean;
  image?: string;
  liked?: boolean;
  reposted?: boolean;
};

const trendingTopics = [
  { tag: "Teknoloji", posts: "12.5B" },
  { tag: "ATLAS", posts: "8.3B" },
  { tag: "YapayZeka", posts: "6.7B" },
  { tag: "Türkiye", posts: "15.2B" },
  { tag: "Yazılım", posts: "4.9B" },
];

const feedPosts: Post[] = [
  {
    id: 1,
    author: "ATLAS Resmi",
    username: "@atlas_official",
    avatar: "from-blue-500 to-purple-600",
    content: "ATLAS ekosistemi artık 15+ uygulama ile daha güçlü! Yapay zeka destekli asistanımız ATLAS.AI ile tanışın. 🚀 #ATLAS #YapayZeka",
    time: "2s",
    likes: 245,
    comments: 32,
    reposts: 89,
    verified: true,
  },
  {
    id: 2,
    author: "Teknoloji Haberleri",
    username: "@teknohaberler",
    avatar: "from-green-500 to-emerald-600",
    content: "Türkiye'nin milli dijital platformu ATLAS, kullanıcı sayısını kısa sürede katladı. Şimdi sırada video platformu ATLAS Video var! 📱",
    time: "5dk",
    likes: 428,
    comments: 56,
    reposts: 134,
  },
  {
    id: 3,
    author: "Dijital Dönüşüm",
    username: "@dijitaldönüşüm",
    avatar: "from-fuchsia-500 to-pink-600",
    content: "ATLAS Pay ile dijital ödemeleriniz artık çok daha güvenli. Blockchain tabanlı altyapı ve biyometrik doğrulama 🔐💳",
    time: "12dk",
    likes: 312,
    comments: 45,
    reposts: 78,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    id: 4,
    author: "Yazılım Geliştiriciler",
    username: "@devs_tr",
    avatar: "from-indigo-500 to-blue-600",
    content: "ATLAS.AI ile kod yazmak çok kolay! ChatGPT benzeri ama Türkçe'ye optimize edilmiş. Denemenizi öneririm 👨‍💻✨",
    time: "25dk",
    likes: 567,
    comments: 89,
    reposts: 203,
  },
  {
    id: 5,
    author: "Finans Analisti",
    username: "@finans_pro",
    avatar: "from-amber-500 to-yellow-600",
    content: "FinansATLAS'ta borsa, kripto ve emtia piyasalarını gerçek zamanlı takip ediyorum. Harika bir platform! 📊📈",
    time: "1s",
    likes: 189,
    comments: 23,
    reposts: 45,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: 6,
    author: "Medya & İletişim",
    username: "@medya_com",
    avatar: "from-rose-500 to-pink-600",
    content: "ATLAS Video platformunda canlı yayınlar başladı! İlk yayıncılar arasında olmak için hemen kaydolun 🎥✨",
    time: "32dk",
    likes: 734,
    comments: 112,
    reposts: 245,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
  },
  {
    id: 7,
    author: "E-Ticaret Türkiye",
    username: "@eticaret_tr",
    avatar: "from-orange-500 to-red-600",
    content: "ATLAS Alışveriş'te bugün başlayan kampanyalara göz atın! İnanılmaz fırsatlar sizi bekliyor 🛍️",
    time: "45dk",
    likes: 421,
    comments: 67,
    reposts: 98,
  },
  {
    id: 8,
    author: "Harita Keşfet",
    username: "@harita_kesfet",
    avatar: "from-teal-500 to-cyan-600",
    content: "ATLAS Harita'nın yeni 3D görünümü gerçekten etkileyici! Şehirleri sanki drone ile geziyormuş gibi keşfedebiliyorsunuz 🗺️",
    time: "1s",
    likes: 298,
    comments: 41,
    reposts: 76,
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=800&q=80",
  },
  {
    id: 9,
    author: "Eğitim & Gelişim",
    username: "@egitim_dev",
    avatar: "from-violet-500 to-purple-600",
    content: "ATLAS Dokümanlar'da ekip çalışması çok verimli. Google Docs'tan bile daha hızlı ve güvenli! 📝",
    time: "1sa",
    likes: 156,
    comments: 28,
    reposts: 34,
  },
  {
    id: 10,
    author: "Siber Güvenlik",
    username: "@siber_guvenlik",
    avatar: "from-red-600 to-pink-600",
    content: "ATLAS'ın uçtan uca şifreleme sistemi gerçekten güvenilir. Verileriniz Türkiye'de ve tamamen korunuyor! 🔐",
    time: "2sa",
    likes: 512,
    comments: 93,
    reposts: 167,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
];

export default function PulsePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState<Post[]>(feedPosts);
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "notifications" | "messages" | "profile">("home");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleRepost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, reposted: !post.reposted, reposts: post.reposted ? post.reposts - 1 : post.reposts + 1 }
        : post
    ));
  };

  const handleNewPost = () => {
    if (postContent.trim()) {
      const newPost: Post = {
        id: posts.length + 1,
        author: "Ahmet Yılmaz",
        username: "@ahmet_yilmaz",
        avatar: "from-blue-500 to-purple-600",
        content: postContent,
        time: "şimdi",
        likes: 0,
        comments: 0,
        reposts: 0,
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
              <BoltIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xl font-black italic bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                ATLAS
              </p>
              <p className="text-xs font-semibold text-slate-600">Pulse</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab("home")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                activeTab === "home" 
                  ? "bg-cyan-50 text-cyan-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <HomeIcon className="h-5 w-5" />
              Ana Sayfa
            </button>
            <button 
              onClick={() => setActiveTab("explore")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                activeTab === "explore" 
                  ? "bg-cyan-50 text-cyan-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <HashtagIcon className="h-5 w-5" />
              Keşfet
            </button>
            <button 
              onClick={() => {
                setActiveTab("notifications");
                setSelectedChat(null);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                activeTab === "notifications" 
                  ? "bg-cyan-50 text-cyan-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <BellIcon className="h-5 w-5" />
              Bildirimler
              <span className="ml-auto rounded-full bg-cyan-500 px-2 py-0.5 text-xs font-bold text-white">3</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab("messages");
                setSelectedChat(null);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                activeTab === "messages" 
                  ? "bg-cyan-50 text-cyan-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <EnvelopeIcon className="h-5 w-5" />
              Mesajlar
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition ${
                activeTab === "profile" 
                  ? "bg-cyan-50 text-cyan-600" 
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <UserIcon className="h-5 w-5" />
              Profil
            </button>
          </div>

          <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl hover:scale-105 active:scale-95">
            Pulse Gönder
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="flex-1">
              <div className="relative max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Pulse ara..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="mx-auto max-w-2xl">
            {activeTab === "home" && (
              <>
                {/* New Post */}
                <div className="border-b border-slate-200 bg-white p-4">
                  <div className="flex gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                      AT
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Ne düşünüyorsun?"
                        className="w-full resize-none border-none bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        rows={3}
                      />
                      <div className="mt-3 flex items-center justify-between">
                        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-cyan-600 transition hover:bg-cyan-50">
                          <PhotoIcon className="h-5 w-5" />
                          <span className="text-sm font-medium">Fotoğraf</span>
                        </button>
                        <button 
                          onClick={handleNewPost}
                          disabled={!postContent.trim()}
                          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Gönder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Posts */}
                {posts.map((post) => (
              <div key={post.id} className="border-b border-slate-200 bg-white p-4 transition hover:bg-slate-50">
                <div className="flex gap-3">
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${post.avatar} text-sm font-bold text-white`}>
                    {post.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900">{post.author}</p>
                      {post.verified && (
                        <svg className="h-4 w-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      <p className="text-slate-500">{post.username}</p>
                      <span className="text-slate-400">·</span>
                      <p className="text-slate-500">{post.time}</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-900 whitespace-pre-wrap">{post.content}</p>
                    
                    {/* Image */}
                    {post.image && (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-6">
                      <button className="flex items-center gap-2 text-slate-500 transition hover:text-cyan-600 group">
                        <ChatBubbleLeftIcon className="h-5 w-5 group-hover:scale-110 transition" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button 
                        onClick={() => handleRepost(post.id)}
                        className={`flex items-center gap-2 transition group ${
                          post.reposted ? "text-green-600" : "text-slate-500 hover:text-green-600"
                        }`}
                      >
                        <ArrowPathIcon className="h-5 w-5 group-hover:scale-110 group-hover:rotate-90 transition" />
                        <span className="text-sm">{post.reposts}</span>
                      </button>
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition group ${
                          post.liked ? "text-rose-600" : "text-slate-500 hover:text-rose-600"
                        }`}
                      >
                        {post.liked ? (
                          <HeartSolidIcon className="h-5 w-5 group-hover:scale-125 transition" />
                        ) : (
                          <HeartIcon className="h-5 w-5 group-hover:scale-110 transition" />
                        )}
                        <span className="text-sm">{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
              </>
            )}

            {/* Explore Page */}
            {activeTab === "explore" && (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Keşfet</h2>
                  <p className="mt-1 text-slate-600">Trend konuları ve popüler pulse'ları keşfet</p>
                </div>

                {/* Trending Topics */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {trendingTopics.map((topic, idx) => (
                    <div key={topic.tag} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-slate-500">{idx + 1} · Trenddekiler</p>
                          <p className="mt-2 text-xl font-bold text-slate-900">#{topic.tag}</p>
                          <p className="mt-1 text-sm text-slate-600">{topic.posts} pulse</p>
                        </div>
                        <FireIcon className="h-6 w-6 text-orange-500" />
                      </div>
                      <button className="mt-4 w-full rounded-lg bg-cyan-50 py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-100">
                        Görüntüle
                      </button>
                    </div>
                  ))}
                </div>

                {/* Popular Posts */}
                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">Popüler Pulse'lar</h3>
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex gap-3">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${post.avatar} text-sm font-bold text-white`}>
                            {post.author[0]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-900">{post.author}</p>
                              <p className="text-slate-500">{post.username}</p>
                            </div>
                            <p className="mt-2 text-sm text-slate-900">{post.content}</p>
                            <div className="mt-3 flex items-center gap-6 text-sm text-slate-500">
                              <span>❤️ {post.likes}</span>
                              <span>💬 {post.comments}</span>
                              <span>🔄 {post.reposts}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Page */}
            {activeTab === "notifications" && (
              <div className="bg-white">
                <div className="border-b border-slate-200 p-4">
                  <h2 className="text-xl font-bold text-slate-900">Bildirimler</h2>
                </div>
                <div className="divide-y divide-slate-200">
                  <div className="bg-cyan-50 p-4 transition hover:bg-cyan-100">
                    <div className="flex gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                        AR
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          <span className="font-bold">ATLAS Resmi</span> pulse'unuzu beğendi
                        </p>
                        <p className="mt-1 text-xs text-slate-500">5 dakika önce</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 transition hover:bg-slate-50">
                    <div className="flex gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
                        TH
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          <span className="font-bold">Teknoloji Haberleri</span> pulse'unuzu repost etti
                        </p>
                        <p className="mt-1 text-xs text-slate-500">12 dakika önce</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 transition hover:bg-slate-50">
                    <div className="flex gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-600 text-sm font-bold text-white">
                        DD
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          <span className="font-bold">Dijital Dönüşüm</span> sizi takip etmeye başladı
                        </p>
                        <p className="mt-1 text-xs text-slate-500">1 saat önce</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 transition hover:bg-slate-50">
                    <div className="flex gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-bold text-white">
                        YG
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          <span className="font-bold">Yazılım Geliştiriciler</span> yorumunuzu beğendi
                        </p>
                        <p className="mt-1 text-xs text-slate-500">2 saat önce</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 transition hover:bg-slate-50">
                    <div className="flex gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-sm font-bold text-white">
                        FA
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          <span className="font-bold">Finans Analisti</span> pulse'unuza yanıt verdi
                        </p>
                        <p className="mt-1 text-xs text-slate-500">3 saat önce</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 transition hover:bg-slate-50">
                    <div className="flex gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-sm font-bold text-white">
                        Mİ
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          <span className="font-bold">Medya & İletişim</span> sizi bir gönderide bahsetti
                        </p>
                        <p className="mt-1 text-xs text-slate-500">5 saat önce</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Page */}
            {activeTab === "messages" && (
              <div className="h-full bg-white">
                {!selectedChat ? (
                  <>
                    <div className="border-b border-slate-200 p-4">
                      <h2 className="text-xl font-bold text-slate-900">Mesajlar</h2>
                    </div>
                    <div className="divide-y divide-slate-200">
                      <button onClick={() => setSelectedChat("yg")} className="flex w-full gap-3 p-4 text-left transition hover:bg-slate-50">
                        <div className="relative">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-bold text-white">
                            YG
                          </div>
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-slate-900">Yazılım Geliştiriciler</p>
                            <p className="text-xs text-slate-500">12dk</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-600 truncate">ATLAS.AI'nın yeni özelliğini denediniz mi?</p>
                        </div>
                      </button>
                      <button onClick={() => setSelectedChat("fa")} className="flex w-full gap-3 p-4 text-left transition hover:bg-slate-50">
                        <div className="relative">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-sm font-bold text-white">
                            FA
                          </div>
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-slate-900">Finans Analisti</p>
                            <p className="text-xs text-slate-500">1s</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-600 truncate">Borsa analizi paylaştım, göz atabilir misiniz?</p>
                        </div>
                      </button>
                      <button onClick={() => setSelectedChat("mi")} className="flex w-full gap-3 p-4 text-left transition hover:bg-slate-50">
                        <div className="relative">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-sm font-bold text-white">
                            Mİ
                          </div>
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-slate-900">Medya & İletişim</p>
                            <p className="text-xs text-slate-500">2s</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-600 truncate">Canlı yayın başlatıyorum, gel seni ekleyeyim!</p>
                        </div>
                      </button>
                      <button onClick={() => setSelectedChat("th")} className="flex w-full gap-3 p-4 text-left transition hover:bg-slate-50">
                        <div className="relative">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
                            TH
                          </div>
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-slate-900">Teknoloji Haberleri</p>
                            <p className="text-xs text-slate-500">1sa</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-600 truncate">Yeni haber gönderiyorum, hemen oku!</p>
                        </div>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col">
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                      <button 
                        onClick={() => setSelectedChat(null)}
                        className="rounded-lg p-2 transition hover:bg-slate-100"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      {selectedChat === "yg" && (
                        <>
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-sm font-bold text-white">
                              YG
                            </div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">Yazılım Geliştiriciler</h3>
                            <p className="text-xs text-green-600">Çevrimiçi</p>
                          </div>
                        </>
                      )}
                      {selectedChat === "fa" && (
                        <>
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-sm font-bold text-white">
                              FA
                            </div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-slate-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">Finans Analisti</h3>
                            <p className="text-xs text-slate-500">Çevrimdışı</p>
                          </div>
                        </>
                      )}
                      {selectedChat === "mi" && (
                        <>
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-sm font-bold text-white">
                              Mİ
                            </div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">Medya & İletişim</h3>
                            <p className="text-xs text-green-600">Çevrimiçi</p>
                          </div>
                        </>
                      )}
                      {selectedChat === "th" && (
                        <>
                          <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
                              TH
                            </div>
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">Teknoloji Haberleri</h3>
                            <p className="text-xs text-green-600">Çevrimiçi</p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
                      <div className="space-y-4">
                        {selectedChat === "yg" && (
                          <>
                            <div className="flex gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-xs font-bold text-white">
                                YG
                              </div>
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                  <p className="text-sm text-slate-900">Merhaba! ATLAS.AI'nın yeni özelliklerini denediniz mi?</p>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">14:32</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3">
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 shadow-sm">
                                  <p className="text-sm text-white">Henüz denemedim ama çok ilgi çekici görünüyor!</p>
                                </div>
                                <p className="mt-1 text-right text-xs text-slate-500">14:35</p>
                              </div>
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
                                AT
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-xs font-bold text-white">
                                YG
                              </div>
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                  <p className="text-sm text-slate-900">Kesinlikle denemelisiniz! Türkçe destekli yapay zeka gerçekten harika çalışıyor.</p>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">14:38</p>
                              </div>
                            </div>
                          </>
                        )}
                        {selectedChat === "fa" && (
                          <>
                            <div className="flex gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-xs font-bold text-white">
                                FA
                              </div>
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                  <p className="text-sm text-slate-900">Bu haftanın borsa analizini yeni paylaştım, göz atabilir misiniz?</p>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">09:15</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3">
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 shadow-sm">
                                  <p className="text-sm text-white">Teşekkürler, hemen bakıyorum!</p>
                                </div>
                                <p className="mt-1 text-right text-xs text-slate-500">09:47</p>
                              </div>
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
                                AT
                              </div>
                            </div>
                          </>
                        )}
                        {selectedChat === "mi" && (
                          <>
                            <div className="flex gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-xs font-bold text-white">
                                Mİ
                              </div>
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                  <p className="text-sm text-slate-900">15 dakika sonra canlı yayın başlatıyorum, katılır mısınız?</p>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">10:22</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3">
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 shadow-sm">
                                  <p className="text-sm text-white">Elbette! Linki gönderebilir misiniz?</p>
                                </div>
                                <p className="mt-1 text-right text-xs text-slate-500">10:24</p>
                              </div>
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
                                AT
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-xs font-bold text-white">
                                Mİ
                              </div>
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                  <p className="text-sm text-slate-900">Tabii! ATLAS Video'da "Medya İletişim" kanalımdan yayın yapacağım 🎥</p>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">10:25</p>
                              </div>
                            </div>
                          </>
                        )}
                        {selectedChat === "th" && (
                          <>
                            <div className="flex gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-xs font-bold text-white">
                                TH
                              </div>
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                  <p className="text-sm text-slate-900">Yeni teknoloji haberi: ATLAS ekosistemi genişliyor! 🚀</p>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">08:45</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3">
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-3 shadow-sm">
                                  <p className="text-sm text-white">Harika haber! Detayları nereden okuyabilirim?</p>
                                </div>
                                <p className="mt-1 text-right text-xs text-slate-500">08:52</p>
                              </div>
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
                                AT
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-xs font-bold text-white">
                                TH
                              </div>
                              <div className="max-w-[70%]">
                                <div className="rounded-2xl bg-white p-3 shadow-sm">
                                  <p className="text-sm text-slate-900">ATLAS Pulse hesabımızdan tam haberi paylaştık, mutlaka göz atın!</p>
                                </div>
                                <p className="mt-1 text-xs text-slate-500">09:01</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-slate-200 bg-white p-4">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Mesajınızı yazın..."
                          className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                        />
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition hover:shadow-lg active:scale-95">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Page */}
            {activeTab === "profile" && (
              <div className="bg-white min-h-screen">
                {/* Cover Photo */}
                <div className="h-48 w-full bg-gradient-to-r from-cyan-500 to-blue-600" />
                
                {/* Profile Info Section */}
                <div className="px-6">
                  {/* Avatar */}
                  <div className="relative -mt-16 mb-4">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white shadow-xl">
                      AT
                    </div>
                  </div>
                  
                  {/* Profile Details */}
                  <div className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Ahmet Yılmaz</h2>
                        <p className="text-slate-600">@ahmet_yilmaz</p>
                      </div>
                      <button className="rounded-xl border-2 border-cyan-600 px-6 py-2 font-semibold text-cyan-600 transition hover:bg-cyan-50">
                        Profili Düzenle
                      </button>
                    </div>
                    
                    <p className="mt-4 text-slate-700">ATLAS ekosisteminin aktif kullanıcısı | Teknoloji tutkunu | Yapay zeka ve dijital dönüşüm hakkında paylaşımlarda bulunuyorum 🚀</p>
                    
                    <div className="mt-4 flex gap-6">
                      <button className="hover:underline">
                        <span className="font-bold text-slate-900">156</span>
                        <span className="ml-1 text-slate-600">Takip</span>
                      </button>
                      <button className="hover:underline">
                        <span className="font-bold text-slate-900">2.4K</span>
                        <span className="ml-1 text-slate-600">Takipçi</span>
                      </button>
                      <button className="hover:underline">
                        <span className="font-bold text-slate-900">48</span>
                        <span className="ml-1 text-slate-600">Pulse</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-slate-200">
                  <div className="flex">
                    <button className="flex-1 border-b-2 border-cyan-600 py-4 text-center font-semibold text-cyan-600">
                      Pulse'lar
                    </button>
                    <button className="flex-1 border-b-2 border-transparent py-4 text-center font-semibold text-slate-600 transition hover:bg-slate-50">
                      Yanıtlar
                    </button>
                    <button className="flex-1 border-b-2 border-transparent py-4 text-center font-semibold text-slate-600 transition hover:bg-slate-50">
                      Medya
                    </button>
                    <button className="flex-1 border-b-2 border-transparent py-4 text-center font-semibold text-slate-600 transition hover:bg-slate-50">
                      Beğenilenler
                    </button>
                  </div>
                </div>

                {/* User's Posts */}
                <div className="divide-y divide-slate-200">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="p-4 transition hover:bg-slate-50">
                      <div className="flex gap-3">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                          AT
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-slate-900">Ahmet Yılmaz</p>
                            <p className="text-slate-500">@ahmet_yilmaz</p>
                            <span className="text-slate-400">·</span>
                            <p className="text-slate-500">{post.time}</p>
                          </div>
                          <p className="mt-2 text-sm text-slate-900">{post.content}</p>
                          {post.image && (
                            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
                              <img src={post.image} alt="Post" className="w-full h-auto object-cover" />
                            </div>
                          )}
                          <div className="mt-3 flex items-center gap-6 text-sm text-slate-500">
                            <button className="flex items-center gap-1 transition hover:text-cyan-600">
                              <HeartIcon className="h-5 w-5" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 transition hover:text-cyan-600">
                              <ChatBubbleLeftIcon className="h-5 w-5" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-1 transition hover:text-green-600">
                              <ArrowPathIcon className="h-5 w-5" />
                              <span>{post.reposts}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Right Sidebar - Trends (Desktop Only) */}
      <aside className="hidden w-80 overflow-y-auto border-l border-slate-200 bg-white p-4 xl:block">
        <div className="rounded-xl bg-slate-50 p-4">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Gündem</h3>
          <div className="space-y-4">
            {trendingTopics.map((topic, idx) => (
              <button 
                key={topic.tag} 
                className="block w-full text-left rounded-lg p-3 transition hover:bg-white hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-slate-500">{idx + 1} · Trenddekiler</p>
                    <p className="mt-1 font-bold text-slate-900">#{topic.tag}</p>
                    <p className="mt-1 text-xs text-slate-500">{topic.posts} pulse</p>
                  </div>
                  <FireIcon className="h-5 w-5 text-orange-500" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Users */}
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Kimler Takip Edilmeli</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-sm font-bold text-white">
                  TH
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Teknoloji Haberleri</p>
                  <p className="text-xs text-slate-500">@teknohaberler</p>
                </div>
              </div>
              <button className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800">
                Takip Et
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
                  DD
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Dijital Dönüşüm</p>
                  <p className="text-xs text-slate-500">@dijitaldonusum</p>
                </div>
              </div>
              <button className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800">
                Takip Et
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-sm font-bold text-white">
                  FA
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Finans Analisti</p>
                  <p className="text-xs text-slate-500">@finans_pro</p>
                </div>
              </div>
              <button className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800">
                Takip Et
              </button>
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
}
