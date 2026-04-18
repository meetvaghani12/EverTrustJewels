import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/data/site";
import { SITE_CONFIG } from "@/lib/constants";

const siteConfig = SITE_CONFIG;
const footerLinks = navigation.footer;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-body uppercase tracking-[0.2em] text-white/70 mb-6">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "var(--footer-bg)" }} className="text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image
                src="/images/brand/logo.jpg"
                alt="EverTrust Jewels"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-heading text-2xl tracking-wide text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] text-platinum mb-4">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Diamonds Column */}
          <FooterColumn title="Diamonds" links={footerLinks.diamonds} />

          {/* Learn Column */}
          <FooterColumn title="Learn" links={footerLinks.learn} />

          {/* Company Column */}
          <FooterColumn title="Company" links={footerLinks.company} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/40 tracking-widest uppercase">
            Crafted with excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
