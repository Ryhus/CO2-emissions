import { useState, useMemo, useCallback } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { CountryTable, ControlPanel, ColumnSelectorModal } from '@/components';
import { REQUIRED_COLUMNS } from '@/utils/columns';
import { type EmissionsData, type CountryData } from '@/utils/types';

import './HomeStyles.scss';

async function fetchCountries() {
  const res = await fetch(
    'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
  );
  const data: EmissionsData = await res.json();
  return data;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [year, setYear] = useState(2020);
  const [sortField, setSortField] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const { data } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });

  const countriesData = useMemo((): [string, CountryData][] => {
    return Object.entries(data ?? {});
  }, [data]);

  const allYears = useMemo(() => {
    if (!countriesData.length) return [];
    return countriesData[0][1].data.map((d) => d.year);
  }, [countriesData]);

  const filteredData = useMemo(() => {
    return countriesData
      .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
      .sort(([nameA, dataA], [nameB, dataB]) => {
        if (sortField === 'name') {
          return sortOrder === 'asc'
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        }
        if (sortField === 'population') {
          const popA = dataA.data.find((d) => d.year === year)?.population ?? 0;
          const popB = dataB.data.find((d) => d.year === year)?.population ?? 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        }
        return 0;
      });
  }, [countriesData, search, sortField, sortOrder, year]);

  const handleSearch = useCallback((val: string) => setSearch(val), []);
  const handleYearChange = useCallback((val: number) => setYear(val), []);
  const handleSortFieldChange = useCallback(
    (val: 'name' | 'population') => setSortField(val),
    []
  );
  const handleSortOrderChange = useCallback(
    (val: 'asc' | 'desc') => setSortOrder(val),
    []
  );

  const visibleColumns = useMemo(
    () => [...REQUIRED_COLUMNS, ...selectedColumns],
    [selectedColumns]
  );

  return (
    <div className="home">
      <button onClick={() => setIsModalOpen(true)}>Select Columns</button>

      <ColumnSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedColumns={selectedColumns}
        onSave={setSelectedColumns}
      />

      <ControlPanel
        search={search}
        onSearchChange={handleSearch}
        year={year}
        onYearChange={handleYearChange}
        years={allYears}
        sortField={sortField}
        onSortFieldChange={handleSortFieldChange}
        sortOrder={sortOrder}
        onSortOrderChange={handleSortOrderChange}
      />

      <CountryTable
        data={filteredData}
        selectedYear={year}
        visibleColumns={visibleColumns}
      />
    </div>
  );
}
