import { useState, useMemo } from "react";

const BUILDERS = [
  { name: "Noma Security", desc: "A unified platform to secure and govern your AI and agents, delivering enterprise-grade protection.", conformance: "Conformant", url: "https://www.noma.security", logo: "https://www.noma.security/favicon.ico" },
  { name: "Runlayer", desc: "One platform for MCPs, Skills, and Agents, with purpose-built security, fine-grained governance, and complete observability.", conformance: "Conformant", url: "https://www.runlayer.com", logo: "https://www.runlayer.com/favicon.ico" },
  { name: "Formal", desc: "Formal enforces least-privilege at the wire protocol layer for humans and AI agents.", conformance: "Conformant", url: "https://www.formalhq.com", logo: "https://www.formalhq.com/favicon.ico" },
  { name: "MintMCP", desc: "Enterprise governance platform for AI agents and MCP servers. Real-time observability, security controls, and compliance.", conformance: "Aligned", url: "https://www.mintmcp.com", logo: "https://www.google.com/s2/favicons?domain=mintmcp.com&sz=64" },
  { name: "Lasso", desc: "Lasso is the AI Security Platform built for the agentic era.", conformance: "Aligned", url: "https://www.lasso.security", logo: "https://www.google.com/s2/favicons?domain=lasso.security&sz=64" },
  { name: "HiddenLayer", desc: "The most comprehensive security platform for AI.", conformance: "Aligned", url: "https://hiddenlayer.com/", logo: "https://www.google.com/s2/favicons?domain=hiddenlayer.com&sz=64" },
  { name: "Ultra", desc: "The easy and secure way for people and agents to use MCP. Autonomous runtime security.", conformance: "Aligned", url: "https://ultra.security", logo: "https://www.google.com/s2/favicons?domain=ultra.security&sz=64" },
  { name: "Manifold Security", desc: "AI Detection and Response Platform.", conformance: "Aligned", url: "https://www.manifold.security/", logo: "https://www.google.com/s2/favicons?domain=manifold.security&sz=64" },
  { name: "Operant AI", desc: "Discover, Detect, and Defend your AI, Agents, and MCP in real-time.", conformance: "Aligned", url: "https://www.operant.ai", logo: "https://www.google.com/s2/favicons?domain=operant.ai&sz=64" },
  { name: "Tenet", desc: "Your Agents Have Real Access. Give Them Real Defense.", conformance: "Aligned", url: "https://www.tenetsecurity.ai", logo: "https://www.google.com/s2/favicons?domain=tenetsecurity.ai&sz=64" },
  { name: "Certiv", desc: "Runtime Assurance for AI Agents. Complete visibility and control.", conformance: "Aligned", url: "https://www.certiv.ai", logo: "https://www.google.com/s2/favicons?domain=certiv.ai&sz=64" },
  { name: "Pillar Security", desc: "Build and Run Secure AI Systems.", conformance: "Aligned", url: "https://pillar.security", logo: "https://www.google.com/s2/favicons?domain=pillar.security&sz=64" },
  { name: "Aten Security", desc: "Thoth enforces behavioral policies on AI agent tool calls at the SDK layer.", conformance: "Aligned", url: "https://atensecurity.com/thoth", logo: "https://www.google.com/s2/favicons?domain=atensecurity.com&sz=64" },
  { name: "Golf", desc: "Agentic AI governance and security gateway for enterprises.", conformance: "Aligned", url: "https://golf.dev/", logo: "https://www.google.com/s2/favicons?domain=golf.dev&sz=64" },
  { name: "ArmorIQ", desc: "Intent is the new perimeter.", conformance: "Aligned", url: "https://armoriq.ai/", logo: "https://www.google.com/s2/favicons?domain=armoriq.ai&sz=64" },
  { name: "Aegis Security", desc: "A runtime security control plane for AI agents.", conformance: "Aligned", url: "https://aegissecurity.dev/", logo: "https://www.google.com/s2/favicons?domain=aegissecurity.dev&sz=64" },
  { name: "Faramesh", desc: "Intent-to-action control layer for AI agents.", conformance: "Aligned", url: "https://faramesh.dev", logo: "https://www.google.com/s2/favicons?domain=faramesh.dev&sz=64" },
  { name: "Repello AI", desc: "End-to-end security for autonomous AI systems through continuous discovery and automated red teaming.", conformance: "Aligned", url: "https://repello.ai/", logo: "https://www.google.com/s2/favicons?domain=repello.ai&sz=64" },
  { name: "Cakewalk", desc: "Agentic Access Management for fast-moving companies.", conformance: "Aligned", url: "https://www.getcakewalk.io/", logo: "https://www.google.com/s2/favicons?domain=getcakewalk.io&sz=64" },
  { name: "Permit.io", desc: "Full Stack authorization as a service.", conformance: "Aligned", url: "https://permit.io", logo: "https://www.google.com/s2/favicons?domain=permit.io&sz=64" },
  { name: "Aira Security", desc: "Enforcement layer for agents that blocks malicious or accidental actions.", conformance: "Aligned", url: "https://airasecurity.ai/", logo: "https://www.google.com/s2/favicons?domain=airasecurity.ai&sz=64" },
  { name: "DecisionGuard", desc: "Pre-execution assurance for automated and AI-driven systems.", conformance: "Aligned", url: "https://decision-guard.com/", logo: "https://www.google.com/s2/favicons?domain=decision-guard.com&sz=64" },
  { name: "SEVORIX", desc: "A local, Rust-based runtime firewall for AI agents.", conformance: "Aligned", url: "https://sevorix.ai", logo: "https://www.google.com/s2/favicons?domain=sevorix.ai&sz=64" },
  { name: "Clevr Security", desc: "Authorizes AI agent actions in real time by evaluating intent and business context.", conformance: "Aligned", url: "https://clevrsecurity.com", logo: "https://www.google.com/s2/favicons?domain=clevrsecurity.com&sz=64" },
  { name: "Assury", desc: "Self-hosted runtime control plane that enforces AARM-conformant policy over AI agent actions.", conformance: "Aligned", url: "https://assury.ai", logo: "https://www.google.com/s2/favicons?domain=assury.ai&sz=64" },
  { name: "Rivaro", desc: "Runtime enforcement platform for AI agents with identity-aware policy controls.", conformance: "Aligned", url: "https://rivaro.ai", logo: "https://www.google.com/s2/favicons?domain=rivaro.ai&sz=64" },
  { name: "Refractal", desc: "The multimodal security layer for AI agents.", conformance: "Aligned", url: "https://www.refractal-ai.com/", logo: "https://www.google.com/s2/favicons?domain=refractal-ai.com&sz=64" },
  { name: "Fencio", desc: "Runtime security platform for deterministic control over autonomous agents in production.", conformance: "Aligned", url: "https://fencio.dev", logo: "https://www.google.com/s2/favicons?domain=fencio.dev&sz=64" },
  { name: "The MCP Company", desc: "Dev tool giving control and visibility over agents and MCP actions.", conformance: "Aligned", url: "https://themcp.company", logo: "https://www.google.com/s2/favicons?domain=themcp.company&sz=64" },
  { name: "Laptop Bot", desc: "AI Security and Governance for laptops.", conformance: "Aligned", url: "https://laptop.bot", logo: "https://www.google.com/s2/favicons?domain=laptop.bot&sz=64" },
  { name: "Raxit", desc: "Preemptive cybersecurity platform for AI agents.", conformance: "Aligned", url: "https://raxit.ai", logo: "https://www.google.com/s2/favicons?domain=raxit.ai&sz=64" },
  { name: "Highflame", desc: "Unified enterprise Agent security platform with real-time protection and multi-turn behavioral control.", conformance: "Aligned", url: "https://highflame.com", logo: "https://www.google.com/s2/favicons?domain=highflame.com&sz=64" },
  { name: "Cortexhub", desc: "Runtime governance for AI-era systems.", conformance: "Aligned", url: "https://cortexhub.ai/", logo: "https://www.google.com/s2/favicons?domain=cortexhub.ai&sz=64" },
  { name: "Aris", desc: "Finds what's running, measures the exposure, and gives you control where it matters.", conformance: "Aligned", url: "https://aris-platform.com/", logo: "https://www.google.com/s2/favicons?domain=aris-platform.com&sz=64" },
  { name: "Pipelock", desc: "Open-source firewall for AI agents. Single binary, no cloud required.", conformance: "Aligned", url: "https://pipelab.org", logo: "https://www.google.com/s2/favicons?domain=pipelab.org&sz=64" },
  { name: "Secure Agentics", desc: "Real time security monitoring and control with cognitive reasoning technology.", conformance: "Aligned", url: "https://secureagentics.ai", logo: "https://www.google.com/s2/favicons?domain=secureagentics.ai&sz=64" },
  { name: "Guardion.AI", desc: "Runtime security layer observing, enforcing, and blocking unsafe actions.", conformance: "Aligned", url: "https://guardion.ai", logo: "https://guardion.ai/images/logo.svg" },
  { name: "Cogensec.AI", desc: "Defines and measures structural integrity for agents to operate safely.", conformance: "Aligned", url: "https://cogensec.com", logo: "https://www.google.com/s2/favicons?domain=cogensec.com&sz=64" },
  { name: "Unbound Security", desc: "The Agent Access Security Broker for AI coding agents.", conformance: "Aligned", url: "https://getunbound.ai", logo: "https://www.google.com/s2/favicons?domain=getunbound.ai&sz=64" },
  { name: "QueryStory", desc: "AI-powered data intelligence platform with zero trust agent architecture.", conformance: "Aligned", url: "https://querystory.ai", logo: "https://www.google.com/s2/favicons?domain=querystory.ai&sz=64" },
  { name: "z0.ai", desc: "Internal agent platform for security and compliance conscious companies.", conformance: "Aligned", url: "https://www.z0.ai", logo: "https://www.google.com/s2/favicons?domain=z0.ai&sz=64" },
  { name: "Optimus Labs", desc: "Secures AI agents at the endpoint where prompt injection, sensitive data, and autonomous action converge.", conformance: "Aligned", url: "https://www.optimuslabs.io/", logo: "https://www.google.com/s2/favicons?domain=optimuslabs.io&sz=64" },
  { name: "SovereignAI Security Labs", desc: "SentraGuard: centralized, API-first GenAI security and guardrails platform.", conformance: "Aligned", url: "https://www.sovereignaisecurity.com", logo: "https://www.google.com/s2/favicons?domain=sovereignaisecurity.com&sz=64" },
  { name: "Akto", desc: "Agentic AI Security platform for enterprises to secure AI agents, MCPs, and LLMs.", conformance: "Aligned", url: "https://www.akto.io", logo: "https://www.google.com/s2/favicons?domain=akto.io&sz=64" },
  { name: "LangGuard", desc: "AI Control Plane for runtime governance and automated remediation.", conformance: "Aligned", url: "https://www.langguard.ai", logo: "https://www.google.com/s2/favicons?domain=langguard.ai&sz=64" },
  { name: "Capsule Security", desc: "Protects AI agents at runtime with a Guardian Agent that detects rogue behavior.", conformance: "Aligned", url: "https://www.capsulesecurity.io", logo: "https://www.google.com/s2/favicons?domain=capsulesecurity.io&sz=64" },
  { name: "Strix Governance", desc: "Embedded governance kernel with execution tokens, SHA-256 proof flow, and tamper-evident audit trails.", conformance: "Aligned", url: "https://www.strixgov.com/", logo: "https://www.google.com/s2/favicons?domain=strixgov.com&sz=64" },
];

