export default function DokumanlarPage() {
  const docs = [
    {
      title: "Strateji Raporu 2026",
      desc: "Kurumsal vizyon, OKR ve büyüme alanları",
    },
    { title: "Güvenlik Politikası", desc: "Erişim, şifreleme ve 2FA rehberi" },
    { title: "API Rehberi", desc: "Entegrasyon uçları ve örnek istekler" },
    { title: "Kullanıcı Eğitimleri", desc: "Onboarding sunumları ve videolar" },
  ];

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Dokümanlar</p>
        <h1 className="text-2xl font-semibold text-slate-900">ATLAS Doküman Merkezi</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {docs.map((doc) => (
          <div
            key={doc.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-slate-900">{doc.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{doc.desc}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1B3D]">
              Görüntüle →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
