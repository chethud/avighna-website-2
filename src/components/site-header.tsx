import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import { BrandWordmark } from '@/components/brand-wordmark';

const sectionLinks = [
  { label: 'Catalogue', id: 'catalogue' },
  { label: 'Applications', id: 'applications' },
  { label: 'Contact', id: 'contact' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goHomeSection(id: string, isHome: boolean) {
  if (isHome) {
    scrollToId(id);
    return;
  }
  window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/#${id}`);
}

function navClass(active: boolean) {
  return [
    'text-[16px] font-semibold tracking-[-0.01em] transition-colors hover:text-[#e2602c] lg:text-[17px]',
    active ? 'text-[#e2602c] underline decoration-[#e2602c] decoration-2 underline-offset-[10px]' : 'text-[#3a4841]',
  ].join(' ');
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/' || location === '';
  const isSolutions = location === '/solutions';
  const isAbout = location === '/about';

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e0d1bd]/60 bg-[#fff9ee]/95 backdrop-blur-md">
        <div className="mx-auto flex page-container max-w-none h-16 items-center gap-3 sm:h-[4.5rem] sm:gap-4">
          {isHome ? (
            <button
              onClick={() => {
                setOpen(false);
                scrollToId('top');
              }}
              aria-label="Back to top"
              className="min-w-0 shrink transition-opacity hover:opacity-80"
              data-testid="button-brand-home"
            >
              <BrandWordmark />
            </button>
          ) : (
            <Link
              href="/"
              className="min-w-0 shrink transition-opacity hover:opacity-80"
              data-testid="link-brand-home"
              onClick={() => setOpen(false)}
            >
              <BrandWordmark />
            </Link>
          )}

          <nav className="mx-auto hidden items-center gap-6 md:flex lg:gap-8 xl:gap-9" aria-label="Main navigation">
            <Link href="/about" className={navClass(isAbout)} data-testid="link-nav-about">
              About Us
            </Link>
            <Link href="/solutions" className={navClass(isSolutions)} data-testid="button-nav-solutions">
              Solutions
            </Link>
            {sectionLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goHomeSection(link.id, isHome)}
                className={navClass(false)}
                data-testid={`button-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
            <button
              onClick={() => goHomeSection('contact', isHome)}
              className="hidden items-center gap-2 rounded-full bg-[#1e3d38] px-5 py-3 text-xs font-bold text-[#fff9ee] transition-colors hover:bg-[#274a44] md:flex"
              data-testid="button-header-contact"
            >
              Start a conversation <ArrowUpRight size={14} />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3d38] text-[#fff9ee] md:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              data-testid="button-mobile-menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-navigation"
            className="absolute inset-x-0 top-full max-h-[min(70vh,28rem)] overflow-y-auto border-b border-[#e0d1bd]/60 bg-[#fff9ee] px-4 pb-4 pt-2 shadow-[0_18px_40px_rgba(49,62,54,0.12)] md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="rounded-2xl border border-[#e0d1bd] bg-[#fff9ee] p-2">
              <Link
                href="/about"
                className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-[#1e3d38] transition-colors hover:bg-[#f4eadb]"
                data-testid="link-mobile-nav-about"
                onClick={() => setOpen(false)}
              >
                About Us
                <ChevronRight size={16} className="text-[#a89072]" />
              </Link>
              <Link
                href="/solutions"
                className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-[#1e3d38] transition-colors hover:bg-[#f4eadb]"
                data-testid="button-mobile-nav-solutions"
                onClick={() => setOpen(false)}
              >
                Solutions
                <ChevronRight size={16} className="text-[#a89072]" />
              </Link>
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    goHomeSection(link.id, isHome);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-[#1e3d38] transition-colors hover:bg-[#f4eadb]"
                  data-testid={`button-mobile-nav-${link.id}`}
                >
                  {link.label}
                  <ChevronRight size={16} className="text-[#a89072]" />
                </button>
              ))}
              <button
                onClick={() => {
                  goHomeSection('contact', isHome);
                  setOpen(false);
                }}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#e2602c] py-3 text-sm font-bold text-[#fff9ee]"
                data-testid="button-mobile-contact"
              >
                Start a conversation <ArrowUpRight size={15} />
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Keeps page content below the fixed header */}
      <div className="h-16 sm:h-[4.5rem]" aria-hidden />
    </>
  );
}
