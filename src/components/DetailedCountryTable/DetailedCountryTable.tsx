import './DetailedCountryTableStyles.scss';

interface DetailedCountryTableProps {
  data: {
    year?: number;
    population?: number;
    cement_co2?: number;
    cement_co2_per_capita?: number;
  }[];
}

export default function DetailedCountryTable({
  data,
}: DetailedCountryTableProps) {
  const detailedCountryData = data.map((annualInfo) => {
    const { year, population, cement_co2, cement_co2_per_capita } = annualInfo;

    return (
      <>
        <tr key={year}>
          <td>{year ?? 'N/A'}</td>
          <td>{population ?? 'N/A'}</td>
          <td>{cement_co2 ?? 'N/A'}</td>
          <td>{cement_co2_per_capita ?? 'N/A'}</td>
        </tr>
      </>
    );
  });

  return (
    <table className="detailed-country-table">
      <thead>
        <tr>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>CO2 per capita</th>
        </tr>
      </thead>
      <tbody>{detailedCountryData}</tbody>
    </table>
  );
}
