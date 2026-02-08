"use client";

import { useState, useEffect, Suspense } from "react";
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
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon as SparklesIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

type Conversation = {
  id: number;
  title: string;
  messages: Message[];
  timestamp: string;
  starred?: boolean;
};

const quickPrompts = [
  {
    icon: LightBulbIcon,
    title: "Fikir Üret",
    description: "Yeni projeler için yaratıcı fikirler",
    prompt: "Yenilikçi bir proje fikri üretmeme yardımcı olur musun?",
    color: "from-yellow-500 to-amber-500"
  },
  {
    icon: CodeBracketIcon,
    title: "Kod Yaz",
    description: "Programlama sorunlarına çözüm",
    prompt: "Bir web uygulaması için örnek kod yazabilir misin?",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: LanguageIcon,
    title: "Çeviri Yap",
    description: "Metinleri farklı dillere çevir",
    prompt: "Bu metni İngilizce'ye çevirebilir misin?",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: DocumentTextIcon,
    title: "Metin Yaz",
    description: "Profesyonel içerik oluştur",
    prompt: "Bir sunum için profesyonel bir giriş metni yazabilir misin?",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ChartBarIcon,
    title: "Analiz Yap",
    description: "Veri ve trend analizi",
    prompt: "Bir veri setini analiz etmeme yardımcı olur musun?",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Özet Çıkar",
    description: "Uzun metinleri özetle",
    prompt: "Bu uzun metni özetleyebilir misin?",
    color: "from-indigo-500 to-violet-500"
  },
];

const initialMockConversations: Conversation[] = [
  {
    id: 1,
    title: "Web Geliştirme Önerileri",
    messages: [
      {
        id: 1,
        role: "user",
        content: "React ile modern bir dashboard nasıl oluşturabilirim?",
        timestamp: new Date(Date.now() - 3600000).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
      },
      {
        id: 2,
        role: "assistant",
        content: "React ile modern bir dashboard oluşturmak için şu adımları izleyebilirsiniz:\n\n1. **Component Yapısı**: Dashboard'u küçük, yeniden kullanılabilir bileşenlere ayırın\n2. **State Management**: Redux veya Zustand kullanarak global state yönetimi\n3. **UI Framework**: Tailwind CSS veya Material-UI ile modern arayüz\n4. **Data Visualization**: Chart.js veya Recharts ile grafikler\n\nÖrnek bir yapı:\n```jsx\nfunction Dashboard() {\n  return (\n    <div className=\"grid grid-cols-4 gap-4\">\n      <StatCard title=\"Kullanıcılar\" value=\"1,234\" />\n      <Chart data={salesData} />\n    </div>\n  );\n}\n```",
        timestamp: new Date(Date.now() - 3500000).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
      }
    ],
    timestamp: "Bugün, 14:30",
    starred: false,
  },
  {
    id: 2,
    title: "Veri Analizi Yöntemleri",
    messages: [
      {
        id: 1,
        role: "user",
        content: "Python pandas ile veri temizleme işlemi nasıl yapılır?",
        timestamp: new Date(Date.now() - 86400000).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
      },
      {
        id: 2,
        role: "assistant",
        content: "Python pandas ile veri temizleme için temel adımlar:\n\n**1. Eksik Değerleri Kontrol Etme:**\n```python\ndf.isnull().sum()\ndf.dropna()  # Eksik satırları sil\ndf.fillna(0)  # Eksikkleri 0 ile doldur\n```\n\n**2. Duplikatları Kaldırma:**\n```python\ndf.drop_duplicates()\n```\n\n**3. Veri Tiplerini Düzenleme:**\n```python\ndf['tarih'] = pd.to_datetime(df['tarih'])\ndf['fiyat'] = df['fiyat'].astype(float)\n```\n\n**4. Outlier Tespiti:**\n```python\nQ1 = df['değer'].quantile(0.25)\nQ3 = df['değer'].quantile(0.75)\nIQR = Q3 - Q1\n```\n\nBu yöntemlerle veri kalitenizi artırabilirsiniz.",
        timestamp: new Date(Date.now() - 86000000).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
      }
    ],
    timestamp: "Dün, 10:15",
    starred: false,
  },
  {
    id: 3,
    title: "Proje Yönetimi",
    messages: [
      {
        id: 1,
        role: "user",
        content: "Agile metodolojisi ile proje nasıl planlanır?",
        timestamp: new Date(Date.now() - 172800000).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
      },
      {
        id: 2,
        role: "assistant",
        content: "Agile ile proje planlama adımları:\n\n**Sprint Planlaması:**\n- 2 haftalık sprint'ler belirleme\n- User story'leri önceliklendirme\n- Story point tahminleri (Fibonacci: 1, 2, 3, 5, 8)\n\n**Daily Standups:**\n- 15 dakikalık günlük toplantılar\n- Dün ne yaptım, bugün ne yapacağım, engeller\n\n**Sprint Review & Retro:**\n- Sprint sonunda demo\n- Neyi iyi yaptık, neleri geliştirebiliriz?\n\n**Backlog Yönetimi:**\n- Product backlog'u sürekli güncel tutma\n- Refinement toplantıları ile grooming\n\n**Araçlar:** Jira, Trello, Azure DevOps\n\nAgile'ın özü: Esneklik, iterasyon ve sürekli iyileştirme!",
        timestamp: new Date(Date.now() - 172000000).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
      }
    ],
    timestamp: "2 gün önce",
    starred: false,
  },
];

