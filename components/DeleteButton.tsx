"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this tool?")) return;
    setLoading(true);
    await fetch(`/api/tools/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-danger border border-danger/30 px-2 py-1 rounded hover:bg-danger/10 transition-colors disabled:opacity-50"
    >
      {loading ? "..." : "delete"}
    </button>
  );
}