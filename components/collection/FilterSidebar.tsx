type Props = {
  sensorFilters: string[];
  typeFilters: string[];
};

export default function FilterSidebar({ sensorFilters, typeFilters }: Props) {
  return (
    <aside className="rounded-[22px] border border-[#0e242c] bg-[linear-gradient(180deg,#041018_0%,#06111a_100%)] p-5 shadow-[0_0_0_1px_rgba(218,180,134,0.05)]">
      <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-[#f6eee6]">
        Filtrowanie
      </h2>

      <div className="mt-6 flex items-center rounded-xl border border-[#6b573f] bg-transparent px-4 py-3 text-sm text-[#6f6a63]">
        <span className="flex-1">Szukaj aparatu...</span>
        <span>⌕</span>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#c3b7a9]">
        Filtr wyłonił 2693 urządzeń
      </p>

      <div className="mt-8 border-t border-[#102730] pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f3e9df]">
          • Wielkość matrycy
        </h3>
        <div className="mt-5 space-y-4">
          {sensorFilters.map((item) => (
            <label key={item} className="flex items-center gap-3 text-sm text-[#d8d0c7]">
              <span className="h-4 w-4 rounded-[3px] border border-[#7c8d98] bg-transparent" />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-[#102730] pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f3e9df]">
          • Rodzaj sprzętu
        </h3>
        <div className="mt-5 space-y-4">
          {typeFilters.map((item) => (
            <label key={item} className="flex items-center gap-3 text-sm text-[#d8d0c7]">
              <span className="h-4 w-4 rounded-[3px] border border-[#7c8d98] bg-transparent" />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-[#102730] pt-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f3e9df]">
          • Przedział czasowy
        </h3>
        <div className="mt-5 flex items-center justify-between text-xs font-semibold text-white">
          <span className="rounded bg-[#0e1114] px-2 py-1">1994</span>
          <span className="text-[#7c746b]">—</span>
          <span className="rounded bg-[#0e1114] px-2 py-1">2025</span>
        </div>
        <div className="mt-5 h-1 rounded-full bg-[#3c3329]">
          <div className="relative h-1 rounded-full bg-[#d4aa79]">
            <span className="absolute -left-1 -top-1.5 h-4 w-4 rounded-full border border-[#c79b6d] bg-[#f3eadf]" />
            <span className="absolute -right-1 -top-1.5 h-4 w-4 rounded-full border border-[#c79b6d] bg-[#f3eadf]" />
          </div>
        </div>
      </div>
    </aside>
  );
}