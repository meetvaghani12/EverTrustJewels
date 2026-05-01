"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/useInView";

const brandImages = [
  { src: "/images/brand/fancy-bunny.jpg", alt: "Bunny-shaped diamond" },
  { src: "/images/brand/fancy-bear.jpg", alt: "Bear-shaped diamond" },
  { src: "/images/brand/fancy-bull.jpg", alt: "Bull-shaped diamond" },
  { src: "/images/brand/fancy-cats.jpg", alt: "Cat-shaped diamonds" },
  { src: "/images/brand/fancy-horse.jpg", alt: "Horse-shaped diamond" },
];

export default function HeroSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <>
      {/* Section 1: Full-screen video only */}
      <section className="relative h-screen w-full -mt-20">
        <video
          src="/videos/intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Section 2: Text + Brand photos */}
      <section
        ref={ref}
        className="relative py-20 sm:py-28 lg:py-36"
        style={{
          background: `linear-gradient(135deg, var(--hero-gradient-from), var(--hero-gradient-via), var(--hero-gradient-to))`,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left — Text */}
            <div>
              <h1
                className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(50px)",
                  transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                }}
              >
                Timeless Brilliance,
                <br />
                <span className="text-platinum">Trusted Forever</span>
              </h1>

              <p
                className="mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
                }}
              >
                Discover exquisite diamonds handpicked for perfection.
              </p>

              <div
                className="mt-8 flex flex-wrap gap-4"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s",
                }}
              >
                <Link
                  href="/diamonds"
                  className="inline-flex h-12 sm:h-14 items-center justify-center border border-foreground px-10 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 sm:h-14 items-center justify-center px-10 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-foreground"
                >
                  Custom Order &rarr;
                </Link>
              </div>
            </div>

            {/* Right — Brand photo grid */}
            <div
              className="grid grid-cols-2 gap-3 sm:gap-4"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s",
              }}
            >
              {/* Large image — top left spanning 2 rows */}
              <div className="row-span-2 relative overflow-hidden">
                <Image
                  src={brandImages[0].src}
                  alt={brandImages[0].alt}
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              {/* Top right */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={brandImages[1].src}
                  alt={brandImages[1].alt}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              {/* Bottom right */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={brandImages[2].src}
                  alt={brandImages[2].alt}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              {/* Bottom row — full width 2 cols */}
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  src={brandImages[3].src}
                  alt={brandImages[3].alt}
                  width={400}
                  height={200}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  src={brandImages[4].src}
                  alt={brandImages[4].alt}
                  width={400}
                  height={200}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
