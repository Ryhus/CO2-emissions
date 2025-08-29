import { CountryTable } from '@/components';
import { emissionsData } from '@/utils/emissionsData';

import './HomeStyles.scss';

export default function Home() {
  return (
    <div className="home">
      <CountryTable emissionsData={emissionsData} />
    </div>
  );
}
