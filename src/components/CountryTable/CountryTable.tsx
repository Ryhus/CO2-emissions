import { CountryRow } from './CountryRow';

import type { EmissionsData } from '@/utils/emissionsData';

import './CountryTableStyles.scss';

interface CountryTableProps {
  emissionsData: EmissionsData;
}

export default function CountryTable({ emissionsData }: CountryTableProps) {
  const defaultColumns = [
    'ISO',
    'COUNTY',
    'POPULATION',
    'YEAR',
    'CO2',
    'CO2_PER_CAPITA',
  ];

  const countryData = Object.entries(emissionsData).map((countryArr) => {
    const [country, { iso_code, data }] = countryArr;

    return (
      <CountryRow
        key={country}
        country={country}
        iso_code={iso_code}
        data={data}
      />
    );
  });

  return (
    <table className="country-table">
      <thead>
        <tr>
          {defaultColumns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>{countryData}</tbody>
    </table>
  );
}