// Dynamic export to fix useSearchParams suspense issue
export const dynamic = 'force-dynamic';

function AIPageContent() {
  const searchParams = useSearchParams();
  const queryText = searchParams.get("q") || "";
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
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
  
  // Load conversations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("atlasai_conversations");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConversations(parsed);
      } catch (e) {
        // If parse fails, use initial mock conversations
        setConversations(initialMockConversations);
        localStorage.setItem("atlasai_conversations", JSON.stringify(initialMockConversations));
      }
    } else {
      // First time, use mock conversations
      setConversations(initialMockConversations);
      localStorage.setItem("atlasai_conversations", JSON.stringify(initialMockConversations));
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("atlasai_conversations", JSON.stringify(conversations));
    }
  }, [conversations]);

  // Update current conversation messages when currentConversationId changes
  useEffect(() => {
    if (currentConversationId !== null) {
      const conversation = conversations.find(c => c.id === currentConversationId);
      if (conversation) {
        setMessages(conversation.messages);
      }
    }
  }, [currentConversationId]);

  // Save current conversation when messages change (but not during typing)
  useEffect(() => {
    if (!isTyping && currentConversationId !== null && messages.length > 1) {
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId 
          ? { 
              ...conv, 
              messages, 
              title: messages[1]?.content.slice(0, 50) || conv.title,
              timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
            }
          : conv
      ));
    }
  }, [isTyping]);

  const startNewConversation = () => {
    // Eğer mevcut sohbette sadece welcome mesajı varsa, yeni sohbet açma
    if (messages.length === 1 && messages[0].role === "assistant") {
      return;
    }

    const newId = Date.now();
    setCurrentConversationId(newId);
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "Merhaba! Ben ATLAS.AI, size nasıl yardımcı olabilirim?",
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    const newConversation: Conversation = {
      id: newId,
      title: "Yeni Sohbet",
      messages: [
        {
          id: 1,
          role: "assistant",
          content: "Merhaba! Ben ATLAS.AI, size nasıl yardımcı olabilirim?",
          timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        },
      ],
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      starred: false,
    };
    setConversations(prev => [newConversation, ...prev]);
  };

  const deleteConversation = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
      setMessages([
        {
          id: 1,
          role: "assistant",
          content: "Merhaba! Ben ATLAS.AI, size nasıl yardımcı olabilirim?",
          timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  const toggleStarred = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, starred: !conv.starred } : conv
    ));
  };

  const loadConversation = (id: number) => {
    setCurrentConversationId(id);
    setSidebarOpen(false);
  };
  
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

    // AI mesaj placeholder'ı ekle
    const aiMessageId = messages.length + 2;
    const aiMessage: Message = {
      id: aiMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, aiMessage]);

    try {
      // GitHub Models API çağrısı (streaming)
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

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Stream reader alınamadı');
      }

      let accumulatedContent = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Son satırı buffer'da tut (eksik olabilir)
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim() === '' || !line.startsWith('data: ')) continue;
          
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            
            if (content) {
              accumulatedContent += content;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiMessageId
                    ? { ...msg, content: accumulatedContent }
                    : msg
                )
              );
            }
          } catch (e) {
            // JSON parse hatası, devam et
          }
        }
      }

      setIsTyping(false);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { 
                ...msg, 
                content: "Üzgünüm, şu anda bir hata oluştu. Lütfen .env.local dosyasında GITHUB_TOKEN'ınızı yapılandırdığınızdan emin olun. Token almak için: https://github.com/settings/tokens (models:read izni gerekli)" 
              }
            : msg
        )
      );
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
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-black italic bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] bg-clip-text text-transparent">ATLAS.AI</span>
          </Link>
        </div>

        {/* New Chat Button */}
        <div className="border-b border-slate-200 p-4">
          <button
            onClick={startNewConversation}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0B1B3D]/25 transition hover:scale-105 hover:shadow-xl hover:shadow-[#0B1B3D]/35 active:scale-95"
          >
            <PlusIcon className="h-5 w-5" />
            Yeni Sohbet
          </button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Geçmiş Sohbetler</h3>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`group relative w-full rounded-xl border p-3 transition hover:border-[#2d4a7c]/30 hover:shadow-lg hover:bg-[#0B1B3D]/5 cursor-pointer ${
                  currentConversationId === conv.id 
                    ? 'border-[#2d4a7c] bg-[#0B1B3D]/5' 
                    : 'border-slate-200 bg-white'
                }`}
                onClick={() => loadConversation(conv.id)}
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h4 className={`font-semibold line-clamp-1 flex-1 group-hover:text-[#2d4a7c] ${
                    currentConversationId === conv.id ? 'text-[#2d4a7c]' : 'text-slate-900'
                  }`}>
                    {conv.title}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => toggleStarred(conv.id, e)}
                      className="rounded p-1 transition hover:bg-[#2d4a7c]/10"
                      title={conv.starred ? "Yıldızı kaldır" : "Yıldızla"}
                    >
                      {conv.starred ? (
                        <StarIconSolid className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <StarIcon className="h-4 w-4 text-slate-400 hover:text-yellow-500" />
                      )}
                    </button>
                    <button
                      onClick={(e) => deleteConversation(conv.id, e)}
                      className="rounded p-1 transition hover:bg-red-50"
                      title="Sohbeti sil"
                    >
                      <TrashIcon className="h-4 w-4 text-slate-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="mb-2 text-xs text-slate-600 line-clamp-2">
                  {conv.messages[conv.messages.length - 1]?.content.slice(0, 60) || "Yeni sohbet"}...
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <ClockIcon className="h-3 w-3" />
                  {conv.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl bg-gradient-to-br from-[#0B1B3D]/5 to-[#2d4a7c]/5 border border-[#0B1B3D]/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <SparklesIconSolid className="h-5 w-5 text-[#2d4a7c]" />
              <h4 className="font-bold text-slate-900">ATLAS.AI</h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
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
                className="rounded-xl p-2 text-slate-600 transition hover:bg-[#0B1B3D]/5 hover:text-[#2d4a7c] active:scale-95 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-black italic bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] bg-clip-text text-transparent">ATLAS.AI</h1>
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
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-[#0B1B3D]/5 p-6">
          {/* Quick Prompts - Show only when no messages */}
          {messages.length === 1 && (
            <div className="mb-6">
              <h2 className="mb-4 text-center text-xl font-black bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] bg-clip-text text-transparent">Ne yapmak istersiniz?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    className="group rounded-xl border border-slate-200 bg-white p-3 text-center transition hover:border-[#2d4a7c]/30 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                  >
                    <div className="mb-2 flex justify-center">
                      <div className={`rounded-lg bg-gradient-to-br ${prompt.color} p-2 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                        <prompt.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#2d4a7c] mb-1">
                      {prompt.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{prompt.description}</p>
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
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] shadow-lg">
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
                    <div className="prose prose-sm max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-code:text-[#2d4a7c] prose-code:bg-[#0B1B3D]/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-a:text-[#2d4a7c] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:list-disc prose-ol:list-decimal">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                  <p
                    className={`text-xs mt-2 ${
                      message.role === "user" ? "text-white/70" : "text-slate-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-sm font-bold text-white shadow-lg">
                    AT
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] shadow-lg">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[#2d4a7c]" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[#2d4a7c]" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-[#2d4a7c]" style={{ animationDelay: "300ms" }} />
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
              <button className="rounded-xl p-3 text-slate-600 transition hover:bg-[#0B1B3D]/5 hover:text-[#2d4a7c] active:scale-95">
                <PhotoIcon className="h-6 w-6" />
              </button>
              <button className="rounded-xl p-3 text-slate-600 transition hover:bg-[#0B1B3D]/5 hover:text-[#2d4a7c] active:scale-95">
                <DocumentTextIcon className="h-6 w-6" />
              </button>
              <div className="relative flex-1">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="ATLAS.AI'ya bir şeyler sor..."
                  rows={1}
                  className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 pr-12 text-sm focus:border-[#2d4a7c] focus:outline-none focus:ring-2 focus:ring-[#2d4a7c]/20 transition"
                  style={{ minHeight: "48px", maxHeight: "200px" }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 active:scale-95"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
              <button className="rounded-xl p-3 text-slate-600 transition hover:bg-[#0B1B3D]/5 hover:text-[#2d4a7c] active:scale-95">
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

export default function AIPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-fuchsia-200 border-t-fuchsia-600"></div>
          <p className="text-slate-600">Yükleniyor...</p>
        </div>
      </div>
    }>
      <AIPageContent />
    </Suspense>
  );
}
