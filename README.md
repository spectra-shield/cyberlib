# 🛡️ cyberlib

> A curated catalog of security tools and checklists for infosec practitioners

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io/)

cyberlib is a structured directory of security tools — SAST/DAST scanners, SIEM platforms, network analyzers, forensics utilities, and more. Each tool has a dedicated page with a description, links, and a usage checklist, organized by category.

## Features

- 🔍 Browse and filter tools by category
- 🔎 Search tools by name
- 📋 Detailed tool pages with usage checklists
- 🎨 Responsive design, built mobile-first
- 🛠️ Add and delete tools through the UI
- 🔌 JSON API for integrations

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Database | SQLite |
| ORM | Prisma 5 |

## Getting Started

```bash
git clone https://github.com/spectra-shield/cyberlib.git
cd cyberlib
npm install
npx prisma migrate dev
npx ts-node prisma/seed.ts
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

```
/               landing page
/catalog        browsable list of tools, filterable by category, searchable by name
/tools/[slug]   individual tool page — description, links, checklist
/tools/add      form to add a new tool
/admin          admin panel — list of all tools with delete
```

## API

Base URL: `http://localhost:3000`

### GET /api/tools

Returns all tools.

```bash
curl http://localhost:3000/api/tools
```

```json
[
  {
    "id": 1,
    "name": "nmap",
    "slug": "nmap",
    "type": "network",
    "severity": null,
    "description": "Network scanner and host discovery tool.",
    "url": "https://nmap.org",
    "categoryId": 1,
    "createdAt": "2026-09-14T00:00:00.000Z"
  }
]
```

### POST /api/tools

Creates a new tool.

```bash
curl -X POST http://localhost:3000/api/tools \
  -H "Content-Type: application/json" \
  -d '{"name":"nmap","slug":"nmap","type":"network","description":"Network scanner","categoryName":"network"}'
```

Returns `201` on success, `400` if required fields are missing, `409` if slug already exists.

### DELETE /api/tools/:id

Deletes a tool by id.

```bash
curl -X DELETE http://localhost:3000/api/tools/1
```

Returns `200` on success.

## Roadmap

- [x] **Module 1** — static frontend prototype
- [x] **Module 2** — Next.js routing and layouts
- [x] **Module 3** — Prisma, forms, admin panel
- [x] **Module 4** — search, API, final scenario

---

*Claude (Anthropic) was used to help plan the project structure.*