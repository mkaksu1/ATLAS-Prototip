import {
  DocumentTextIcon,
  PresentationChartLineIcon,
  PhotoIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

const items = [
  { name: "Proje Belgeleri.docx", Icon: DocumentTextIcon },
  { name: "Sunum.pptx", Icon: PresentationChartLineIcon },
  { name: "Resimler", Icon: PhotoIcon },
  { name: "Arşiv", Icon: FolderIcon },
  { name: "Sözleşmeler", Icon: DocumentTextIcon },
  { name: "Toplantı Notları", Icon: DocumentTextIcon },
];

export default function DrivePage() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Dosyalarım</p>
        <h1 className="text-2xl font-semibold text-slate-900">ATLAS Drive</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
              <Icon className="h-6 w-6 text-[#0B1B3D]" />
            </span>
            <span className="text-sm font-medium text-slate-900">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
