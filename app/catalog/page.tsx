import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const totalTools = await prisma.tool.count();
  const categories = await prisma.category.findMany({
    include: { _count: { select: { tools: true } } },
  });

  return (
    <div className="relative overflow-hidden px-8 py-16">
      <div className="glow absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[280px] pointer-events-none" />

      <div className="relative text-center max-w-xl mx-auto mb-14">
        <h1 className="text-4xl font-medium leading-tight mb-4">
          Find the right security
          <br />
          tool in seconds.
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          A curated catalog of scanners, SIEM platforms and forensics tools —
          with checklists for how to actually use them.
        </p>
        <Link
          href="/catalog"
          className="gradient-accent inline-block text-sm font-medium text-white px-5 py-2.5 rounded-lg"
        >
          Browse catalog
        </Link>
      </div>

      <div className="relative max-w-2xl mx-auto bg-surface border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Catalog overview</span>
          <span className="text-xs text-text-secondary">{totalTools} tools</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="bg-surface-inset border border-border-soft rounded-lg p-3"
            >
              <div className="text-xs text-text-secondary mb-1.5">{c.name}</div>
              <div className="text-xl font-medium">{c._count.tools}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}