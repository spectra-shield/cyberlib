import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CatalogFilter from "@/components/CatalogFilter";

export default async function Catalog() {
  const tools = await prisma.tool.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  const categories = ["all", ...new Set(tools.map((t) => t.type))];

  return (
    <div className="px-8 py-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Catalog</h1>
      <CatalogFilter tools={tools} categories={categories} />
    </div>
  );
}