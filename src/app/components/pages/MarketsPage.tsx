import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getQuotes } from "../../../services/marketApi";

/*
  The Pride Times
  ------------------------------------------------------------
  Markets Dashboard

  Sections:
  - Overview
  - Stocks
  - Indices
  - Crypto
  - Forex
  - Commodities
  - Mutual Funds
  - ETFs

  Live provider:
  - Indices
  - Stocks
  - Crypto

  Static/reference data:
  - Forex
  - Commodities
  - Mutual Funds
  - ETFs
*/

type MarketRow = {
  name: string;
  value: string;
  change: string;
  up: boolean;
  pts?: string;
  company?: string;
  volume?: string;
  marketCap?: string;
  ytd?: string;
};

type CommodityRow = {
  name: string;
  price: string;
  change: string;
  up: boolean;
};

type ForexRow = {
  pair: string;
  name: string;
  rate: string;
  change: string;
  up: boolean;
};

type FundRow = {
  symbol: string;
  name: string;
  nav: string;
  change: string;
  up: boolean;
  aum: string;
  return1y: string;
};

type ETFRow = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  expenseRatio: string;
  return1y: string;
};

type BondRow = {
  name: string;
  yield: string;
  price: string;
  change: string;
  up: boolean;
};

type RegionMarket = {
  name: string;
  value: string;
  change: string;
  up: boolean;
};

type Region = {
  region: string;
  markets: RegionMarket[];
};

type MarketData = {
  indices: MarketRow[];
  stocks: MarketRow[];
  crypto: MarketRow[];
};

const fallbackIndices: MarketRow[] = [
  {
    name: "S&P 500",
    value: "5,892.31",
    change: "+1.14%",
    up: true,
    ytd: "+18.4%",
  },
  {
    name: "Nasdaq Composite",
    value: "19,245.78",
    change: "+1.56%",
    up: true,
    ytd: "+24.1%",
  },
  {
    name: "Dow Jones Ind. Avg.",
    value: "42,318.45",
    change: "+0.82%",
    up: true,
    ytd: "+12.3%",
  },
  {
    name: "Russell 2000",
    value: "2,134.56",
    change: "+0.45%",
    up: true,
    ytd: "+9.7%",
  },
  {
    name: "FTSE 100",
    value: "8,241.70",
    change: "+0.19%",
    up: true,
    ytd: "+7.2%",
  },
  {
    name: "Nikkei 225",
    value: "38,912.44",
    change: "-0.21%",
    up: false,
    ytd: "+14.8%",
  },
  {
    name: "Hang Seng",
    value: "18,342.10",
    change: "-0.87%",
    up: false,
    ytd: "-3.4%",
  },
  {
    name: "Nifty 50",
    value: "22,419.95",
    change: "-0.34%",
    up: false,
    ytd: "+11.2%",
  },
  {
    name: "DAX",
    value: "18,612.80",
    change: "+0.54%",
    up: true,
    ytd: "+9.8%",
  },
  {
    name: "CAC 40",
    value: "7,984.20",
    change: "+0.31%",
    up: true,
    ytd: "+6.5%",
  },
];

const fallbackStocks: MarketRow[] = [
  {
    name: "AAPL",
    company: "Apple Inc.",
    value: "$232.15",
    change: "+0.62%",
    up: true,
    volume: "78.4M",
    marketCap: "$3.52T",
  },
  {
    name: "MSFT",
    company: "Microsoft Corp.",
    value: "$421.30",
    change: "+0.35%",
    up: true,
    volume: "21.2M",
    marketCap: "$3.13T",
  },
  {
    name: "NVDA",
    company: "NVIDIA Corp.",
    value: "$879.50",
    change: "+2.34%",
    up: true,
    volume: "143.8M",
    marketCap: "$2.16T",
  },
  {
    name: "GOOGL",
    company: "Alphabet Inc.",
    value: "$168.44",
    change: "-0.21%",
    up: false,
    volume: "19.6M",
    marketCap: "$2.08T",
  },
  {
    name: "AMZN",
    company: "Amazon.com Inc.",
    value: "$186.90",
    change: "+1.02%",
    up: true,
    volume: "32.1M",
    marketCap: "$1.97T",
  },
  {
    name: "META",
    company: "Meta Platforms",
    value: "$493.28",
    change: "+1.88%",
    up: true,
    volume: "15.9M",
    marketCap: "$1.25T",
  },
  {
    name: "TSLA",
    company: "Tesla Inc.",
    value: "$248.44",
    change: "+3.21%",
    up: true,
    volume: "88.5M",
    marketCap: "$791B",
  },
  {
    name: "BRK.B",
    company: "Berkshire Hathaway",
    value: "$362.10",
    change: "-0.08%",
    up: false,
    volume: "4.2M",
    marketCap: "$785B",
  },
];

