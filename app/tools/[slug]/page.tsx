import Link from "next/link";

const tools = {
  nmap: {
    name: "nmap",
    type: "network",
    severity: null as string | null,
    description:
      "Network scanner and host discovery tool. Used for network inventory, managing service upgrade schedules, and monitoring host or service uptime.",
    url: "https://nmap.org",
    checklist: [
      "Run a basic ping scan to detect live hosts",
      "Perform a port scan on common ports",
      "Enable service version detection with -sV",
      "Run OS detection with -O",
      "Export results to XML for further analysis",
    ],
  },
  "burp-suite": {
    name: "burp suite",
    type: "dast",
    severity: "high" as string | null,
    description:
      "Integrated platform for web application security testing. Covers everything from initial mapping to finding and exploiting vulnerabilities.",
    url: "https://portswigger.net/burp",
    checklist: [
      "Configure browser proxy to route traffic through Burp",
      "Spider the target application to map endpoints",
      "Run passive scan on captured traffic",
      "Use Repeater to manually test suspicious requests",
      "Check for IDOR, XSS, SQLi in Intruder",
    ],
  },
  splunk: {
    name: "splunk",
    type: "siem",
    severity: null as string | null,
    description:
      "Platform for searching, monitoring and analyzing machine-generated data. Core tool for log aggregation and SIEM workflows.",
    url: "https://www.splunk.com",
    checklist: [
      "Set up data inputs and index sources",
      "Create saved searches for common threat patterns",
      "Configure alerts for anomaly detection",
      "Build dashboards for key security metrics",
      "Set up correlation rules for incident detection",
    ],
  },
  wireshark: {
    name: "wireshark",
    type: "network",
    severity: null as string | null,
    description:
      "Network protocol analyzer that lets you capture and interactively browse traffic on a network.",
    url: "https://www.wireshark.org",
    checklist: [
      "Select the correct network interface for capture",
      "Apply display filters to narrow traffic (e.g. http, dns)",
      "Follow TCP streams to reconstruct sessions",
      "Export specific packets for deeper analysis",
      "Check for cleartext credentials in captured data",
    ],
  },
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = tools[slug as keyof typeof tools];

  if (!tool) {
    return (
      <div className="px-8 py-12 max-w-3xl mx-auto text-text-secondary">
        Tool not found.{" "}
        <Link href="/catalog" className="text-text-primary underline">
          Back to catalog
        </Link>
      </div>
    );
  }

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
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent-start mt-3 inline-block hover:opacity-80 transition-opacity"
        >
          {tool.url}
        </a>
      </div>

      <div className="bg-surface border border-border rounded-xl p-5">
        <h2 className="text-sm font-medium mb-4">Usage checklist</h2>
        <ul className="space-y-3">
          {tool.checklist.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="font-mono text-xs text-text-muted mt-0.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}