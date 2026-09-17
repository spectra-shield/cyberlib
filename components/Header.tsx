import Link from "next/link";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";

export default async function Header() {
  const session = await getServerSession();

  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-border">
      <div className="flex items-center gap-3">
        <Link href="/" className="text-sm font-medium">
          cyberlib
        </Link>
        {session && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-accent-start/40 text-accent-start bg-accent-start/10">
            admin
          </span>
        )}
      </div>
      <nav className="flex items-center gap-6 text-sm text-text-secondary">
        <Link href="/catalog" className="hover:text-text-primary transition-colors">
          Catalog
        </Link>
        {session ? (
          <>
            <Link href="/tools/add" className="hover:text-text-primary transition-colors">
              Add tool
            </Link>
            <Link href="/admin" className="hover:text-text-primary transition-colors">
              Manage
            </Link>
            <SignOutButton />
          </>
        ) : (
          <Link href="/login" className="hover:text-text-primary transition-colors">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}