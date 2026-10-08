export default function App() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", color: "#0f172a" }}>
      <header style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>QTR ECS Validation Platform</h1>
        <p style={{ margin: "0.5rem 0 0", color: "#475569" }}>
          Synthetic demo data only. Not for live client use.
        </p>
      </header>

      <nav aria-label="CAST navigation" style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <a href="#characterize">Characterize</a>
        <a href="#act">Act</a>
        <a href="#steer">Steer</a>
        <a href="#track">Track</a>
      </nav>

      <section style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1rem" }}>
          <h2>Characterize</h2>
          <p>Baseline capacity, leakage, and evidence.</p>
        </div>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1rem" }}>
          <h2>Act</h2>
          <p>Measure recovery opportunities and intervention design.</p>
        </div>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1rem" }}>
          <h2>Steer</h2>
          <p>Prioritize changes and redeployment decisions.</p>
        </div>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1rem" }}>
          <h2>Track</h2>
          <p>Monitor outcomes with auditability and evidence.</p>
        </div>
      </section>
    </main>
  );
}
