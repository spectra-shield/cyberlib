"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ current }: { current?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/catalog?${params.toString()}`);
  }

  return (
    <select
      defaultValue={current ?? "name"}
      onChange={handleChange}
      className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-text-secondary focus:outline-none focus:border-accent-start"
    >
      <option value="name">Sort: name</option>
      <option value="type">Sort: type</option>
      <option value="severity">Sort: severity</option>
    </select>
  );
}