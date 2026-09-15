import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await prisma.tool.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!tool) notFound();

  return (
    <div className="px-8 py-12 max-w-3xl mx-auto">
      <Link
        href="/catalog"
        className="text-xs text-text-muted mb-8 inline-block hover:text-text-secondary transition-colors"
      >
        ← catalog
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {tool.logo && (
            <img
              src={tool.logo}
              alt={tool.name}
              className="h-10 w-10 rounded object-contain bg-surface-inset p-1"
            />
          )}
          <h1 className="text-2xl font-medium">{tool.name}</h1>
          <span className="font-mono text-xs text-text-secondary border border-border px-2 py-0.5 rounded">
            {tool.type}
          </span>
          {tool.severity && (
            <span className="font-mono text-xs text-danger border border-danger/30 px-2 py-0.5 rounded">
              {tool.severity}
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {tool.description}
        </p>
        {tool.url && (
        <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent-start mt-3 inline-block hover:opacity-80 transition-opacity"
          >
            {tool.url}
          </a>
        )}
      </div>
    </div>
  );
}