"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  QrCodeIcon,
  BanknotesIcon,
  ShoppingBagIcon,
  FilmIcon,
  MusicalNoteIcon,
  CloudIcon,
  DevicePhoneMobileIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { CreditCardIcon as CreditCardIconSolid } from "@heroicons/react/24/solid";

type PaymentMethod = {
  id: number;
  type: "credit" | "debit" | "bank";
  name: string;
  number: string;
  expiry: string;
  brand: string;
  isDefault: boolean;
};

type Transaction = {
  id: number;
  type: "payment" | "receive" | "subscription" | "refund";
  title: string;
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  category: string;
};

type Subscription = {
  id: number;
  name: string;
  icon: any;
  amount: number;
  renewalDate: string;
  status: "active" | "paused" | "cancelled";
  color: string;
};

const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    type: "credit",
    name: "Garanti BBVA",
    number: "**** **** **** 4532",
    expiry: "08/26",
    brand: "Visa",
    isDefault: true,
  },
  {
    id: 2,
    type: "debit",
    name: "İş Bankası",
    number: "**** **** **** 7891",
    expiry: "12/27",
    brand: "Mastercard",
    isDefault: false,
  },
  {
    id: 3,
    type: "bank",
    name: "Akbank",
    number: "TR34 0001 2345 6789 0123 45",
    expiry: "-",
    brand: "IBAN",
    isDefault: false,
  },
  {
    id: 4,
    type: "credit",
    name: "Yapı Kredi",
    number: "**** **** **** 2341",
    expiry: "03/28",
    brand: "Visa",
    isDefault: false,
  },
];

const transactions: Transaction[] = [
  {
    id: 1,
    type: "payment",
    title: "Migros",
    description: "Market alışverişi",
    amount: -345.50,
    date: "Bugün, 14:30",
    status: "completed",
    category: "Alışveriş",
  },
  {
    id: 2,
    type: "receive",
    title: "Mehmet Demir",
    description: "Para transferi",
    amount: 500.00,
    date: "Bugün, 10:15",
    status: "completed",
    category: "Transfer",
  },
  {
    id: 3,
    type: "subscription",
    title: "Spotify Premium",
    description: "Aylık abonelik",
    amount: -54.99,
    date: "Dün, 09:00",
    status: "completed",
    category: "Eğlence",
  },
  {
    id: 4,
    type: "payment",
    title: "Shell",
    description: "Yakıt",
    amount: -850.00,
    date: "Dün, 18:45",
    status: "completed",
    category: "Ulaşım",
  },
  {
    id: 5,
    type: "payment",
    title: "Starbucks",
    description: "Kahve",
    amount: -125.00,
    date: "2 gün önce",
    status: "completed",
    category: "Yiyecek",
  },
  {
    id: 6,
    type: "refund",
    title: "Amazon",
    description: "İade",
    amount: 230.00,
    date: "3 gün önce",
    status: "pending",
    category: "Alışveriş",
  },
  {
    id: 7,
    type: "subscription",
    title: "Netflix",
    description: "Aylık abonelik",
    amount: -149.99,
    date: "5 gün önce",
    status: "completed",
    category: "Eğlence",
  },
  {
    id: 8,
    type: "payment",
    title: "Getir",
    description: "Yemek siparişi",
    amount: -280.50,
    date: "1 hafta önce",
    status: "completed",
    category: "Yiyecek",
  },
];

const subscriptions: Subscription[] = [
  {
    id: 1,
    name: "Spotify Premium",
    icon: MusicalNoteIcon,
    amount: 54.99,
    renewalDate: "15 Şubat 2026",
    status: "active",
    color: "from-green-500 to-green-600",
  },
  {
    id: 2,
    name: "Netflix",
    icon: FilmIcon,
    amount: 149.99,
    renewalDate: "12 Şubat 2026",
    status: "active",
    color: "from-red-500 to-red-600",
  },
  {
    id: 3,
    name: "iCloud+",
    icon: CloudIcon,
    amount: 39.99,
    renewalDate: "20 Şubat 2026",
    status: "active",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 4,
    name: "Turkcell Platinum",
    icon: DevicePhoneMobileIcon,
    amount: 299.00,
    renewalDate: "1 Mart 2026",
    status: "active",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 5,
    name: "Amazon Prime",
    icon: ShoppingBagIcon,
    amount: 99.90,
    renewalDate: "8 Şubat 2026",
    status: "paused",
    color: "from-orange-500 to-orange-600",
  },
];

