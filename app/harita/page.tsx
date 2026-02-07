"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  PhoneIcon,
  GlobeAltIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  ShoppingBagIcon,
  AcademicCapIcon,
  HeartIcon,
  BeakerIcon,
  Squares2X2Icon,
  ListBulletIcon,
  MapIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon, MapPinIcon as MapPinSolidIcon } from "@heroicons/react/24/solid";

type Location = {
  id: number;
  name: string;
  category: string;
  address: string;
  rating: number;
  reviews: number;
  distance: string;
  hours: string;
  phone?: string;
  website?: string;
  lat: number;
  lng: number;
  image: string;
  tags: string[];
  description: string;
};

const categories = [
  { name: "Tümü", icon: Squares2X2Icon, color: "text-blue-600" },
  { name: "Restoranlar", icon: BuildingStorefrontIcon, color: "text-orange-600" },
  { name: "Oteller", icon: HomeIcon, color: "text-purple-600" },
  { name: "Alışveriş", icon: ShoppingBagIcon, color: "text-pink-600" },
  { name: "Eğitim", icon: AcademicCapIcon, color: "text-green-600" },
  { name: "Sağlık", icon: HeartIcon, color: "text-red-600" },
  { name: "Eğlence", icon: BeakerIcon, color: "text-indigo-600" },
];

const locations: Location[] = [
  {
    id: 1,
    name: "Sultanahmet Camii",
    category: "Turistik Yer",
    address: "Sultan Ahmet, Atmeydanı Cd. No:7, 34122 Fatih/İstanbul",
    rating: 4.8,
    reviews: 58420,
    distance: "2.4 km",
    hours: "Açık • 09:00 - 19:00",
    phone: "+90 212 458 44 68",
    website: "sultanahmetcamii.org",
    lat: 41.0054,
    lng: 28.9768,
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400",
    tags: ["Tarihi", "Müze", "Mimari"],
    description: "Osmanlı mimarisinin en önemli eserlerinden biri olan tarihi cami.",
  },
  {
    id: 2,
    name: "Kapalıçarşı",
    category: "Alışveriş",
    address: "Beyazıt, Kalpakçılar Cd., 34126 Fatih/İstanbul",
    rating: 4.5,
    reviews: 32150,
    distance: "3.1 km",
    hours: "Açık • 09:00 - 19:00",
    phone: "+90 212 519 12 48",
    lat: 41.0108,
    lng: 28.9681,
    image: "https://images.unsplash.com/photo-1583427053903-b57d81a1f3ce?w=400",
    tags: ["Alışveriş", "Tarihi", "Çarşı"],
    description: "Dünyanın en eski ve büyük kapalı çarşılarından biri.",
  },
  {
    id: 3,
    name: "Galata Kulesi",
    category: "Turistik Yer",
    address: "Bereketzade, Galata Kulesi Sk., 34421 Beyoğlu/İstanbul",
    rating: 4.6,
    reviews: 45780,
    distance: "4.2 km",
    hours: "Açık • 08:30 - 23:00",
    phone: "+90 212 293 81 80",
    website: "galatakulesi.istanbul",
    lat: 41.0256,
    lng: 28.9744,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400",
    tags: ["Tarihi", "Manzara", "Kule"],
    description: "İstanbul'un simgelerinden biri olan tarihi kule ve müze.",
  },
  {
    id: 4,
    name: "Dolmabahçe Sarayı",
    category: "Müze",
    address: "Vişnezade, Dolmabahçe Cd., 34357 Beşiktaş/İstanbul",
    rating: 4.7,
    reviews: 38940,
    distance: "5.8 km",
    hours: "Kapalı • Pazartesi kapalı",
    phone: "+90 212 236 90 00",
    website: "millisaraylar.gov.tr",
    lat: 41.0391,
    lng: 29.0002,
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400",
    tags: ["Saray", "Müze", "Tarihi"],
    description: "Osmanlı Devleti'nin son dönem padişahlarının yaşadığı görkemli saray.",
  },
  {
    id: 5,
    name: "Topkapı Sarayı",
    category: "Müze",
    address: "Cankurtaran, 34122 Fatih/İstanbul",
    rating: 4.8,
    reviews: 52300,
    distance: "2.9 km",
    hours: "Açık • 09:00 - 18:00",
    phone: "+90 212 512 04 80",
    website: "topkapisarayi.gov.tr",
    lat: 41.0115,
    lng: 28.9833,
    image: "https://images.unsplash.com/photo-1605441838168-c89e04b54f3e?w=400",
    tags: ["Saray", "Müze", "UNESCO"],
    description: "Osmanlı İmparatorluğu'nun 400 yıl boyunca yönetim merkezi.",
  },
  {
    id: 6,
    name: "Ortaköy Camii",
    category: "Turistik Yer",
    address: "Mecidiye, Mecidiye Köprüsü Sk., 34347 Beşiktaş/İstanbul",
    rating: 4.7,
    reviews: 28650,
    distance: "7.3 km",
    hours: "Her zaman açık",
    lat: 41.0489,
    lng: 29.0275,
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400",
    tags: ["Cami", "Boğaz", "Manzara"],
    description: "Boğaz kıyısında muhteşem mimariye sahip tarihi cami.",
  },
];

