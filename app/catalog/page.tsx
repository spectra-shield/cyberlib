import { prisma } from "@/lib/prisma";
import CatalogFilter from "@/components/CatalogFilter";

export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  const tools = await prisma.tool.findMany({
    where: search
      ? { name: { contains: search } }
      : undefined,
    include: { category: true },
    orderBy: { name: "asc" },
  });

  const categories = ["all", ...new Set(tools.map((t) => t.type))];

  return (
    <div className="px-8 py-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Catalog</h1>
        <form method="GET">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search tools..."
            className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-start"
          />
        </form>
      </div>
      <CatalogFilter tools={tools} categories={categories} />
    </div>
  );
}