"use client";

import { useState } from "react";
import Link from "next/link";

type Tool = {
  id: number;
  name: string;
  slug: string;
  type: string;
  severity: string | null;
  description: string;
};

export default function CatalogFilter({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? tools
      : tools.filter((t) => t.type === activeCategory);

  return (
    <>
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm px-3.5 py-1.5 rounded-lg border ${
              activeCategory === cat
                ? "bg-accent-start/20 border-accent-start text-text-primary"
                : "border-border text-text-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="grid grid-cols-[1fr_100px_90px] px-1 py-2 text-xs text-text-muted font-mono border-b border-border">
          <span>name</span>
          <span>type</span>
          <span>severity</span>
        </div>

        {filtered.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="grid grid-cols-[1fr_100px_90px] items-center px-1 py-3 border-b border-border hover:bg-surface/50 transition-colors"
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
          </Link>
        ))}
      </div>
    </>
  );
}