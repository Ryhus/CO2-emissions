export interface YearData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
}

export interface CountryData {
  iso_code: string;
  country: string;
  data: YearData[];
}

export type EmissionsData = Record<string, CountryData>;
