import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "The 4Cs of Diamonds",
  description:
    "Learn about Cut, Clarity, Color, and Carat — the four characteristics that determine a diamond's quality and value.",
};

const sections = [
  {
    id: "cut",
    title: "Cut",
    subtitle: "The Most Important C",
    description:
      "Cut refers to how well a diamond's facets interact with light. It is the most crucial of the 4Cs because it directly determines a diamond's brilliance — the brightness of white light reflecting from the surface and interior — and fire — the dispersion of light into the colors of the spectrum.",
    grades: [
      {
        grade: "Excellent",
        description:
          "Maximum fire and brilliance. Light entering the diamond reflects from one facet to another and disperses through the top. These diamonds represent the top 3% of gem-quality stones.",
      },
      {
        grade: "Very Good",
        description:
          "Properly reflects most light that enters. Produces superior fire and brilliance. Considered an excellent value compared to Excellent grade.",
      },
      {
        grade: "Good",
        description:
          "Reflects a majority of light. Much less expensive than Very Good cuts. An attractive diamond at a moderate price point.",
      },
      {
        grade: "Fair",
        description:
          "A reasonable quality diamond at a lower price. Some light escapes through the bottom and sides. Still beautiful to the eye but with less sparkle.",
      },
    ],
  },
  {
    id: "clarity",
    title: "Clarity",
    subtitle: "Nature's Fingerprint",
    description:
      "Clarity measures the absence of inclusions (internal characteristics) and blemishes (external characteristics). Natural diamonds form under tremendous heat and pressure deep within the earth, and virtually all contain unique birthmarks. Diamonds with fewer and smaller inclusions receive higher clarity grades.",
    grades: [
      { grade: "FL (Flawless)", description: "No inclusions or blemishes visible under 10x magnification. Extremely rare." },
      { grade: "IF (Internally Flawless)", description: "No inclusions visible under 10x magnification. Minor surface blemishes only." },
      { grade: "VVS1–VVS2", description: "Very, very slightly included. Inclusions are difficult to see under 10x magnification." },
      { grade: "VS1–VS2", description: "Very slightly included. Minor inclusions visible under 10x magnification but not to the naked eye." },
      { grade: "SI1–SI2", description: "Slightly included. Inclusions are noticeable under 10x magnification and may be visible to the naked eye." },
    ],
  },
  {
    id: "color",
    title: "Color",
    subtitle: "The Absence of Color",
    description:
      "Diamond color refers to the absence of color in a stone. The GIA color scale begins with D (colorless) and progresses to Z (light yellow or brown). Colorless diamonds are the most sought after, as they allow the most refraction of light — producing superior fire and brilliance.",
    grades: [
      { grade: "D–F (Colorless)", description: "The rarest and most valuable. Differences between D, E, and F are virtually indiscernible to anyone other than a trained gemologist." },
      { grade: "G–J (Near Colorless)", description: "Color typically undetectable to the untrained eye. Excellent value — these diamonds appear colorless when mounted." },
      { grade: "K–M (Faint)", description: "Slight color noticeable. A warm tone that some prefer, especially in yellow gold settings." },
    ],
  },
  {
    id: "carat",
    title: "Carat",
    subtitle: "A Measure of Weight",
    description:
      "Diamond carat weight measures a diamond's apparent size. One carat equals 200 milligrams. Each carat is subdivided into 100 'points,' allowing precise measurements to the hundredth decimal place. While carat weight correlates with size, two diamonds of equal carat weight can appear different in size depending on their cut and proportions.",
    grades: [
      { grade: "Under 0.50ct", description: "Delicate and understated. Popular for everyday wear and accent stones." },
      { grade: "0.50–0.99ct", description: "A classic, versatile range. Noticeable presence without being overwhelming." },
      { grade: "1.00–1.99ct", description: "The most popular range for engagement diamonds. A significant, eye-catching stone." },
      { grade: "2.00ct and above", description: "Truly exceptional. These rare diamonds command premium prices and make a bold statement." },
    ],
  },
];

export default function FourCsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Education", href: "/education" },
            { label: "The 4Cs" },
          ]}
        />

        <section className="mt-12 text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-light tracking-tight">
            The 4Cs of Diamonds
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-text-secondary leading-relaxed">
            The universal language of diamond quality. Understanding these four
            characteristics will help you find the diamond that&apos;s perfect for you.
          </p>
        </section>

        <div className="mt-16 space-y-24">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
                {section.subtitle}
              </p>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-light">
                {section.title}
              </h2>
              <p className="mt-6 text-text-secondary leading-relaxed">
                {section.description}
              </p>
              <div className="mt-8 space-y-4">
                {section.grades.map((g) => (
                  <div
                    key={g.grade}
                    className="border-l-2 border-border pl-6 py-2"
                  >
                    <h4 className="text-sm font-medium uppercase tracking-wide">
                      {g.grade}
                    </h4>
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-24 mb-16 border-t border-border pt-12 text-center">
          <h2 className="font-heading text-2xl font-light">
            Ready to Apply Your Knowledge?
          </h2>
          <a
            href="/diamonds"
            className="mt-6 inline-flex h-12 items-center justify-center bg-foreground px-8 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
          >
            Browse Diamonds
          </a>
        </section>
      </div>
    </div>
  );
}
