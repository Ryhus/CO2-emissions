import { useRef, useEffect, useState, memo } from 'react';
import { type CountryData } from '@/utils/types';

import './CountryTableStyles.scss';

interface TableProps {
  data: [string, CountryData][];
  selectedYear: number;
  visibleColumns: string[];
}

export default memo(function CountryTable({
  data,
  selectedYear,
  visibleColumns,
}: TableProps) {
  const prevYearRef = useRef<number | null>(null);
  const [highlighted, setHighlighted] = useState<Record<string, boolean>>({});

  const prevYear = prevYearRef.current;

  useEffect(() => {
    prevYearRef.current = selectedYear;
  }, [selectedYear]);

  useEffect(() => {
    if (!data.length || prevYear === null) return;

    const newHighlights: Record<string, boolean> = {};

    data.forEach(([country, countryData]) => {
      const current =
        countryData.data.find((d) => d.year === selectedYear) ??
        countryData.data.at(-1) ??
        null;

      const prev = countryData.data.find((d) => d.year === prevYear) ?? null;

      if (!current || !prev) return;

      visibleColumns.forEach((col) => {
        if (
          prev[col as keyof typeof prev] !==
          current[col as keyof typeof current]
        ) {
          newHighlights[`${country}-${col}`] = true;
        }
      });
    });

    setHighlighted(newHighlights);

    const timer = setTimeout(() => setHighlighted({}), 1000);
    return () => clearTimeout(timer);
  }, [data, selectedYear, prevYear, visibleColumns]);

  return (
    <div className="table-wrapper">
      <table className="country-table">
        <thead>
          <tr>
            <th>COUNTRY</th>
            <th>ISO</th>
            <th>YEAR</th>
            {visibleColumns.map((col) => (
              <th key={col}>{col.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(([country, countryData]) => {
            const current =
              countryData.data.find((d) => d.year === selectedYear) ??
              countryData.data.at(-1) ??
              null;

            if (!current) {
              return null;
            }

            return (
              <tr key={country}>
                <td>{country ?? 'N/A'}</td>
                <td>{countryData.iso_code ?? 'N/A'}</td>
                <td>{current.year ?? 'N/A'}</td>

                {visibleColumns.map((col) => (
                  <td
                    key={col}
                    className={
                      highlighted[`${country}-${col}`] ? 'highlight' : ''
                    }
                  >
                    {typeof current[col as keyof typeof current] === 'number'
                      ? (
                          current[col as keyof typeof current] as number
                        ).toLocaleString()
                      : (current[col as keyof typeof current] ?? 'N/A')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
