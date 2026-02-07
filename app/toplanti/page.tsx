"use client";

import { useState } from "react";
import Link from "next/link";
import {
  VideoCameraIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  LinkIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon,
  ArrowPathIcon,
  PhoneIcon,
  MicrophoneIcon,
  Squares2X2Icon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

type Meeting = {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  meetingCode: string;
  organizer: string;
  type: "video" | "audio" | "hybrid";
  description: string;
};

const meetings: Meeting[] = [
  {
    id: 1,
    title: "ATLAS Proje Kickoff",
    date: "2026-02-07",
    time: "14:00",
    duration: "60 dk",
    participants: ["Ahmet Yılmaz", "Fatma Demir", "Mehmet Kaya", "Ayşe Şahin"],
    status: "scheduled",
    meetingCode: "abc-defg-hij",
    organizer: "Ahmet Yılmaz",
    type: "video",
    description: "Proje başlangıç toplantısı ve görev dağılımı",
  },
  {
    id: 2,
    title: "Teknik İnceleme",
    date: "2026-02-07",
    time: "16:00",
    duration: "45 dk",
    participants: ["Zeynep Arslan", "Can Öztürk", "Elif Koç"],
    status: "scheduled",
    meetingCode: "xyz-mnop-qrs",
    organizer: "Can Öztürk",
    type: "video",
    description: "Mimari yapı ve teknoloji seçimi",
  },
  {
    id: 3,
    title: "Günlük Standup",
    date: "2026-02-06",
    time: "09:30",
    duration: "15 dk",
    participants: ["Ekip", "Tüm Üyeler"],
    status: "completed",
    meetingCode: "daily-001",
    organizer: "Sistem",
    type: "audio",
    description: "Günlük ilerleme paylaşımı",
  },
  {
    id: 4,
    title: "Müşteri Sunumu",
    date: "2026-02-09",
    time: "11:00",
    duration: "90 dk",
    participants: ["Müşteri", "Satış Ekibi", "Ürün Ekibi"],
    status: "scheduled",
    meetingCode: "prs-demo-123",
    organizer: "Fatma Demir",
    type: "hybrid",
    description: "Q1 ürün roadmap sunumu",
  },
  {
    id: 5,
    title: "Sprint Planlama",
    date: "2026-02-10",
    time: "10:00",
    duration: "120 dk",
    participants: ["Ahmet Yılmaz", "Mehmet Kaya", "Zeynep Arslan", "Can Öztürk"],
    status: "scheduled",
    meetingCode: "sprint-002",
    organizer: "Mehmet Kaya",
    type: "video",
    description: "Sprint 2 görev planlaması ve önceliklendirme",
  },
  {
    id: 6,
    title: "Teknik Destek Görüşmesi",
    date: "2026-02-05",
    time: "15:00",
    duration: "30 dk",
    participants: ["Destek Ekibi", "Müşteri"],
    status: "completed",
    meetingCode: "sup-456",
    organizer: "Elif Koç",
    type: "video",
    description: "Sistem entegrasyon problemleri",
  },
];

export default function ToplantiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "scheduled" | "completed">("all");

  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || meeting.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const upcomingMeetings = meetings.filter(
    (m) => m.status === "scheduled" && new Date(m.date + "T" + m.time) > new Date()
  );

  const getStatusColor = (status: Meeting["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-slate-100 text-slate-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
    }
  };

  const getStatusText = (status: Meeting["status"]) => {
    switch (status) {
      case "scheduled":
        return "Planlandı";
      case "in-progress":
        return "Devam Ediyor";
      case "completed":
        return "Tamamlandı";
      case "cancelled":
        return "İptal Edildi";
    }
  };

  const getTypeIcon = (type: Meeting["type"]) => {
    switch (type) {
      case "video":
        return <VideoCameraIcon className="h-4 w-4" />;
      case "audio":
        return <PhoneIcon className="h-4 w-4" />;
      case "hybrid":
        return <MicrophoneIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <aside className="flex w-80 flex-col border-r border-slate-200 bg-slate-50/50 overflow-hidden">
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md">
              <VideoCameraIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Toplantı</span>
          </Link>
        </div>

        {/* New Meeting Button */}
        <div className="border-b border-slate-200 p-4">
          <button className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni Toplantı</span>
          </button>
        </div>

        {/* Quick Join */}
        <div className="border-b border-slate-200 p-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Hızlı Katılım</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Toplantı kodu"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
                Katıl
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Yaklaşan Toplantılar</h3>
          <div className="space-y-2">
            {upcomingMeetings.slice(0, 5).map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-lg border border-slate-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm"
              >
                <div className="mb-1 flex items-start justify-between">
                  <p className="text-sm font-medium text-slate-900">{meeting.title}</p>
                  {getTypeIcon(meeting.type)}
                </div>
                <p className="mb-2 text-xs text-slate-500">
                  {meeting.time} • {meeting.duration}
                </p>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="h-3.5 w-3.5 text-slate-400" />
                  <p className="text-xs text-slate-600">
                    {meeting.participants.length} kişi
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Stats */}
        <div className="border-t border-slate-200 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-blue-50 p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{upcomingMeetings.length}</p>
              <p className="text-xs text-blue-600">Planlanmış</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3 text-center">
              <p className="text-2xl font-bold text-green-600">
                {meetings.filter((m) => m.status === "completed").length}
              </p>
              <p className="text-xs text-green-600">Tamamlandı</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Toplantılar</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  filterStatus === "all"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Tümü
              </button>
              <button
                onClick={() => setFilterStatus("scheduled")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  filterStatus === "scheduled"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Planlanmış
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  filterStatus === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Geçmiş
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Toplantı ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="rounded-lg p-2 transition hover:bg-slate-100">
              <ArrowPathIcon className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </header>

        {/* Meetings List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  {/* Date Badge */}
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-slate-100 text-center">
                    <p className="text-xs font-medium text-slate-500">
                      {new Date(meeting.date).toLocaleDateString("tr-TR", { month: "short" })}
                    </p>
                    <p className="text-xl font-bold text-slate-900">
                      {new Date(meeting.date).getDate()}
                    </p>
                  </div>

                  {/* Meeting Info */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{meeting.title}</h3>
                        <p className="text-sm text-slate-600">{meeting.description}</p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(meeting.status)}`}
                      >
                        {getStatusText(meeting.status)}
                      </span>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <ClockIcon className="h-4 w-4" />
                        {meeting.time} • {meeting.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <UserGroupIcon className="h-4 w-4" />
                        {meeting.participants.length} katılımcı
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        {getTypeIcon(meeting.type)}
                        {meeting.type === "video" ? "Video" : meeting.type === "audio" ? "Ses" : "Hibrit"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <LinkIcon className="h-4 w-4" />
                        {meeting.meetingCode}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {meeting.status === "scheduled" && (
                        <>
                          <button className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 active:scale-95">
                            Katıl
                          </button>
                          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                            Detaylar
                          </button>
                          <button className="rounded-lg border border-slate-200 px-3 py-2 transition hover:bg-slate-50">
                            <LinkIcon className="h-4 w-4 text-slate-600" />
                          </button>
                        </>
                      )}
                      {meeting.status === "completed" && (
                        <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          Kayıt İzle
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMeetings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <VideoCameraIcon className="h-16 w-16 text-slate-300" />
              <p className="mt-4 text-lg font-medium text-slate-900">Toplantı bulunamadı</p>
              <p className="mt-1 text-sm text-slate-500">
                Yeni bir toplantı oluşturmak için "Yeni Toplantı" butonunu kullanın.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
