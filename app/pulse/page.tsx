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
} from "@heroicons/react/24/outline";

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
  },
];

export default function PulsePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postContent, setPostContent] = useState("");

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
            <button className="flex w-full items-center gap-3 rounded-lg bg-cyan-50 px-4 py-3 text-left font-semibold text-cyan-600">
              <HomeIcon className="h-5 w-5" />
              Ana Sayfa
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <HashtagIcon className="h-5 w-5" />
              Keşfet
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <BellIcon className="h-5 w-5" />
              Bildirimler
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <EnvelopeIcon className="h-5 w-5" />
              Mesajlar
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-700 hover:bg-slate-50">
              <UserIcon className="h-5 w-5" />
              Profil
            </button>
          </div>

          <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl active:scale-95">
            Pulse Gönder
          </button>
        </nav>

        {/* Trending */}
        <div className="border-t border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-bold text-slate-900">Trendler</h3>
          <div className="space-y-3">
            {trendingTopics.slice(0, 3).map((topic) => (
              <button key={topic.tag} className="block w-full text-left">
                <p className="text-sm font-semibold text-slate-900">#{topic.tag}</p>
                <p className="text-xs text-slate-500">{topic.posts} pulse</p>
              </button>
            ))}
          </div>
        </div>
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
                  <div className="mt-3 flex justify-end">
                    <button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:shadow-lg active:scale-95">
                      Gönder
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {feedPosts.map((post) => (
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
                    <p className="mt-2 text-sm leading-relaxed text-slate-900">{post.content}</p>
                    <div className="mt-3 flex items-center gap-6">
                      <button className="flex items-center gap-2 text-slate-500 transition hover:text-cyan-600">
                        <ChatBubbleLeftIcon className="h-5 w-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-500 transition hover:text-green-600">
                        <ArrowPathIcon className="h-5 w-5" />
                        <span className="text-sm">{post.reposts}</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-500 transition hover:text-rose-600">
                        <HeartIcon className="h-5 w-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar - Trends (Desktop Only) */}
      <aside className="hidden w-80 overflow-y-auto border-l border-slate-200 bg-white p-4 xl:block">
        <div className="rounded-xl bg-slate-50 p-4">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Gündem</h3>
          <div className="space-y-4">
            {trendingTopics.map((topic, idx) => (
              <button key={topic.tag} className="block w-full text-left transition hover:opacity-70">
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
      </aside>
    </div>
  );
}
