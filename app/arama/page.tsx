"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchValue, setSearchValue] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    try {
      // DuckDuckGo Instant Answer API
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json&no_html=1&skip_disambig=1`);
      const data = await response.json();
      
      const searchResults: SearchResult[] = [];
      
      // Ana sonuç (Abstract)
      if (data.AbstractText && data.AbstractURL) {
        searchResults.push({
          title: data.Heading || searchQuery,
          url: data.AbstractURL,
          description: data.AbstractText
        });
      }
      
      // İlgili konular (RelatedTopics)
      if (data.RelatedTopics && data.RelatedTopics.length > 0) {
        data.RelatedTopics.slice(0, 5).forEach((topic: any) => {
          if (topic.Text && topic.FirstURL) {
            searchResults.push({
              title: topic.Text.split(' - ')[0] || topic.Text.substring(0, 60),
              url: topic.FirstURL,
              description: topic.Text
            });
          }
        });
      }
      
      // Eğer sonuç yoksa, genel linkler ekle
      if (searchResults.length === 0) {
        searchResults.push(
          {
            title: `${searchQuery} - Wikipedia`,
            url: `https://tr.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`,
            description: `${searchQuery} hakkında Wikipedia'da detaylı bilgi edinin.`
          },
          {
            title: `${searchQuery} hakkında videolar`,
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
            description: `${searchQuery} ile ilgili YouTube videoları ve içerikleri.`
          },
          {
            title: `${searchQuery} görselleri`,
            url: `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&iax=images&ia=images`,
            description: `${searchQuery} için görsel arama sonuçları.`
          }
        );
      }
      
      setResults(searchResults);
    } catch (error) {
      console.error('Arama hatası:', error);
      // Hata durumunda fallback sonuçlar
      setResults([
        {
          title: `${searchQuery} - Wikipedia`,
          url: `https://tr.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`,
          description: `${searchQuery} hakkında detaylı ansiklopedik bilgi.`
        },
        {
          title: `${searchQuery} - DuckDuckGo`,
          url: `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`,
          description: `${searchQuery} için DuckDuckGo arama sonuçları.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/arama?q=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/30">
      {/* Header with Search */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="hidden sm:inline text-2xl font-black italic bg-gradient-to-r from-[#0B1B3D] to-[#2d5a9f] bg-clip-text text-transparent">
                ATLAS
              </span>
            </Link>
            
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative flex items-center rounded-full border-2 border-slate-200 bg-white px-5 py-2.5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="ATLAS'ta ara..."
                  className="ml-3 flex-1 border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-xl bg-slate-100 p-6">
                <div className="h-4 w-3/4 rounded bg-slate-200"></div>
                <div className="mt-2 h-3 w-1/2 rounded bg-slate-200"></div>
                <div className="mt-3 h-3 w-full rounded bg-slate-200"></div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{query}</span> için yaklaşık {results.length} sonuç bulundu
            </p>
            <div className="space-y-6">
              {results.map((result, idx) => (
                <a
                  key={idx}
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-slate-200 hover:shadow-md"
                >
                  <div className="mb-1 flex items-baseline gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                      <span className="max-w-xs truncate">{new URL(result.url).hostname}</span>
                    </div>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-blue-600 transition group-hover:underline">
                    {result.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {result.description}
                  </p>
                </a>
              ))}
            </div>
          </>
        ) : query ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">
              <span className="font-semibold">{query}</span> için sonuç bulunamadı
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-slate-600">Aramak için bir şeyler yazın</p>
          </div>
        )}
      </main>
    </div>
  );
}
