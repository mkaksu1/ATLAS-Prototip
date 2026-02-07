"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  FaceSmileIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

type Message = {
  id: number;
  senderId: number;
  text: string;
  time: string;
  isOwn: boolean;
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  type: "direct" | "group";
};

const chats: Chat[] = [
  {
    id: 1,
    name: "Fatma Demir",
    avatar: "FD",
    lastMessage: "Toplantı sonuçları hazır",
    time: "10:30",
    unread: 3,
    online: true,
    type: "direct",
  },
  {
    id: 2,
    name: "ATLAS Ekibi",
    avatar: "AE",
    lastMessage: "Mehmet: Yeni özellikler eklendi",
    time: "09:15",
    unread: 12,
    online: true,
    type: "group",
  },
  {
    id: 3,
    name: "Ahmet Yılmaz",
    avatar: "AY",
    lastMessage: "Yarınki toplantı için hazır mısın?",
    time: "Dün",
    unread: 0,
    online: false,
    type: "direct",
  },
  {
    id: 4,
    name: "Proje Yöneticileri",
    avatar: "PY",
    lastMessage: "Sprint planlama çarşamba",
    time: "Dün",
    unread: 5,
    online: true,
    type: "group",
  },
  {
    id: 5,
    name: "Zeynep Arslan",
    avatar: "ZA",
    lastMessage: "Teşekkürler!",
    time: "2 gün önce",
    unread: 0,
    online: true,
    type: "direct",
  },
  {
    id: 6,
    name: "Can Öztürk",
    avatar: "CÖ",
    lastMessage: "Backend güncellemeleri tamamlandı",
    time: "3 gün önce",
    unread: 0,
    online: false,
    type: "direct",
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 2,
    text: "Merhaba! Bugünkü toplantı saat kaçta?",
    time: "10:25",
    isOwn: false,
  },
  {
    id: 2,
    senderId: 1,
    text: "Saat 14:00'te başlıyoruz.",
    time: "10:26",
    isOwn: true,
  },
  {
    id: 3,
    senderId: 2,
    text: "Harika, teşekkürler. Sunumu hazırladım.",
    time: "10:27",
    isOwn: false,
  },
  {
    id: 4,
    senderId: 1,
    text: "Süper! Ben de raporları tamamladım. Hazırsak başlayabiliriz.",
    time: "10:28",
    isOwn: true,
  },
  {
    id: 5,
    senderId: 2,
    text: "Toplantı sonuçları hazır, paylaştım.",
    time: "10:30",
    isOwn: false,
  },
];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: messages.length + 1,
        senderId: 1,
        text: newMessage,
        time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
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

      {/* Sidebar - Chat List */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-80 flex-col border-r border-slate-200 bg-white overflow-hidden transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Chat</span>
          </Link>
        </div>

        {/* New Chat Button */}
        <div className="border-b border-slate-200 p-4">
          <button className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni Sohbet</span>
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-slate-200 p-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Sohbet ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`flex w-full items-center gap-3 border-b border-slate-200 p-4 transition hover:bg-slate-100 ${
                selectedChat?.id === chat.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                )}
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{chat.name}</p>
                  <span className="text-xs text-slate-500">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm text-slate-600">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="border-t border-slate-200 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-green-50 p-3 text-center">
              <p className="text-2xl font-bold text-green-600">
                {chats.filter((c) => c.online).length}
              </p>
              <p className="text-xs text-green-600">Çevrimiçi</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {chats.reduce((sum, c) => sum + c.unread, 0)}
              </p>
              <p className="text-xs text-blue-600">Okunmamış</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{selectedChat.name}</h2>
                  <p className="text-sm text-slate-500">
                    {selectedChat.online ? "Çevrimiçi" : "Çevrimdışı"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="hidden rounded-lg p-2 transition hover:bg-slate-100 sm:block">
                  <PhoneIcon className="h-5 w-5 text-slate-600" />
                </button>
                <button className="hidden rounded-lg p-2 transition hover:bg-slate-100 sm:block">
                  <VideoCameraIcon className="h-5 w-5 text-slate-600" />
                </button>
                <button className="hidden rounded-lg p-2 transition hover:bg-slate-100 sm:block">
                  <InformationCircleIcon className="h-5 w-5 text-slate-600" />
                </button>
                <button className="rounded-lg p-2 transition hover:bg-slate-100">
                  <EllipsisVerticalIcon className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-3 ${
                        message.isOwn
                          ? "bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white"
                          : "bg-white text-slate-900 shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`mt-1 text-right text-xs ${
                          message.isOwn ? "text-blue-200" : "text-slate-500"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <button className="rounded-lg p-2 transition hover:bg-slate-100">
                  <PaperClipIcon className="h-5 w-5 text-slate-600" />
                </button>
                <button className="rounded-lg p-2 transition hover:bg-slate-100">
                  <FaceSmileIcon className="h-5 w-5 text-slate-600" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Mesaj yazın..."
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] p-2.5 text-white transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 active:scale-95"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-50/50">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="mx-auto h-16 w-16 text-slate-300" />
              <p className="mt-4 text-lg font-medium text-slate-900">
                Sohbete başlamak için bir konuşma seçin
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Sol taraftan bir sohbet seçin veya yeni bir sohbet başlatın
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
