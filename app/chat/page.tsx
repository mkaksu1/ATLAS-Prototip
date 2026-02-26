"use client";

import { useState, useRef, useEffect } from "react";
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
  ArrowLeftIcon,
  MicrophoneIcon,
  CheckIcon,
  CheckCircleIcon,
  BellSlashIcon,
  ArchiveBoxIcon,
  TrashIcon,
  UserGroupIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Message = {
  id: number;
  senderId: number;
  text: string;
  time: string;
  isOwn: boolean;
  status?: "sent" | "delivered" | "read";
};

type Chat = {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  type: "direct" | "group" | "ai";
  subtitle?: string;
};

const chats: Chat[] = [
  {
    id: 1,
    name: "Fatma Demir",
    initials: "FD",
    avatarColor: "from-violet-500 to-purple-600",
    lastMessage: "Toplanti sonuclari hazir",
    time: "10:30",
    unread: 3,
    online: true,
    type: "direct",
    subtitle: "Cevrimici",
  },
  {
    id: 2,
    name: "ATLAS Ekibi",
    initials: "AE",
    avatarColor: "from-emerald-500 to-teal-600",
    lastMessage: "Mehmet: Yeni ozellikler eklendi",
    time: "09:15",
    unread: 12,
    online: true,
    type: "group",
    subtitle: "8 uye",
  },
  {
    id: 3,
    name: "Ahmet Yilmaz",
    initials: "AY",
    avatarColor: "from-orange-500 to-amber-600",
    lastMessage: "Yarinki toplanti icin hazir misin?",
    time: "Dun",
    unread: 0,
    online: false,
    type: "direct",
    subtitle: "Son gorunme: dun 22:15",
  },
  {
    id: 99,
    name: "ATLAS AI",
    initials: "AI",
    avatarColor: "from-[#0B1B3D] to-[#2d4a7c]",
    lastMessage: "Size nasil yardimci olabilirim?",
    time: "Simdi",
    unread: 0,
    online: true,
    type: "ai",
    subtitle: "Yapay Zeka Asistani",
  },
  {
    id: 4,
    name: "Proje Yoneticileri",
    initials: "PY",
    avatarColor: "from-rose-500 to-pink-600",
    lastMessage: "Sprint planlama carsamba",
    time: "Dun",
    unread: 5,
    online: true,
    type: "group",
    subtitle: "5 uye",
  },
  {
    id: 5,
    name: "Zeynep Arslan",
    initials: "ZA",
    avatarColor: "from-cyan-500 to-blue-600",
    lastMessage: "Tesekkurler!",
    time: "2 gun",
    unread: 0,
    online: true,
    type: "direct",
    subtitle: "Cevrimici",
  },
  {
    id: 6,
    name: "Can Ozturk",
    initials: "CO",
    avatarColor: "from-fuchsia-500 to-purple-600",
    lastMessage: "Backend guncellemeleri tamamlandi",
    time: "3 gun",
    unread: 0,
    online: false,
    type: "direct",
    subtitle: "Son gorunme: 3 gun once",
  },
];

const chatMessages: Record<number, Message[]> = {
  1: [
    { id: 1, senderId: 2, text: "Merhaba! Bugunku toplanti saat kacta?", time: "10:25", isOwn: false, status: "read" },
    { id: 2, senderId: 1, text: "Saat 14:00te basliyoruz.", time: "10:26", isOwn: true, status: "read" },
    { id: 3, senderId: 2, text: "Harika, tesekkurler. Sunumu hazirladim.", time: "10:27", isOwn: false },
    { id: 4, senderId: 1, text: "Super! Ben de raporlari tamamladim. Hazirksa baslayabiliriz.", time: "10:28", isOwn: true, status: "read" },
    { id: 5, senderId: 2, text: "Toplanti sonuclari hazir, paylastim.", time: "10:30", isOwn: false },
  ],
  2: [
    { id: 1, senderId: 3, text: "Yeni ozellikler eklendi, inceleyebilir misiniz?", time: "09:10", isOwn: false },
    { id: 2, senderId: 1, text: "Muhtesem gorunuyor! Ellerinize saglik.", time: "09:12", isOwn: true, status: "read" },
    { id: 3, senderId: 4, text: "Test ortamina deploy ettim", time: "09:13", isOwn: false },
    { id: 4, senderId: 1, text: "Harika calisma, tesekkurler ekip!", time: "09:15", isOwn: true, status: "delivered" },
  ],
  3: [
    { id: 1, senderId: 3, text: "Yarinki toplanti icin hazir misin?", time: "Dun 18:30", isOwn: false },
    { id: 2, senderId: 1, text: "Evet, sunum hazir", time: "Dun 18:35", isOwn: true, status: "read" },
  ],
  4: [
    { id: 1, senderId: 5, text: "Sprint planlama carsamba gunu saat 10:00da", time: "Dun 14:00", isOwn: false },
    { id: 2, senderId: 1, text: "Takvimime ekledim", time: "Dun 14:05", isOwn: true, status: "read" },
    { id: 3, senderId: 6, text: "Ben de hazir olacagim, gorusuruz!", time: "Dun 14:10", isOwn: false },
  ],
  5: [
    { id: 1, senderId: 1, text: "Dokumantasyon paylasimi yaptim, inceleyebilirsin", time: "2 gun 11:00", isOwn: true, status: "read" },
    { id: 2, senderId: 5, text: "Tesekkurler! Cok isime yaradi", time: "2 gun 11:30", isOwn: false },
  ],
  6: [
    { id: 1, senderId: 6, text: "Backend guncellemeleri tamamlandi", time: "3 gun 09:00", isOwn: false },
    { id: 2, senderId: 1, text: "Super! Frontend entegrasyonuna basliyorum simdi", time: "3 gun 09:05", isOwn: true, status: "read" },
  ],
  99: [
    { id: 1, senderId: 99, text: "Merhaba! Ben ATLAS AI, size nasil yardimci olabilirim?\n\nSoru sorabilir, fikirler uretmemi isteyebilir veya gunluk islerinizde yardim alabilirsiniz.", time: "Simdi", isOwn: false },
  ],
};

