"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  NewspaperIcon,
  StarIcon,
  ClockIcon,
  GlobeAltIcon,
  ArrowPathIcon,
  FunnelIcon,
  XMarkIcon,
  BellIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type Asset = {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  category: "stock" | "crypto" | "commodity" | "currency";
};

type NewsItem = {
  id: number;
  title: string;
  summary: string;
  source: string;
  time: string;
  category: string;
};

const stocks: Asset[] = [
  { id: 1, symbol: "THYAO", name: "Türk Hava Yolları", price: 285.50, change: 12.30, changePercent: 4.51, volume: "142M", category: "stock" },
  { id: 2, symbol: "GARAN", name: "Garanti BBVA", price: 98.75, change: -2.15, changePercent: -2.13, volume: "89M", category: "stock" },
  { id: 3, symbol: "AKBNK", name: "Akbank", price: 54.20, change: 1.80, changePercent: 3.44, volume: "156M", category: "stock" },
  { id: 4, symbol: "EREGL", name: "Ereğli Demir Çelik", price: 42.15, change: -0.85, changePercent: -1.98, volume: "67M", category: "stock" },
  { id: 5, symbol: "SASA", name: "Sasa Polyester", price: 23.90, change: 0.65, changePercent: 2.79, volume: "34M", category: "stock" },
  { id: 6, symbol: "PETKM", name: "Petkim", price: 8.76, change: -0.24, changePercent: -2.67, volume: "45M", category: "stock" },
];

const cryptos: Asset[] = [
  { id: 11, symbol: "BTC", name: "Bitcoin", price: 2456789, change: 45230, changePercent: 1.88, category: "crypto" },
  { id: 12, symbol: "ETH", name: "Ethereum", price: 145678, change: -3420, changePercent: -2.29, category: "crypto" },
  { id: 13, symbol: "BNB", name: "Binance Coin", price: 18945, change: 567, changePercent: 3.08, category: "crypto" },
  { id: 14, symbol: "XRP", name: "Ripple", price: 32.45, change: 1.23, changePercent: 3.94, category: "crypto" },
  { id: 15, symbol: "SOL", name: "Solana", price: 5678, change: -234, changePercent: -3.96, category: "crypto" },
];

const commodities: Asset[] = [
  { id: 21, symbol: "XAU", name: "Altın (Ons)", price: 3245.80, change: 12.50, changePercent: 0.39, category: "commodity" },
  { id: 22, symbol: "XAG", name: "Gümüş (Ons)", price: 38.95, change: -0.45, changePercent: -1.14, category: "commodity" },
  { id: 23, symbol: "BRENT", name: "Brent Petrol", price: 82.34, change: 1.67, changePercent: 2.07, category: "commodity" },
  { id: 24, symbol: "GAZ", name: "Doğal Gaz", price: 3.89, change: -0.12, changePercent: -2.99, category: "commodity" },
];

const currencies: Asset[] = [
  { id: 31, symbol: "USD/TRY", name: "ABD Doları", price: 34.15, change: 0.08, changePercent: 0.24, category: "currency" },
  { id: 32, symbol: "EUR/TRY", name: "Euro", price: 36.92, change: -0.15, changePercent: -0.40, category: "currency" },
  { id: 33, symbol: "GBP/TRY", name: "İngiliz Sterlini", price: 43.28, change: 0.32, changePercent: 0.74, category: "currency" },
  { id: 34, symbol: "JPY/TRY", name: "Japon Yeni", price: 0.2289, change: 0.0012, changePercent: 0.53, category: "currency" },
];