const fallbackCrypto: MarketRow[] = [
  {
    name: "BTC",
    company: "Bitcoin",
    value: "$67,234",
    change: "+3.45%",
    up: true,
    marketCap: "$1.32T",
  },
  {
    name: "ETH",
    company: "Ethereum",
    value: "$3,456",
    change: "+2.87%",
    up: true,
    marketCap: "$415B",
  },
  {
    name: "SOL",
    company: "Solana",
    value: "$167.80",
    change: "+4.56%",
    up: true,
    marketCap: "$78B",
  },
  {
    name: "BNB",
    company: "Binance Coin",
    value: "$612.40",
    change: "+1.22%",
    up: true,
    marketCap: "$89B",
  },
  {
    name: "XRP",
    company: "XRP",
    value: "$0.62",
    change: "-0.88%",
    up: false,
    marketCap: "$34B",
  },
  {
    name: "ADA",
    company: "Cardano",
    value: "$0.48",
    change: "+1.14%",
    up: true,
    marketCap: "$17B",
  },
];

/* ------------------------------------------------------------
   Commodities
------------------------------------------------------------ */

const commodities: CommodityRow[] = [
  {
    name: "Crude Oil (WTI)",
    price: "$88.16/bbl",
    change: "+2.71%",
    up: true,
  },
  {
    name: "Brent Crude",
    price: "$91.44/bbl",
    change: "+2.34%",
    up: true,
  },
  {
    name: "Natural Gas",
    price: "$2.84/MMBtu",
    change: "-0.72%",
    up: false,
  },
  {
    name: "Gold",
    price: "$2,341/oz",
    change: "+0.63%",
    up: true,
  },
  {
    name: "Silver",
    price: "$28.14/oz",
    change: "+1.44%",
    up: true,
  },
  {
    name: "Copper",
    price: "$4.38/lb",
    change: "+0.92%",
    up: true,
  },
  {
    name: "Wheat",
    price: "$564.25/bu",
    change: "-1.12%",
    up: false,
  },
  {
    name: "Corn",
    price: "$463.50/bu",
    change: "+0.34%",
    up: true,
  },
];

/* ------------------------------------------------------------
   Forex
------------------------------------------------------------ */

const forex: ForexRow[] = [
  {
    pair: "EUR/USD",
    name: "Euro / US Dollar",
    rate: "1.0842",
    change: "+0.28%",
    up: true,
  },
  {
    pair: "GBP/USD",
    name: "British Pound / US Dollar",
    rate: "1.2718",
    change: "+0.42%",
    up: true,
  },
  {
    pair: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    rate: "156.82",
    change: "-0.31%",
    up: false,
  },
  {
    pair: "USD/INR",
    name: "US Dollar / Indian Rupee",
    rate: "83.42",
    change: "+0.12%",
    up: true,
  },
  {
    pair: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    rate: "0.6614",
    change: "+0.17%",
    up: true,
  },
  {
    pair: "USD/CAD",
    name: "US Dollar / Canadian Dollar",
    rate: "1.3612",
    change: "-0.08%",
    up: false,
  },
  {
    pair: "USD/CHF",
    name: "US Dollar / Swiss Franc",
    rate: "0.8981",
    change: "+0.06%",
    up: true,
  },
  {
    pair: "NZD/USD",
    name: "New Zealand Dollar / US Dollar",
    rate: "0.6128",
    change: "+0.21%",
    up: true,
  },
];

