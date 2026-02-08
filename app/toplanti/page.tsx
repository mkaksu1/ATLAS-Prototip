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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "scheduled" | "completed">("all");
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [quickJoinCode, setQuickJoinCode] = useState("");
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

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
        <div className="border-b border-slate-200 p-4 bg-gradient-to-r from-slate-50 to-white">
          <Link href="/" className="group flex items-center gap-3 transition hover:scale-105 active:scale-95">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-lg transition group-hover:shadow-xl">
              <VideoCameraIcon className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-lg font-black italic bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] bg-clip-text text-transparent">ATLAS</span>
              <span className="block text-xs font-semibold text-slate-500">Toplantı</span>
            </div>
          </Link>
        </div>

        {/* New Meeting Button */}
        <div className="border-b border-slate-200 p-4">
          <button 
            onClick={() => setShowNewMeetingModal(true)}
            className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni Toplantı</span>
          </button>
        </div>

        {/* Quick Join */}
        <div className="border-b border-slate-200 p-4">
          <div className="rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Hızlı Katılım</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Toplantı kodu"
                value={quickJoinCode}
                onChange={(e) => setQuickJoinCode(e.target.value)}
                className="flex-1 rounded-lg border-2 border-slate-200 px-3 py-2.5 text-sm transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
              />
              <button 
                onClick={() => {
                  if (quickJoinCode.trim()) {
                    setShowJoinModal(true);
                  } else {
                    alert("Lütfen toplantı kodu girin!");
                  }
                }}
                className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Katıl
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Yaklaşan Toplantılar</h3>
          <div className="space-y-2.5">
            {upcomingMeetings.slice(0, 5).map((meeting) => (
              <button
                key={meeting.id}
                onClick={() => {
                  setSelectedMeeting(meeting);
                  setShowDetailModal(true);
                }}
                className="group w-full rounded-xl border-2 border-slate-200 bg-white p-3.5 text-left transition hover:border-blue-500 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <div className="mb-2 flex items-start justify-between">
                  <p className="flex-1 text-sm font-semibold text-slate-900 leading-tight">{meeting.title}</p>
                  <div className="ml-2 flex-shrink-0">{getTypeIcon(meeting.type)}</div>
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
              </button>
            ))}
          </div>
        </div>

        {/* Meeting Stats */}
        <div className="border-t border-slate-200 p-4 bg-slate-50">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-center shadow-md">
              <p className="text-2xl font-bold text-white">{upcomingMeetings.length}</p>
              <p className="text-xs font-semibold text-white/90">Planlanan</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-4 text-center shadow-md">
              <p className="text-2xl font-bold text-white">
                {meetings.filter((m) => m.status === "completed").length}
              </p>
              <p className="text-xs font-semibold text-white/90">Tamamlandı</p>
            </div>
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
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Toplantılar</h1>
              <div className="hidden md:flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  filterStatus === "all"
                    ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Tümü
              </button>
              <button
                onClick={() => setFilterStatus("scheduled")}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  filterStatus === "scheduled"
                    ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Planlanmış
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  filterStatus === "completed"
                    ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Geçmiş
              </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-initial">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Toplantı ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-80 rounded-xl border-2 border-slate-200 py-2.5 pl-10 pr-4 text-sm transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>
              <button className="hidden sm:block rounded-lg p-2.5 transition hover:bg-blue-50 hover:text-blue-600 active:scale-95">
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Meetings List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="group rounded-2xl border-2 border-slate-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-2xl hover:scale-[1.02] active:scale-100"
              >
                <div className="flex items-start gap-4">
                  {/* Date Badge */}
                  <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-center shadow-lg transition group-hover:scale-110">
                    <p className="text-xs font-semibold text-white/80 uppercase">
                      {new Date(meeting.date).toLocaleDateString("tr-TR", { month: "short" })}
                    </p>
                    <p className="text-2xl font-bold text-white">
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
                          <button 
                            onClick={() => {
                              setSelectedMeeting(meeting);
                              setShowJoinModal(true);
                            }}
                            className="rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
                          >
                            📹 Katıl
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedMeeting(meeting);
                              setShowDetailModal(true);
                            }}
                            className="rounded-xl border-2 border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
                          >
                            Detaylar
                          </button>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(meeting.meetingCode);
                              alert("Toplantı kodu kopyalandı!");
                            }}
                            className="rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 transition hover:bg-slate-50 hover:border-slate-400"
                          >
                            <LinkIcon className="h-4 w-4 text-slate-600" />
                          </button>
                        </>
                      )}
                      {meeting.status === "completed" && (
                        <button className="rounded-xl border-2 border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400">
                          🎥 Kayıt İzle
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

      {/* New Meeting Modal */}
      {showNewMeetingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowNewMeetingModal(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] p-6 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Yeni Toplantı Oluştur</h2>
                  <p className="text-white/80 text-sm mt-1">Video veya ses toplantısı planlayın</p>
                </div>
                <button
                  onClick={() => setShowNewMeetingModal(false)}
                  className="rounded-lg p-2 transition hover:bg-white/20"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Toplantı Başlığı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="örn: Sprint Planlama Toplantısı"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tarih</label>
                  <input
                    type="date"
                    defaultValue="2026-02-07"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Saat</label>
                  <input
                    type="time"
                    defaultValue="14:00"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Süre</label>
                <select className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20">
                  <option>15 dakika</option>
                  <option>30 dakika</option>
                  <option>45 dakika</option>
                  <option selected>60 dakika</option>
                  <option>90 dakika</option>
                  <option>120 dakika</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Toplantı Türü</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="rounded-xl border-2 border-[#2d4a7c] bg-blue-50 p-4 text-center transition hover:bg-blue-100">
                    <VideoCameraIcon className="h-6 w-6 mx-auto mb-2 text-[#2d4a7c]" />
                    <span className="text-sm font-semibold text-[#2d4a7c]">Video</span>
                  </button>
                  <button className="rounded-xl border-2 border-slate-200 bg-white p-4 text-center transition hover:border-slate-300 hover:bg-slate-50">
                    <PhoneIcon className="h-6 w-6 mx-auto mb-2 text-slate-600" />
                    <span className="text-sm font-semibold text-slate-600">Ses</span>
                  </button>
                  <button className="rounded-xl border-2 border-slate-200 bg-white p-4 text-center transition hover:border-slate-300 hover:bg-slate-50">
                    <MicrophoneIcon className="h-6 w-6 mx-auto mb-2 text-slate-600" />
                    <span className="text-sm font-semibold text-slate-600">Hibrit</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Açıklama</label>
                <textarea
                  rows={3}
                  placeholder="Toplantı açıklaması ve gündem..."
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20 resize-none"
                />
              </div>

              <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
                <div className="flex gap-3">
                  <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">İpucu</h4>
                    <p className="text-sm text-blue-700">Toplantı linki otomatik oluşturulacak ve katılımcılara gönderilecektir.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-slate-200 p-4 flex-shrink-0 bg-slate-50">
              <button
                onClick={() => setShowNewMeetingModal(false)}
                className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  alert("Toplantı oluşturuldu!");
                  setShowNewMeetingModal(false);
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Detail Modal */}
      {showDetailModal && selectedMeeting && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] p-6 text-white flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedMeeting.title}</h2>
                  <p className="text-white/90 text-sm">{selectedMeeting.description}</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="rounded-lg p-2 transition hover:bg-white/20 flex-shrink-0 ml-4"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarIcon className="h-5 w-5 text-slate-600" />
                    <span className="text-sm font-semibold text-slate-700">Tarih</span>
                  </div>
                  <p className="text-slate-900 font-semibold">
                    {new Date(selectedMeeting.date).toLocaleDateString("tr-TR", { 
                      day: "numeric", 
                      month: "long", 
                      year: "numeric" 
                    })}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <ClockIcon className="h-5 w-5 text-slate-600" />
                    <span className="text-sm font-semibold text-slate-700">Saat</span>
                  </div>
                  <p className="text-slate-900 font-semibold">{selectedMeeting.time} • {selectedMeeting.duration}</p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <UserGroupIcon className="h-5 w-5 text-slate-600" />
                  <span className="text-sm font-semibold text-slate-700">Katılımcılar ({selectedMeeting.participants.length})</span>
                </div>
                <div className="space-y-2">
                  {selectedMeeting.participants.map((participant, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] flex items-center justify-center text-white text-sm font-bold">
                        {participant.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-900">{participant}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <LinkIcon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-900">Toplantı Kodu</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded-lg bg-white px-4 py-2 text-blue-700 font-mono font-semibold border border-blue-300">
                    {selectedMeeting.meetingCode}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedMeeting.meetingCode);
                      alert("Kod kopyalandı!");
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Kopyala
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
                <div className="flex gap-3">
                  <svg className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900 mb-1">Bilgi</h4>
                    <p className="text-sm text-amber-700">Düzenleyen: {selectedMeeting.organizer}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-slate-200 p-4 flex-shrink-0 bg-slate-50">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
              >
                Kapat
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setShowJoinModal(true);
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
              >
                🎥 Toplantıya Katıl
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Meeting Modal */}
      {showJoinModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowJoinModal(false)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] p-6 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Toplantıya Katılın</h2>
                  <p className="text-white/80 text-sm mt-1">Kamera ve mikrofonunuzu ayarlayın</p>
                </div>
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="rounded-lg p-2 transition hover:bg-white/20"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Video Preview */}
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {cameraEnabled ? (
                    <div className="text-center">
                      <VideoCameraIcon className="h-24 w-24 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60 text-sm">Kamera önizlemesi</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4">
                        {selectedMeeting ? selectedMeeting.organizer.charAt(0) : "K"}
                      </div>
                      <p className="text-white/60 text-sm">Kamera kapalı</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                  className={`group relative rounded-xl p-4 transition ${
                    cameraEnabled
                      ? "bg-slate-100 hover:bg-slate-200"
                      : "bg-red-100 hover:bg-red-200"
                  }`}
                >
                  <VideoCameraIcon className={`h-6 w-6 ${cameraEnabled ? "text-slate-700" : "text-red-600"}`} />
                  {!cameraEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-0.5 w-8 bg-red-600 rotate-45"></div>
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`group relative rounded-xl p-4 transition ${
                    micEnabled
                      ? "bg-slate-100 hover:bg-slate-200"
                      : "bg-red-100 hover:bg-red-200"
                  }`}
                >
                  <MicrophoneIcon className={`h-6 w-6 ${micEnabled ? "text-slate-700" : "text-red-600"}`} />
                  {!micEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-0.5 w-8 bg-red-600 rotate-45"></div>
                    </div>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-1">Kamera</p>
                  <p className={`text-xs font-medium ${cameraEnabled ? "text-green-600" : "text-red-600"}`}>
                    {cameraEnabled ? "✓ Açık" : "✗ Kapalı"}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-1">Mikrofon</p>
                  <p className={`text-xs font-medium ${micEnabled ? "text-green-600" : "text-red-600"}`}>
                    {micEnabled ? "✓ Açık" : "✗ Kapalı"}
                  </p>
                </div>
              </div>

              {selectedMeeting && (
                <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Toplantı Bilgileri</h4>
                  <p className="text-sm text-blue-700 mb-1">
                    <strong>Başlık:</strong> {selectedMeeting.title}
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Kod:</strong> {selectedMeeting.meetingCode}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 border-t border-slate-200 p-4 flex-shrink-0 bg-slate-50">
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setSelectedMeeting(null);
                }}
                className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  alert("Toplantıya katılıyorsunuz...");
                  setShowJoinModal(false);
                }}
                className="flex-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
              >
                🎥 Şimdi Katıl
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
