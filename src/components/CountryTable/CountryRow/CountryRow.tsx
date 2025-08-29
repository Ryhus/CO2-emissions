import type { EmissionEntry } from '@/utils/emissionsData';
import './CountryRowStyles.scss';

interface CountryRowProps {
  country: string;
  iso_code: string;
  data: EmissionEntry[];
}

export default function CountryRow({
  country,
  iso_code,
  data,
}: CountryRowProps) {
  return (
    <>
      <tr key={country}>
        <td>{country}</td>
        <td>{data.at(-1)?.population}</td>
        <td>{iso_code}</td>
      </tr>
    </>
  );
}
