"use client";

import { useState } from "react";
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
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

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

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
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
            <button className="flex w-full items-center gap-3 rounded-lg bg-pink-50 px-4 py-3 text-left font-semibold text-pink-600">
              <HomeIcon className="h-6 w-6" />
              Ana Sayfa
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <MagnifyingGlassIcon className="h-6 w-6" />
              Keşfet
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <FilmIcon className="h-6 w-6" />
              Reels
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <ChatBubbleOvalLeftIcon className="h-6 w-6" />
              Mesajlar
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <HeartIcon className="h-6 w-6" />
              Bildirimler
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <PlusCircleIcon className="h-6 w-6" />
              Oluştur
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
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
        </div>
      </main>

      {/* Right Sidebar - Suggestions (Desktop Only) */}
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
    </div>
  );
}
