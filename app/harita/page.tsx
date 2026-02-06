"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Preload icon URLs to avoid missing assets in Next bundle
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function HaritaPage() {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current).setView([41.015137, 28.97953], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap katkıcıları",
    }).addTo(map);

    L.marker([41.015137, 28.97953], { icon: markerIcon })
      .addTo(map)
      .bindPopup("ATLAS İstanbul Demo Noktası");

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Harita</p>
        <h1 className="text-2xl font-semibold text-slate-900">ATLAS Harita Demo</h1>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div ref={containerRef} className="h-[520px] w-full" />
      </div>
    </section>
  );
}
