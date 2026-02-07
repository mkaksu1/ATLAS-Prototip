"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  StarIcon,
  HeartIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  TruckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
  discount?: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Kablosuz Kulaklık Pro",
    price: 1299,
    originalPrice: 1799,
    rating: 4.8,
    reviews: 234,
    image: "🎧",
    category: "Elektronik",
    inStock: true,
    featured: true,
    discount: 28,
  },
  {
    id: 2,
    name: "Akıllı Saat X5",
    price: 2499,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 189,
    image: "⌚",
    category: "Elektronik",
    inStock: true,
    featured: true,
    discount: 17,
  },
  {
    id: 3,
    name: "Dizüstü Bilgisayar Ultra",
    price: 18999,
    rating: 4.9,
    reviews: 456,
    image: "💻",
    category: "Bilgisayar",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 249,
    originalPrice: 349,
    rating: 4.5,
    reviews: 678,
    image: "🖱️",
    category: "Aksesuar",
    inStock: true,
    featured: false,
    discount: 29,
  },
  {
    id: 5,
    name: "Mekanik Klavye RGB",
    price: 899,
    rating: 4.7,
    reviews: 345,
    image: "⌨️",
    category: "Aksesuar",
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "4K Webcam",
    price: 1599,
    originalPrice: 1999,
    rating: 4.4,
    reviews: 123,
    image: "📷",
    category: "Aksesuar",
    inStock: true,
    featured: false,
    discount: 20,
  },
  {
    id: 7,
    name: "Taşınabilir SSD 1TB",
    price: 1899,
    rating: 4.8,
    reviews: 567,
    image: "💾",
    category: "Depolama",
    inStock: false,
    featured: false,
  },
  {
    id: 8,
    name: "USB-C Hub 7-in-1",
    price: 449,
    originalPrice: 599,
    rating: 4.6,
    reviews: 234,
    image: "🔌",
    category: "Aksesuar",
    inStock: true,
    featured: false,
    discount: 25,
  },
];

const categories = ["Tümü", "Elektronik", "Bilgisayar", "Aksesuar", "Depolama"];

export default function AlisverisPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tümü");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "Tümü" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
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
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-slate-200 bg-white overflow-hidden transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md">
              <ShoppingBagIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Alışveriş</span>
          </Link>
        </div>

        {/* Cart Button */}
        <div className="border-b border-slate-200 p-4">
          <button className="group relative flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="font-semibold">Sepetim</span>
            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Categories */}
        <div className="border-b border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Kategoriler</h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  filterCategory === cat
                    ? "bg-blue-100 font-medium text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Squares2X2Icon className="h-4 w-4" />
                {cat}
                <span className="ml-auto text-xs">
                  {cat === "Tümü"
                    ? products.length
                    : products.filter((p) => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Filtreler</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="rounded" />
              Ücretsiz Kargo
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="rounded" />
              İndirimli Ürünler
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="rounded" />
              Stokta Var
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="rounded" />
              4+ Yıldız
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Öne Çıkanlar</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <TruckIcon className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-slate-500">Ücretsiz Kargo</p>
                  <p className="text-sm font-bold text-slate-900">500 TL Üzeri</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-slate-500">Güvenli Alışveriş</p>
                  <p className="text-sm font-bold text-slate-900">SSL Sertifika</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-blue-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Sepetim</span>
              <span className="text-lg font-bold text-blue-600">{cart.length}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-slate-700">Favorilerim</span>
              <span className="text-lg font-bold text-blue-600">{favorites.length}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Ürünler</h1>
            <span className="hidden sm:inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {filteredProducts.length} ürün
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-80 rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="rounded-lg p-2 transition hover:bg-slate-100">
              <FunnelIcon className="h-5 w-5 text-slate-600" />
            </button>
            <div className="flex rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-l-lg px-3 py-2 transition ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-r-lg px-3 py-2 transition ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Products Grid/List */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
                >
                  {product.discount && (
                    <div className="absolute left-3 top-3 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      %{product.discount} İndirim
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition hover:scale-110"
                  >
                    {favorites.includes(product.id) ? (
                      <HeartIconSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-slate-400" />
                    )}
                  </button>

                  <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-slate-50 text-6xl">
                    {product.image}
                  </div>

                  <h3 className="mb-2 font-semibold text-slate-900">{product.name}</h3>

                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <StarIconSolid className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-slate-900">{product.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({product.reviews})</span>
                  </div>

                  <div className="mb-3">
                    {product.originalPrice && (
                      <p className="text-sm text-slate-500 line-through">
                        {product.originalPrice.toLocaleString("tr-TR")} TL
                      </p>
                    )}
                    <p className="text-xl font-bold text-slate-900">
                      {product.price.toLocaleString("tr-TR")} TL
                    </p>
                  </div>

                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                      {product.category}
                    </span>
                    {product.inStock ? (
                      <span className="text-xs text-green-600">✓ Stokta</span>
                    ) : (
                      <span className="text-xs text-red-600">× Tükendi</span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock || cart.includes(product.id)}
                    className="w-full rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 active:scale-95"
                  >
                    {cart.includes(product.id) ? "Sepette" : "Sepete Ekle"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex items-center gap-6 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-50 text-4xl">
                    {product.image}
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-slate-900">{product.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <StarIconSolid className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-slate-900">{product.rating}</span>
                          </div>
                          <span className="text-sm text-slate-500">({product.reviews} değerlendirme)</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="rounded-full p-2 transition hover:bg-slate-100"
                      >
                        {favorites.includes(product.id) ? (
                          <HeartIconSolid className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5 text-slate-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {product.category}
                      </span>
                      {product.discount && (
                        <span className="rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
                          %{product.discount} İndirim
                        </span>
                      )}
                      {product.inStock ? (
                        <span className="text-sm text-green-600">✓ Stokta</span>
                      ) : (
                        <span className="text-sm text-red-600">× Tükendi</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      {product.originalPrice && (
                        <p className="text-sm text-slate-500 line-through">
                          {product.originalPrice.toLocaleString("tr-TR")} TL
                        </p>
                      )}
                      <p className="text-2xl font-bold text-slate-900">
                        {product.price.toLocaleString("tr-TR")} TL
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock || cart.includes(product.id)}
                      className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 active:scale-95"
                    >
                      {cart.includes(product.id) ? "Sepette" : "Sepete Ekle"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <ShoppingBagIcon className="h-16 w-16 text-slate-300" />
              <p className="mt-4 text-lg font-medium text-slate-900">Ürün bulunamadı</p>
              <p className="mt-1 text-sm text-slate-500">
                Arama kriterlerinizi değiştirmeyi deneyin.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
