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
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");
  const [newEventTitle, setNewEventTitle] = useState("");

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
        <div className="border-b border-slate-200 p-4 bg-gradient-to-r from-slate-50 to-white">
          <Link href="/" className="group flex items-center gap-3 transition hover:scale-105 active:scale-95">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-lg transition group-hover:shadow-xl">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-lg font-black italic bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] bg-clip-text text-transparent">ATLAS</span>
              <span className="block text-xs font-semibold text-slate-500">Takvim</span>
            </div>
          </Link>
        </div>

        {/* New Event Button */}
        <div className="border-b border-slate-200 p-4">
          <button 
            onClick={() => setShowNewEventModal(true)}
            className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          >
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
                  className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                >
                  <ChevronLeftIcon className="h-4 w-4 text-slate-600 hover:text-blue-600" />
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                >
                  <ChevronRightIcon className="h-4 w-4 text-slate-600 hover:text-blue-600" />
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
                        ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white font-semibold"
                        : isSelected(day)
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                    disabled={!day}
                  >
                    {day && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>{day.getDate()}</span>
                        {hasEvents && (
                          <div className="w-1 h-1 rounded-full bg-blue-500 mt-0.5"></div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bugüne Git Butonu */}
            <button
              onClick={() => setSelectedDate(new Date(2026, 1, 7))}
              className="mt-3 w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600"
            >
              Bugüne Git
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 border-b border-slate-200 px-3 py-3">
          <button
            onClick={() => setViewMode("month")}
            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              viewMode === "month"
                ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-sm"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Squares2X2Icon className="h-5 w-5" />
            <span className="flex-1 text-left">Ay Görünümü</span>
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              viewMode === "week"
                ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-sm"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <ListBulletIcon className="h-5 w-5" />
            <span className="flex-1 text-left">Hafta Görünümü</span>
          </button>
          <button
            onClick={() => setViewMode("day")}
            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              viewMode === "day"
                ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-sm"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="flex-1 text-left">Gün Görünümü</span>
          </button>
        </nav>

        {/* Upcoming Events */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Yaklaşan Etkinlikler
          </h3>
          <div className="space-y-2.5">
            {events.slice(0, 5).map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group w-full rounded-xl border-2 border-slate-200 bg-white p-3.5 text-left transition hover:border-blue-500 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <div className="mb-2 flex items-start gap-2">
                  <div className={`mt-0.5 h-3 w-3 rounded-full ${event.color} ring-2 ring-white shadow-md transition group-hover:ring-4`}></div>
                  <span className="flex-1 text-sm font-semibold text-slate-900 leading-tight">{event.title}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ClockIcon className="h-3.5 w-3.5" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                {event.location && (
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    <span className="truncate">{event.location}</span>
                  </div>
                )}
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
                  className="rounded-lg p-2 transition hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelectedDate(new Date(2026, 1, 7))}
                  className="hidden sm:block rounded-lg border-2 border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                >
                  🗓️ Bugün
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="rounded-lg p-2 transition hover:bg-blue-50 hover:text-blue-600 active:scale-95"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
                <button
                  onClick={() => setViewMode("month")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === "month"
                      ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Ay
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === "week"
                      ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Hafta
                </button>
                <button
                  onClick={() => setViewMode("day")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === "day"
                      ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-sm"
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
          {viewMode === "month" && (
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
                                ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white"
                                : isSelected(day)
                                ? "bg-blue-50 text-blue-600"
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
                              className={`w-full rounded px-2 py-1 text-left text-xs font-medium text-white transition hover:opacity-90 hover:scale-105 active:scale-95 ${event.color}`}
                            >
                              <div className="truncate">{event.title}</div>
                              <div className="truncate opacity-90">{event.startTime}</div>
                            </button>
                          ))}
                          {dayEvents.length > 3 && (
                            <button
                              onClick={() => setSelectedDate(day)}
                              className="w-full px-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              +{dayEvents.length - 3} daha fazla
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>          )}

          {/* Week View */}
          {viewMode === "week" && (
            <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
              {/* Time slots header */}
              <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50">
                <div className="border-r border-slate-200 p-3 text-center text-sm font-semibold text-slate-700">
                  Saat
                </div>
                {dayNames.map((day, idx) => {
                  const weekDay = new Date(selectedDate);
                  weekDay.setDate(selectedDate.getDate() - selectedDate.getDay() + idx + 1);
                  return (
                    <div key={day} className="border-r border-slate-200 p-3 text-center last:border-r-0">
                      <div className="text-sm font-semibold text-slate-700">{day}</div>
                      <div className={`mt-1 text-xs ${
                        isToday(weekDay) ? "font-bold text-blue-600" : "text-slate-500"
                      }`}>
                        {weekDay.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time slots */}
              <div className="max-h-[600px] overflow-y-auto">
                {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                  <div key={hour} className="grid grid-cols-8 border-b border-slate-200 last:border-b-0">
                    <div className="border-r border-slate-200 p-3 text-center text-sm text-slate-500">
                      {hour}:00
                    </div>
                    {dayNames.map((day, idx) => {
                      const weekDay = new Date(selectedDate);
                      weekDay.setDate(selectedDate.getDate() - selectedDate.getDay() + idx + 1);
                      const dateString = weekDay.toISOString().split('T')[0];
                      const hourEvents = events.filter(e => 
                        e.date === dateString && parseInt(e.startTime.split(':')[0]) === hour
                      );
                      
                      return (
                        <div key={`${hour}-${idx}`} className="border-r border-slate-200 p-2 min-h-16 hover:bg-slate-50 last:border-r-0 transition">
                          {hourEvents.map(event => (
                            <button
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`w-full rounded-lg px-2 py-1.5 text-left text-xs font-medium text-white mb-1 ${event.color} hover:opacity-90 hover:scale-105 active:scale-95 transition shadow-sm hover:shadow-md`}
                            >
                              <div className="font-semibold truncate">{event.title}</div>
                              <div className="opacity-90 text-[10px]">{event.startTime} - {event.endTime}</div>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day View */}
          {viewMode === "day" && (
            <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
              {/* Day header */}
              <div className="border-b border-slate-200 bg-slate-50 p-4">
                <h2 className="text-xl font-bold text-slate-900">
                  {dayNames[(selectedDate.getDay() + 6) % 7]}, {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {getEventsForDate(selectedDate).length} etkinlik
                </p>
              </div>

              {/* Time slots */}
              <div className="max-h-[600px] overflow-y-auto">
                {Array.from({ length: 14 }, (_, i) => i + 7).map((hour) => {
                  const dateString = selectedDate.toISOString().split('T')[0];
                  const hourEvents = events.filter(e => 
                    e.date === dateString && parseInt(e.startTime.split(':')[0]) === hour
                  );
                  
                  return (
                    <div key={hour} className="flex border-b border-slate-200 last:border-b-0">
                      <div className="w-24 flex-shrink-0 border-r border-slate-200 p-4 text-right">
                        <span className="text-sm font-medium text-slate-500">{hour}:00</span>
                      </div>
                      <div className="flex-1 p-4 hover:bg-slate-50 min-h-20">
                        {hourEvents.length > 0 ? (
                          <div className="space-y-2">
                            {hourEvents.map(event => (
                              <button
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={`w-full rounded-xl p-4 text-left shadow-md transition hover:shadow-2xl hover:scale-105 active:scale-95 ${event.color}`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 text-white">
                                    <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                                    <p className="text-sm opacity-90 mb-2">{event.description}</p>
                                    <div className="flex items-center gap-4 text-xs opacity-90 flex-wrap">
                                      <span className="font-semibold">{event.startTime} - {event.endTime}</span>
                                      {event.location && (
                                        <span className="flex items-center gap-1">
                                          <MapPinIcon className="h-3 w-3" />
                                          {event.location}
                                        </span>
                                      )}
                                      {event.attendees && (
                                        <span className="flex items-center gap-1">
                                          <UserGroupIcon className="h-3 w-3" />
                                          {event.attendees} kişi
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-slate-400">Etkinlik yok</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}        </div>
      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`${selectedEvent.color} p-6 text-white flex-shrink-0`}>
              <div className="mb-2 flex items-start justify-between">
                <h2 className="text-2xl font-bold pr-4">{selectedEvent.title}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-lg p-1.5 transition hover:bg-white/20 flex-shrink-0"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white/90 text-sm">{selectedEvent.description}</p>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="space-y-4 p-6 overflow-y-auto flex-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <ClockIcon className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {selectedEvent.startTime} - {selectedEvent.endTime}
                  </div>
                  <div className="text-sm text-slate-500">{selectedEvent.date}</div>
                </div>
              </div>

              {selectedEvent.location && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <MapPinIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="text-slate-900">{selectedEvent.location}</div>
                </div>
              )}

              {selectedEvent.attendees && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <UserGroupIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="text-slate-900">{selectedEvent.attendees} katılımcı</div>
                </div>
              )}

              {selectedEvent.type === "meeting" && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <VideoCameraIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Online Toplantı</div>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Toplantıya Katıl</a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <BellIcon className="h-5 w-5 text-slate-600" />
                </div>
                <div className="text-slate-900">30 dakika önce hatırlatma</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-slate-200 p-4 flex-shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowEditModal(true);
                }}
                className="flex-1 rounded-lg border-2 border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
              >
                Düzenle
              </button>
              <button 
                onClick={() => {
                  alert(`${selectedEvent.title} toplantısına katılıyorsunuz...`);
                  setSelectedEvent(null);
                }}
                className="flex-1 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Katıl
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Event Modal */}
      {showNewEventModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowNewEventModal(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] p-6 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Yeni Etkinlik Oluştur</h2>
                  <p className="text-white/80 text-sm mt-1">Takvime yeni bir etkinlik ekleyin</p>
                </div>
                <button
                  onClick={() => setShowNewEventModal(false)}
                  className="rounded-lg p-2 transition hover:bg-white/20"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Etkinlik Başlığı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="örn: Proje Planlama Toplantısı"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Başlangıç Saati
                  </label>
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Bitiş Saati
                  </label>
                  <input
                    type="time"
                    defaultValue="10:00"
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tarih
                </label>
                <input
                  type="date"
                  defaultValue="2026-02-07"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Konum
                </label>
                <input
                  type="text"
                  placeholder="örn: Toplantı Odası A veya Zoom linki"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  rows={3}
                  placeholder="Etkinlik detayları ve notlar..."
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Renk Seçin
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { color: "bg-blue-500", name: "Mavi" },
                    { color: "bg-green-500", name: "Yeşil" },
                    { color: "bg-purple-500", name: "Mor" },
                    { color: "bg-orange-500", name: "Turuncu" },
                    { color: "bg-red-500", name: "Kırmızı" },
                    { color: "bg-pink-500", name: "Pembe" },
                    { color: "bg-indigo-500", name: "İndigo" },
                    { color: "bg-teal-500", name: "Turkuaz" },
                  ].map((item) => (
                    <button
                      key={item.color}
                      onClick={() => setSelectedColor(item.color)}
                      className={`group relative h-12 w-12 rounded-xl ${item.color} transition hover:scale-110 hover:shadow-lg ${
                        selectedColor === item.color ? "ring-4 ring-slate-900 scale-110" : ""
                      }`}
                    >
                      {selectedColor === item.color && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <span className="sr-only">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 border border-blue-200">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">İpucu</h4>
                    <p className="text-sm text-blue-700">Katılımcılara otomatik bildirim gönderilecektir.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-slate-200 p-4 flex-shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  setShowNewEventModal(false);
                  setNewEventTitle("");
                  setSelectedColor("bg-blue-500");
                }}
                className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
              >
                İptal
              </button>
              <button 
                onClick={() => {
                  if (!newEventTitle.trim()) {
                    alert("Lütfen etkinlik başlığı girin!");
                    return;
                  }
                  alert("Yeni etkinlik oluşturuldu!");
                  setShowNewEventModal(false);
                  setNewEventTitle("");
                  setSelectedColor("bg-blue-500");
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] p-6 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Etkinliği Düzenle</h2>
                  <p className="text-white/80 text-sm mt-1">Etkinlik bilgilerini güncelleyin</p>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="rounded-lg p-2 transition hover:bg-white/20"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Etkinlik Başlığı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={selectedEvent.title}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Başlangıç Saati
                  </label>
                  <input
                    type="time"
                    defaultValue={selectedEvent.startTime}
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Bitiş Saati
                  </label>
                  <input
                    type="time"
                    defaultValue={selectedEvent.endTime}
                    className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tarih
                </label>
                <input
                  type="date"
                  defaultValue={selectedEvent.date}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Konum
                </label>
                <input
                  type="text"
                  defaultValue={selectedEvent.location}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedEvent.description}
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20 resize-none"
                />
              </div>

              <div className="rounded-xl bg-amber-50 p-4 border border-amber-200">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-amber-900 mb-1">Uyarı</h4>
                    <p className="text-sm text-amber-700">Değişiklikler tüm katılımcılara bildirilecektir.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 border-t border-slate-200 p-4 flex-shrink-0 bg-slate-50">
              <button 
                onClick={() => {
                  if (confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
                    alert(`${selectedEvent.title} silindi!`);
                    setShowEditModal(false);
                    setSelectedEvent(null);
                  }
                }}
                className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 hover:border-red-400"
              >
                🗑️ Sil
              </button>
              <div className="flex-1"></div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
              >
                İptal
              </button>
              <button 
                onClick={() => {
                  alert(`${selectedEvent.title} güncellendi!`);
                  setShowEditModal(false);
                }}
                className="rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
              >
                💾 Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
