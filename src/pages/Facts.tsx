import { FactValue } from '../components/FactValue';
import { useProperty } from '../app/sections';

/** Compact reference page for representatives. */
export function Facts() {
  const p = useProperty()!;
  return (
    <div className="page page--facts">
      <aside className="facts-intro">
        <div>
          <p className="eyebrow">{p.name}</p>
          <h1>Property facts</h1>
        </div>
      </aside>
      <div className="fact-groups">
        {p.facts.map((group, index) => (
          <section key={group.heading} className="fact-group">
            <header className="fact-group__head"><span>0{index + 1}</span><h2 className="fact-group__title">{group.heading}</h2></header>
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
