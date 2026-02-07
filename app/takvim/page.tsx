"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  PlusIcon,
  Squares2X2Icon,
  ListBulletIcon,
  EllipsisVerticalIcon,
  VideoCameraIcon,
  BellIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

type Event = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  location?: string;
  attendees?: number;
  type: "meeting" | "personal" | "holiday" | "reminder";
  description: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Proje Durum Toplantısı",
    date: "2026-02-07",
    startTime: "09:00",
    endTime: "10:00",
    color: "bg-blue-500",
    location: "Toplantı Odası A",
    attendees: 8,
    type: "meeting",
    description: "Aylık proje ilerlemesi ve hedef değerlendirmesi",
  },
  {
    id: 2,
    title: "Müşteri Görüşmesi",
    date: "2026-02-07",
    startTime: "14:00",
    endTime: "15:30",
    color: "bg-green-500",
    location: "Zoom",
    attendees: 4,
    type: "meeting",
    description: "Yeni hizmet paketi sunumu",
  },
  {
    id: 3,
    title: "Ekip Yemeği",
    date: "2026-02-07",
    startTime: "12:30",
    endTime: "13:30",
    color: "bg-purple-500",
    location: "Merkez Restoran",
    attendees: 12,
    type: "personal",
    description: "Aylık ekip buluşması",
  },
  {
    id: 4,
    title: "Stratejik Planlama",
    date: "2026-02-08",
    startTime: "10:00",
    endTime: "12:00",
    color: "bg-orange-500",
    location: "Yönetim Odası",
    attendees: 6,
    type: "meeting",
    description: "2026 Q2 planlaması",
  },
  {
    id: 5,
    title: "Teknik Eğitim",
    date: "2026-02-10",
    startTime: "15:00",
    endTime: "17:00",
    color: "bg-indigo-500",
    location: "Online",
    attendees: 25,
    type: "meeting",
    description: "Yeni teknoloji stack tanıtımı",
  },
  {
    id: 6,
    title: "Bütçe Toplantısı",
    date: "2026-02-11",
    startTime: "09:30",
    endTime: "11:00",
    color: "bg-red-500",
    location: "Toplantı Odası B",
    attendees: 5,
    type: "meeting",
    description: "Q1 bütçe gözden geçirme",
  },
  {
    id: 7,
    title: "Doktor Randevusu",
    date: "2026-02-12",
    startTime: "11:00",
    endTime: "11:30",
    color: "bg-pink-500",
    location: "Sağlık Merkezi",
    type: "personal",
    description: "Yıllık kontrol",
  },
  {
    id: 8,
    title: "Ürün Demo",
    date: "2026-02-13",
    startTime: "16:00",
    endTime: "17:00",
    color: "bg-teal-500",
    location: "Teams",
    attendees: 15,
    type: "meeting",
    description: "Potansiyel müşteriye sunum",
  },
];

const menuItems = [
  { name: "Takvim Görünümü", icon: CalendarIcon, active: true },
  { name: "Gün", icon: Squares2X2Icon, active: false },
  { name: "Hafta", icon: ListBulletIcon, active: false },
  { name: "Ay", icon: Squares2X2Icon, active: false },
];