const news: NewsItem[] = [
  {
    id: 1,
    title: "TCMB Faiz Kararını Açıkladı",
    summary: "Merkez Bankası, politika faizini %50 seviyesinde sabit tutma kararı aldı. Piyasalar olumlu karşıladı.",
    source: "Ekonomi Haber",
    time: "2 saat önce",
    category: "Ekonomi",
  },
  {
    id: 2,
    title: "Bitcoin Yeni Zirveye Doğru",
    summary: "Bitcoin 2.5 milyon TL seviyesini test ediyor. Analistler yükseliş trendinin devam edeceğini öngörüyor.",
    source: "Kripto Gündem",
    time: "3 saat önce",
    category: "Kripto",
  },
  {
    id: 3,
    title: "Altın Fiyatlarında Rekor",
    summary: "Ons altın 3.245 dolar ile tüm zamanların en yüksek seviyesini gördü. Yatırımcılar güvenli limana yöneliyor.",
    source: "Finans Ajans",
    time: "4 saat önce",
    category: "Emtia",
  },
  {
    id: 4,
    title: "BIST 100 Endeksi Yükselişte",
    summary: "Borsa İstanbul, güçlü banka hisselerinin desteğiyle %2.5 artışla günü kapattı.",
    source: "Borsa Haber",
    time: "5 saat önce",
    category: "Borsa",
  },
  {
    id: 5,
    title: "Dolar/TL Kuru Sakin Seyretti",
    summary: "Döviz piyasalarında dalgalanma azaldı. Dolar 34.15 seviyesinde işlem görüyor.",
    source: "Döviz Analiz",
    time: "6 saat önce",
    category: "Döviz",
  },
];

