import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CustomOrderForm } from "@/components/contact/CustomOrderForm";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Custom Order" },
];

export const metadata = buildMetadata({
  title: "Custom Order",
  description:
    "Design your perfect diamond with EverTrust Jewels. Tell us your preferences and our experts will source the ideal stone.",
  path: "/custom-order",
});

export default function CustomOrderPage() {
  return (
    <div className="min-h-screen">
      <JsonLd schema={breadcrumbSchema(BREADCRUMBS)} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={BREADCRUMBS} />

        <section className="mt-12 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Bespoke Service
          </p>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-light tracking-tight">
            Custom Diamond Order
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-text-secondary leading-relaxed">
            Can&apos;t find exactly what you&apos;re looking for? Describe your ideal
            diamond and our experts will source it for you.
          </p>
        </section>

        <section className="mt-16 mb-16">
          <CustomOrderForm />
        </section>
      </div>
    </div>
  );
}
