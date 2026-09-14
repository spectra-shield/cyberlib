import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tools = await prisma.tool.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(tools);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, type, severity, description, url, categoryName } = body;

    if (!name || !slug || !type || !description || !categoryName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    const tool = await prisma.tool.create({
      data: {
        name,
        slug,
        type,
        severity: severity || null,
        description,
        url: url || null,
        categoryId: category.id,
      },
    });

    return NextResponse.json(tool, { status: 201 });
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      (e as { code: string }).code === "P2002"
    ) {
      return NextResponse.json({ error: "Tool with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}