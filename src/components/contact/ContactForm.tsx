"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (submitted) {
    return (
      <div className="rounded-sm border border-border bg-card p-12 text-center">
        <h3 className="font-heading text-2xl font-light">Thank You</h3>
        <p className="mt-4 text-text-secondary">
          We&apos;ve received your inquiry and will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("Failed to send");
          setSubmitted(true);
        } catch {
          setError("Something went wrong. Please try again or contact us via WhatsApp.");
        } finally {
          setLoading(false);
        }
      }}
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-2 block w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-2 block w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="mt-2 block w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
        >
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="mt-2 block w-full border-b border-border bg-transparent py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
        >
          <option value="">Select a subject</option>
          <option value="diamond-inquiry">Diamond Inquiry</option>
          <option value="custom-order">Custom Order</option>
          <option value="pricing">Pricing Information</option>
          <option value="general">General Question</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="diamondId"
          className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
        >
          Diamond ID (Optional)
        </label>
        <input
          type="text"
          id="diamondId"
          name="diamondId"
          className="mt-2 block w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
          placeholder="e.g., ETJ-001"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 block w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 items-center justify-center bg-foreground px-10 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