export default function PayPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "transactions" | "cards" | "subscriptions">("overview");
  const [filterType, setFilterType] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const balance = 4567.85;
  const monthlySpending = 2845.50;
  const monthlyIncome = 7200.00;

  const filteredTransactions = filterType === "all" 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

  const totalSubscriptions = subscriptions.filter(s => s.status === "active").reduce((sum, s) => sum + s.amount, 0);

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
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-slate-900">ATLAS Pay</span>
          </Link>
        </div>

        {/* Balance Card */}
        <div className="border-b border-slate-200 p-4">
          <div className="rounded-xl bg-gradient-to-br from-[#0B1B3D] to-[#2d4a7c] p-5 text-white shadow-lg">
            <p className="mb-1 text-sm font-medium text-blue-100">Mevcut Bakiye</p>
            <p className="mb-4 text-3xl font-bold">₺{balance.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</p>
            <div className="flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/20 py-2 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/30">
                <ArrowUpIcon className="h-4 w-4" />
                Gönder
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/20 py-2 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/30">
                <ArrowDownIcon className="h-4 w-4" />
                Al
              </button>
              <button className="flex items-center justify-center rounded-lg bg-white/20 px-3 py-2 backdrop-blur-sm transition hover:bg-white/30">
                <QrCodeIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border-b border-slate-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Bu Ay</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm border border-slate-100">
              <div>
                <p className="text-xs text-slate-600">Gelir</p>
                <p className="text-lg font-bold text-green-600">₺{monthlyIncome.toLocaleString("tr-TR")}</p>
              </div>
              <div className="rounded-full bg-green-100 p-2">
                <ArrowDownIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm border border-slate-100">
              <div>
                <p className="text-xs text-slate-600">Gider</p>
                <p className="text-lg font-bold text-red-600">₺{monthlySpending.toLocaleString("tr-TR")}</p>
              </div>
              <div className="rounded-full bg-red-100 p-2">
                <ArrowUpIcon className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm border border-slate-100">
              <div>
                <p className="text-xs text-slate-600">Abonelikler</p>
                <p className="text-lg font-bold text-blue-600">₺{totalSubscriptions.toLocaleString("tr-TR")}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-2">
                <ArrowPathIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Menü</h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedTab("overview")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                selectedTab === "overview"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ChartBarIcon className="h-5 w-5" />
              Genel Bakış
            </button>
            <button
              onClick={() => setSelectedTab("transactions")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                selectedTab === "transactions"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <CurrencyDollarIcon className="h-5 w-5" />
              İşlemler
            </button>
            <button
              onClick={() => setSelectedTab("cards")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                selectedTab === "cards"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <CreditCardIcon className="h-5 w-5" />
              Kartlarım
            </button>
            <button
              onClick={() => setSelectedTab("subscriptions")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                selectedTab === "subscriptions"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ArrowPathIcon className="h-5 w-5" />
              Abonelikler
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-slate-200 p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg active:scale-95">
            <PlusIcon className="h-5 w-5" />
            Yeni Kart Ekle
          </button>
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
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedTab === "overview" && "Genel Bakış"}
                  {selectedTab === "transactions" && "İşlem Geçmişi"}
                  {selectedTab === "cards" && "Ödeme Yöntemleri"}
                  {selectedTab === "subscriptions" && "Abonelikler"}
                </h1>
                <p className="hidden sm:block text-sm text-slate-600">
                  {selectedTab === "overview" && "Hesap özetiniz ve hızlı erişim"}
                  {selectedTab === "transactions" && "Tüm ödeme ve transfer işlemleriniz"}
                  {selectedTab === "cards" && "Kayıtlı kart ve hesaplarınız"}
                  {selectedTab === "subscriptions" && "Aktif ve pasif abonelikleriniz"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30 p-6">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div>
                <h2 className="mb-4 text-lg font-bold text-slate-900">Hızlı İşlemler</h2>
                <div className="grid grid-cols-4 gap-4">
                  <button className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg">
                    <div className="rounded-full bg-blue-100 p-4">
                      <ArrowUpIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">Para Gönder</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-green-300 hover:shadow-lg">
                    <div className="rounded-full bg-green-100 p-4">
                      <ArrowDownIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">Para İste</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-purple-300 hover:shadow-lg">
                    <div className="rounded-full bg-purple-100 p-4">
                      <QrCodeIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">QR ile Öde</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 transition hover:border-orange-300 hover:shadow-lg">
                    <div className="rounded-full bg-orange-100 p-4">
                      <BanknotesIcon className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900">Para Yükle</span>
                  </button>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Son İşlemler</h2>
                  <button
                    onClick={() => setSelectedTab("transactions")}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Tümünü Gör →
                  </button>
                </div>
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-full p-3 ${
                            transaction.type === "receive" || transaction.type === "refund"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {transaction.type === "receive" || transaction.type === "refund" ? (
                            <ArrowDownIcon className="h-5 w-5 text-green-600" />
                          ) : (
                            <ArrowUpIcon className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{transaction.title}</h3>
                          <p className="text-sm text-slate-600">{transaction.description}</p>
                          <p className="text-xs text-slate-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            transaction.amount > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}₺{Math.abs(transaction.amount).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            transaction.status === "completed"
                              ? "text-green-600"
                              : transaction.status === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          <CheckCircleIcon className="h-3.5 w-3.5" />
                          {transaction.status === "completed"
                            ? "Tamamlandı"
                            : transaction.status === "pending"
                            ? "Bekliyor"
                            : "Başarısız"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Subscriptions */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Aktif Abonelikler</h2>
                  <button
                    onClick={() => setSelectedTab("subscriptions")}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Tümünü Gör →
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {subscriptions.slice(0, 4).map((sub) => (
                    <div
                      key={sub.id}
                      className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className={`rounded-lg bg-gradient-to-br ${sub.color} p-3`}>
                          <sub.icon className="h-6 w-6 text-white" />
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            sub.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {sub.status === "active" ? "Aktif" : "Duraklatıldı"}
                        </span>
                      </div>
                      <h3 className="mb-1 font-bold text-slate-900">{sub.name}</h3>
                      <p className="mb-2 text-2xl font-bold text-slate-900">
                        ₺{sub.amount.toLocaleString("tr-TR")}
                      </p>
                      <p className="text-xs text-slate-600">Yenileme: {sub.renewalDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {selectedTab === "transactions" && (
            <div>
              <div className="mb-6 flex gap-2">
                <button
                  onClick={() => setFilterType("all")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    filterType === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setFilterType("payment")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    filterType === "payment"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Ödemeler
                </button>
                <button
                  onClick={() => setFilterType("receive")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    filterType === "receive"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Gelir
                </button>
                <button
                  onClick={() => setFilterType("subscription")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    filterType === "subscription"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Abonelikler
                </button>
              </div>
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`rounded-full p-3 ${
                          transaction.type === "receive" || transaction.type === "refund"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "receive" || transaction.type === "refund" ? (
                          <ArrowDownIcon className="h-6 w-6 text-green-600" />
                        ) : (
                          <ArrowUpIcon className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-bold text-slate-900">{transaction.title}</h3>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                            {transaction.category}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{transaction.description}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <ClockIcon className="h-3.5 w-3.5" />
                          {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`mb-1 text-2xl font-bold ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}₺{Math.abs(transaction.amount).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          transaction.status === "completed"
                            ? "text-green-600"
                            : transaction.status === "pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        {transaction.status === "completed"
                          ? "Tamamlandı"
                          : transaction.status === "pending"
                          ? "Bekliyor"
                          : "Başarısız"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cards Tab */}
          {selectedTab === "cards" && (
            <div>
              <div className="mb-6">
                <button className="rounded-lg border-2 border-dashed border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700">
                  <PlusIcon className="mx-auto mb-2 h-8 w-8" />
                  Yeni Kart Ekle
                </button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-lg transition hover:scale-105 hover:shadow-2xl"
                  >
                    {method.isDefault && (
                      <div className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold">
                        Varsayılan
                      </div>
                    )}
                    <div className="mb-8">
                      <CreditCardIconSolid className="h-10 w-10 text-white/80" />
                    </div>
                    <div className="mb-4">
                      <p className="mb-2 font-mono text-xl tracking-wider">{method.number}</p>
                      <p className="text-sm text-white/70">{method.name}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-white/60">Son Kullanma</p>
                        <p className="font-semibold">{method.expiry}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{method.brand}</p>
                        <p className="text-xs text-white/70 capitalize">{method.type === "credit" ? "Kredi Kartı" : method.type === "debit" ? "Banka Kartı" : "IBAN"}</p>
                      </div>
                    </div>
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {selectedTab === "subscriptions" && (
            <div>
              <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Toplam Aylık Abonelik</p>
                    <p className="text-3xl font-bold text-blue-600">
                      ₺{totalSubscriptions.toLocaleString("tr-TR")}
                    </p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-4">
                    <ArrowPathIcon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`rounded-xl bg-gradient-to-br ${sub.color} p-4`}>
                        <sub.icon className="h-8 w-8 text-white" />
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          sub.status === "active"
                            ? "bg-green-100 text-green-700"
                            : sub.status === "paused"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {sub.status === "active" ? "Aktif" : sub.status === "paused" ? "Duraklatıldı" : "İptal Edildi"}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900">{sub.name}</h3>
                    <p className="mb-4 text-3xl font-bold text-slate-900">
                      ₺{sub.amount.toLocaleString("tr-TR")}
                      <span className="text-sm font-normal text-slate-600">/ay</span>
                    </p>
                    <div className="mb-4 flex items-center gap-2 text-sm text-slate-600">
                      <ClockIcon className="h-4 w-4" />
                      Yenilenme: {sub.renewalDate}
                    </div>
                    <div className="flex gap-2">
                      {sub.status === "active" ? (
                        <button className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          Duraklat
                        </button>
                      ) : (
                        <button className="flex-1 rounded-lg bg-gradient-to-r from-[#0B1B3D] to-[#2d4a7c] px-4 py-2 text-sm font-semibold text-white transition hover:scale-105">
                          Yeniden Başlat
                        </button>
                      )}
                      <button className="flex-1 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">
                        İptal Et
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
