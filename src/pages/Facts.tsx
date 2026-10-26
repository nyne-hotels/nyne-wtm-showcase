import { FactValue } from '../components/FactValue';
import { useProperty } from '../app/sections';

/** Compact reference page for representatives. */
export function Facts() {
  const p = useProperty()!;
  return (
    <div className="page">
      <p className="eyebrow">{p.name}</p>
      <h1>Property facts</h1>
      <div className="fact-groups">
        {p.facts.map((group) => (
          <section key={group.heading} className="fact-group">
            <h2 className="fact-group__title">{group.heading}</h2>
            <dl className="facts">
              {group.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    <FactValue fact={row.fact} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
