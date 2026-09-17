import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";

export default async function Admin() {
  const tools = await prisma.tool.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="px-8 py-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium">Manage tools</h1>
        </div>
        <Link
          href="/tools/add"
          className="gradient-accent text-sm font-medium text-white px-4 py-2 rounded-lg"
        >
          + Add tool
        </Link>
      </div>

      <div className="border-t border-border">
        <div className="grid grid-cols-[1fr_100px_90px_80px] px-1 py-2 text-xs text-text-muted font-mono border-b border-border">
          <span>name</span>
          <span>type</span>
          <span>severity</span>
          <span></span>
        </div>

        {tools.map((tool) => (
          <div
            key={tool.id}
            className="grid grid-cols-[1fr_100px_90px_80px] items-center px-1 py-3 border-b border-border"
          >
            <div>
              <div className="text-sm font-medium">{tool.name}</div>
              <div className="text-xs text-text-secondary mt-0.5">
                {tool.description}
              </div>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              {tool.type}
            </span>
            <span className={`font-mono text-xs ${tool.severity ? "text-danger" : "text-text-muted"}`}>
              {tool.severity ?? "—"}
            </span>
            <DeleteButton id={tool.id} />
          </div>
        ))}
      </div>
    </div>
  );
}