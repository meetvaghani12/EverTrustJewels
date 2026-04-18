"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { navigation } from "@/data/site";

const navLinks = navigation.main;
const MobileNav = dynamic(
  () => import("./MobileNav").then((m) => m.MobileNav),
  { ssr: false }
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // On home page before scroll: white text over video
  const overVideo = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
        style={scrolled ? { backgroundColor: "var(--header-bg)", borderColor: "var(--header-border)" } : undefined}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <Image
                src="/images/brand/logo.jpg"
                alt="EverTrust Jewels"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className={`font-heading text-xl sm:text-2xl tracking-wide transition-colors duration-500 ${
                overVideo ? "text-white" : "text-foreground"
              }`}>
                EverTrust Jewels
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-body uppercase tracking-[0.15em] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    overVideo
                      ? "text-white/80 hover:text-white after:bg-white"
                      : "text-foreground/80 hover:text-foreground after:bg-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-[6px]"
              aria-label="Open menu"
            >
              <span className={`block w-6 h-[1.5px] transition-all duration-300 ${overVideo ? "bg-white" : "bg-foreground"}`} />
              <span className={`block w-6 h-[1.5px] transition-all duration-300 ${overVideo ? "bg-white" : "bg-foreground"}`} />
              <span className={`block w-4 h-[1.5px] transition-all duration-300 ml-auto ${overVideo ? "bg-white" : "bg-foreground"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer — not needed on home (hero goes behind header) */}
      {!isHome && <div className="h-20" />}

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
