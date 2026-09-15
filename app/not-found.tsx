import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-8 py-24 max-w-3xl mx-auto text-center">
      <div className="font-mono text-xs text-text-muted mb-4">404</div>
      <h1 className="text-2xl font-medium mb-3">Page not found</h1>
      <p className="text-sm text-text-secondary mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="gradient-accent inline-block text-sm font-medium text-white px-5 py-2.5 rounded-lg"
      >
        Back to home
      </Link>
    </div>
  );
}