function LogoImg({ src, name }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div style={{
        width: 24, height: 24, borderRadius: 6, background: "#e2e8f0",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, color: "#64748b", flexShrink: 0,
      }}>
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={src} alt="" onError={() => setErr(true)}
      style={{ width: 24, height: 24, borderRadius: 6, objectFit: "contain", flexShrink: 0, background: "#fff" }}
    />
  );
}

export default function BuilderRegistry() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("conformance");
  const [sortDir, setSortDir] = useState("asc");
  const [filterConf, setFilterConf] = useState("");

  const filtered = useMemo(() => {
    let rows = BUILDERS.filter((b) => {
      const q = search.toLowerCase();
      const matchSearch = !q || b.name.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q);
      const matchConf = !filterConf || b.conformance === filterConf;
      return matchSearch && matchConf;
    });
    rows.sort((a, b) => {
      let av, bv;
      if (sortField === "conformance") {
        const order = { "Conformant": 0, "Aligned": 1 };
        av = order[a.conformance] ?? 2;
        bv = order[b.conformance] ?? 2;
      } else {
        av = (a[sortField] || "").toLowerCase();
        bv = (b[sortField] || "").toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }, [search, sortField, sortDir, filterConf]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const confCount = BUILDERS.filter(b => b.conformance === "Conformant").length;
  const alignedCount = BUILDERS.filter(b => b.conformance === "Aligned").length;

  const thStyle = (field) => ({
    padding: "10px 14px", textAlign: "left", fontWeight: 600,
    color: "#475569", cursor: field ? "pointer" : "default", userSelect: "none",
    borderBottom: "2px solid #e2e8f0", fontSize: 11,
    textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap",
  });

  const arrow = (field) => (
    <span style={{ color: sortField === field ? "#0ea5e9" : "#cbd5e1", fontSize: 10, marginLeft: 4 }}>
      {sortField === field ? (sortDir === "asc" ? "▲" : "▼") : "⇅"}
    </span>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", maxWidth: 960, margin: "0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Stats row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "6px 14px", fontSize: 13 }}>
          <strong style={{ color: "#16a34a" }}>{confCount}</strong> <span style={{ color: "#15803d" }}>Conformant</span>
        </div>
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "6px 14px", fontSize: 13 }}>
          <strong style={{ color: "#2563eb" }}>{alignedCount}</strong> <span style={{ color: "#1d4ed8" }}>Aligned</span>
        </div>
        <div style={{ fontSize: 13, color: "#94a3b8", marginLeft: "auto" }}>
          {filtered.length} of {BUILDERS.length} shown
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: 0.3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text" placeholder="Search builders..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "8px 12px 8px 32px", borderRadius: 8,
              border: "1px solid #e2e8f0", fontSize: 13, outline: "none",
              background: "#fff", color: "#1e293b", boxSizing: "border-box",
            }}
          />
        </div>
        <select
          value={filterConf} onChange={(e) => setFilterConf(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, background: "#fff", color: "#1e293b", cursor: "pointer" }}
        >
          <option value="">All Status</option>
          <option value="Conformant">Conformant</option>
          <option value="Aligned">Aligned</option>
        </select>
        {(search || filterConf) && (
          <button onClick={() => { setSearch(""); setFilterConf(""); }}
            style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #fca5a5", fontSize: 13, background: "#fef2f2", color: "#dc2626", cursor: "pointer", fontWeight: 600 }}>
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th onClick={() => handleSort("name")} style={thStyle("name")}>
                Company{arrow("name")}
              </th>
              <th onClick={() => handleSort("conformance")} style={{ ...thStyle("conformance"), width: 110 }}>
                Status{arrow("conformance")}
              </th>
              <th style={thStyle(null)}>Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: 48, textAlign: "center", color: "#94a3b8" }}>No builders match your search.</td></tr>
            ) : (
              filtered.map((b, i) => {
                const isConf = b.conformance === "Conformant";
                const baseBg = isConf ? "#f0fdf4" : (i % 2 === 0 ? "#fff" : "#fafbfd");
                const hoverBg = isConf ? "#dcfce7" : "#f0f7ff";
                return (
                  <tr
                    key={b.name}
                    style={{ background: baseBg, cursor: "pointer", transition: "background 0.12s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = baseBg)}
                    onClick={() => window.open(b.url, "_blank")}
                  >
                    <td style={{ padding: "8px 14px", borderBottom: "1px solid #f1f5f9", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <LogoImg src={b.logo} name={b.name} />
                        <span style={{ fontWeight: 600, color: "#0f172a" }}>{b.name}</span>
                        <span style={{ color: "#cbd5e1", fontSize: 11 }}>↗</span>
                      </div>
                    </td>
                    <td style={{ padding: "8px 14px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{
                        display: "inline-block", padding: "2px 10px", borderRadius: 20,
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.03em",
                        textTransform: "uppercase",
                        background: isConf ? "#22c55e" : "#3b82f6", color: "#fff",
                      }}>
                        {b.conformance}
                      </span>
                    </td>
                    <td style={{ padding: "8px 14px", borderBottom: "1px solid #f1f5f9", color: "#64748b", fontSize: 12, lineHeight: 1.5 }}>
                      {b.desc}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: "#94a3b8" }}>
        Click any row to visit · Sort by clicking column headers ·
        <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#22c55e", margin: "0 4px 0 8px", verticalAlign: "middle" }} />Conformant
        <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", margin: "0 4px 0 8px", verticalAlign: "middle" }} />Aligned
      </div>
    </div>
  );
}
