import './ControlPanel.scss';

interface ControlsProps {
  search: string;
  setSearch: (val: string) => void;
  year: number;
  setYear: (val: number) => void;
  years: number[];
  sortAsc: boolean;
  setSortAsc: (val: boolean) => void;
}

export default function ControlPanel({
  search,
  setSearch,
  year,
  setYear,
  years,
  sortAsc,
  setSortAsc,
}: ControlsProps) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="controls__input"
      />

      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="controls__select"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <button onClick={() => setSortAsc(!sortAsc)} className="controls__button">
        Sort by Population {sortAsc ? '↑' : '↓'}
      </button>
    </div>
  );
}
