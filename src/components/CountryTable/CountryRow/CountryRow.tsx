import { useState } from 'react';

import './CountryRowStyles.scss';

interface CountryRowProps {
  country: string;
  iso_code: string;
  data: {
    year?: number;
    population?: number;
    cement_co2?: number;
    cement_co2_per_capita?: number;
  }[];
}

export default function CountryRow({
  country,
  iso_code,
  data,
}: CountryRowProps) {
  const [isOpenedRow, setOpenedRow] = useState(false);

  return (
    <>
      <tr key={country}>
        <td>
          <button
            className="open-detailed-country-bttn"
            onClick={() => setOpenedRow(!isOpenedRow)}
          >
            {isOpenedRow ? '▾' : '▸'}
          </button>
          {country}
        </td>
        <td>{data.at(-1)?.population}</td>
        <td>{iso_code}</td>
      </tr>
      {isOpenedRow && <div>Some other content</div>}
    </>
  );
}
