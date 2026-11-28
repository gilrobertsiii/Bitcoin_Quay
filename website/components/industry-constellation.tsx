import { INDUSTRIES } from "@/lib/content";

export function IndustryConstellation() {
  return (
    <figure
      className="constellation"
      aria-label="Target high-compliance sectors in rollout order, starting with Credit Unions and CDFIs"
    >
      <div className="constellation-header">
        <span className="constellation-tag">Rollout constellation</span>
        <span className="constellation-meta">9 regulated sectors · #1 live testers ready</span>
      </div>
      <div className="constellation-hub" aria-hidden="true">
        <span className="constellation-core">BLVM + QUAY KERNEL</span>
      </div>
      <ol className="constellation-grid">
        {INDUSTRIES.map((sector) => (
          <li
            key={sector.slug}
            className={
              sector.rank === 1
                ? "constellation-node constellation-node-first"
                : "constellation-node"
            }
          >
            <span className="constellation-rank">
              {String(sector.rank).padStart(2, "0")}
            </span>
            <span className="constellation-name">{sector.shortName}</span>
            <span className="constellation-tier">
              {sector.rank === 1 ? "First · live testers" : sector.difficulty}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
