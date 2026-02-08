"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  PencilSquareIcon,
  InboxIcon,
  StarIcon,
  PaperAirplaneIcon,
  DocumentIcon,
  TrashIcon,
  FolderIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
  PaperClipIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const emails = [
  {
    id: 1,
    from: "BT Operasyon",
    subject: "Haftalık bakım penceresi",
    preview: "Bu hafta Cumartesi gecesi 02:00-04:00 arası sunucu bakımı yapılacaktır...",
    body: "Merhaba,\n\nBu hafta Cumartesi gecesi 02:00-04:00 arası planlı sunucu bakımı yapılacaktır. Bu süre zarfında sistemlerimizde kısa süreli kesintiler yaşanabilir.\n\nEtkilenecek sistemler:\n- Web sunucuları\n- Veritabanı sunucuları\n- Uygulama sunucuları\n\nLütfen bu süre zarfında kritik işlemler planlamayınız.\n\nTeşekkürler,\nBT Operasyon Ekibi",
    time: "10:30",
    date: "8 Şubat 2026",
    read: false,
    starred: false,
    category: "inbox",
  },
  {
    id: 2,
    from: "Güvenlik Ekibi",
    subject: "SIEM rapor özeti",
    preview: "Son 24 saatte tespit edilen güvenlik olaylarının özeti ektedir. İncelemenizi...",
    body: "Güvenlik Raporu - Günlük Özet\n\nSon 24 saatte tespit edilen güvenlik olaylarının özeti:\n\n• 45 başarısız giriş denemesi tespit edildi\n• 3 şüpheli IP adresi engellendi\n• 0 kritik güvenlik açığı bulundu\n• Sistem güncellemeleri tamamlandı\n\nDetaylı rapor ekte bulunmaktadır. Herhangi bir sorunuz varsa lütfen bizimle iletişime geçin.\n\nSaygılarımızla,\nGüvenlik Ekibi",
    time: "08:15",
    date: "8 Şubat 2026",
    read: true,
    starred: true,
    category: "inbox",
  },
  {
    id: 3,
    from: "Satınalma Departmanı",
    subject: "Yeni tedarikçi sözleşmesi",
    preview: "Ekteki sözleşme taslağını inceleyerek geri bildirimlerinizi iletebilir misiniz?",
    body: "Sayın Yetkili,\n\nYeni tedarikçimiz ile yapacağımız sözleşme taslağı hazırlanmıştır. Ekteki dokümanı inceleyerek geri bildirimlerinizi 10 Şubat tarihine kadar iletmenizi rica ederiz.\n\nSözleşme Detayları:\n- Süre: 2 yıl\n- Ödeme Koşulları: 30 gün vade\n- Teslimat: FOB\n\nİyi çalışmalar,\nSatınalma Departmanı",
    time: "Dün",
    date: "7 Şubat 2026",
    read: true,
    starred: false,
    category: "inbox",
  },
  {
    id: 4,
    from: "Ürün Yönetimi",
    subject: "Q1 Roadmap güncellemesi",
    preview: "2026 Q1 hedeflerimiz ve yol haritası güncellemesi toplantı notları...",
    body: "Ekip,\n\n2026 Q1 roadmap güncellemesi yapıldı. Öncelikli hedeflerimiz:\n\n1. Mobil uygulama v2.0 lansmanı (Mart)\n2. API performans iyileştirmeleri (Şubat)\n3. Kullanıcı arayüzü yenileme (Mart)\n4. Yapay zeka entegrasyonu (Q1 sonu)\n\nDetaylı timeline ve task dağılımı için toplantı notlarına bakabilirsiniz.\n\nBaşarılar,\nÜrün Yönetimi",
    time: "Dün",
    date: "7 Şubat 2026",
    read: false,
    starred: true,
    category: "inbox",
  },
  {
    id: 8,
    from: "Finans Departmanı",
    subject: "Ocak ayı bütçe raporu",
    preview: "Ocak ayı harcama ve gelir raporu hazırlandı. Detaylar ekte...",
    body: "Sayın Yönetici,\n\nOcak 2026 dönemi mali raporu sunulmuştur.\n\nÖzet Bilgiler:\n• Toplam Gelir: ₺4.2M\n• Toplam Gider: ₺3.8M\n• Net Kar: ₺400K (%10.5 kar marjı)\n• Bütçe Uyumu: %95\n\nDetaylı analiz ve kategori bazlı harcamalar ek dokümanda yer almaktadır.\n\nSaygılarımızla,\nFinans Departmanı",
    time: "11:45",
    date: "8 Şubat 2026",
    read: false,
    starred: false,
    category: "inbox",
  },
  {
    id: 9,
    from: "Sistem Yöneticisi",
    subject: "Sunucu kapasite raporu",
    preview: "Sunucu kaynaklarında %85 kullanım tespit edildi. Kapasite artırımı önerilir...",
    body: "Teknik Ekip,\n\nSunucu izleme raporumuz kritik eşik değerlerine yaklaşıyor.\n\n⚠️ Mevcut Durum:\n• CPU Kullanımı: %85 (ortalama)\n• RAM Kullanımı: %78\n• Disk Kullanımı: %82\n• Network Trafiği: 450 Gbps (peak)\n\nÖneri: Q2 başında kapasite artırımı planlamalıyız. Teknik detaylar confluence'da.\n\nSaygılarımla,\nSistem Yöneticisi",
    time: "09:20",
    date: "8 Şubat 2026",
    read: true,
    starred: false,
    category: "inbox",
  },
  {
    id: 10,
    from: "Eğitim Koordinatörü",
    subject: "Azure Sertifika Programı başlıyor",
    preview: "Microsoft Azure Administrator sertifika eğitimi 15 Şubat'ta başlıyor...",
    body: "Değerli Meslektaşlar,\n\nMicrosoft Azure Administrator (AZ-104) sertifika programımız başlıyor!\n\n📅 Program Detayları:\n• Başlangıç: 15 Şubat 2026\n• Süre: 6 hafta (18 saat)\n• Format: Hibrit (Online + Yüz yüze)\n• Sınav: 29 Mart 2026\n• Kontenjan: 20 kişi\n\nKayıt için learning.atlas.com adresini ziyaret edin. İlk 15 kayda %50 indirim!\n\nİyi çalışmalar,\nEğitim Koordinatörü",
    time: "08:50",
    date: "8 Şubat 2026",
    read: false,
    starred: false,
    category: "inbox",
  },
  {
    id: 11,
    from: "Proje Yöneticisi",
    subject: "Sprint 16 Planlama Toplantısı",
    preview: "Sprint 16 planning toplantımız yarın 14:00'te. Katılımınızı bekliyoruz...",
    body: "Scrum Team,\n\nSprint 16 planlama toplantımız yarın gerçekleşecek.\n\n🗓 Toplantı Bilgileri:\n• Tarih: 9 Şubat 2026, Pazartesi\n• Saat: 14:00 - 16:00\n• Mekan: Toplantı Odası B / Teams\n• Gündem: Sprint 15 retrospektif + Sprint 16 planning\n\nHazırlık: User story'leri önceden gözden geçirin. Backlog grooming notları Jira'da.\n\nGörüşmek üzere,\nProje Yöneticisi",
    time: "07:30",
    date: "8 Şubat 2026",
    read: true,
    starred: true,
    category: "inbox",
  },
  {
    id: 5,
    from: "İnsan Kaynakları",
    subject: "Eğitim planı ve sertifikalar",
    preview: "Yıllık eğitim programı ve sertifika takvimi hazırlandı. Katılım için...",
    body: "Değerli Çalışanlarımız,\n\n2026 yılı eğitim programı ve sertifika takvimimiz hazırlanmıştır.\n\nBu yıl sunduğumuz eğitimler:\n- Liderlik ve Yönetim (Mart)\n- Teknik Sertifikasyon Programları (Nisan-Mayıs)\n- İletişim Becerileri (Haziran)\n- Dijital Dönüşüm Eğitimleri (Tüm yıl)\n\nKayıt için İK portala giriş yapabilirsiniz.\n\nİyi günler,\nİnsan Kaynakları",
    time: "5 Şub",
    date: "5 Şubat 2026",
    read: true,
    starred: false,
    category: "sent",
  },
  {
    id: 6,
    from: "Müşteri Başarı",
    subject: "Pilot müşteri geri bildirimi",
    preview: "Beta testlerinden olumlu geri dönüşler aldık. Detaylı rapor ekte...",
    body: "Merhaba,\n\nPilot müşterilerimizden gelen beta test geri bildirimleri oldukça olumlu!\n\nÖnemli Noktalar:\n✓ %92 kullanıcı memnuniyeti\n✓ Ortalama kullanım süresi 45 dakika/gün\n✓ 3 kritik bug rapor edildi (düzeltildi)\n✓ 15 yeni özellik önerisi geldi\n\nDetaylı rapor ve kullanıcı yorumları ekte bulunmaktadır. Önümüzdeki hafta değerlendirme toplantısı yapalım.\n\nSelam ve saygılar,\nMüşteri Başarı Ekibi",
    time: "4 Şub",
    date: "4 Şubat 2026",
    read: true,
    starred: false,
    category: "trash",
  },
  {
    id: 7,
    from: "Pazarlama Ekibi",
    subject: "Q1 Kampanya Sonuçları (Taslak)",
    preview: "Yeni yıl kampanyamız hedeflerin üzerinde performans gösterdi...",
    body: "Merhaba Ekip,\n\nQ1 2026 kampanya sonuçlarımız harika!\n\n📊 Sonuçlar:\n• %156 ROI artışı\n• 45.000 yeni kullanıcı\n• %32 dönüşüm oranı artışı\n• 2.3M sosyal medya erişimi\n\nDetaylı analiz ve gelecek planlar için toplantı ayarlayalım.\n\nBaşarılar,\nPazarlama Ekibi",
    time: "3 Şub",
    date: "3 Şubat 2026",
    read: false,
    starred: false,
    category: "drafts",
  },
];