/* ------------------------------------------------------------
   Mutual Funds
------------------------------------------------------------ */

const mutualFunds: FundRow[] = [
  {
    symbol: "VFIAX",
    name: "Vanguard 500 Index Fund",
    nav: "$548.21",
    change: "+1.08%",
    up: true,
    aum: "$512B",
    return1y: "+24.6%",
  },
  {
    symbol: "FXAIX",
    name: "Fidelity 500 Index Fund",
    nav: "$211.74",
    change: "+1.06%",
    up: true,
    aum: "$498B",
    return1y: "+24.3%",
  },
  {
    symbol: "SWPPX",
    name: "Schwab S&P 500 Index Fund",
    nav: "$82.64",
    change: "+1.11%",
    up: true,
    aum: "$92B",
    return1y: "+24.1%",
  },
  {
    symbol: "VTSAX",
    name: "Vanguard Total Stock Market",
    nav: "$141.83",
    change: "+0.94%",
    up: true,
    aum: "$446B",
    return1y: "+22.8%",
  },
  {
    symbol: "FZROX",
    name: "Fidelity ZERO Total Market",
    nav: "$19.42",
    change: "+0.91%",
    up: true,
    aum: "$18B",
    return1y: "+22.4%",
  },
  {
    symbol: "VTIAX",
    name: "Vanguard Total International",
    nav: "$34.78",
    change: "-0.18%",
    up: false,
    aum: "$61B",
    return1y: "+9.7%",
  },
];

/* ------------------------------------------------------------
   ETFs
------------------------------------------------------------ */

const etfs: ETFRow[] = [
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    price: "$589.24",
    change: "+1.12%",
    up: true,
    expenseRatio: "0.09%",
    return1y: "+24.8%",
  },
  {
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    price: "$542.16",
    change: "+1.09%",
    up: true,
    expenseRatio: "0.03%",
    return1y: "+24.5%",
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    price: "$503.82",
    change: "+1.67%",
    up: true,
    expenseRatio: "0.20%",
    return1y: "+31.2%",
  },
  {
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    price: "$271.46",
    change: "+0.94%",
    up: true,
    expenseRatio: "0.03%",
    return1y: "+22.7%",
  },
  {
    symbol: "IWM",
    name: "iShares Russell 2000 ETF",
    price: "$211.38",
    change: "+0.45%",
    up: true,
    expenseRatio: "0.19%",
    return1y: "+14.6%",
  },
  {
    symbol: "GLD",
    name: "SPDR Gold Shares",
    price: "$217.62",
    change: "+0.63%",
    up: true,
    expenseRatio: "0.40%",
    return1y: "+18.3%",
  },
];

/* ------------------------------------------------------------
   Government Bonds
------------------------------------------------------------ */

const bonds: BondRow[] = [
  {
    name: "US 2-Year Treasury",
    yield: "4.92%",
    price: "$99.15",
    change: "-0.02%",
    up: false,
  },
  {
    name: "US 10-Year Treasury",
    yield: "4.75%",
    price: "$98.42",
    change: "+0.03%",
    up: true,
  },
  {
    name: "US 30-Year Treasury",
    yield: "4.68%",
    price: "$96.80",
    change: "+0.05%",
    up: true,
  },
  {
    name: "UK 10-Year Gilt",
    yield: "4.21%",
    price: "$97.30",
    change: "+0.04%",
    up: true,
  },
  {
    name: "German 10-Year Bund",
    yield: "2.45%",
    price: "$99.90",
    change: "-0.01%",
    up: false,
  },
  {
    name: "France 10-Year OAT",
    yield: "2.98%",
    price: "$98.20",
    change: "+0.02%",
    up: true,
  },
  {
    name: "Japan 10-Year JGB",
    yield: "1.02%",
    price: "$100.10",
    change: "+0.02%",
    up: true,
  },
  {
    name: "India 10-Year G-Sec",
    yield: "7.05%",
    price: "$98.60",
    change: "+0.03%",
    up: true,
  },
];

