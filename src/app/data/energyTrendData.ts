/* =========================================================
   ENERGY TREND DATA
   Annual average crude oil spot prices, US dollars per barrel.
   Source: U.S. Energy Information Administration (EIA),
   "Spot Prices" table (Brent - Europe; WTI - Cushing, Oklahoma).
   Values are EIA annual averages of daily closing spot prices.
   2025 figures are from the EIA table released 4 March 2026.
   To extend the chart, add one row per year in the same format.
========================================================= */

export type EnergyTrendPoint = {
  year: string;
  brent: number;
  wti: number;
};

export const energyTrendData: EnergyTrendPoint[] = [
  { year: "2019", brent: 64.3, wti: 56.99 },
  { year: "2020", brent: 41.96, wti: 39.16 },
  { year: "2021", brent: 70.86, wti: 68.13 },
  { year: "2022", brent: 100.93, wti: 94.9 },
  { year: "2023", brent: 82.49, wti: 77.58 },
  { year: "2024", brent: 80.52, wti: 76.63 },
  { year: "2025", brent: 69.14, wti: 65.39 },
];

export const energyTrendSource =
  "Source: U.S. Energy Information Administration, Spot Prices (annual averages).";

export const energyTrendKeys = [
  { key: "brent", label: "Brent", color: "#0f766e" },
  { key: "wti", label: "WTI", color: "#b45309" },
];
