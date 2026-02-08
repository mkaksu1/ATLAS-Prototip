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
    id: 99,
    name: "ATLAS AI",
    avatar: "AI",
    lastMessage: "Size nasıl yardımcı olabilirim?",
    time: "Her zaman",
    unread: 0,
    online: true,
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

const chatMessages: Record<number, Message[]> = {
  1: [
    { id: 1, senderId: 2, text: "Merhaba! Bugünkü toplantı saat kaçta?", time: "10:25", isOwn: false },
    { id: 2, senderId: 1, text: "Saat 14:00'te başlıyoruz.", time: "10:26", isOwn: true },
    { id: 3, senderId: 2, text: "Harika, teşekkürler. Sunumu hazırladım.", time: "10:27", isOwn: false },
    { id: 4, senderId: 1, text: "Süper! Ben de raporları tamamladım. Hazırsak başlayabiliriz.", time: "10:28", isOwn: true },
    { id: 5, senderId: 2, text: "Toplantı sonuçları hazır, paylaştım.", time: "10:30", isOwn: false },
  ],
  2: [
    { id: 1, senderId: 3, text: "Yeni özellikler eklendi, inceleyebilir misiniz?", time: "09:10", isOwn: false },
    { id: 2, senderId: 1, text: "Muhteşem görünüyor! Ellerinize sağlık.", time: "09:12", isOwn: true },
    { id: 3, senderId: 4, text: "Test ortamına deploy ettim", time: "09:13", isOwn: false },
    { id: 4, senderId: 1, text: "Harika çalışma, teşekkürler ekip!", time: "09:15", isOwn: true },
  ],
  3: [
    { id: 1, senderId: 3, text: "Yarınki toplantı için hazır mısın?", time: "Dün", isOwn: false },
    { id: 2, senderId: 1, text: "Evet, sunum hazır", time: "Dün", isOwn: true },
  ],
  4: [
    { id: 1, senderId: 5, text: "Sprint planlama çarşamba günü", time: "Dün", isOwn: false },
    { id: 2, senderId: 1, text: "Takvimime ekledim", time: "Dün", isOwn: true },
    { id: 3, senderId: 6, text: "Ben de hazır olacağım", time: "Dün", isOwn: false },
  ],
  5: [
    { id: 1, senderId: 1, text: "Dökümantasyon paylaşımı", time: "2 gün önce", isOwn: true },
    { id: 2, senderId: 5, text: "Teşekkürler!", time: "2 gün önce", isOwn: false },
  ],
  6: [
    { id: 1, senderId: 6, text: "Backend güncellemeleri tamamlandı", time: "3 gün önce", isOwn: false },
    { id: 2, senderId: 1, text: "Süper! Frontend entegrasyonuna başlıyorum", time: "3 gün önce", isOwn: true },
  ],
  99: [
    { id: 1, senderId: 99, text: "Merhaba! Ben ATLAS AI, size nasıl yardımcı olabilirim? Soru sorabilir, fikirler üretmemi isteyebilir veya herhangi bir konuda yardım alabilirsiniz.", time: "Şimdi", isOwn: false },
  ],
};

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);
  const [messages, setMessages] = useState<Message[]>(chatMessages[1] || []);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [isAITyping, setIsAITyping] = useState(false);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(chatMessages[chat.id] || []);
    setSidebarOpen(false);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: messages.length + 1,
        senderId: 1,
        text: newMessage,
        time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      };
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      chatMessages[selectedChat.id] = updatedMessages;
      const userMessageText = newMessage;
      setNewMessage("");
      setShowEmojiPicker(false);

      // ATLAS AI ile konuşma
      if (selectedChat.id === 99) {
        setIsAITyping(true);
        
        // AI mesaj placeholder'ı
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
          const response = await fetch('/api/chat-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: updatedMessages.map(m => ({
                role: m.isOwn ? 'user' : 'assistant',
                content: m.text
              }))
            }),
          });

          if (!response.ok) {
            throw new Error('AI yanıt veremedi');
          }

          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let aiResponseText = '';
          let buffer = '';

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6).trim();
                  if (data === '[DONE]') continue;
                  if (!data) continue;
                  
                  try {
                    const parsed = JSON.parse(data);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) {
                      aiResponseText += content;
                      setMessages((prev) => 
                        prev.map((msg) => 
                          msg.id === aiMessageId 
                            ? { ...msg, text: aiResponseText }
                            : msg
                        )
                      );
                    }
                  } catch (e) {
                    // JSON parse hatası - devam et
                  }
                }
              }
            }
          }

          // Final mesajı kaydet
          const finalMessages = [...updatedMessages, { ...aiMessage, text: aiResponseText || 'Yanıt alınamadı.' }];
          chatMessages[99] = finalMessages;
          setMessages(finalMessages);
          
        } catch (error) {
          console.error('AI Error:', error);
          const errorMessage: Message = {
            id: aiMessageId,
            senderId: 99,
            text: "Üzgünüm, şu anda bir hata oluştu. Lütfen tekrar deneyin.",
            time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
            isOwn: false,
          };
          setMessages((prev) => prev.map((msg) => msg.id === aiMessageId ? errorMessage : msg));
        } finally {
          setIsAITyping(false);
        }
      }
    }
  };

  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "✨", "💯"];

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
          <button 
            onClick={() => setShowNewChatModal(true)}
            className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          >
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
              onClick={() => handleSelectChat(chat)}
              className={`flex w-full items-center gap-3 border-b border-slate-200 p-4 transition hover:bg-slate-100 ${
                selectedChat?.id === chat.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="relative">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${
                  chat.id === 99 
                    ? "bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c]" 
                    : "bg-gradient-to-br from-blue-500 to-purple-600"
                }`}>
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
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                    selectedChat.id === 99
                      ? "bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c]"
                      : "bg-gradient-to-br from-blue-500 to-purple-600"
                  }`}>
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">{selectedChat.name}</h2>
                  <p className="text-sm text-slate-500">
                    {isAITyping && selectedChat.id === 99 ? "Yazıyor..." : selectedChat.online ? "Çevrimiçi" : "Çevrimdışı"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert(`${selectedChat.name} ile sesli arama başlatılıyor...`)}
                  className="hidden rounded-lg p-2 transition hover:bg-slate-100 sm:block"
                >
                  <PhoneIcon className="h-5 w-5 text-slate-600" />
                </button>
                <button 
                  onClick={() => alert(`${selectedChat.name} ile görüntülü arama başlatılıyor...`)}
                  className="hidden rounded-lg p-2 transition hover:bg-slate-100 sm:block"
                >
                  <VideoCameraIcon className="h-5 w-5 text-slate-600" />
                </button>
                <button 
                  onClick={() => setShowChatInfo(!showChatInfo)}
                  className={`hidden rounded-lg p-2 transition hover:bg-slate-100 sm:block ${showChatInfo ? 'bg-blue-50' : ''}`}
                >
                  <InformationCircleIcon className="h-5 w-5 text-slate-600" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowChatMenu(!showChatMenu)}
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                  >
                    <EllipsisVerticalIcon className="h-5 w-5 text-slate-600" />
                  </button>
                  {showChatMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowChatMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-lg bg-white shadow-lg border border-slate-200 py-1">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition">Sohbeti Sessize Al</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition">Mesajları Sil</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition">Engelle</button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition">Sohbeti Sil</button>
                      </div>
                    </>
                  )}
                </div>
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
                          : selectedChat?.id === 99 && !message.isOwn
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                          : "bg-white text-slate-900 shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p
                        className={`mt-1 text-right text-xs ${
                          message.isOwn || selectedChat?.id === 99 ? "text-blue-200" : "text-slate-500"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
                {isAITyping && selectedChat?.id === 99 && (
                  <div className="flex justify-start">
                    <div className="max-w-md rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-white shadow-md">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button 
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                  >
                    <PaperClipIcon className="h-5 w-5 text-slate-600" />
                  </button>
                  {showAttachMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowAttachMenu(false)}
                      />
                      <div className="absolute left-0 bottom-full mb-2 z-20 w-48 rounded-lg bg-white shadow-lg border border-slate-200 py-1">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition">📁 Dosya</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition">📷 Fotoğraf</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition">🎥 Video</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition">📍 Konum</button>
                      </div>
                    </>
                  )}
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                  >
                    <FaceSmileIcon className="h-5 w-5 text-slate-600" />
                  </button>
                  {showEmojiPicker && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowEmojiPicker(false)}
                      />
                      <div className="absolute left-0 bottom-full mb-2 z-20 rounded-lg bg-white shadow-lg border border-slate-200 p-3">
                        <div className="grid grid-cols-4 gap-2">
                          {emojis.map((emoji, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setNewMessage(newMessage + emoji);
                                setShowEmojiPicker(false);
                              }}
                              className="text-2xl hover:bg-slate-100 rounded p-1 transition"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Mesaj yazın..."
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isAITyping}
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

      {/* Chat Info Panel */}
      {showChatInfo && selectedChat && (
        <aside className="w-80 border-l border-slate-200 bg-white overflow-y-auto">
          <div className="p-6">
            <div className="text-center mb-6">
              <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white mb-4 ${
                selectedChat.id === 99
                  ? "bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c]"
                  : "bg-gradient-to-br from-blue-500 to-purple-600"
              }`}>
                {selectedChat.avatar}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{selectedChat.name}</h3>
              <p className="text-sm text-slate-500 mt-1">
                {selectedChat.online ? "Çevrimiçi" : "Çevrimdışı"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Bilgiler</h4>
                {selectedChat.id === 99 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">ATLAS AI, size yardımcı olmak için tasarlanmış yapay zeka asistanıdır. Sorularınızı sorun, fikirler üretin veya günlük işlerinizde yardım alın.</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Model:</span>
                      <span className="text-slate-900 font-medium">GPT-4o</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Durum:</span>
                      <span className="text-green-600 font-medium">Çevrimiçi</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Tip:</span>
                      <span className="text-slate-900">{selectedChat.type === "group" ? "Grup" : "Özel"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Mesaj sayısı:</span>
                      <span className="text-slate-900">{messages.length}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Medya ve Dosyalar</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-slate-100 rounded-lg" />
                  <div className="aspect-square bg-slate-100 rounded-lg" />
                  <div className="aspect-square bg-slate-100 rounded-lg" />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-slate-900 hover:bg-slate-100 rounded-lg transition">
                  Bildirimleri Kapat
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-900 hover:bg-slate-100 rounded-lg transition">
                  Sohbeti Arşivle
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                  Sohbeti Sil
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="border-b border-slate-200 px-6 py-4">
              <h3 className="text-lg font-bold text-slate-900">Yeni Sohbet Başlat</h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Kişi veya Grup Ara
                </label>
                <input
                  type="text"
                  placeholder="İsim girin..."
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Önerilen Kişiler</h4>
                <div className="space-y-2">
                  {chats.slice(0, 4).map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        handleSelectChat(chat);
                        setShowNewChatModal(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-slate-100 transition"
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                        chat.id === 99
                          ? "bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c]"
                          : "bg-gradient-to-br from-blue-500 to-purple-600"
                      }`}>
                        {chat.avatar}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-slate-900">{chat.name}</p>
                        <p className="text-xs text-slate-500">{chat.online ? "Çevrimiçi" : "Çevrimdışı"}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowNewChatModal(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                İptal
              </button>
              <button
                onClick={() => setShowNewChatModal(false)}
                className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2 text-sm font-semibold text-white hover:scale-105 transition active:scale-95"
              >
                Sohbet Başlat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