export default function TakvimPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 7)); // Feb 7, 2026
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert to Monday-based

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date(2026, 1, 7); // Demo date
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(selectedDate);

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
              <CalendarIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Takvim</span>
          </Link>
        </div>

        {/* New Event Button */}
        <div className="border-b border-slate-200 p-4">
          <button className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni Etkinlik</span>
          </button>
        </div>

        {/* Mini Calendar */}
        <div className="border-b border-slate-200 p-4">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={() => changeMonth(-1)}
                  className="rounded p-1 transition hover:bg-slate-100"
                >
                  <ChevronLeftIcon className="h-4 w-4 text-slate-600" />
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="rounded p-1 transition hover:bg-slate-100"
                >
                  <ChevronRightIcon className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Mini calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-slate-400">
                  {day[0]}
                </div>
              ))}
              {days.map((day, idx) => {
                const hasEvents = day && getEventsForDate(day).length > 0;
                return (
                  <button
                    key={idx}
                    onClick={() => day && setSelectedDate(day)}
                    className={`aspect-square text-xs transition rounded ${
                      !day
                        ? "invisible"
                        : isToday(day)
                        ? "bg-red-500 text-white font-semibold"
                        : isSelected(day)
                        ? "bg-red-50 text-red-600 font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                    disabled={!day}
                  >
                    {day && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>{day.getDate()}</span>
                        {hasEvents && (
                          <div className="w-1 h-1 rounded-full bg-red-500 mt-0.5"></div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 border-b border-slate-200 px-3 py-3">
          {menuItems.map(({ name, icon: Icon, active }) => (
            <button
              key={name}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-red-50 text-red-600 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1 text-left">{name}</span>
            </button>
          ))}
        </nav>

        {/* Upcoming Events */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Yaklaşan Etkinlikler
          </h3>
          <div className="space-y-2">
            {events.slice(0, 5).map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="mb-1 flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${event.color}`}></div>
                  <span className="text-sm font-semibold text-slate-900">{event.title}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ClockIcon className="h-3 w-3" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-3 sm:px-6 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-3 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h1>
              <div className="flex gap-1">
                <button
                  onClick={() => changeMonth(-1)}
                  className="rounded-lg p-2 transition hover:bg-slate-100"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-slate-600" />
                </button>
                <button
                  onClick={() => setSelectedDate(new Date(2026, 1, 7))}
                  className="hidden sm:block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Bugün
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="rounded-lg p-2 transition hover:bg-slate-100"
                >
                  <ChevronRightIcon className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
                <button
                  onClick={() => setViewMode("month")}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === "month"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Ay
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === "week"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Hafta
                </button>
                <button
                  onClick={() => setViewMode("day")}
                  className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === "day"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Gün
                </button>
              </div>

              <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
                <EllipsisVerticalIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="border-r border-slate-200 p-3 text-center text-sm font-semibold text-slate-700 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {days.map((day, idx) => {
                const dayEvents = day ? getEventsForDate(day) : [];
                return (
                  <div
                    key={idx}
                    className={`min-h-32 border-r border-b border-slate-200 p-2 transition hover:bg-slate-50 ${
                      !day ? "bg-slate-50/50" : ""
                    } ${idx % 7 === 6 ? "border-r-0" : ""}`}
                  >
                    {day && (
                      <>
                        <div className="mb-2 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedDate(day)}
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition ${
                              isToday(day)
                                ? "bg-red-500 text-white"
                                : isSelected(day)
                                ? "bg-red-50 text-red-600"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {day.getDate()}
                          </button>
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map((event) => (
                            <button
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`w-full rounded px-2 py-1 text-left text-xs font-medium text-white transition hover:opacity-90 ${event.color}`}
                            >
                              <div className="truncate">{event.title}</div>
                              <div className="truncate opacity-90">{event.startTime}</div>
                            </button>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="px-2 text-xs text-slate-500">
                              +{dayEvents.length - 3} daha
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${selectedEvent.color} rounded-t-xl p-6 text-white`}>
              <div className="mb-2 flex items-start justify-between">
                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-lg p-1 transition hover:bg-white/20"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white/90">{selectedEvent.description}</p>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-slate-400" />
                <div>
                  <div className="font-medium text-slate-900">
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </div>
                  <div className="text-sm text-slate-500">{selectedEvent.date}</div>
                </div>
              </div>

              {selectedEvent.location && (
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-5 w-5 text-slate-400" />
                  <div className="text-slate-900">{selectedEvent.location}</div>
                </div>
              )}

              {selectedEvent.attendees && (
                <div className="flex items-center gap-3">
                  <UserGroupIcon className="h-5 w-5 text-slate-400" />
                  <div className="text-slate-900">{selectedEvent.attendees} katılımcı</div>
                </div>
              )}

              {selectedEvent.type === "meeting" && (
                <div className="flex items-center gap-3">
                  <VideoCameraIcon className="h-5 w-5 text-slate-400" />
                  <div className="text-slate-900">Online Toplantı</div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-slate-200 p-6">
              <button className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Düzenle
              </button>
              <button className="flex-1 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-105 active:scale-95">
                Katıl
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
