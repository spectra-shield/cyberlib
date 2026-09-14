import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-border">
      <Link href="/" className="text-sm font-medium">
        cyberlib
      </Link>
      <nav className="flex gap-6 text-sm text-text-secondary">
        <Link href="/catalog" className="hover:text-text-primary transition-colors">
          Catalog
        </Link>
      </nav>
    </header>
  );
}