const emojis = ["", "", "", "", "", "", "", "", "", "", "", ""];

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // On desktop, auto-open the first chat
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      const first = chats[0];
      setSelectedChat(first);
      setMessages(chatMessages[first.id] || []);
    }
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(chatMessages[chat.id] || []);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: messages.length + 1,
        senderId: 1,
        text: newMessage,
        time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
        status: "sent",
      };
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      chatMessages[selectedChat.id] = updatedMessages;
      setNewMessage("");
      setShowEmojiPicker(false);

      if (selectedChat.id === 99) {
        setIsAITyping(true);
        const aiMessageId = updatedMessages.length + 1;
        const aiMessage: Message = {
          id: aiMessageId,
          senderId: 99,
          text: "",
          time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          isOwn: false,
        };
        setMessages((prev) => [...prev, aiMessage]);

        try {
          const response = await fetch("/api/chat-ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: updatedMessages.map((m) => ({
                role: m.isOwn ? "user" : "assistant",
                content: m.text,
              })),
            }),
          });

          if (!response.ok) throw new Error("AI yanit veremedi");

          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let aiResponseText = "";
          let buffer = "";

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";
              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const data = line.slice(6).trim();
                  if (data === "[DONE]" || !data) continue;
                  try {
                    const parsed = JSON.parse(data);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) {
                      aiResponseText += content;
                      setMessages((prev) =>
                        prev.map((msg) =>
                          msg.id === aiMessageId ? { ...msg, text: aiResponseText } : msg
                        )
                      );
                    }
                  } catch (e) {}
                }
              }
            }
          }

          const finalMessages = [
            ...updatedMessages,
            { ...aiMessage, text: aiResponseText || "Yanit alinamadi." },
          ];
          chatMessages[99] = finalMessages;
          setMessages(finalMessages);
        } catch (error) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId
                ? { ...msg, text: "Uzgunum, su anda bir hata olustu. Lutfen tekrar deneyin." }
                : msg
            )
          );
        } finally {
          setIsAITyping(false);
        }
      }
    }
  };

  const totalUnread = chats.reduce((sum, c) => sum + c.unread, 0);
  const onlineCount = chats.filter((c) => c.online).length;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* SIDEBAR */}
      <aside
        className={[
          "flex flex-col bg-white border-r border-slate-200 flex-shrink-0",
          "w-full md:w-80 lg:w-96",
          selectedChat ? "hidden md:flex" : "flex",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] shadow-md"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
            </Link>
            <h1 className="text-xl font-bold text-slate-900">ATLAS Chat</h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowNewChatModal(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 bg-white border-b border-slate-100">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2.5">
            <MagnifyingGlassIcon className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Sohbet veya mesaj ara"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50 px-5 py-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>
              <span className="font-semibold text-slate-700">{onlineCount}</span>{" "}
              cevrimici
            </span>
          </div>
          {totalUnread > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {totalUnread}
              </span>
              <span>okunmamis</span>
            </div>
          )}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <MagnifyingGlassIcon className="h-12 w-12 text-slate-300" />
              <p className="mt-3 text-sm font-medium text-slate-500">Sonuc bulunamadi</p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={[
                  "flex w-full items-center gap-3 px-4 py-3 transition-all duration-150",
                  selectedChat?.id === chat.id
                    ? "bg-blue-50 border-r-[3px] border-blue-600"
                    : "hover:bg-slate-50/80 border-b border-slate-100/70",
                ].join(" ")}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${chat.avatarColor} text-sm font-bold text-white shadow-sm ring-2 ${
                      selectedChat?.id === chat.id ? "ring-blue-200" : "ring-transparent"
                    } transition-all duration-150`}
                  >
                    {chat.type === "group" ? (
                      <UserGroupIcon className="h-5 w-5" />
                    ) : chat.type === "ai" ? (
                      <SparklesIcon className="h-5 w-5" />
                    ) : (
                      chat.initials
                    )}
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`truncate text-sm font-semibold ${
                          selectedChat?.id === chat.id ? "text-blue-700" : "text-slate-900"
                        }`}
                      >
                        {chat.name}
                      </span>
                      {chat.type === "ai" && (
                        <span className="flex-shrink-0 rounded-full bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                          AI
                        </span>
                      )}
                    </div>
                    <span className={`ml-2 flex-shrink-0 text-xs ${
                      chat.unread > 0 ? "text-green-600 font-medium" : "text-slate-400"
                    }`}>
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`truncate text-xs ${
                      chat.unread > 0 ? "text-slate-700 font-medium" : "text-slate-400"
                    }`}>{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <span className="flex-shrink-0 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-green-500 px-1.5 text-[11px] font-bold text-white shadow-sm">
                        {chat.unread > 99 ? "99+" : chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* MAIN CHAT AREA */}
      <main
        className={[
          "flex flex-col flex-1 overflow-hidden",
          !selectedChat ? "hidden md:flex" : "flex",
        ].join(" ")}
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <header className="flex items-center justify-between gap-2 bg-white px-4 py-3 shadow-sm flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={handleBack}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 md:hidden"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>

                <div className="relative flex-shrink-0">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${selectedChat.avatarColor} text-sm font-bold text-white shadow-sm`}
                  >
                    {selectedChat.type === "group" ? (
                      <UserGroupIcon className="h-4 w-4" />
                    ) : selectedChat.type === "ai" ? (
                      <SparklesIcon className="h-4 w-4" />
                    ) : (
                      selectedChat.initials
                    )}
                  </div>
                  {selectedChat.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {selectedChat.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {isAITyping && selectedChat.id === 99
                      ? "Yanit yaziyor..."
                      : selectedChat.online
                      ? "Cevrimici"
                      : selectedChat.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => alert(selectedChat.name + " ile sesli arama baslatiliyor...")}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
                >
                  <PhoneIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => alert(selectedChat.name + " ile goruntulu arama baslatiliyor...")}
                  className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
                >
                  <VideoCameraIcon className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowChatMenu(!showChatMenu)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100"
                  >
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                  {showChatMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowChatMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 z-20 w-52 rounded-2xl bg-white py-1 shadow-xl border border-slate-100">
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50">
                          <BellSlashIcon className="h-4 w-4 text-slate-500" />
                          Sessize Al
                        </button>
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50">
                          <ArchiveBoxIcon className="h-4 w-4 text-slate-500" />
                          Arsivle
                        </button>
                        <div className="my-1 border-t border-slate-100" />
                        <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50">
                          <TrashIcon className="h-4 w-4" />
                          Sohbeti Sil
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </header>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.15) 1px, transparent 0)",
                backgroundSize: "24px 24px",
                backgroundColor: "#f1f5f9",
              }}
            >
              <div className="flex items-center justify-center my-3">
                <span className="rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-slate-500 shadow-sm border border-slate-200">
                  Bugun
                </span>
              </div>

              {messages.map((message, idx) => {
                const isFirst =
                  idx === 0 || messages[idx - 1]?.isOwn !== message.isOwn;
                return (
                  <div
                    key={message.id}
                    className={[
                      "flex",
                      message.isOwn ? "justify-end" : "justify-start",
                      isFirst ? "mt-3" : "mt-0.5",
                    ].join(" ")}
                  >
                    {!message.isOwn && selectedChat.type === "group" && isFirst && (
                      <div
                        className={`mr-2 mt-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${selectedChat.avatarColor} text-[10px] font-bold text-white`}
                      >
                        {selectedChat.initials}
                      </div>
                    )}
                    {!message.isOwn && selectedChat.type === "group" && !isFirst && (
                      <div className="mr-2 w-7 flex-shrink-0" />
                    )}

                    <div
                      className={[
                        "max-w-[75%] sm:max-w-[60%] flex flex-col",
                        message.isOwn ? "items-end" : "items-start",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "relative rounded-2xl px-4 py-2.5 shadow-sm",
                          message.isOwn
                            ? "rounded-tr-sm bg-[#0B1B3D] text-white"
                            : selectedChat.id === 99 && !message.isOwn
                            ? "rounded-tl-sm bg-gradient-to-br from-indigo-600 to-blue-600 text-white"
                            : "rounded-tl-sm bg-white text-slate-900",
                        ].join(" ")}
                      >
                        {message.text ? (
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.text}
                          </p>
                        ) : (
                          <div className="flex items-center gap-1 py-1">
                            <span
                              className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            />
                            <span
                              className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            />
                            <span
                              className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                          </div>
                        )}
                        <div
                          className={[
                            "mt-1 flex items-center justify-end gap-1",
                            message.isOwn
                              ? "text-white/50"
                              : selectedChat.id === 99
                              ? "text-white/50"
                              : "text-slate-400",
                          ].join(" ")}
                        >
                          <span className="text-[10px]">{message.time}</span>
                          {message.isOwn && (
                            <>
                              {message.status === "read" && (
                                <CheckCircleIcon className="h-3.5 w-3.5 text-blue-400" />
                              )}
                              {message.status === "delivered" && (
                                <CheckCircleIcon className="h-3.5 w-3.5 text-white/60" />
                              )}
                              {message.status === "sent" && (
                                <CheckIcon className="h-3.5 w-3.5 text-white/50" />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {isAITyping && selectedChat?.id === 99 && (
                <div className="flex justify-start mt-1">
                  <div className="rounded-2xl rounded-tl-sm bg-gradient-to-br from-indigo-600 to-blue-600 px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <span
                        className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex-shrink-0 bg-white border-t border-slate-200 px-4 py-3">
              {showEmojiPicker && (
                <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                  <div className="grid grid-cols-6 gap-1">
                    {emojis.map((emoji, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setNewMessage(newMessage + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="rounded-xl p-2 text-xl transition hover:bg-slate-100"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showAttachMenu && (
                <div className="mb-3 flex gap-3 overflow-x-auto pb-1">
                  {[
                    { icon: "", label: "Dosya" },
                    { icon: "", label: "Fotograf" },
                    { icon: "", label: "Video" },
                    { icon: "", label: "Konum" },
                    { icon: "", label: "Belge" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setShowAttachMenu(false)}
                      className="flex flex-shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-slate-100 px-5 py-3 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowAttachMenu(!showAttachMenu);
                    setShowEmojiPicker(false);
                  }}
                  className={[
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition",
                    showAttachMenu
                      ? "bg-blue-100 text-blue-600"
                      : "text-slate-500 hover:bg-slate-100",
                  ].join(" ")}
                >
                  <PaperClipIcon className="h-5 w-5" />
                </button>

                <button
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    setShowAttachMenu(false);
                  }}
                  className={[
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition",
                    showEmojiPicker
                      ? "bg-blue-100 text-blue-600"
                      : "text-slate-500 hover:bg-slate-100",
                  ].join(" ")}
                >
                  <FaceSmileIcon className="h-5 w-5" />
                </button>

                <div className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 transition-colors focus-within:border-blue-400 focus-within:bg-white">
                  <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Mesaj yazin..."
                    className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {newMessage.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    disabled={isAITyping}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0B1B3D] text-white shadow-md transition hover:bg-[#1a3460] active:scale-95 disabled:opacity-50"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                ) : (
                  <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100">
                    <MicrophoneIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-slate-50/50 text-center px-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 max-w-xs w-full">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] shadow-lg">
                <ChatBubbleLeftRightIcon className="h-10 w-10 text-white" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-900">ATLAS Chat</h2>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Guvenli ve hizli mesajlasma. Bir sohbet secin veya yeni biri baslatin.
              </p>
              <button
                onClick={() => setShowNewChatModal(true)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] active:scale-95"
              >
                <PlusIcon className="h-5 w-5" />
                Yeni Sohbet
              </button>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Uctan uca sifreli - ATLAS tarafindan korunuyor
            </p>
          </div>
        )}
      </main>

      {/* NEW CHAT MODAL */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 p-0 sm:p-4">
          <div className="w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Yeni Sohbet</h3>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2.5 mb-4">
                <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Isim veya numara ara..."
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  autoFocus
                />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Kisiler
              </p>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      handleSelectChat(chat);
                      setShowNewChatModal(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-slate-50"
                  >
                    <div
                      className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${chat.avatarColor} text-sm font-bold text-white`}
                    >
                      {chat.type === "group" ? (
                        <UserGroupIcon className="h-4 w-4" />
                      ) : chat.type === "ai" ? (
                        <SparklesIcon className="h-4 w-4" />
                      ) : (
                        chat.initials
                      )}
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-slate-900">{chat.name}</p>
                      <p className="text-xs text-slate-500">{chat.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

