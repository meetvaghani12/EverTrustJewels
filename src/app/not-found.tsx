import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-6xl font-light">404</h1>
      <p className="mt-4 text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center border border-foreground px-8 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-white"
      >
        Return Home
      </Link>
    </div>
  );
}
