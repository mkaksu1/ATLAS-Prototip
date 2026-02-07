"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  StarIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: "active" | "away" | "busy" | "offline";
  skills: string[];
  projects: number;
  tasksCompleted: number;
  joinDate: string;
  isFavorite: boolean;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    role: "Proje Müdürü",
    department: "Yönetim",
    email: "ahmet.yilmaz@atlas.gov.tr",
    phone: "+90 555 123 4567",
    location: "Ankara",
    avatar: "AY",
    status: "active",
    skills: ["Proje Yönetimi", "Strateji", "Liderlik"],
    projects: 8,
    tasksCompleted: 142,
    joinDate: "2024-01-15",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Fatma Demir",
    role: "Kıdemli Yazılım Geliştirici",
    department: "Yazılım",
    email: "fatma.demir@atlas.gov.tr",
    phone: "+90 555 234 5678",
    location: "İstanbul",
    avatar: "FD",
    status: "active",
    skills: ["React", "Node.js", "TypeScript"],
    projects: 12,
    tasksCompleted: 287,
    joinDate: "2023-06-20",
    isFavorite: true,
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    role: "UX/UI Tasarımcı",
    department: "Tasarım",
    email: "mehmet.kaya@atlas.gov.tr",
    phone: "+90 555 345 6789",
    location: "İzmir",
    avatar: "MK",
    status: "busy",
    skills: ["Figma", "UI Design", "User Research"],
    projects: 6,
    tasksCompleted: 156,
    joinDate: "2023-09-10",
    isFavorite: false,
  },
  {
    id: 4,
    name: "Ayşe Şahin",
    role: "Veri Analisti",
    department: "Veri & Analitik",
    email: "ayse.sahin@atlas.gov.tr",
    phone: "+90 555 456 7890",
    location: "Ankara",
    avatar: "AŞ",
    status: "active",
    skills: ["Python", "SQL", "Tableau"],
    projects: 9,
    tasksCompleted: 203,
    joinDate: "2023-11-05",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Zeynep Arslan",
    role: "Sistem Mimarı",
    department: "Altyapı",
    email: "zeynep.arslan@atlas.gov.tr",
    phone: "+90 555 567 8901",
    location: "İstanbul",
    avatar: "ZA",
    status: "away",
    skills: ["Kubernetes", "AWS", "Microservices"],
    projects: 5,
    tasksCompleted: 98,
    joinDate: "2024-02-01",
    isFavorite: true,
  },
  {
    id: 6,
    name: "Can Öztürk",
    role: "Backend Geliştirici",
    department: "Yazılım",
    email: "can.ozturk@atlas.gov.tr",
    phone: "+90 555 678 9012",
    location: "Ankara",
    avatar: "CÖ",
    status: "active",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
    projects: 7,
    tasksCompleted: 178,
    joinDate: "2023-07-15",
    isFavorite: false,
  },
  {
    id: 7,
    name: "Elif Koç",
    role: "DevOps Mühendisi",
    department: "Altyapı",
    email: "elif.koc@atlas.gov.tr",
    phone: "+90 555 789 0123",
    location: "İzmir",
    avatar: "EK",
    status: "active",
    skills: ["Docker", "Jenkins", "Terraform"],
    projects: 10,
    tasksCompleted: 201,
    joinDate: "2023-05-20",
    isFavorite: false,
  },
  {
    id: 8,
    name: "Burak Yıldız",
    role: "Güvenlik Uzmanı",
    department: "Güvenlik",
    email: "burak.yildiz@atlas.gov.tr",
    phone: "+90 555 890 1234",
    location: "Ankara",
    avatar: "BY",
    status: "offline",
    skills: ["Penetration Testing", "SIEM", "Compliance"],
    projects: 4,
    tasksCompleted: 87,
    joinDate: "2024-01-10",
    isFavorite: false,
  },
];

