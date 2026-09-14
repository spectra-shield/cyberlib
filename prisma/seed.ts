import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const network = await prisma.category.upsert({
    where: { name: "network" },
    update: {},
    create: { name: "network" },
  });

  const dast = await prisma.category.upsert({
    where: { name: "dast" },
    update: {},
    create: { name: "dast" },
  });

  const siem = await prisma.category.upsert({
    where: { name: "siem" },
    update: {},
    create: { name: "siem" },
  });

  await prisma.tool.upsert({
    where: { slug: "nmap" },
    update: {},
    create: {
      name: "nmap",
      slug: "nmap",
      type: "network",
      severity: null,
      description: "Network scanner and host discovery tool.",
      url: "https://nmap.org",
      categoryId: network.id,
    },
  });

  await prisma.tool.upsert({
    where: { slug: "burp-suite" },
    update: {},
    create: {
      name: "burp suite",
      slug: "burp-suite",
      type: "dast",
      severity: "high",
      description: "Web application security testing platform.",
      url: "https://portswigger.net/burp",
      categoryId: dast.id,
    },
  });

  await prisma.tool.upsert({
    where: { slug: "splunk" },
    update: {},
    create: {
      name: "splunk",
      slug: "splunk",
      type: "siem",
      severity: null,
      description: "Log aggregation and SIEM platform.",
      url: "https://www.splunk.com",
      categoryId: siem.id,
    },
  });

  await prisma.tool.upsert({
    where: { slug: "wireshark" },
    update: {},
    create: {
      name: "wireshark",
      slug: "wireshark",
      type: "network",
      severity: null,
      description: "Network protocol analyzer.",
      url: "https://www.wireshark.org",
      categoryId: network.id,
    },
  });

  console.log("Seed done");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());