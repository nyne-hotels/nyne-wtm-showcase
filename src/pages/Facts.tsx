import { FactValue } from '../components/FactValue';
import { useProperty } from '../app/sections';

/** A single-screen reference sheet with every property fact visible. */
export function Facts() {
  const p = useProperty()!;
  const leftIndices = p.facts.length === 7 ? [0, 1, 4, 5] : [0, 1, 4];
  const left = p.facts.filter((_, index) => leftIndices.includes(index));
  const right = p.facts.filter((_, index) => !leftIndices.includes(index));
  const columns = [left, right];

  return (
    <div className="page page--facts">
      <header className="facts-intro">
        <div>
          <p className="eyebrow">{p.name}</p>
          <h1>Property facts</h1>
        </div>
        <p className="facts-intro__count">Complete property reference</p>
      </header>

      <div className="fact-sheet" aria-label={`${p.name} property facts`}>
        {columns.map((groups, columnIndex) => (
          <div key={columnIndex} className="fact-sheet__column">
            {groups.map((group) => {
              const groupIndex = p.facts.indexOf(group);
              return (
                <section key={group.heading} className="fact-sheet__group">
                  <header>
                    <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                    <h2>{group.heading}</h2>
                  </header>
                  <dl>
                    {group.rows.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd><FactValue fact={row.fact} /></dd>
                      </div>
                    ))}
                  </dl>
                </section>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