/* ------------------------------------------------------------
   Global Markets
------------------------------------------------------------ */

const globalMarkets: Region[] = [
  {
    region: "Americas",
    markets: [
      {
        name: "S&P 500 (US)",
        value: "5,892.31",
        change: "+1.14%",
        up: true,
      },
      {
        name: "Dow Jones (US)",
        value: "42,318.45",
        change: "+0.82%",
        up: true,
      },
      {
        name: "Bovespa (Brazil)",
        value: "128,450.20",
        change: "+0.65%",
        up: true,
      },
      {
        name: "S&P/TSX (Canada)",
        value: "23,610.40",
        change: "-0.18%",
        up: false,
      },
    ],
  },
  {
    region: "Europe",
    markets: [
      {
        name: "FTSE 100 (UK)",
        value: "8,241.70",
        change: "+0.19%",
        up: true,
      },
      {
        name: "DAX (Germany)",
        value: "18,612.80",
        change: "+0.54%",
        up: true,
      },
      {
        name: "CAC 40 (France)",
        value: "7,984.20",
        change: "+0.31%",
        up: true,
      },
      {
        name: "IBEX 35 (Spain)",
        value: "11,240.60",
        change: "-0.12%",
        up: false,
      },
    ],
  },
  {
    region: "Asia-Pacific",
    markets: [
      {
        name: "Nikkei 225 (Japan)",
        value: "38,912.44",
        change: "-0.21%",
        up: false,
      },
      {
        name: "Hang Seng (Hong Kong)",
        value: "18,342.10",
        change: "-0.87%",
        up: false,
      },
      {
        name: "Nifty 50 (India)",
        value: "22,419.95",
        change: "-0.34%",
        up: false,
      },
      {
        name: "ASX 200 (Australia)",
        value: "8,102.30",
        change: "+0.28%",
        up: true,
      },
    ],
  },
  {
    region: "Middle East & Africa",
    markets: [
      {
        name: "Tadawul (Saudi Arabia)",
        value: "12,180.40",
        change: "+0.38%",
        up: true,
      },
      {
        name: "JSE All Share (South Africa)",
        value: "81,250.60",
        change: "-0.22%",
        up: false,
      },
      {
        name: "EGX 30 (Egypt)",
        value: "29,840.10",
        change: "+0.51%",
        up: true,
      },
      {
        name: "DFM (Dubai)",
        value: "4,320.85",
        change: "+0.44%",
        up: true,
      },
    ],
  },
];

/* ------------------------------------------------------------
   Navigation
------------------------------------------------------------ */

const navItems = [
  "Overview",
  "Stocks",
  "Indices",
  "Crypto",
  "Forex",
  "Commodities",
  "Mutual Funds",
  "ETFs",
  "Government Bonds",
  "Global Markets",
];

/* ------------------------------------------------------------
   Helpers
------------------------------------------------------------ */

function normalizeRows(
  rows: any[] | undefined,
  fallback: MarketRow[]
): MarketRow[] {
  if (!Array.isArray(rows) || rows.length === 0) {
    return fallback;
  }

  return rows.map((row: any, index: number) => ({
    ...fallback[index],
    ...row,
    name: row?.name ?? fallback[index]?.name ?? "—",
    value: row?.value ?? fallback[index]?.value ?? "—",
    change: row?.change ?? fallback[index]?.change ?? "—",
    up:
      typeof row?.up === "boolean"
        ? row.up
        : fallback[index]?.up ?? true,
  }));
}