export default function EkipPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>(
    teamMembers.filter((m) => m.isFavorite).map((m) => m.id)
  );

  const departments = Array.from(new Set(teamMembers.map((m) => m.department)));

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      case "offline":
        return "bg-slate-400";
    }
  };

  const getStatusText = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "away":
        return "Uzakta";
      case "busy":
        return "Meşgul";
      case "offline":
        return "Çevrimdışı";
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
              <UserGroupIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Ekip</span>
          </Link>
        </div>

        {/* Add Member Button */}
        <div className="border-b border-slate-200 p-4">
          <button className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Üye Ekle</span>
          </button>
        </div>

        {/* Departments */}
        <div className="border-b border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Departmanlar</h3>
          <div className="space-y-1">
            <button
              onClick={() => setFilterDepartment("all")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                filterDepartment === "all"
                  ? "bg-blue-100 font-medium text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <UserGroupIcon className="h-4 w-4" />
              Tüm Ekip
              <span className="ml-auto text-xs">{teamMembers.length}</span>
            </button>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDepartment(dept)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  filterDepartment === dept
                    ? "bg-blue-100 font-medium text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <BriefcaseIcon className="h-4 w-4" />
                {dept}
                <span className="ml-auto text-xs">
                  {teamMembers.filter((m) => m.department === dept).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Ekip İstatistikleri</h3>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-green-100 p-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Tamamlanan Görevler</p>
                    <p className="text-lg font-bold text-slate-900">
                      {teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <BriefcaseIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Aktif Projeler</p>
                    <p className="text-lg font-bold text-slate-900">
                      {teamMembers.reduce((sum, m) => sum + m.projects, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <UserGroupIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Toplam Üye</p>
                    <p className="text-lg font-bold text-slate-900">{teamMembers.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Aktif Üyeler</span>
            <span className="font-semibold text-slate-900">
              {teamMembers.filter((m) => m.status === "active").length} / {teamMembers.length}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Ekip Üyeleri</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-initial">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ekip üyesi ara..."
                  className="w-full sm:w-80 rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="hidden sm:flex gap-1 rounded-lg bg-slate-100 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-l-lg px-3 py-2 transition ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-r-lg px-3 py-2 transition ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Members Grid/List */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                          {member.avatar}
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{member.name}</h3>
                        <p className="text-sm text-slate-600">{member.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(member.id)}
                      className="rounded p-1 transition hover:bg-slate-100"
                    >
                      {favorites.includes(member.id) ? (
                        <StarIconSolid className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <StarIcon className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <BriefcaseIcon className="h-4 w-4" />
                      {member.department}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPinIcon className="h-4 w-4" />
                      {member.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <EnvelopeIcon className="h-4 w-4" />
                      {member.email}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold text-slate-500">Yetenekler</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-900">{member.projects}</p>
                      <p className="text-xs text-slate-500">Proje</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-900">{member.tasksCompleted}</p>
                      <p className="text-xs text-slate-500">Görev</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
                      {member.avatar}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{member.name}</h3>
                      <span className="text-sm text-slate-500">•</span>
                      <span className="text-sm text-slate-600">{member.role}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <BriefcaseIcon className="h-3.5 w-3.5" />
                        {member.department}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="h-3.5 w-3.5" />
                        {member.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <EnvelopeIcon className="h-3.5 w-3.5" />
                        {member.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">{member.projects}</p>
                      <p className="text-xs text-slate-500">Proje</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">{member.tasksCompleted}</p>
                      <p className="text-xs text-slate-500">Görev</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(member.id)}
                    className="rounded p-2 transition hover:bg-slate-100"
                  >
                    {favorites.includes(member.id) ? (
                      <StarIconSolid className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <StarIcon className="h-5 w-5 text-slate-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          {filteredMembers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <UserGroupIcon className="h-16 w-16 text-slate-300" />
              <p className="mt-4 text-lg font-medium text-slate-900">Üye bulunamadı</p>
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
