"use client";

import { useState } from "react";
import { SHAPES, CUT_GRADES, CLARITY_GRADES, COLOR_GRADES } from "@/lib/constants";

export function CustomOrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (submitted) {
    return (
      <div className="rounded-sm border border-border bg-card p-12 text-center">
        <h3 className="font-heading text-2xl font-light">Order Received</h3>
        <p className="mt-4 text-text-secondary">
          Our team will review your requirements and reach out within 24 hours.
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
          const res = await fetch("/api/custom-order", {
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
      className="space-y-8"
    >
      {/* Diamond Preferences */}
      <div>
        <h3 className="text-sm uppercase tracking-[0.15em] text-text-secondary">
          Diamond Preferences
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="shape"
              className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
            >
              Preferred Shape
            </label>
            <select
              id="shape"
              name="shape"
              className="mt-2 block w-full border-b border-border bg-transparent py-3 focus:border-foreground focus:outline-none transition-colors"
            >
              <option value="">Any shape</option>
              {SHAPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="caratRange"
              className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
            >
              Carat Range
            </label>
            <input
              type="text"
              id="caratRange"
              name="caratRange"
              className="mt-2 block w-full border-b border-border bg-transparent py-3 placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
              placeholder="e.g., 1.0 - 2.0 ct"
            />
          </div>

          <div>
            <label
              htmlFor="cut"
              className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
            >
              Minimum Cut Grade
            </label>
            <select
              id="cut"
              name="cut"
              className="mt-2 block w-full border-b border-border bg-transparent py-3 focus:border-foreground focus:outline-none transition-colors"
            >
              <option value="">Any</option>
              {CUT_GRADES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="color"
              className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
            >
              Color Preference
            </label>
            <select
              id="color"
              name="color"
              className="mt-2 block w-full border-b border-border bg-transparent py-3 focus:border-foreground focus:outline-none transition-colors"
            >
              <option value="">Any</option>
              {COLOR_GRADES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="clarity"
              className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
            >
              Clarity Preference
            </label>
            <select
              id="clarity"
              name="clarity"
              className="mt-2 block w-full border-b border-border bg-transparent py-3 focus:border-foreground focus:outline-none transition-colors"
            >
              <option value="">Any</option>
              {CLARITY_GRADES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="budget"
              className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
            >
              Budget Range (INR)
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              className="mt-2 block w-full border-b border-border bg-transparent py-3 placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
              placeholder="e.g., ₹5,00,000 - ₹10,00,000"
            />
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label
          htmlFor="requests"
          className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
        >
          Special Requests or Notes
        </label>
        <textarea
          id="requests"
          name="requests"
          rows={4}
          className="mt-2 block w-full border-b border-border bg-transparent py-3 placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors resize-none"
          placeholder="Any specific requirements, occasion, timeline..."
        />
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-sm uppercase tracking-[0.15em] text-text-secondary">
          Your Details
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
              className="mt-2 block w-full border-b border-border bg-transparent py-3 placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-xs uppercase tracking-[0.15em] text-text-secondary"
            >
              Phone / WhatsApp
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="mt-2 block w-full border-b border-border bg-transparent py-3 placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
        </div>
        <div className="mt-6">
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
            className="mt-2 block w-full border-b border-border bg-transparent py-3 placeholder:text-platinum focus:border-foreground focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 items-center justify-center bg-foreground px-10 text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Submit Custom Order"}
      </button>
    </form>
  );
}
