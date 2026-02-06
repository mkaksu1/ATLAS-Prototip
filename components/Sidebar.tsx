"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  EnvelopeIcon,
  FolderIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Ana Sayfa", href: "/", Icon: HomeIcon },
  { name: "Gelen Kutusu", href: "/mail", Icon: EnvelopeIcon },
  { name: "Dosyalarım", href: "/drive", Icon: FolderIcon },
  { name: "Arama", href: "/arama", Icon: MagnifyingGlassIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[#0B1B3D] px-4 py-6 shadow-xl shadow-black/30">
      <div className="mb-8 px-2 text-lg font-semibold tracking-wide text-[#FFC72C]">
        ATLAS
      </div>
      <nav className="space-y-2">
        {navItems.map(({ name, href, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href as any}
              className={`group flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-white/5 ${
                isActive ? "text-[#FFC72C]" : "text-white"
              }`}
            >
              <span
                className={`h-8 w-1 rounded-full bg-[#FFC72C] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                }`}
              />
              <Icon className="h-6 w-6" />
              <span className="text-sm font-medium">{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
