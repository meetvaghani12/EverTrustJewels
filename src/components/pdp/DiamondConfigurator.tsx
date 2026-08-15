"use client";

import { useEffect, useState } from "react";

export interface DiamondConfig {
  type: string;
  shape: string;
  shapeOther: string;
  carat: string;
  color: string;
  fancyColor: string;
  clarity: string;
  cut: string;
  lab: string;
  fluorescence: string;
  extra: string;
}

export const emptyConfig: DiamondConfig = {
  type: "",
  shape: "",
  shapeOther: "",
  carat: "",
  color: "",
  fancyColor: "",
  clarity: "",
  cut: "",
  lab: "",
  fluorescence: "",
  extra: "",
};

export const FANCY = "Fancy Colour";
export const SHAPE_OTHER = "Other";

const TYPES = ["Natural", "Lab Grown"];
const SHAPES = [
  "Round",
  "Oval",
  "Pear",
  "Cushion",
  "Emerald",
  "Radiant",
  "Princess",
  "Asscher",
  "Marquise",
  "Heart",
];
// Colour grades A → Z
const COLORS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
const CUTS = ["3EX", "VG+"];
const LABS = ["GIA", "IGI", "Non-certified"];
const FLUORESCENCE = ["None", "Faint", "Medium", "Strong", "Very Strong"];

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
  onSave: (c: DiamondConfig) => void;
  diamondName: string;
  shapeName: string;
  initial?: DiamondConfig | null;
}

export function DiamondConfigurator({
  onClose,
  onSave,
  diamondName,
  shapeName,
  initial,
}: Props) {
  // Mounted fresh each time it opens (see parent), so props seed the state once.
  const [cfg, setCfg] = useState<DiamondConfig>(initial ?? emptyConfig);
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

  const update = (patch: Partial<DiamondConfig>) =>
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
      const res = await fetch("/api/diamond-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          diamondName,
          ...cfg,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      onSave(cfg);
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
              Build Your Stone
            </p>
            <h2 className="mt-2 font-heading text-2xl font-light sm:text-3xl">
              Configure Your Diamond
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-text-secondary">
              {diamondName} · {shapeName}
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
              selection to our team and sent a copy to {contact.email}. Our
              experts will be in touch within 24 hours.
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
            {/* Diamond fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Type</label>
                <select
                  value={cfg.type}
                  onChange={(e) => update({ type: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select type</option>
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Shape</label>
                <select
                  value={cfg.shape}
                  onChange={(e) => update({ shape: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select shape</option>
                  {SHAPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value={SHAPE_OTHER}>{SHAPE_OTHER} (custom)</option>
                </select>
              </div>

              {cfg.shape === SHAPE_OTHER && (
                <div>
                  <label className={labelClass}>Other Shape</label>
                  <input
                    type="text"
                    value={cfg.shapeOther}
                    onChange={(e) => update({ shapeOther: e.target.value })}
                    placeholder="Enter shape"
                    className={controlClass}
                  />
                </div>
              )}

              <div>
                <label className={labelClass}>Carat</label>
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  value={cfg.carat}
                  onChange={(e) => update({ carat: e.target.value })}
                  placeholder="e.g. 1.50"
                  className={controlClass}
                />
              </div>

              <div>
                <label className={labelClass}>Colour</label>
                <select
                  value={cfg.color}
                  onChange={(e) => update({ color: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select colour</option>
                  {COLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value={FANCY}>{FANCY} (custom)</option>
                </select>
              </div>

              {cfg.color === FANCY && (
                <div>
                  <label className={labelClass}>Fancy Colour</label>
                  <input
                    type="text"
                    value={cfg.fancyColor}
                    onChange={(e) => update({ fancyColor: e.target.value })}
                    placeholder="Enter colour, e.g. Vivid Pink"
                    className={controlClass}
                  />
                </div>
              )}

              <div>
                <label className={labelClass}>Clarity</label>
                <select
                  value={cfg.clarity}
                  onChange={(e) => update({ clarity: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select clarity</option>
                  {CLARITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Cut / Polish / Symmetry</label>
                <select
                  value={cfg.cut}
                  onChange={(e) => update({ cut: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select grade</option>
                  {CUTS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Lab</label>
                <select
                  value={cfg.lab}
                  onChange={(e) => update({ lab: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select lab</option>
                  {LABS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Fluorescence</label>
                <select
                  value={cfg.fluorescence}
                  onChange={(e) => update({ fluorescence: e.target.value })}
                  className={controlClass}
                >
                  <option value="">Select fluorescence</option>
                  {FLUORESCENCE.map((c) => (
                    <option key={c} value={c}>
                      {c}
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
                onClick={() => setCfg(emptyConfig)}
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
