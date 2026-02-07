"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  SparklesIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  PhotoIcon,
  DocumentTextIcon,
  PlusIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  CodeBracketIcon,
  LanguageIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon as SparklesIconSolid } from "@heroicons/react/24/solid";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

type Conversation = {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
};

const quickPrompts = [
  {
    icon: LightBulbIcon,
    title: "Fikir Üret",
    description: "Yeni projeler için yaratıcı fikirler",
    prompt: "Yenilikçi bir proje fikri üretmeme yardımcı olur musun?",
  },
  {
    icon: CodeBracketIcon,
    title: "Kod Yaz",
    description: "Programlama sorunlarına çözüm",
    prompt: "Bir web uygulaması için örnek kod yazabilir misin?",
  },
  {
    icon: LanguageIcon,
    title: "Çeviri Yap",
    description: "Metinleri farklı dillere çevir",
    prompt: "Bu metni İngilizce'ye çevirebilir misin?",
  },
  {
    icon: DocumentTextIcon,
    title: "Metin Yaz",
    description: "Profesyonel içerik oluştur",
    prompt: "Bir sunum için profesyonel bir giriş metni yazabilir misin?",
  },
];

const sampleConversations: Conversation[] = [
  {
    id: 1,
    title: "Web Geliştirme Önerileri",
    lastMessage: "React ile modern bir dashboard oluşturmak için...",
    timestamp: "Bugün, 14:30",
  },
  {
    id: 2,
    title: "Veri Analizi Yöntemleri",
    lastMessage: "Python pandas kullanarak veri temizleme...",
    timestamp: "Dün, 10:15",
  },
  {
    id: 3,
    title: "Proje Yönetimi",
    lastMessage: "Agile metodolojisi ile proje planlama...",
    timestamp: "2 gün önce",
  },
];

// Dynamic export to fix useSearchParams suspense issue
export const dynamic = 'force-dynamic';

export default function AIPage() {
  const searchParams = useSearchParams();
  const queryText = searchParams.get("q") || "";
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Merhaba! Ben ATLAS.AI, size nasıl yardımcı olabilirim? Soru sorabilir, fikirler üretmemi isteyebilir veya herhangi bir konuda yardım alabilirsiniz.",
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    if (queryText) {
      setInputValue(queryText);
    }
  }, [queryText]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      // GitHub Models API çağrısı
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('API çağrısı başarısız');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "Üzgünüm, şu anda bir hata oluştu. Lütfen .env.local dosyasında GITHUB_TOKEN'ınızı yapılandırdığınızdan emin olun. Token almak için: https://github.com/settings/tokens (models:read izni gerekli)",
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
              <SparklesIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS.AI</span>
          </Link>
        </div>

        {/* New Chat Button */}
        <div className="border-b border-slate-200 p-4">
          <button
            onClick={() => {
              setMessages([
                {
                  id: 1,
                  role: "assistant",
                  content: "Merhaba! Ben ATLAS.AI, size nasıl yardımcı olabilirim?",
                  timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
                },
              ]);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <PlusIcon className="h-5 w-5" />
            Yeni Sohbet
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Geçmiş Sohbetler</h3>
          <div className="space-y-2">
            {sampleConversations.map((conv) => (
              <button
                key={conv.id}
                className="group w-full rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-1 flex items-start justify-between">
                  <h4 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-700">
                    {conv.title}
                  </h4>
                  <ChatBubbleLeftRightIcon className="h-4 w-4 flex-shrink-0 text-slate-400" />
                </div>
                <p className="mb-2 text-xs text-slate-600 line-clamp-2">{conv.lastMessage}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <ClockIcon className="h-3 w-3" />
                  {conv.timestamp}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-gradient-to-br from-fuchsia-50 to-purple-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <SparklesIconSolid className="h-5 w-5 text-fuchsia-600" />
              <h4 className="font-semibold text-slate-900">ATLAS.AI</h4>
            </div>
            <p className="text-xs text-slate-700">
              Yapay zeka destekli asistanınız. Sorularınızı yanıtlar, içerik üretir ve size yardımcı olur.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-3 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">ATLAS.AI Asistan</h1>
                <p className="hidden sm:block text-sm text-slate-600">Yapay zeka destekli yardımcınız</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
                <span className="text-xs font-semibold text-green-700">Çevrimiçi</span>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50/30 to-white p-6">
          {/* Quick Prompts - Show only when no messages */}
          {messages.length === 1 && (
            <div className="mb-8">
              <h2 className="mb-4 text-center text-lg font-bold text-slate-900">Ne yapmak istersiniz?</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    className="group rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-fuchsia-300 hover:shadow-lg"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-br from-fuchsia-100 to-purple-100 p-2">
                        <prompt.icon className="h-6 w-6 text-fuchsia-600" />
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-fuchsia-700">
                        {prompt.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600">{prompt.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-lg">
                    <SparklesIcon className="h-5 w-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white"
                      : "border border-slate-200 bg-white text-slate-900"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-fuchsia-600 prose-code:bg-fuchsia-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:list-disc prose-ol:list-decimal">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                  <p
                    className={`text-xs mt-2 ${
                      message.role === "user" ? "text-blue-200" : "text-slate-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white shadow-lg">
                    AT
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-lg">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-end gap-3">
              <button className="rounded-lg p-3 text-slate-600 transition hover:bg-slate-100">
                <PhotoIcon className="h-6 w-6" />
              </button>
              <button className="rounded-lg p-3 text-slate-600 transition hover:bg-slate-100">
                <DocumentTextIcon className="h-6 w-6" />
              </button>
              <div className="relative flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="ATLAS.AI'ya bir şeyler sor..."
                  rows={1}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                  style={{ minHeight: "48px", maxHeight: "200px" }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
              <button className="rounded-lg p-3 text-slate-600 transition hover:bg-slate-100">
                <MicrophoneIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              ATLAS.AI yanıtları doğru olmayabilir. Önemli kararlar için doğrulama yapın.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
