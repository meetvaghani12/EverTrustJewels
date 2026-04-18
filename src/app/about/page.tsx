import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about EverTrust Jewels — our commitment to ethical sourcing, expert curation, and timeless diamond excellence.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

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

        {/* CTA */}
        <section className="mt-24 mb-16 text-center">
          <h2 className="font-heading text-3xl font-light">Begin Your Journey</h2>
          <p className="mt-4 text-text-secondary">
            Explore our collection or speak with our diamond experts.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/diamonds"
              className="inline-flex h-12 items-center justify-center bg-foreground px-8 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
            >
              Explore Diamonds
            </a>
            <a
              href="/contact"
              className="inline-flex h-12 items-center justify-center border border-foreground px-8 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
