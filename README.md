# 🛡️ cyberlib

> A curated catalog of security tools and checklists for infosec practitioners

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

cyberlib is a structured directory of security tools — SAST/DAST scanners, SIEM platforms, network analyzers, forensics utilities, and more. Each tool has a dedicated page with a description, links, and a usage checklist, organized by category.

## Features

- 🔍 Browse and filter tools by category
- 📋 Detailed tool pages with usage checklists
- 🎨 Responsive design, built mobile-first
- 🛠️ *(coming soon)* add and edit entries through the UI
- 🔌 *(coming soon)* JSON API for integrations

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Database / ORM:** Prisma
- **Auth:** NextAuth

## Getting Started

```bash
git clone https://github.com/spectra-shield/cyberlib.git
cd cyberlib
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/               landing page
/catalog        browsable list of tools, filterable by category
/tools/[slug]   individual tool page — description, links, checklist
```

## License

MIT

---

*Claude (Anthropic) was used to help plan the project structure.*