export default function FinansPage() {
  const [selectedCategory, setSelectedCategory] = useState<"stocks" | "crypto" | "commodities" | "currencies">("stocks");
  const [favorites, setFavorites] = useState<number[]>([1, 11, 21, 31]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [portfolio, setPortfolio] = useState<{id: number, amount: number}[]>([
    {id: 1, amount: 100},
    {id: 11, amount: 0.25},
    {id: 21, amount: 10}
  ]);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");

  const getCurrentAssets = () => {
    switch (selectedCategory) {
      case "stocks": return stocks;
      case "crypto": return cryptos;
      case "commodities": return commodities;
      case "currencies": return currencies;
    }
  };

  const filteredAssets = getCurrentAssets().filter((asset) =>
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const bist100Change = 2.45;
  const bist100Value = 9876.54;

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
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-slate-200 bg-white overflow-hidden transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md">
              <ChartBarIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">FinansATLAS</span>
          </Link>
        </div>

        {/* Market Overview */}
        <div className="border-b border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Piyasa Özeti</h3>
          <div className="space-y-2">
            <div className="rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] p-3 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">BIST 100</span>
                <span className={`flex items-center gap-1 text-sm font-bold ${bist100Change >= 0 ? "text-green-300" : "text-red-300"}`}>
                  {bist100Change >= 0 ? <ArrowTrendingUpIcon className="h-4 w-4" /> : <ArrowTrendingDownIcon className="h-4 w-4" />}
                  %{Math.abs(bist100Change)}
                </span>
              </div>
              <p className="mt-1 text-2xl font-bold">{bist100Value.toLocaleString("tr-TR")}</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Kategoriler</h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory("stocks")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                selectedCategory === "stocks"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="text-lg">📈</span>
              Hisse Senetleri
              <span className="ml-auto text-xs">{stocks.length}</span>
            </button>
            <button
              onClick={() => setSelectedCategory("crypto")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                selectedCategory === "crypto"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="text-lg">₿</span>
              Kripto Paralar
              <span className="ml-auto text-xs">{cryptos.length}</span>
            </button>
            <button
              onClick={() => setSelectedCategory("commodities")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                selectedCategory === "commodities"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="text-lg">🪙</span>
              Emtialar
              <span className="ml-auto text-xs">{commodities.length}</span>
            </button>
            <button
              onClick={() => setSelectedCategory("currencies")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                selectedCategory === "currencies"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="text-lg">💱</span>
              Döviz Kurları
              <span className="ml-auto text-xs">{currencies.length}</span>
            </button>
          </div>
        </div>

        {/* Financial News */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Finansal Haberler</h3>
            <NewspaperIcon className="h-4 w-4 text-slate-400" />
          </div>
          <div className="space-y-3">
            {news.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="cursor-pointer rounded-lg border border-slate-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <ClockIcon className="h-3 w-3" />
                    {item.time}
                  </span>
                </div>
                <h4 className="mb-1 text-sm font-semibold text-slate-900 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">{item.summary}</p>
                <p className="mt-1 text-xs text-slate-500">{item.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Update Info */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ArrowPathIcon className="h-3.5 w-3.5" />
              Canlı Veriler
            </span>
            <span>Son güncelleme: 10:45</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-3 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedCategory === "stocks" && "Hisse Senetleri"}
                  {selectedCategory === "crypto" && "Kripto Paralar"}
                  {selectedCategory === "commodities" && "Emtialar"}
                  {selectedCategory === "currencies" && "Döviz Kurları"}
                </h1>
                <p className="hidden sm:block text-sm text-slate-600">Canlı piyasa verileri ve analizler</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Sembol veya isim ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 rounded-lg border border-slate-200 py-2 px-4 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button 
                onClick={() => setShowPortfolio(true)}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2 text-sm font-semibold text-white transition hover:scale-105"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Portföy</span>
              </button>
              <button className="rounded-lg p-2 transition hover:bg-slate-100">
                <BellIcon className="h-5 w-5 text-slate-600" />
              </button>
              <button className="rounded-lg p-2 transition hover:bg-slate-100">
                <ArrowPathIcon className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="border-b border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-slate-600">
                {selectedCategory === "stocks" && "Yükselen"}
                {selectedCategory === "crypto" && "Bitcoin"}
                {selectedCategory === "commodities" && "Altın"}
                {selectedCategory === "currencies" && "USD/TRY"}
              </p>
              <p className="text-2xl font-bold text-green-600">
                +{getCurrentAssets().filter(a => a.change > 0).length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-slate-600">
                {selectedCategory === "stocks" && "Düşen"}
                {selectedCategory === "crypto" && "Ethereum"}
                {selectedCategory === "commodities" && "Gümüş"}
                {selectedCategory === "currencies" && "EUR/TRY"}
              </p>
              <p className="text-2xl font-bold text-red-600">
                -{getCurrentAssets().filter(a => a.change < 0).length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-slate-600">Ortalama Değişim</p>
              <p className={`text-2xl font-bold ${
                getCurrentAssets().reduce((sum, a) => sum + a.changePercent, 0) / getCurrentAssets().length >= 0 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                {(getCurrentAssets().reduce((sum, a) => sum + a.changePercent, 0) / getCurrentAssets().length).toFixed(2)}%
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm text-slate-600">Favoriler</p>
              <p className="text-2xl font-bold text-blue-600">
                {favorites.length}
              </p>
            </div>
          </div>
        </div>

        {/* Assets List */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "list" ? (
            <>
              <div className="mb-6">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  {selectedCategory === "stocks" && "Borsa İstanbul Hisseleri"}
                  {selectedCategory === "crypto" && "Kripto Para Piyasası"}
                  {selectedCategory === "commodities" && "Emtia Fiyatları"}
                  {selectedCategory === "currencies" && "Döviz Piyasası"}
                </h2>
            <div className="space-y-3">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <button
                      onClick={() => toggleFavorite(asset.id)}
                      className="rounded-lg p-2 transition hover:bg-slate-100"
                    >
                      {favorites.includes(asset.id) ? (
                        <StarIconSolid className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <StarIcon className="h-5 w-5 text-slate-400" />
                      )}
                    </button>

                    {/* Mini Chart */}
                    <div className="hidden md:block h-12 w-24">
                      <svg viewBox="0 0 100 50" className="h-full w-full">
                        <polyline
                          fill="none"
                          stroke={asset.change >= 0 ? "#10b981" : "#ef4444"}
                          strokeWidth="2"
                          points="0,40 20,35 40,25 60,30 80,20 100,15"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">{asset.symbol}</h3>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          {asset.name}
                        </span>
                      </div>
                      {asset.volume && (
                        <p className="text-sm text-slate-500">Hacim: {asset.volume}</p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">
                        {asset.category === "crypto" 
                          ? asset.price.toLocaleString("tr-TR", { minimumFractionDigits: 0 })
                          : asset.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} 
                        {asset.category === "crypto" ? " ₺" : 
                         asset.category === "currency" ? "" : " ₺"}
                      </p>
                      <div className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                        asset.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {asset.change >= 0 ? (
                          <ArrowTrendingUpIcon className="h-4 w-4" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-4 w-4" />
                        )}
                        {asset.change >= 0 ? "+" : ""}
                        {asset.change.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                        {" "}({asset.change >= 0 ? "+" : ""}
                        {asset.changePercent.toFixed(2)}%)
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setSelectedAsset(asset);
                        setViewMode("detail");
                      }}
                      className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-105 active:scale-95"
                    >
                      Detay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News Section */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Son Haberler</h2>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                <NewspaperIcon className="h-4 w-4" />
                Tüm Haberler
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {item.time}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mb-3 text-sm text-slate-600">{item.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <GlobeAltIcon className="h-4 w-4" />
                      {item.source}
                    </div>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                      Devamını Oku →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
            </>
          ) : selectedAsset && (
            <div>
              {/* Back Button */}
              <button
                onClick={() => setViewMode("list")}
                className="mb-6 flex items-center gap-2 text-slate-600 transition hover:text-slate-900"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">Geri Dön</span>
              </button>

              {/* Asset Detail Page */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Price Section */}
                <div className="lg:col-span-2">
                  <div className="mb-6 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-6 shadow-sm">
                    <div className="mb-4">
                      <h1 className="text-3xl font-bold text-slate-900">{selectedAsset.symbol}</h1>
                      <p className="text-lg text-slate-600">{selectedAsset.name}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Fiyat</p>
                        <p className="text-5xl font-bold text-slate-900">
                          {selectedAsset.category === "crypto" 
                            ? selectedAsset.price.toLocaleString("tr-TR", { minimumFractionDigits: 0 })
                            : selectedAsset.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                          {selectedAsset.category === "crypto" ? " ₺" : 
                           selectedAsset.category === "currency" ? "" : " ₺"}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 text-3xl font-bold ${
                        selectedAsset.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {selectedAsset.change >= 0 ? (
                          <ArrowTrendingUpIcon className="h-10 w-10" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-10 w-10" />
                        )}
                        {selectedAsset.change >= 0 ? "+" : ""}
                        {selectedAsset.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-slate-900">Günlük Grafik</h3>
                    <div className="h-64">
                      <svg viewBox="0 0 400 200" className="h-full w-full">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: selectedAsset.change >= 0 ? "#10b981" : "#ef4444", stopOpacity: 0.3}} />
                            <stop offset="100%" style={{stopColor: selectedAsset.change >= 0 ? "#10b981" : "#ef4444", stopOpacity: 0}} />
                          </linearGradient>
                        </defs>
                        <polyline
                          fill="url(#gradient)"
                          stroke={selectedAsset.change >= 0 ? "#10b981" : "#ef4444"}
                          strokeWidth="3"
                          points="0,150 50,140 100,120 150,130 200,100 250,110 300,80 350,90 400,70"
                        />
                      </svg>
                    </div>
                    <div className="mt-6 flex justify-center gap-2">
                      <button className="rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">1G</button>
                      <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white">1H</button>
                      <button className="rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">1A</button>
                      <button className="rounded-lg bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">1Y</button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-600">Günün En Yüksek</p>
                      <p className="mt-2 text-2xl font-bold text-green-600">
                        {(selectedAsset.price * 1.05).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-600">Günün En Düşük</p>
                      <p className="mt-2 text-2xl font-bold text-red-600">
                        {(selectedAsset.price * 0.95).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    {selectedAsset.volume && (
                      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-600">Hacim</p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">{selectedAsset.volume}</p>
                      </div>
                    )}
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm text-slate-600">Piyasa Durumu</p>
                      <p className="mt-2 text-2xl font-bold text-green-600">Açık</p>
                    </div>
                  </div>
                </div>

                {/* Action Section */}
                <div className="lg:col-span-1">
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 text-lg font-bold text-slate-900">Bilgiler</h3>
                    
                    {/* Favorite & Alert */}
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleFavorite(selectedAsset.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-yellow-500 hover:bg-yellow-50"
                      >
                        {favorites.includes(selectedAsset.id) ? (
                          <StarIconSolid className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <StarIcon className="h-5 w-5" />
                        )}
                        {favorites.includes(selectedAsset.id) ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                      </button>
                      <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:bg-blue-50">
                        <BellIcon className="h-5 w-5" />
                        Fiyat Alarmı Kur
                      </button>
                    </div>

                    {/* Portfolio Info */}
                    {portfolio.find(p => p.id === selectedAsset.id) && (
                      <div className="mt-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg">
                        <p className="text-sm font-semibold opacity-90">Portföyünüzde</p>
                        <p className="mt-2 text-3xl font-bold">
                          {portfolio.find(p => p.id === selectedAsset.id)?.amount} {selectedAsset.category === "crypto" ? selectedAsset.symbol : "Adet"}
                        </p>
                        <p className="mt-1 text-sm opacity-75">
                          Değer: {((portfolio.find(p => p.id === selectedAsset.id)?.amount || 0) * selectedAsset.price).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺
                        </p>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="mt-6 space-y-4 rounded-lg bg-slate-50 p-4">
                      <div>
                        <p className="text-xs text-slate-600">Kategori</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {selectedAsset.category === "stock" && "Hisse Senedi"}
                          {selectedAsset.category === "crypto" && "Kripto Para"}
                          {selectedAsset.category === "commodity" && "Emtia"}
                          {selectedAsset.category === "currency" && "Döviz"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Değişim</p>
                        <p className={`mt-1 text-lg font-bold ${
                          selectedAsset.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {selectedAsset.change >= 0 ? "+" : ""}
                          {selectedAsset.change.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      {selectedAsset.volume && (
                        <div>
                          <p className="text-xs text-slate-600">Günlük Hacim</p>
                          <p className="mt-1 font-semibold text-slate-900">{selectedAsset.volume}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Asset Detail Modal */}
      {/* Modal removed - now using page view */}

      {/* Portfolio Modal */}
      {showPortfolio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900">Portföyüm</h2>
              <button
                onClick={() => setShowPortfolio(false)}
                className="rounded-lg p-2 transition hover:bg-slate-100"
              >
                <XMarkIcon className="h-6 w-6 text-slate-600" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Portfolio Summary */}
              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-4 text-white">
                  <p className="text-sm opacity-90">Toplam Değer</p>
                  <p className="mt-1 text-2xl font-bold">125.450 ₺</p>
                  <p className="mt-1 text-xs opacity-75">+12.5% Bu Hafta</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white">
                  <p className="text-sm opacity-90">Varlık Sayısı</p>
                  <p className="mt-1 text-2xl font-bold">{portfolio.length}</p>
                  <p className="mt-1 text-xs opacity-75">3 Kategori</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-4 text-white">
                  <p className="text-sm opacity-90">Günlük Kazanç</p>
                  <p className="mt-1 text-2xl font-bold">+2.340 ₺</p>
                  <p className="mt-1 text-xs opacity-75">+1.89%</p>
                </div>
              </div>

              {/* Portfolio Items */}
              <div className="space-y-3">
                {portfolio.map((item) => {
                  const asset = [...stocks, ...cryptos, ...commodities, ...currencies].find(a => a.id === item.id);
                  if (!asset) return null;
                  const totalValue = asset.price * item.amount;
                  
                  return (
                    <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-sm font-bold text-white">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{asset.symbol}</p>
                          <p className="text-sm text-slate-600">{item.amount} {asset.category === "crypto" ? asset.symbol : "Adet"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900">
                          {totalValue.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺
                        </p>
                        <p className={`text-sm font-semibold ${
                          asset.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {asset.change >= 0 ? "+" : ""}{asset.changePercent.toFixed(2)}%
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedAsset(asset);
                          setViewMode("detail");
                          setShowPortfolio(false);
                        }}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        Detay
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