const menuItems = [
  { name: "Keşfet", Icon: MapIcon, count: null, active: true },
  { name: "Yıldızlı", Icon: StarIcon, count: 2, active: false },
  { name: "Kayıtlı Yerler", Icon: BookmarkIcon, count: null, active: false },
  { name: "Yol Tarifleri", Icon: MapPinIcon, count: null, active: false },
  { name: "Geçmiş", Icon: ClockIcon, count: 8, active: false },
];

export default function HaritaPage() {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<{ [key: number]: any }>({});
  const leafletRef = useRef<any>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapStyle, setMapStyle] = useState<"default" | "satellite" | "terrain">("default");
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3]));
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchSuggestions, setSearchSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Initialize map with dynamic Leaflet import
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    // Clear any existing Leaflet state from container
    const container = containerRef.current;
    if (container && (container as any)._leaflet_id) {
      delete (container as any)._leaflet_id;
    }

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      leafletRef.current = L.default;
      const LeafletModule = L.default;

      const map = LeafletModule.map(container!, {
        zoomControl: false,
      }).setView([41.015137, 28.97953], 13);

      LeafletModule.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      mapRef.current = map;

      // Add initial markers after map is created
      const markerIcons = {
        default: new LeafletModule.Icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      };

      locations.forEach((location) => {
        const marker = LeafletModule.marker([location.lat, location.lng], {
          icon: markerIcons.default,
        })
          .addTo(map)
          .bindPopup(`<b>${location.name}</b><br/>${location.category}`)
          .on("click", () => setSelectedLocation(location));

        markersRef.current[location.id] = marker;
      });
    }).catch((error) => {
      console.error("Error loading Leaflet:", error);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      // Clean up container state
      if (container && (container as any)._leaflet_id) {
        delete (container as any)._leaflet_id;
      }
      leafletRef.current = null;
    };
  }, []);

  // Update markers when selection changes
  useEffect(() => {
    if (!mapRef.current || !leafletRef.current) return;

    const L = leafletRef.current;

    const markerIcons = {
      default: new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
      selected: new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [35, 57],
        iconAnchor: [17, 57],
      }),
    };

    locations.forEach((location) => {
      const marker = markersRef.current[location.id];
      if (marker) {
        const icon = selectedLocation?.id === location.id ? markerIcons.selected : markerIcons.default;
        marker.setIcon(icon);
      }
    });
  }, [selectedLocation]);

  // Update map style
  useEffect(() => {
    if (!mapRef.current || !leafletRef.current) return;

    const L = leafletRef.current;
    const map = mapRef.current;
    
    map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        layer.remove();
      }
    });

    const tileUrls = {
      default: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    };

    L.tileLayer(tileUrls[mapStyle], {
      attribution: "© OpenStreetMap",
    }).addTo(map);
  }, [mapStyle]);

  // Pan to selected location
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.setView([selectedLocation.lat, selectedLocation.lng], 15, {
        animate: true,
      });
    }
  }, [selectedLocation]);

  const filteredLocations = locations.filter((loc) => {
    const matchesCategory = selectedCategory === "Tümü" || loc.category === selectedCategory;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  // Search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = locations.filter((loc) =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

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
              <MapIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Harita</span>
          </Link>
        </div>

        {/* Search */}
        <div className="border-b border-slate-200 p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Yer, adres veya kategori ara..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            
            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full rounded-lg border border-slate-200 bg-white shadow-xl z-10">
                {searchSuggestions.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setSearchQuery(loc.name);
                      setShowSuggestions(false);
                    }}
                    className="flex w-full items-start gap-3 border-b border-slate-100 p-3 text-left transition hover:bg-slate-50 last:border-0"
                  >
                    <MapPinIcon className="h-5 w-5 shrink-0 text-slate-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm">{loc.name}</p>
                      <p className="text-xs text-slate-500 truncate">{loc.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 border-b border-slate-200 px-3 py-3">
          {menuItems.map(({ name, Icon, count, active }) => (
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
              {count && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    active ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Categories */}
        <div className="border-b border-slate-200 px-4 py-3">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Kategoriler
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? cat.color : ""}`} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode Toggle & Results */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5">
          <p className="text-sm font-medium text-slate-700">
            {filteredLocations.length} konum
          </p>
          <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`rounded p-1.5 transition ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <ListBulletIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded p-1.5 transition ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Squares2X2Icon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Locations List */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {viewMode === "list" ? (
            <div className="divide-y divide-slate-100">
              {filteredLocations.map((location) => {
                const isSelected = selectedLocation?.id === location.id;
                const isFavorited = favorites.has(location.id);
                
                return (
                  <div
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`group cursor-pointer p-4 transition hover:bg-slate-50 ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{location.name}</h3>
                        <p className="text-xs text-slate-500">{location.category}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(location.id);
                        }}
                        className={`shrink-0 transition ${isFavorited ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      >
                        {isFavorited ? (
                          <StarSolidIcon className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <StarIcon className="h-5 w-5 text-slate-300 hover:text-yellow-500" />
                        )}
                      </button>
                    </div>
                    <div className="mb-2 flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <StarSolidIcon className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium text-slate-900">{location.rating}</span>
                        <span className="text-slate-400">({location.reviews.toLocaleString()})</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{location.distance}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <p className="text-xs text-slate-600">{location.hours}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 p-4">
              {filteredLocations.map((location) => {
                const isSelected = selectedLocation?.id === location.id;
                const isFavorited = favorites.has(location.id);
                
                return (
                  <div
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`group cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-lg ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(location.id);
                        }}
                        className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 backdrop-blur-sm transition hover:bg-white"
                      >
                        {isFavorited ? (
                          <StarSolidIcon className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <StarIcon className="h-4 w-4 text-slate-600" />
                        )}
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="mb-1 text-sm font-semibold text-slate-900 line-clamp-1">
                        {location.name}
                      </h3>
                      <div className="mb-1 flex items-center gap-1 text-xs">
                        <StarSolidIcon className="h-3.5 w-3.5 text-yellow-500" />
                        <span className="font-medium text-slate-900">{location.rating}</span>
                      </div>
                      <p className="text-xs text-slate-500">{location.distance}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </aside>

      {/* Main Map Area */}
      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-slate-900">
              {selectedLocation ? selectedLocation.name : "İstanbul"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Map Style Selector */}
            <div className="hidden sm:flex gap-1 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setMapStyle("default")}
                className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                  mapStyle === "default"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Varsayılan
              </button>
              <button
                onClick={() => setMapStyle("satellite")}
                className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                  mapStyle === "satellite"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Uydu
              </button>
              <button
                onClick={() => setMapStyle("terrain")}
                className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                  mapStyle === "terrain"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Arazi
              </button>
            </div>

            {/* Settings */}
            <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
              <Cog6ToothIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Map */}
        <div className="relative flex-1">
          <div ref={containerRef} className="h-full w-full" />

          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-2">
            <button
              onClick={() => mapRef.current?.zoomIn()}
              className="rounded-lg bg-white p-2.5 shadow-lg transition hover:bg-slate-50"
            >
              <PlusIcon className="h-5 w-5 text-slate-700" />
            </button>
            <button
              onClick={() => mapRef.current?.zoomOut()}
              className="rounded-lg bg-white p-2.5 shadow-lg transition hover:bg-slate-50"
            >
              <MinusIcon className="h-5 w-5 text-slate-700" />
            </button>
            <button
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.setView([41.015137, 28.97953], 13);
                  setSelectedLocation(null);
                }
              }}
              className="rounded-lg bg-white p-2.5 shadow-lg transition hover:bg-slate-50"
            >
              <ArrowPathIcon className="h-5 w-5 text-slate-700" />
            </button>
          </div>

          {/* Selected Location Detail Card */}
          {selectedLocation && (
            <div className="absolute bottom-6 left-1/2 z-[1000] w-full max-w-lg -translate-x-1/2 rounded-xl bg-white p-5 shadow-2xl">
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute right-4 top-4 rounded-full bg-slate-100 p-1 transition hover:bg-slate-200"
              >
                <XMarkIcon className="h-4 w-4 text-slate-600" />
              </button>

              <div className="mb-4 flex items-start gap-4">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.name}
                  className="h-28 w-28 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-slate-900">{selectedLocation.name}</h3>
                  <p className="mb-2 text-sm text-slate-500">{selectedLocation.category}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <StarSolidIcon className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold text-slate-900">{selectedLocation.rating}</span>
                      <span className="text-slate-400">({selectedLocation.reviews.toLocaleString()})</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">{selectedLocation.distance}</span>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-sm text-slate-600">{selectedLocation.description}</p>

              <div className="mb-4 space-y-2.5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <p className="text-slate-600">{selectedLocation.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="h-4 w-4 text-slate-400" />
                  <p className="text-slate-600">{selectedLocation.hours}</p>
                </div>
                {selectedLocation.phone && (
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-4 w-4 text-slate-400" />
                    <p className="text-slate-600">{selectedLocation.phone}</p>
                  </div>
                )}
                {selectedLocation.website && (
                  <div className="flex items-center gap-3">
                    <GlobeAltIcon className="h-4 w-4 text-slate-400" />
                    <a
                      href={`https://${selectedLocation.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {selectedLocation.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {selectedLocation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    alert(`📍 ${selectedLocation.name}\n\n${selectedLocation.address}\n\n(Bu bir demo uygulamasıdır. Gerçek yol tarifi özelliği eklenebilir.)`);
                  }}
                  className="flex-1 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-105 active:scale-95"
                >
                  Yol Tarifi
                </button>
                <button
                  onClick={() => toggleFavorite(selectedLocation.id)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 transition hover:bg-slate-50"
                >
                  {favorites.has(selectedLocation.id) ? (
                    <StarSolidIcon className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <StarIcon className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
