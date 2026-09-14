"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTool() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      slug: (form.elements.namedItem("slug") as HTMLInputElement).value.trim(),
      type: (form.elements.namedItem("type") as HTMLInputElement).value.trim(),
      severity: (form.elements.namedItem("severity") as HTMLInputElement).value.trim() || null,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value.trim(),
      url: (form.elements.namedItem("url") as HTMLInputElement).value.trim() || null,
      categoryName: (form.elements.namedItem("categoryName") as HTMLInputElement).value.trim(),
    };

    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.slug) newErrors.slug = "Slug is required";
    if (!data.type) newErrors.type = "Type is required";
    if (!data.description) newErrors.description = "Description is required";
    if (!data.categoryName) newErrors.categoryName = "Category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const res = await fetch("/api/tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/catalog");
    } else {
      const json = await res.json();
      setErrors({ form: json.error || "Something went wrong" });
    }

    setLoading(false);
  }

  const fields = [
    { name: "name", label: "Name", placeholder: "e.g. nmap" },
    { name: "slug", label: "Slug", placeholder: "e.g. nmap (URL-friendly)" },
    { name: "type", label: "Type", placeholder: "e.g. network, dast, siem" },
    { name: "severity", label: "Severity", placeholder: "e.g. high (optional)" },
    { name: "url", label: "URL", placeholder: "https://... (optional)" },
    { name: "categoryName", label: "Category", placeholder: "e.g. network" },
  ];

  return (
    <div className="px-8 py-12 max-w-xl mx-auto">
      <h1 className="text-2xl font-medium mb-8">Add tool</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="text-xs text-text-secondary block mb-1.5">
              {f.label}
            </label>
            <input
              name={f.name}
              placeholder={f.placeholder}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-start"
            />
            {errors[f.name] && (
              <p className="text-xs text-danger mt-1">{errors[f.name]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="text-xs text-text-secondary block mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Brief description of the tool"
            rows={3}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-start resize-none"
          />
          {errors.description && (
            <p className="text-xs text-danger mt-1">{errors.description}</p>
          )}
        </div>

        {errors.form && (
          <p className="text-xs text-danger">{errors.form}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="gradient-accent w-full text-sm font-medium text-white py-2.5 rounded-lg disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add tool"}
        </button>
      </form>
    </div>
  );
}