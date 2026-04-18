"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/data/site";

const navLinks = navigation.main;

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[100] w-full sm:max-w-sm bg-card shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-8 py-8">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="2" y1="2" x2="18" y2="18" />
                <line x1="18" y1="2" x2="2" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 mt-12">
            {navLinks.map((link, i) => (
              <div
                key={link.href}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(30px)",
                  transition: `opacity 0.4s ease-out ${0.15 + i * 0.06}s, transform 0.4s ease-out ${0.15 + i * 0.06}s`,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block text-lg font-body uppercase tracking-[0.2em] text-foreground/80 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Bottom — Logo + Tagline */}
          <div className="mt-auto pt-8 border-t border-border flex flex-col items-center gap-4">
            <Image
              src="/images/brand/logo.jpg"
              alt="EverTrust Jewels"
              width={56}
              height={56}
              className="rounded-full"
            />
            <p className="text-xs text-text-secondary tracking-widest uppercase">
              Timeless Brilliance, Trusted Forever
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
