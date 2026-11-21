export function BrandWordmark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5" data-testid="brand-wordmark">
      <img
        src="/brand-logo.png"
        alt="Avighna logo"
        className="h-10 w-10 shrink-0 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
      />
      <div className="min-w-0 leading-none">
        <div
          className={`font-display text-[1.25rem] tracking-[-0.04em] sm:text-[1.55rem] md:text-[1.7rem] ${
            light ? 'text-[#fff9ee]' : 'text-[#1d2522]'
          }`}
        >
          Avighna
        </div>
        <div
          className={`mt-1 truncate text-[8px] font-semibold uppercase tracking-[0.12em] sm:mt-1.5 sm:text-[9px] md:text-[10px] ${
            light ? 'text-[#d7ddd2]' : 'text-[#68706a]'
          }`}
        >
          Speciality Ingredients Pvt Ltd
        </div>
      </div>
    </div>
  );
}
