"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTool() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (json.url) setLogoUrl(json.url);
    setUploading(false);
  }

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
      logo: logoUrl,
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

        <div>
          <label className="text-xs text-text-secondary block mb-1.5">
            Logo <span className="text-text-muted">(optional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-text-secondary file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-surface-inset file:text-text-secondary"
          />
          {uploading && <p className="text-xs text-text-muted mt-1">Uploading...</p>}
          {logoUrl && (
            <img src={logoUrl} alt="preview" className="mt-2 h-10 w-10 rounded object-contain bg-surface-inset" />
          )}
        </div>

        {errors.form && (
          <p className="text-xs text-danger">{errors.form}</p>
        )}

        <button
          type="submit"
          disabled={loading || uploading}
          className="gradient-accent w-full text-sm font-medium text-white py-2.5 rounded-lg disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add tool"}
        </button>
      </form>
    </div>
  );
}