import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "About" },
];

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about EverTrust Jewels — our commitment to ethical sourcing, expert curation, and timeless diamond excellence.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <JsonLd schema={breadcrumbSchema(BREADCRUMBS)} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={BREADCRUMBS} />

        {/* Hero */}
        <section className="mt-12 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary font-body">
            Our Story
          </p>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Timeless Brilliance,
            <br />
            Trusted Forever
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
            At EverTrust Jewels, we believe every diamond carries a story — of the earth it
            came from, the hands that shaped it, and the moment it was chosen.
          </p>
        </section>

        {/* Placeholder Image */}
        {/* Brand Image */}
        <section className="mt-16">
          <div className="relative aspect-[21/9] w-full rounded-sm overflow-hidden">
            <Image
              src="/images/brand/fancy-cats.jpg"
              alt="EverTrust Jewels craftsmanship"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </section>

        {/* Values */}
        <section className="mt-12 sm:mt-24 grid gap-8 sm:gap-16 md:grid-cols-3">
          {[
            {
              title: "Ethical Sourcing",
              description:
                "Every diamond in our collection is responsibly sourced, adhering to the highest ethical standards. We work exclusively with certified suppliers who share our commitment to transparency.",
            },
            {
              title: "Expert Curation",
              description:
                "Our gemologists personally inspect each stone, selecting only those that meet our exacting standards for cut, clarity, color, and carat weight. Less than 1% make the cut.",
            },
            {
              title: "Lasting Trust",
              description:
                "We build relationships, not transactions. Every diamond comes with certified documentation, expert guidance, and our unwavering commitment to your satisfaction.",
            },
          ].map((value) => (
            <div key={value.title}>
              <h3 className="font-heading text-2xl font-light">{value.title}</h3>
              <p className="mt-4 text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </section>

        {/* Mission */}
        <section className="mt-24 border-t border-border pt-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Our Mission
          </p>
          <blockquote className="mx-auto mt-6 max-w-3xl font-heading text-2xl sm:text-3xl font-light italic leading-relaxed">
            &ldquo;To make the pursuit of the perfect diamond an experience of clarity,
            confidence, and joy — where every choice is guided by expertise and every
            purchase is backed by trust.&rdquo;
          </blockquote>
        </section>

        {/* Social Media */}
        <section className="mt-24 border-t border-border pt-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Follow Us
          </p>
          <p className="mt-4 text-text-secondary">Stay connected with EverTrust Jewels</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://facebook.com/share/14eBKf83T32/?mibextid=wwXIfr&ref=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm uppercase tracking-[0.1em] transition-colors hover:bg-foreground hover:text-white hover:border-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/evertrust__jewels?igsh=djRsNzB4OXI3ZWRq&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm uppercase tracking-[0.1em] transition-colors hover:bg-foreground hover:text-white hover:border-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/evertrust-jewels/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm uppercase tracking-[0.1em] transition-colors hover:bg-foreground hover:text-white hover:border-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://wa.me/916353775658"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm uppercase tracking-[0.1em] transition-colors hover:bg-foreground hover:text-white hover:border-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 mb-16 text-center">
          <h2 className="font-heading text-3xl font-light">Begin Your Journey</h2>
          <p className="mt-4 text-text-secondary">
            Explore our collection or speak with our diamond experts.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/diamonds"
              className="inline-flex h-12 items-center justify-center bg-foreground px-8 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
            >
              Explore Diamonds
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center border border-foreground px-8 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
