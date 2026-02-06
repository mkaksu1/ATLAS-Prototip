export default function SearchPage() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Arama</p>
        <h1 className="text-3xl font-semibold text-slate-900">ATLAS Ekosisteminde Ara</h1>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Kişi, dosya veya e-posta ara"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400"
          />
          <button className="rounded-lg bg-[#0B1B3D] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0B1B3D]/30 transition hover:brightness-95">
            Ara
          </button>
        </div>
        <p className="text-xs text-slate-500">
          ATLAS; e-posta, dosya ve dizinler arasında birleşik arama deneyimi sunar.
        </p>
      </div>
    </section>
  );
}
