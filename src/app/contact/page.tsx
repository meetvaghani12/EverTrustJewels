import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with EverTrust Jewels. Speak with our diamond experts for personalized guidance.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

        <section className="mt-12 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Get in Touch
          </p>
          <h1 className="mt-4 font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
            We&apos;re Here to Help
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-text-secondary leading-relaxed">
            Have a question about a diamond, need expert guidance, or want to discuss a
            custom order? Our team is ready to assist you.
          </p>
        </section>

        <div className="mt-10 sm:mt-16 grid gap-10 sm:gap-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-2">
            <div className="space-y-10">
              <div>
                <h3 className="text-sm uppercase tracking-[0.15em] text-text-secondary">
                  WhatsApp
                </h3>
                <p className="mt-2 text-lg">{SITE_CONFIG.phone}</p>
                <div className="mt-3">
                  <WhatsAppButton />
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.15em] text-text-secondary">
                  Email
                </h3>
                <p className="mt-2 text-lg">{SITE_CONFIG.email}</p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-[0.15em] text-text-secondary">
                  Business Hours
                </h3>
                <p className="mt-2 text-text-secondary leading-relaxed">
                  Monday – Saturday
                  <br />
                  10:00 AM – 7:00 PM IST
                </p>
              </div>

              <div className="border-t border-border pt-8">
                <p className="text-sm text-text-secondary leading-relaxed">
                  For the fastest response, reach out via WhatsApp. We typically respond
                  within 30 minutes during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
