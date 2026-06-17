"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Menú", href: "#menu" },
  { label: "Reservas", href: "#reservas" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Contacto", href: "#contacto" }
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("el-lago-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme ? savedTheme === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("el-lago-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-lago-navy/90">
      <div className="section-shell flex h-20 items-center justify-between">
        <a
          href="#inicio"
          aria-label="Restaurante El Lago"
          className="flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo-el-lago.svg"
            alt="Restaurante El Lago"
            width={178}
            height={56}
            priority
            className="h-14 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-lago-ink transition hover:text-lago-blue dark:text-white/80 dark:hover:text-lago-aqua"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            aria-pressed={isDark}
            title={isDark ? "Modo claro" : "Modo oscuro"}
            onClick={() => setIsDark((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-lago-navy transition hover:border-lago-blue hover:text-lago-blue dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-lago-aqua"
          >
            {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
          </button>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-lago-navy transition hover:border-lago-blue hover:text-lago-blue lg:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav className="border-t border-slate-100 bg-white px-4 py-4 shadow-soft lg:hidden dark:border-white/10 dark:bg-lago-navy">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-lago-ink transition hover:bg-lago-ice hover:text-lago-blue dark:text-white/90 dark:hover:bg-white/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