function ChangeValue({
  change,
  up,
}: {
  change: string;
  up: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${
        up ? "text-[#00A86B]" : "text-[#EF3434]"
      }`}
    >
      <span className="text-[9px]">
        {up ? "▲" : "▼"}
      </span>

      {change}
    </span>
  );
}

function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-[22px] font-bold tracking-tight text-[#111111]">
        {children}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------
   Stocks Table
------------------------------------------------------------ */

function StocksTable({
  stocks,
}: {
  stocks: MarketRow[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] border-collapse">
        <thead>
          <tr className="border-b-2 border-[#111111]">
            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Symbol
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Company
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Price
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Change
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Volume
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Mkt Cap
            </th>
          </tr>
        </thead>

        <tbody>
          {stocks.map((row, index) => (
            <tr
              key={`${row.name}-${index}`}
              className="border-b border-[#E6E6E6] transition-colors hover:bg-[#FAFAFA]"
            >
              <td className="py-4 text-[16px] font-bold text-[#E31B23]">
                {row.name}
              </td>

              <td className="py-4 text-[16px]">
                {row.company ?? "—"}
              </td>

              <td className="py-4 font-mono text-[15px] font-bold">
                {row.value}
              </td>

              <td className="py-4 text-[15px]">
                <ChangeValue
                  change={row.change}
                  up={row.up}
                />
              </td>

              <td className="py-4 text-[15px] text-[#777777]">
                {row.volume ?? "—"}
              </td>

              <td className="py-4 text-[15px] font-bold">
                {row.marketCap ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------
   Indices Table
------------------------------------------------------------ */

function IndicesTable({
  indices,
}: {
  indices: MarketRow[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[750px] border-collapse">
        <thead>
          <tr className="border-b-2 border-[#111111]">
            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Index
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Value
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Change
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              YTD Return
            </th>
          </tr>
        </thead>

        <tbody>
          {indices.map((row, index) => (
            <tr
              key={`${row.name}-${index}`}
              className="border-b border-[#E6E6E6] transition-colors hover:bg-[#FAFAFA]"
            >
              <td className="py-4 text-[16px] font-semibold">
                {row.name}
              </td>

              <td className="py-4 font-mono text-[15px]">
                {row.value}
              </td>

              <td className="py-4 text-[15px]">
                <ChangeValue
                  change={row.change}
                  up={row.up}
                />
              </td>

              <td
                className={`py-4 text-[15px] font-bold ${
                  row.ytd?.startsWith("-")
                    ? "text-[#EF3434]"
                    : "text-[#00A86B]"
                }`}
              >
                {row.ytd ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------
   Crypto Cards
------------------------------------------------------------ */

function CryptoGrid({
  crypto,
}: {
  crypto: MarketRow[];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {crypto.map((row, index) => (
        <article
          key={`${row.name}-${index}`}
          className="min-h-[175px] rounded-[10px] border border-[#D8D8D8] bg-white p-5 transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[20px] font-bold">
                {row.name}
              </p>

              <p className="mt-3 text-[16px] text-[#555555]">
                {row.company}
              </p>
            </div>

            <ChangeValue
              change={row.change}
              up={row.up}
            />
          </div>

          <p className="mt-2 text-[28px] font-bold tracking-tight">
            {row.value}
          </p>

          <p className="mt-2 text-[13px] text-[#777777]">
            Mkt Cap: {row.marketCap ?? "—"}
          </p>
        </article>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   Commodities Table
------------------------------------------------------------ */

function CommoditiesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="border-b-2 border-[#111111]">
            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Commodity
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Price
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Change
            </th>
          </tr>
        </thead>

        <tbody>
          {commodities.map((row, index) => (
            <tr
              key={`${row.name}-${index}`}
              className="border-b border-[#E6E6E6] hover:bg-[#FAFAFA]"
            >
              <td className="py-4 text-[16px]">
                {row.name}
              </td>

              <td className="py-4 font-mono text-[15px] font-bold">
                {row.price}
              </td>

              <td className="py-4 text-[15px]">
                <ChangeValue
                  change={row.change}
                  up={row.up}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------
   Forex Table
------------------------------------------------------------ */

function ForexTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[750px] border-collapse">
        <thead>
          <tr className="border-b-2 border-[#111111]">
            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Pair
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Currency
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Rate
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Change
            </th>
          </tr>
        </thead>

        <tbody>
          {forex.map((row, index) => (
            <tr
              key={`${row.pair}-${index}`}
              className="border-b border-[#E6E6E6] hover:bg-[#FAFAFA]"
            >
              <td className="py-4 text-[16px] font-bold text-[#E31B23]">
                {row.pair}
              </td>

              <td className="py-4 text-[15px]">
                {row.name}
              </td>

              <td className="py-4 font-mono text-[15px] font-bold">
                {row.rate}
              </td>

              <td className="py-4">
                <ChangeValue
                  change={row.change}
                  up={row.up}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------
   Mutual Funds Table
------------------------------------------------------------ */

function MutualFundsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="border-b-2 border-[#111111]">
            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Fund
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Name
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              NAV
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Change
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              AUM
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              1Y Return
            </th>
          </tr>
        </thead>

        <tbody>
          {mutualFunds.map((row, index) => (
            <tr
              key={`${row.symbol}-${index}`}
              className="border-b border-[#E6E6E6] hover:bg-[#FAFAFA]"
            >
              <td className="py-4 text-[16px] font-bold text-[#E31B23]">
                {row.symbol}
              </td>

              <td className="py-4 text-[15px]">
                {row.name}
              </td>

              <td className="py-4 font-mono text-[15px] font-bold">
                {row.nav}
              </td>

              <td className="py-4">
                <ChangeValue
                  change={row.change}
                  up={row.up}
                />
              </td>

              <td className="py-4 text-[15px]">
                {row.aum}
              </td>

              <td className="py-4 text-[15px] font-bold text-[#00A86B]">
                {row.return1y}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------
   ETF Table
------------------------------------------------------------ */

function ETFsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="border-b-2 border-[#111111]">
            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Symbol
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              ETF
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Price
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Change
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Expense Ratio
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              1Y Return
            </th>
          </tr>
        </thead>

        <tbody>
          {etfs.map((row, index) => (
            <tr
              key={`${row.symbol}-${index}`}
              className="border-b border-[#E6E6E6] hover:bg-[#FAFAFA]"
            >
              <td className="py-4 text-[16px] font-bold text-[#E31B23]">
                {row.symbol}
              </td>

              <td className="py-4 text-[15px]">
                {row.name}
              </td>

              <td className="py-4 font-mono text-[15px] font-bold">
                {row.price}
              </td>

              <td className="py-4">
                <ChangeValue
                  change={row.change}
                  up={row.up}
                />
              </td>

              <td className="py-4 text-[15px]">
                {row.expenseRatio}
              </td>

              <td className="py-4 text-[15px] font-bold text-[#00A86B]">
                {row.return1y}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------
   Government Bonds Table
------------------------------------------------------------ */

function BondsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="border-b-2 border-[#111111]">
            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Bond
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Yield
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Price
            </th>

            <th className="py-3 text-left text-[13px] font-bold uppercase">
              Change
            </th>
          </tr>
        </thead>

        <tbody>
          {bonds.map((row, index) => (
            <tr
              key={`${row.name}-${index}`}
              className="border-b border-[#E6E6E6] hover:bg-[#FAFAFA]"
            >
              <td className="py-4 text-[16px] font-semibold">
                {row.name}
              </td>

              <td className="py-4 font-mono text-[15px] font-bold text-[#E31B23]">
                {row.yield}
              </td>

              <td className="py-4 font-mono text-[15px]">
                {row.price}
              </td>

              <td className="py-4 text-[15px]">
                <ChangeValue
                  change={row.change}
                  up={row.up}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------
   Global Markets — regional grid
------------------------------------------------------------ */

function GlobalMarketsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {globalMarkets.map((region) => (
        <div
          key={region.region}
          className="border border-[#E5E5E5] p-5"
        >
          <h3 className="mb-3 text-[15px] font-bold uppercase tracking-[0.08em] text-[#111111]">
            {region.region}
          </h3>

          <div>
            {region.markets.map((row, index) => (
              <div
                key={`${row.name}-${index}`}
                className="flex items-center justify-between gap-4 border-t border-[#EEEEEE] py-3 first:border-t-0"
              >
                <span className="text-[14px] text-[#333333]">
                  {row.name}
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[14px] font-bold">
                    {row.value}
                  </span>

                  <ChangeValue
                    change={row.change}
                    up={row.up}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   Overview
------------------------------------------------------------ */

function Overview({
  indices,
  stocks,
  crypto,
}: {
  indices: MarketRow[];
  stocks: MarketRow[];
  crypto: MarketRow[];
}) {
  return (
    <div className="space-y-9">
      <section>
        <SectionHeading>Global Indices</SectionHeading>

        <IndicesTable indices={indices} />
      </section>

      <section>
        <SectionHeading>Top Stocks</SectionHeading>

        <StocksTable stocks={stocks} />
      </section>

      <section>
        <SectionHeading>Cryptocurrency</SectionHeading>

        <CryptoGrid crypto={crypto} />
      </section>
    </div>
  );
}

/* ------------------------------------------------------------
   Main Page
------------------------------------------------------------ */

export function MarketsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabFromUrl && navItems.includes(tabFromUrl)
      ? tabFromUrl
      : "Overview"
  );

  /* Keep the active tab in sync with the URL — this is what makes
     the "Menu" mega-menu links (e.g. /markets?tab=Commodities)
     actually land on the right section, including when the user
     is already on /markets and clicks a different market link. */
  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab && navItems.includes(tab)) {
      setActiveTab(tab);
    } else if (!tab) {
      setActiveTab("Overview");
    }
  }, [searchParams]);

  function handleTabChange(item: string) {
    setActiveTab(item);

    if (item === "Overview") {
      setSearchParams({});
    } else {
      setSearchParams({ tab: item });
    }
  }

  const [marketData, setMarketData] = useState<MarketData>({
    indices: fallbackIndices,
    stocks: fallbackStocks,
    crypto: fallbackCrypto,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const data = await getQuotes();

        if (!mounted) return;

        setMarketData({
          indices: normalizeRows(
            data?.indices,
            fallbackIndices
          ),

          stocks: normalizeRows(
            data?.stocks,
            fallbackStocks
          ),

          crypto: normalizeRows(
            data?.crypto,
            fallbackCrypto
          ),
        });
      } catch (error) {
        console.error(
          "Unable to load market data:",
          error
        );

        if (mounted) {
          setMarketData({
            indices: fallbackIndices,
            stocks: fallbackStocks,
            crypto: fallbackCrypto,
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    const interval = window.setInterval(
      loadData,
      30000
    );

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const displayIndices =
    marketData.indices.length > 0
      ? marketData.indices
      : fallbackIndices;

  const displayStocks =
    marketData.stocks.length > 0
      ? marketData.stocks
      : fallbackStocks;

  const displayCrypto =
    marketData.crypto.length > 0
      ? marketData.crypto
      : fallbackCrypto;

  return (
    <main className="min-h-screen bg-white text-[#111111] antialiased">
      <div className="mx-auto w-full px-5 pb-14 pt-8 sm:px-8 lg:px-10">

        {/* --------------------------------------------------
            Page Header
        -------------------------------------------------- */}

        <header className="mb-8">
          <h1 className="text-[34px] font-bold tracking-[-0.02em] text-[#111111]">
            Markets Dashboard
          </h1>

          <p className="mt-2 text-[15px] text-[#666666]">
            Real-time market data, indices, commodities, forex, crypto and more.
          </p>
        </header>

        {/* --------------------------------------------------
            Market Navigation
        -------------------------------------------------- */}

        <nav
          aria-label="Markets navigation"
          className="border-b border-[#D8D8D8]"
        >
          <div className="flex overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleTabChange(item)}
                className={`relative shrink-0 px-5 py-4 text-[15px] font-medium transition-colors ${
                  activeTab === item
                    ? "text-[#E31B23]"
                    : "text-[#333333] hover:text-[#111111]"
                }`}
              >
                {item}

                {activeTab === item && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#E31B23]" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* --------------------------------------------------
            Dashboard Content
        -------------------------------------------------- */}

        <div className="mt-8">
          {loading ? (
            <div className="border border-[#E5E5E5] py-20 text-center">
              <p className="text-[12px] uppercase tracking-[0.14em] text-[#777777]">
                Loading market data...
              </p>
            </div>
          ) : (
            <>
              {/* OVERVIEW */}
              {activeTab === "Overview" && (
                <Overview
                  indices={displayIndices}
                  stocks={displayStocks}
                  crypto={displayCrypto}
                />
              )}

              {/* STOCKS */}
              {activeTab === "Stocks" && (
                <section>
                  <SectionHeading>
                    Top Stocks
                  </SectionHeading>

                  <StocksTable
                    stocks={displayStocks}
                  />
                </section>
              )}

              {/* INDICES */}
              {activeTab === "Indices" && (
                <section>
                  <SectionHeading>
                    Global Indices
                  </SectionHeading>

                  <IndicesTable
                    indices={displayIndices}
                  />
                </section>
              )}

              {/* CRYPTO */}
              {activeTab === "Crypto" && (
                <section>
                  <SectionHeading>
                    Cryptocurrency
                  </SectionHeading>

                  <CryptoGrid
                    crypto={displayCrypto}
                  />
                </section>
              )}

              {/* FOREX */}
              {activeTab === "Forex" && (
                <section>
                  <SectionHeading>
                    Foreign Exchange
                  </SectionHeading>

                  <ForexTable />
                </section>
              )}

              {/* COMMODITIES */}
              {activeTab === "Commodities" && (
                <section>
                  <SectionHeading>
                    Commodities
                  </SectionHeading>

                  <CommoditiesTable />
                </section>
              )}

              {/* MUTUAL FUNDS */}
              {activeTab === "Mutual Funds" && (
                <section>
                  <SectionHeading>
                    Mutual Funds
                  </SectionHeading>

                  <MutualFundsTable />
                </section>
              )}

              {/* ETFs */}
              {activeTab === "ETFs" && (
                <section>
                  <SectionHeading>
                    Exchange-Traded Funds
                  </SectionHeading>

                  <ETFsTable />
                </section>
              )}

              {/* GOVERNMENT BONDS */}
              {activeTab === "Government Bonds" && (
                <section>
                  <SectionHeading>
                    Government Bonds
                  </SectionHeading>

                  <BondsTable />
                </section>
              )}

              {/* GLOBAL MARKETS */}
              {activeTab === "Global Markets" && (
                <section>
                  <SectionHeading>
                    Global Markets
                  </SectionHeading>

                  <GlobalMarketsGrid />
                </section>
              )}
            </>
          )}
        </div>

        {/* --------------------------------------------------
            Market Report
        -------------------------------------------------- */}

        {activeTab === "Overview" && !loading && (
          <section className="mt-10">
            <SectionHeading>
              Markets Report
            </SectionHeading>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <article className="border border-[#E5E5E5] p-5">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#777777]">
                  S&P 500 — July Close
                </p>

                <p className="mt-2 text-[23px] font-bold text-[#E31B23]">
                  -0.13%
                </p>
              </article>

              <article className="border border-[#E5E5E5] p-5">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#777777]">
                  Russell 2000 — YTD Gain
                </p>

                <p className="mt-2 text-[23px] font-bold text-[#00A86B]">
                  +22%
                </p>
              </article>

              <article className="border border-[#E5E5E5] p-5">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#777777]">
                  Nikkei 225 — July
                </p>

                <p className="mt-2 text-[23px] font-bold text-[#E31B23]">
                  -8.1%
                </p>
              </article>

              <article className="border border-[#E5E5E5] p-5">
                <p className="text-[10px] uppercase tracking-[0.12em] text-[#777777]">
                  US 10Y Treasury Yield
                </p>

                <p className="mt-2 text-[23px] font-bold text-[#E31B23]">
                  4.75%
                </p>
              </article>
            </div>
          </section>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
