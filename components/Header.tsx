import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-white/5 bg-slate-950/50 px-6 py-4 backdrop-blur">
      <div className="text-xl font-semibold tracking-tight text-[#FFC72C]">ATLAS</div>

      <div className="relative w-full max-w-xl px-8">
        <input
          type="text"
          placeholder="ATLAS'ta ara"
          className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-white placeholder:text-slate-400 shadow-inner"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full border border-white/10 bg-slate-900/80 p-1 text-white">
          <UserCircleIcon className="h-full w-full" />
        </div>
      </div>
    </header>
  );
}
