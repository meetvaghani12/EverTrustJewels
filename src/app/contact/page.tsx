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

        {/* Map */}
        <section className="mt-16 mb-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">Our Location</p>
            <h2 className="mt-2 font-heading text-2xl font-light">Visit Us</h2>
          </div>
          <div className="w-full overflow-hidden rounded-sm border border-border" style={{ height: "420px" }}>
            <iframe
              src="https://maps.google.com/maps?q=21.2144381,72.8399507&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EverTrust Jewels Location"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/k3s78zdCCens17dg9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Get Directions
          </a>
        </section>
      </div>
    </div>
  );
}
