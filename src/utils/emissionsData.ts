export interface EmissionEntry {
  year: number;
  population: number;
  cement_co2: number;
  cement_co2_per_capita?: number;
}

interface CountryEmissions {
  iso_code: string;
  data: EmissionEntry[];
}

export interface EmissionsData {
  [country: string]: CountryEmissions;
}

export const emissionsData = {
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