const menuItems = [
  { id: "inbox", name: "Gelen Kutusu", Icon: InboxIcon, count: 8 },
  { id: "starred", name: "Yıldızlı", Icon: StarIcon, count: 3 },
  { id: "sent", name: "Gönderilenler", Icon: PaperAirplaneIcon, count: 1 },
  { id: "drafts", name: "Taslaklar", Icon: DocumentIcon, count: 1 },
  { id: "trash", name: "Çöp Kutusu", Icon: TrashIcon, count: 1 },
];

export default function MailPage() {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [starredEmails, setStarredEmails] = useState<number[]>(
    emails.filter((e) => e.starred).map((e) => e.id)
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [logoHover, setLogoHover] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedEmails((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleStar = (id: number) => {
    setStarredEmails((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getFilteredEmails = () => {
    let filtered = emails;
    
    // Category filtering
    if (activeMenu === "starred") {
      filtered = emails.filter((e) => starredEmails.includes(e.id));
    } else if (activeMenu === "sent") {
      filtered = emails.filter((e) => e.category === "sent");
    } else if (activeMenu === "drafts") {
      filtered = emails.filter((e) => e.category === "drafts");
    } else if (activeMenu === "trash") {
      filtered = emails.filter((e) => e.category === "trash");
    } else if (activeMenu === "inbox") {
      filtered = emails.filter((e) => e.category === "inbox");
    }
    
    // Search filtering
    if (searchQuery) {
      filtered = filtered.filter((e) => 
        e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredEmails = getFilteredEmails();
  const currentEmail = selectedEmail ? emails.find((e) => e.id === selectedEmail) : null;

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
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="border-b border-slate-200 p-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] text-white shadow-md transition-all duration-300 group-hover:scale-110">
              {logoHover ? (
                <ChevronLeftIcon className="h-5 w-5 transition-all duration-300" />
              ) : showIcon ? (
                <ChevronLeftIcon className="h-5 w-5 animate-in fade-in zoom-in-95 duration-300" />
              ) : (
                <EnvelopeIcon className="h-5 w-5 animate-in fade-in zoom-in-95 duration-300" />
              )}
            </div>
            <span className="text-lg font-bold text-slate-900 transition-all duration-300">
              {logoHover ? "Geri Dön" : "ATLASmail"}
            </span>
          </Link>
        </div>

        {/* Compose Button */}
        <div className="p-4">
          <button 
            onClick={() => setShowCompose(true)}
            className="group flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-3 text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <PencilSquareIcon className="h-5 w-5" />
            <span className="font-semibold">Yeni E-posta</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {menuItems.map(({ id, name, Icon, count }) => (
            <button
              key={id}
              onClick={() => {
                setActiveMenu(id);
                setSelectedEmail(null);
              }}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeMenu === id
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1 text-left">{name}</span>
              {count && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    activeMenu === id ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Settings */}
        <div className="border-t border-slate-200 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100">
            <Cog6ToothIcon className="h-5 w-5" />
            <span>Ayarlar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="E-postalarda ara"
                className="w-48 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 lg:w-96"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
              <ArrowPathIcon className="h-5 w-5" />
            </button>
            <button className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 sm:block">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-3 py-2 sm:px-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
            />
            <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
              <TrashIcon className="h-4 w-4" />
            </button>
            <button className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 sm:block">
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="hidden items-center gap-2 text-xs text-slate-600 sm:flex">
            <span>1-6 / 12</span>
            <button className="rounded p-1 transition hover:bg-slate-100">
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button className="rounded p-1 transition hover:bg-slate-100">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {filteredEmails.map((email) => {
            const isSelected = selectedEmails.includes(email.id);
            const isStarred = starredEmails.includes(email.id);
            return (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email.id)}
                className={`group flex cursor-pointer items-center gap-2 border-b border-slate-100 px-3 py-3 transition-all duration-150 hover:bg-slate-50 hover:shadow-sm sm:gap-4 sm:px-6 ${
                  isSelected ? "bg-blue-50" : email.read ? "bg-white" : "bg-blue-50/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(email.id)}
                  className="h-4 w-4 flex-shrink-0 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(email.id);
                  }}
                  className="flex-shrink-0 text-slate-400 transition hover:text-yellow-500"
                >
                  {isStarred ? (
                    <StarIconSolid className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />
                  ) : (
                    <StarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span
                    className={`flex-shrink-0 truncate text-xs sm:w-44 sm:text-sm ${
                      email.read ? "font-normal text-slate-600" : "font-semibold text-slate-900"
                    }`}
                  >
                    {email.from}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm sm:inline ${
                        email.read ? "font-normal text-slate-900" : "font-semibold text-slate-900"
                      }`}
                    >
                      {email.subject}
                    </span>
                    <span className="hidden text-sm text-slate-500 sm:ml-2 sm:inline">— {email.preview}</span>
                  </div>
                  <span className="flex-shrink-0 text-xs text-slate-500">{email.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Email Detail Panel */}
      {currentEmail && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[2px] lg:hidden"
            onClick={() => setSelectedEmail(null)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-slate-200 bg-white shadow-2xl lg:static lg:w-[600px] xl:w-[700px]">
            {/* Detail Header */}
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(currentEmail.id);
                    }}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                  >
                    {starredEmails.includes(currentEmail.id) ? (
                      <StarIconSolid className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <StarIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="p-4 sm:p-6">
              {/* Subject */}
              <h1 className="mb-4 text-2xl font-bold text-slate-900">{currentEmail.subject}</h1>

              {/* Sender Info */}
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-bold text-white">
                  {currentEmail.from[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">{currentEmail.from}</p>
                    <span className="flex-shrink-0 text-sm text-slate-500">{currentEmail.time}</span>
                  </div>
                  <p className="text-sm text-slate-600">{currentEmail.date}</p>
                </div>
              </div>

              {/* Email Body */}
              <div className="prose prose-slate max-w-none">
                <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                  {currentEmail.body}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                  <ArrowPathIcon className="h-4 w-4" />
                  Yanıtla
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300">
                  <PaperAirplaneIcon className="h-4 w-4" />
                  İlet
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Compose Modal */}
      {showCompose && (
        <>
          <div 
            className="fixed inset-0 z-[100] bg-slate-900/25 backdrop-blur-[2px] transition-opacity duration-200"
            onClick={() => setShowCompose(false)}
          />
          <div className="fixed left-1/2 top-1/2 z-[110] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200">
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10">
              {/* Compose Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <h2 className="text-lg font-bold text-slate-900">Yeni E-posta</h2>
                <button
                  onClick={() => setShowCompose(false)}
                  className="rounded-lg p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 active:scale-95"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Compose Form */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* To */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Alıcı</label>
                    <input
                      type="email"
                      placeholder="ornek@email.com"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Konu</label>
                    <input
                      type="text"
                      placeholder="E-posta konusu"
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Mesaj</label>
                    <textarea
                      rows={10}
                      placeholder="Mesajınızı yazın..."
                      className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between">
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300">
                    <PaperClipIcon className="h-4 w-4" />
                    Dosya Ekle
                  </button>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowCompose(false)}
                      className="rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                    >
                      İptal
                    </button>
                    <button 
                      onClick={() => setShowCompose(false)}
                      className="rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      Gönder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
