'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { href: '/collection', label: 'Collection' },
    { href: '/brands', label: 'Brands' },
    { href: '/about', label: 'About Us' },
    { href: '/cameras', label: 'Cameras' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] transition-all"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
            isOpen 
              ? 'translate-y-[7px] rotate-45 bg-[var(--text-primary)]' 
              : 'bg-[var(--text-muted)]'
          }`}
        />
        <span
          className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
            isOpen ? 'opacity-0' : 'bg-[var(--text-muted)]'
          }`}
        />
        <span
          className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
            isOpen 
              ? '-translate-y-[7px] -rotate-45 bg-[var(--text-primary)]' 
              : 'bg-[var(--text-muted)]'
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Menu Drawer */}
      <div
        id="mobile-menu"
        className={`fixed right-0 top-0 z-40 flex h-full w-[280px] flex-col bg-[var(--bg-dark)] border-l-2 border-[var(--border-light)] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Menu Header */}
        <div className="flex items-center border-b border-[var(--border-light)] px-6 py-5">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Menu
          </h2>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 p-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative overflow-hidden rounded-lg px-4 py-2 text-left text-base font-medium uppercase tracking-[0.15em] transition-all duration-200 ${
                  isActive
                    ? 'border-2 border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                    : 'border-2 border-transparent text-[var(--text-primary)] hover:border-[var(--border-light)] hover:bg-[var(--bg-card)]'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {!isActive && (
                  <span className="absolute inset-0 -translate-x-full bg-[var(--accent-primary)]/5 transition-transform duration-300 group-hover:translate-x-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle Section */}
        <div className="mt-auto border-t border-[var(--border-light)] px-2 py-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border-light)] px-2 py-3">
          <p className="text-xs text-[var(--text-muted)]">
            Luma Camera Encyclopedia
          </p>
        </div>
      </div>
    </>
  );
}
