import type { JsonLdNode } from "@/lib/schema";

/**
 * Renders one or more schema.org nodes as a single JSON-LD graph.
 * Server component — the markup ships in the initial HTML so crawlers see it
 * without executing JavaScript.
 */
export function JsonLd({ schema }: { schema: JsonLdNode | JsonLdNode[] }) {
  const nodes = Array.isArray(schema) ? schema : [schema];
  const payload = JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });

  return (
    <script
      type="application/ld+json"
      // Escaping `<` prevents the JSON payload from closing the script tag early.
      dangerouslySetInnerHTML={{ __html: payload.replace(/</g, "\\u003c") }}
    />
  );
}
