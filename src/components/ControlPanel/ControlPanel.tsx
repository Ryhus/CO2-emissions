import { memo } from 'react';

import './ControlPanel.scss';

interface ControlPanelProps {
  search: string;
  onSearchChange: (val: string) => void;
  year: number;
  onYearChange: (val: number) => void;
  years: number[];
  sortField: 'name' | 'population';
  onSortFieldChange: (val: 'name' | 'population') => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (val: 'asc' | 'desc') => void;
}

export default memo(function ControlPanel({
  search,
  onSearchChange,
  year,
  onYearChange,
  years,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderChange,
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search country..."
      />

      <select
        value={year}
        onChange={(e) => onYearChange(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={sortField}
        onChange={(e) =>
          onSortFieldChange(e.target.value as 'name' | 'population')
        }
      >
        <option value="name">Sort by Country Name</option>
        <option value="population">Sort by Population</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as 'asc' | 'desc')}
      >
        <option value="asc">Ascending ↑</option>
        <option value="desc">Descending ↓</option>
      </select>
    </div>
  );
});
