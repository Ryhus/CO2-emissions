import './CountryTable.scss';

const data = {
  Afganistan: {
    iso_code: 'AFG',
    data: [
      {
        year: 1750,
        population: 2802560,
        cement_co2: 0.0,
      },
      {
        year: 1751,
        population: 2802560,
        cement_co2: 0.0,
        cement_co2_per_capita: 0.0,
      },
    ],
  },
  Germany: {
    iso_code: 'GE',
    data: [
      {
        year: 1750,
        population: 2802,
        cement_co2: 0.0,
      },
      {
        year: 1751,
        population: 2802,
        cement_co2: 0.0,
        cement_co2_per_capita: 0.0,
      },
    ],
  },
};

export default function CountryListStyles() {
  const countryData = Object.entries(data).map((countryArr) => {
    const [country, { iso_code, data }] = countryArr;

    const row = (
      <tr key={country}>
        <td>{country}</td>
        <td>{data.at(-1)?.population}</td>
        <td>{iso_code}</td>
      </tr>
    );
    return row;
  });

  return (
    <table className="country-table">
      <thead>
        <tr>
          <th>Country</th>
          <th>Population (latest)</th>
          <th>ISO</th>
        </tr>
      </thead>
      <tbody>{countryData}</tbody>
    </table>
  );
}
