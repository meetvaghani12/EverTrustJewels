"use client";

import { useEffect, useState } from "react";

export interface JewelryConfig {
  size: string;
  karat: string;
  colour: string;
  metal: string;
  diamondWeight: string;
  diamondType: string;
  extra: string;
}

export const emptyJewelryConfig: JewelryConfig = {
  size: "",
  karat: "",
  colour: "",
  metal: "",
  diamondWeight: "",
  diamondType: "",
  extra: "",
};

const KARATS = ["10K", "14K", "18K", "22K"];
const COLOURS = ["Yellow", "White", "Rose"];
const METALS = ["Gold", "Platinum", "Silver"];
const DIAMOND_TYPES = ["Natural", "Lab Grown", "Moissanite"];

const labelClass =
  "mb-2 block text-[10px] uppercase tracking-[0.15em] text-text-secondary";
const controlClass =
  "w-full border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground";

interface Contact {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onClose: () => void;
  productName: string;
  category: string;
  styleNumber: string;
}

export function JewelryConfigurator({
  onClose,
  productName,
  category,
  styleNumber,
}: Props) {
  const [cfg, setCfg] = useState<JewelryConfig>(emptyJewelryConfig);
  const [contact, setContact] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll and allow Escape to close while the box is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const update = (patch: Partial<JewelryConfig>) =>
    setCfg((c) => ({ ...c, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!contact.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/jewelry-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          productName,
          category,
          styleNumber,
          ...cfg,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-xl overflow-y-auto border border-border bg-background p-6 shadow-2xl sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-platinum">
              Enquire About This Piece
            </p>
            <h2 className="mt-2 font-heading text-2xl font-light sm:text-3xl">
              Jewellery Inquiry
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-text-secondary">
              {productName} · {styleNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-border text-lg leading-none text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>

        {status === "sent" ? (
          /* Success view */
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-platinum text-xl text-platinum">
              ✦
            </div>
            <h3 className="mt-4 font-heading text-2xl font-light">
              Inquiry Sent
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-text-secondary">
              Thank you, {contact.name.split(" ")[0]}. We&apos;ve emailed your
              inquiry to our team and sent a copy to {contact.email}. Our experts
              will be in touch within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-foreground px-7 py-3 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Jewellery fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Product Size</label>
                <input
                  type="text"
                  value={cfg.size}
                  onChange={(e) => update({ size: e.target.value })}
                  placeholder="e.g. US 6.5"
                  className={controlClass}
                />
              </div>

              <div>
                <label className={labelClass}>Karat of Product</label>
                <select
                  value={cfg.karat}
                  onChange={(e) => update({ karat: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select karat</option>
                  {KARATS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Colour of Product</label>
                <select
                  value={cfg.colour}
                  onChange={(e) => update({ colour: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select colour</option>
                  {COLOURS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Metal</label>
                <select
                  value={cfg.metal}
                  onChange={(e) => update({ metal: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select metal</option>
                  {METALS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Weight of Diamond</label>
                <input
                  type="text"
                  value={cfg.diamondWeight}
                  onChange={(e) => update({ diamondWeight: e.target.value })}
                  placeholder="e.g. 1.20 ct"
                  className={controlClass}
                />
              </div>

              <div>
                <label className={labelClass}>Diamond Type</label>
                <select
                  value={cfg.diamondType}
                  onChange={(e) => update({ diamondType: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select type</option>
                  {DIAMOND_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Extra details — left empty when not needed */}
            <div className="mt-4">
              <label className={labelClass}>Extra Details</label>
              <textarea
                value={cfg.extra}
                onChange={(e) => update({ extra: e.target.value })}
                rows={3}
                placeholder="Any additional details (optional)"
                className={`${controlClass} min-h-[84px] resize-y`}
              />
            </div>

            {/* Contact details */}
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-platinum">
                Your Contact Details
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, name: e.target.value }))
                    }
                    placeholder="Full name"
                    className={controlClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    className={controlClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, phone: e.target.value }))
                    }
                    placeholder="Optional"
                    className={controlClass}
                  />
                </div>
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-platinum">{error}</p>}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setCfg(emptyJewelryConfig)}
                className="border border-border px-6 py-3 text-xs uppercase tracking-[0.15em] text-text-secondary transition-colors hover:border-foreground hover:text-foreground"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-foreground px-7 py-3 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Inquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
