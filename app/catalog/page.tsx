import { prisma } from "@/lib/prisma";
import CatalogFilter from "@/components/CatalogFilter";
import SortSelect from "@/components/SortSelect";

export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string }>;
}) {
  const { search, sort } = await searchParams;

  const orderBy =
    sort === "severity"
      ? { severity: "asc" as const }
      : sort === "type"
      ? { type: "asc" as const }
      : { name: "asc" as const };

  const tools = await prisma.tool.findMany({
    where: search ? { name: { contains: search } } : undefined,
    include: { category: true },
    orderBy,
  });

  const categories = ["all", ...new Set(tools.map((t) => t.type))];

  return (
    <div className="px-8 py-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Catalog</h1>
        <div className="flex gap-2">
          <SortSelect current={sort} />
          <form method="GET">
            {sort && <input type="hidden" name="sort" value={sort} />}
            <input
              name="search"
              defaultValue={search}
              placeholder="Search..."
              className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-start"
            />
          </form>
        </div>
      </div>
      <CatalogFilter tools={tools} categories={categories} />
    </div>
  );
}