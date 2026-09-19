import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Clock, ArrowRight, TrendingUp, TrendingDown, ChevronRight, Search, Bell, User, ExternalLink } from "lucide-react";
import { getQuotes } from "../../../services/marketApi";

/* ─── IMAGES ───────────────────────────────────────────
   Local /imports/*.png placeholders replaced with stock photography
   matched to each story's subject. Swap any of these for real editorial
   assets later — every usage below reads from these constants only. */
const HeroImg =
  "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?q=80&w=1200&auto=format&fit=crop"; // AI / tech infrastructure — Nvidia hero
const InsImg =
  "https://images.unsplash.com/photo-1778406466505-6129d0555557?q=80&w=1200&auto=format&fit=crop"; // equity markets rally
const LN3Img =
  "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?q=80&w=1200&auto=format&fit=crop"; // cybersecurity / digital trust
const LN4Img =
  "https://images.unsplash.com/photo-1747499967281-c0c5eec9933c?q=80&w=1200&auto=format&fit=crop"; // data centers / energy & urban infra
const EdipickImg =
  "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=1200&auto=format&fit=crop"; // CEOs / leadership transformation
const Pt30Img =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop"; // Pride Times 30 leadership feature
const Ln1Img =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"; // AI infrastructure / data center tech

/* ─── DATA ─────────────────────────────────────────── */
{/*
const tickerData = [
  { label: "FTSE 100", value: "8,466.44", change: "+0.74%", up: true },
  { label: "DAX", value: "19,113.18", change: "+0.31%", up: true },
  { label: "NIKKEI", value: "39,918.71", change: "-0.67%", up: false },
  { label: "HANG SENG", value: "18,450.34", change: "+2.21%", up: true },
  { label: "CRUDE OIL", value: "78,5030", change: "-1.12%", up: false },
  { label: "GOLD", value: "2,350.22", change: "+0.96%", up: true },
  { label: "BTC", value: "67,286.27", change: "+0.75%", up: true },
];
*/}

/* Primary site navigation — order encodes section priority: markets/tech
   lead because they're the highest-traffic desks, leadership/magazine trail
   as the "slower" evergreen sections. */
const navItems = [
  { label: "Home", to: "/" },
  { label: "Markets", to: "/markets" },
  { label: "Technology", to: "/technology" },
  { label: "Business", to: "/business-news" },
  { label: "Energy", to: "/energy" },
  { label: "Leadership", to: "/leadership" },
  { label: "Magazine", to: "/magazine" },
];

const heroStory = {
  category: "TOP STORY",
  title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push  ",
  excerpt:"Nvidia has announced an ambitious collaboration with humanoid robot manufacturers across the United States, Europe, and South Korea, expanding its already well-established relationship with China's Unitree.",
  image: HeroImg,
};

const sideStories = [
  {
    id: 1,
    tag: "CYBERSECURITY INSIGHTS",
    title: "PwC 2026 Global Digital Trust Insights: Enterprises Escalate Defense Spending  ",
    excerpt: "PwC's 2026 Global Digital Trust Insights survey, conducted across 3,887 business and technology executives in 72 countries, reveals that cybersecurity has risen to the top tier of board-level concerns across every major industry. The survey found that financial services (21%), industrial manufacturing (21%), and technology, media and telecom (19%) sectors represent the highest concentration of respondents, underscoring the cross-sector urgency of the digital trust imperative.The findings highlight that AI-driven attack methods are prompting accelerated investment in both preventive and detection-oriented security frameworks. Executives report that the attack surface has expanded dramatically with the proliferation of generative AI tools inside enterprises — as every AI integration creates a new potential entry point for adversarial prompt injection, data exfiltration, and credential harvesting. ",
    time: "25 min ago",
    image: "https://images.unsplash.com/photo-1747499967281-c0c5eec9933c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzbWFydCUyMGNpdHklMjB1cmJhbiUyMGZ1dHVyZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzkzODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  link: "/cybersecurity",
  },
  {
    id: 2,
    tag: "FINANCE INSIGHTS",
    title: "U.S. Equity Markets Rally on Strong Manufacturing Data  ",
    excerpt: "U.S. equity markets extended a recovery rally into the first week of June, driven by stronger-than-expected domestic factory data and a continued surge in technology stocks. ",
    time: "1 hr ago",
    image: InsImg,
    link: "/finance",
  },
];
const pt30 = [
  {
    id: 1,
    tag: "PRIDE TIMES 30 — LEADERSHIP PROFILES",
    title: " PRIDE TIMES 30 — LEADERS TO WATCH IN 2026 ",
    excerpt: "The Pride Times 30 recognizes thirty global leaders across business, technology, and innovation who are defining the direction of the global economy this year. This edition highlights ten names at the forefront: ",
    time: "25 min ago",
    image: Pt30Img,
    link: "/billionaires",
  },
];
{/*
const marketSnapshotData: Record<string, { symbol: string; value: string; change: string; up: boolean }[]> = {
  Indices: [
    { symbol: "S&P 500", value: "5,321.41", change: "+0.82%", up: true },
    { symbol: "NASDAQ", value: "16,920.79", change: "+1.10%", up: true },
    { symbol: "DOW JONES", value: "39,069.59", change: "+0.35%", up: true },
    { symbol: "NIKKEI 225", value: "39,918.71", change: "-0.67%", up: false },
    { symbol: "HANG SENG", value: "18,450.34", change: "+2.21%", up: true },
  ],
  Commodities: [
    { symbol: "CRUDE OIL", value: "$78.45", change: "-1.23%", up: false },
    { symbol: "GOLD", value: "$2,345", change: "+0.89%", up: true },
    { symbol: "SILVER", value: "$28.12", change: "+0.54%", up: true },
    { symbol: "NATURAL GAS", value: "$2.87", change: "-2.10%", up: false },
    { symbol: "COPPER", value: "$4.23", change: "+1.32%", up: true },
  ],
  Currencies: [
    { symbol: "USD/INR", value: "83.42", change: "-0.12%", up: false },
    { symbol: "EUR/USD", value: "1.0842", change: "+0.23%", up: true },
    { symbol: "GBP/USD", value: "1.2731", change: "+0.18%", up: true },
    { symbol: "USD/JPY", value: "154.32", change: "-0.45%", up: false },
    { symbol: "AUD/USD", value: "0.6542", change: "+0.31%", up: true },
  ],
  Crypto: [
    { symbol: "BTC", value: "$67,234", change: "+3.45%", up: true },
    { symbol: "ETH", value: "$3,521", change: "+2.18%", up: true },
    { symbol: "BNB", value: "$412.5", change: "-0.87%", up: false },
    { symbol: "SOL", value: "$178.3", change: "+4.12%", up: true },
    { symbol: "XRP", value: "$0.612", change: "-1.45%", up: false },
  ],
};

*/}
const breakingNewsBar = {
  text: "U.S. stocks open June at all-time highs. Nasdaq +8% since April end. S&P 500 consolidating. Oil retreating on Iran peace hopes. ",
  time: "12 min ago",
  markets: [
    { label: "S&P 500", value: "5,321.41", change: "+0.82%", up: true },
    { label: "NASDAQ", value: "16,920.79", change: "+1.10%", up: true },
    { label: "DOW JONES", value: "39,069.59", change: "+0.35%", up: true },
  ],
};

const latestNewsTabs = ["All", "Markets", "Finance", "Business", "Technology", "Energy", "More"];

type NewsItem = { id: number; hot: boolean; title: string; time: string; image: string; link: string };

const latestNewsData: Record<string, NewsItem[]> = {
  All: [
    { id: 5, hot: true, title: "Technology & AI Infrastructure: Alphabet plans $80B stock offering to fund AI data-center expansion as hyperscaler capex tops $700B while grid, water and community pushback intensify.", time: "Just now", image: Ln1Img, link: "/technology" },
    { id: 1, 
      hot: true,  
      title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push ", 
       time: "12 min ago",
     image: Ln1Img, 
     link: "/technology"
    },
    { id: 2, hot: false, title: "U.S. Equity Markets Rally on Strong Manufacturing Data  ", time: "35 min ago", 
      image: HeroImg,
      link: "/markets"
    },
    { id: 3, hot: false, title: "PwC 2026 Global Digital Trust Insights: Enterprises Escalate Defense Spending  ",  time: "1 hr ago", 
      image: LN3Img,
      link: "/economy"
    },
    { id: 4, hot: false, title: "Data Centers and AI Workloads Force Energy Policy Reversals Globally  ", 
      time: "2 hr ago", 
      image: LN4Img,
      link: "/energy"
    },
  ],
  Markets: [
    { id: 1, 
      hot: true, 
       title: "S&P 500 hits all-time high as Fed holds rates steady", 
       time: "10 min ago", 
       image: "https://images.unsplash.com/photo-1778406466505-6129d0555557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/markets"},
    { id: 2, hot: false, title: "Gold surges to $2,400 amid global uncertainty", time: "40 min ago", image: "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/markets" },
    { id: 3, hot: false, title: "Asian markets rally on strong China manufacturing data",  time: "1 hr ago", image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwY292ZXIlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/markets" },
    { id: 4, hot: false, title: "Bitcoin crosses $70,000 as ETF inflows hit record",  time: "2 hr ago", image: "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwaGFja2luZyUyMGRhdGElMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/markets" },
  ],
  Economy: [
    { id: 1,
       hot: true,  
      title: "U.S. Equity Markets Rally on Strong Manufacturing Data ",  
      time: "20 min ago", 
      image: "https://images.unsplash.com/photo-1747499967281-c0c5eec9933c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzbWFydCUyMGNpdHklMjB1cmJhbiUyMGZ1dHVyZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzkzODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=400",link: "/finance" },
    { id: 2, 
      hot: false, title: "Berkshire Hathaway Acquires Home Builder Taylor Morrison for $6.8 Billion ", 
      time: "55 min ago", 
      image: "https://images.unsplash.com/photo-1766315746079-215ff5115e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNpbmUlMjBob3NwaXRhbCUyMGlubm92YXRpb258ZW58MXx8fHwxNzc5Mzg1OTg1fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/finance" },
    { id: 3, hot: false, title: "Fertitta Entertainment to Acquire Caesars Entertainment for $17.6 Billion", 
       time: "2 hr ago", image: "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/finance" },
    { id: 4, hot: false, title: "Scotiabank to Acquire Maple Financial in Wealth Expansion Play ", 
      time: "3 hr ago", image: "https://images.unsplash.com/photo-1778406466505-6129d0555557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/finance" },
  ],
  Business: [
    { id: 1, hot: true,  title: "Apple unveils Vision Pro 2 with 40% thinner design",  time: "15 min ago", image: "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGRpZ2l0YWwlMjBmdXR1cmV8ZW58MXx8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/business-news" },
    { id: 2, hot: false, title: "Amazon acquires Indian logistics firm for $1.2 billion",  time: "1 hr ago", image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwY292ZXIlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/business-news" },
    { id: 3, hot: false, title: "Goldman Sachs raises S&P 500 year-end target to 6,500",  time: "2 hr ago", image: "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/business-news" },
    { id: 4, hot: false, title: "Reliance Industries enters global streaming market",  time: "3 hr ago", image: "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwaGFja2luZyUyMGRhdGElMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/business-news" },
  ],
  Technology: [
    { id: 5, hot: true, title: "Alphabet plans $80B AI infrastructure stock offering as hyperscaler capex tops $700B and data-center delays mount", time: "Just now", image: Ln1Img, link: "/technology" },
    { id: 1, hot: true,  title: "Nvidia Leads AI Infrastructure Revolution with Humanoid Robot Push ",  time: "5 min ago", image: "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZpZW50JTIwdGVjaG5vbG9neSUyMGluZm92YXRpb24lMjBkaWdpdGFsJTIwZnV0dXJlfGVufDF8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/technology" },
    { id: 2, hot: false, title: "Intel Attempts Inference-Chip Comeback as AI Compute Wars Intensify",  time: "30 min ago", image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwY292ZXIlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/technology" },
    { id: 3, hot: false, title: "SoftBank Bets Big on European Data Centers ", time: "1 hr ago", image: "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwaGFja2luZyUyMGRhdGElMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/technology" },
    { id: 4, hot: false, title: "Quantum computing startup achieves 1,000-qubit milestone",  time: "2 hr ago", image: "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/technology" },
  ],
  Energy: [
    { id: 1, hot: true,  title: "Data Centers and AI Workloads Force Energy Policy Reversals Globally  ", time: "25 min ago", image: "https://images.unsplash.com/photo-1747499967281-c0c5eec9933c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzbWFydCUyMGNpdHklMjB1cmJhbiUyMGZ1dHVyZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzkzODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=400",link: "/energy" },
    { id: 2, hot: false, title: "China's Dominant Position in Clean Tech Supply Chains Creates New Risk Calculus ",  time: "1 hr ago", image: "https://images.unsplash.com/photo-1778406466505-6129d0555557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/energy" },
    { id: 3, hot: false, title: "JP Morgan: Energy Resiliency Now a National Security Imperative ",  time: "2 hr ago", image: "https://images.unsplash.com/photo-1766315746079-215ff5115e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNpbmUlMjBob3NwaXRhbCUyMGlubm92YXRpb258ZW58MXx8fHwxNzc5Mzg1OTg1fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/energy" },
    { id: 4, hot: false, title: "Shell posts record profits as LNG demand surges in Asia",  time: "3 hr ago", image: "https://images.unsplash.com/photo-1761233138997-44d9b002a08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzdG9jayUyMG1hcmtldCUyMGZpbmFuY2UlMjB3YWxsJTIwc3RyZWV0fGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/energy" },
  ],
  More: [
    { id: 1, hot: false, title: "FDA approves breakthrough gene therapy for rare childhood disease", time: "1 hr ago", image: "https://images.unsplash.com/photo-1766315746079-215ff5115e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNpbmUlMjBob3NwaXRhbCUyMGlubm92YXRpb258ZW58MXx8fHwxNzc5Mzg1OTg1fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/more" },
    { id: 2, hot: false, title: "Singapore's Smart Nation 2.0 plan sets global benchmark",  time: "2 hr ago", image: "https://images.unsplash.com/photo-1747499967281-c0c5eec9933c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzbWFydCUyMGNpdHklMjB1cmJhbiUyMGZ1dHVyZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzkzODU5ODR8MA&ixlib=rb-4.1.0&q=80&w=400",link: "/more" },
    { id: 3, hot: false, title: "Panama Canal expansion cuts Asia-US shipping time by 18 days",  time: "3 hr ago", image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwY292ZXIlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=400",link: "/more" },
    { id: 4, hot: false, title: "EU passes landmark AI Governance Act with sweeping regulations",  time: "4 hr ago", image: "https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwaGFja2luZyUyMGRhdGElMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc3OTM4NTk4NHww&ixlib=rb-4.1.0&q=80&w=400",link: "/more" },
  ],
};

const editorsPicks = [
  {
    id: 1,
    title: "The Intelligence Age: How CEOs Are Navigating Transformation.",
    subtitle: "Their collective perspectives reveal a leadership class grappling with the most consequential technology transition in corporate history.",
    time: "3 hr ago",
    image: EdipickImg,
  },
];

const magazinePreview = {
  title: "The AI Revolution",
  subtitle: "Reshaping business, economies, and the future of work.",
  image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwY292ZXIlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc5Mzg1OTc3fDA&ixlib=rb-4.1.0&q=80&w=400",
};

const prideTimes30 = [
  {
    rank: 1,
    name: "Jensen Huang ",
    company: "Nvidia ",
    sector: "Defining the AI infrastructure era at COMPUTEX 2026. ",
  },
  {
    rank: 2,
    name: "Satya Nadella ",
    company: "Microsoft ",
    sector: "Leading ethical AI adoption and enterprise digital transformation. ",
  },
  {
    rank: 3,
    name: "Sundar Pichai ",
    company: "Alphabet / Google ",
    sector: "Driving AI integration across search, cloud, and automotive tech. ",
  },
  {
    rank: 4,
    name: "Elon Musk ",
    company: "Tesla / SpaceX / X ",
    sector: "Disrupting energy, space, and AI; SpaceX IPO on the horizon. ",
  },
  {
    rank: 5,
    name: "Sam Altman ",
    company: "OpenAI",
    sector: "Shaping the frontier of large language models and AGI research. ",
  },
  {
    rank: 6,
    name: "Andy Jassy ",
    company: "Amazon ",
    sector: "Scaling AWS as AI's preferred cloud infrastructure partner.",
  },
  {
    rank: 7,
    name: "Lisa Su ",
    company: "AMD",
    sector: "Challenging Nvidia's AI chip dominance with competitive GPU roadmap. ",
  },
  {
    rank: 8,
    name: "CC Wei ",
    company: "TSMC",
    sector: "Controlling the world's most advanced semiconductor manufacturing. ",
  },
  {
    rank: 9,
    name: "Alex Karp ",
    company: "Palantir ",
    sector: "Surging 6 places in IMD rankings on AI and defense demand. ",
  },
  {
    rank: 10,
    name: "Mary Barra ",
    company: "General Motors ",
    sector: "Navigating EV transition amid battery supply chain pressures. ",
  },
];

/* ─── HELPERS ───────────────────────────────────────── */

/* Route slug -> the desk name a reader recognizes. Previously the eyebrow
   printed the raw slug, so cards showed "business-news" and "ceospotlight".
   Content is unchanged; only the label the reader sees is corrected. */
const DESK_LABELS: Record<string, string> = {
  "/": "Home",
  "/markets": "Markets",
  "/finance": "Finance",
  "/economy": "Economy",
  "/business-news": "Business",
  "/technology": "Technology",
  "/energy": "Energy",
  "/leadership": "Leadership",
  "/magazine": "Magazine",
  "/cybersecurity": "Cybersecurity",
  "/billionaires": "Pride Times 30",
  "/ceospotlight": "CEO Spotlight",
  "/more": "World",
};

function deskLabel(link: string): string {
  return DESK_LABELS[link] ?? link.replace(/^\//, "").replace(/-/g, " ");
}

function ChangeChip({ change, up }: { change: string; up: boolean }) {
  return (
    <span className={`pt-figure text-[11px] font-semibold flex items-center gap-0.5 ${up ? "pt-up" : "pt-down"}`}>
      {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {change}
    </span>
  );
}

/* Relative-time formatter for the "Updated Xs ago" live indicator. Two
   floating timestamps (lastUpdated / now) are diffed on every clock tick
   rather than storing a string, so the label stays accurate between fetches. */
function formatElapsed(from: Date, to: Date): string {
  const secs = Math.max(0, Math.floor((to.getTime() - from.getTime()) / 1000));
  if (secs < 5) return "just now";
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

/* Section header: a heavy ink rule with a short accent thread beneath it.
   One device, reused everywhere, so every section starts the same way. */
function SectionHead({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="pt-sectionhead">
      <h2 className="pt-sectiontitle">{title}</h2>
      {action}
    </div>
  );
}

/* Scroll reveal. One IntersectionObserver for the whole page, adding a class
   once per element — no per-element listeners, no layout thrash, and it
   no-ops entirely when the reader prefers reduced motion. */
function useRevealOnScroll() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(node.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("pt-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("pt-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return root;
}

/* ─── MAIN COMPONENT ────────────────────────────────── */

export function HomePage() {
  const [activeMarketTab, setActiveMarketTab] = useState("Indices");
    const [activeNewsTab, setActiveNewsTab] = useState("All");
    const [tickerData, setTickerData] = useState<any[]>([]);
    const location = useLocation();

const [marketSnapshotData, setMarketSnapshotData] = useState<any>({
  Indices: [],
  Commodities: [],
  Currencies: [],
  Crypto: [],
});

/* Live-data freshness: lastUpdated is stamped whenever a fetch succeeds,
   now ticks every second purely to force the "Updated Xs ago" label to
   re-render — neither drives a re-fetch on its own. */
const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
const [now, setNow] = useState<Date>(new Date());

const pageRef = useRevealOnScroll();

useEffect(() => {
  loadMarketData();

  // Auto-refresh quotes in the background so the strip and snapshot
  // panel stay current without the reader having to reload the page.
  const refreshTimer = setInterval(() => {
    loadMarketData();
  }, 45000);

  // Separate 1s clock just for the relative "Updated Xs ago" text.
  const clockTimer = setInterval(() => {
    setNow(new Date());
  }, 1000);

  return () => {
    clearInterval(refreshTimer);
    clearInterval(clockTimer);
  };
}, []);

const loadMarketData = async () => {
  try {
    const data = await getQuotes();

    const ticker = [
      {
        label: data.indices[0]?.name,
        value: data.indices[0]?.value,
        change: data.indices[0]?.change,
        up: data.indices[0]?.up,
      },
      {
        label: data.indices[1]?.name,
        value: data.indices[1]?.value,
        change: data.indices[1]?.change,
        up: data.indices[1]?.up,
      },
      {
        label: data.indices[2]?.name,
        value: data.indices[2]?.value,
        change: data.indices[2]?.change,
        up: data.indices[2]?.up,
      },
      {
        label: "BTC",
        value: data.crypto[0]?.value,
        change: data.crypto[0]?.change,
        up: data.crypto[0]?.up,
      },
      {
        label: "ETH",
        value: data.crypto[1]?.value,
        change: data.crypto[1]?.change,
        up: data.crypto[1]?.up,
      },
    ].filter((t) => t.label && t.value);

    setTickerData(ticker);

    setMarketSnapshotData({
      Indices: data.indices.map((item) => ({
        symbol: item.name,
        value: item.value,
        change: item.change,
        up: item.up,
      })),

      Crypto: data.crypto.map((item) => ({
        symbol: item.name,
        value: item.value,
        change: item.change,
        up: item.up,
      })),

      Commodities: [],
      Currencies: [],
    });

    setLastUpdated(new Date());
  } catch (error) {
    console.error("Market API Error:", error);
  }
};

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const snapshotRows = marketSnapshotData[activeMarketTab] || [];

  return (
    <div ref={pageRef} className="pt-page min-h-screen pt-serif antialiased">

      {/* ── MASTHEAD ── */}
      <header className="pt-shell pt-6 pb-0 pt-sans">
        <div className="flex items-center justify-between text-[11px] pt-muted uppercase tracking-[0.14em] mb-6">
          <span className="pt-figure">{todayLabel}</span>
          <div className="flex items-center gap-5">
            <button type="button" className="pt-utility flex items-center gap-1.5">
              <Search size={12} /> Search
            </button>
            <button type="button" className="pt-utility" aria-label="Notifications">
              <Bell size={13} />
            </button>
            <button type="button" className="pt-utility hidden sm:flex items-center gap-1.5">
              <User size={12} /> Sign in
            </button>
          </div>
        </div>

        <Link to="/" className="block text-center pt-load" style={{ animationDelay: "40ms" }}>
          <h1 className="pt-masthead">
            Pride<span className="pt-masthead-accent">Times</span>
          </h1>
          <p className="mt-3 text-[10px] uppercase tracking-[0.42em] pt-muted">
            Markets · Technology · Business · Global Leadership
          </p>
        </Link>

        {/* Triple rule: heavy / hairline / heavy — the masthead's signature. */}
        <div className="pt-masthead-rule" />
      </header>

      {/* ── STICKY HEADER DOCK: section nav + one live market bar ──
           Previously three stacked bars (nav / breaking + market pills /
           ticker tape), which read as a double navigation and showed the same
           quotes twice. Now two: sections, then a single dark bar that carries
           the breaking line on the left and the live tape on the right. */}
      <div className="sticky top-0 z-20 pt-dock">

        {/* 1. SECTION NAV */}
        <nav className="pt-navbar pt-sans" aria-label="Sections">
          <div className="pt-shell">
            <div className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={isActive ? "page" : undefined}
                    className={`pt-nav-link ${isActive ? "pt-nav-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* 2. BREAKING LINE + LIVE TAPE (single bar) */}
        <div className="pt-breaking">
          <div className="pt-shell flex flex-col lg:flex-row lg:items-stretch pt-sans">

            {/* Breaking News */}
            <div className="flex items-center gap-3 min-w-0 lg:flex-1 py-2.5">
              <span className="pt-badge-breaking">Breaking</span>

              <p className="text-xs pt-breaking-text truncate flex-1">
                {breakingNewsBar.text}
              </p>

              <span className="pt-figure text-[10px] pt-breaking-meta whitespace-nowrap uppercase tracking-wide">
                {breakingNewsBar.time}
              </span>
            </div>

            {/* Live tape — the page's only quote strip, reusing tickerData
                from getQuotes(). Pauses on hover so figures stay readable. */}
            <div className="flex items-center gap-4 min-w-0 pt-breaking-divider py-2 lg:py-0 lg:pl-6 lg:max-w-[52%]">

              {/* Live auto-refresh indicator */}
              <div className="flex items-center gap-1.5 flex-shrink-0" title="Market data refreshes automatically">
                <span className="pt-live-dot" />
                <span className="pt-figure text-[10px] pt-breaking-meta uppercase tracking-wide whitespace-nowrap">
                  Updated {formatElapsed(lastUpdated, now)}
                </span>
              </div>

              {tickerData.length > 0 && (
                <div className="pt-tape flex-1 min-w-0">
                  <div className="pt-ticker-track flex items-center w-max">
                    {[...tickerData, ...tickerData, ...tickerData].map((t, i) => (
                      <span key={`${t.label}-${i}`} className="pt-tape-item">
                        <span className="pt-tape-label">{t.label}</span>
                        <span className="pt-figure pt-tape-value">{t.value}</span>
                        <span className={`pt-figure font-medium flex items-center gap-0.5 ${t.up ? "pt-up-dark" : "pt-down-dark"}`}>
                          {t.up ? "▲" : "▼"} {t.change}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link to="/markets" className="pt-ghost-btn">
                Markets
                <ArrowRight size={10} />
              </Link>
            </div>

          </div>
        </div>

      </div>

      {/* ── 2. MAIN CONTENT ── */}
      <main className="pt-shell pt-8 pb-14">

        {/* 2a. HERO: lead story with an overlapping headline slab + feature card */}
        <section className="grid grid-cols-12 gap-6 lg:gap-8 pt-section">

          {/* MAIN HERO */}
          <div className="col-span-12 lg:col-span-7 pt-load" style={{ animationDelay: "120ms" }}>
            <Link to="/technology" className="group block pt-hero">
              <div className="pt-hero-frame">
                <ImageWithFallback
                  src={heroStory.image}
                  alt={heroStory.title}
                  className="pt-img"
                />
              </div>

              {/* The slab lifts off the image on desktop — the page's one
                  deliberate break from the grid, reserved for the lead story. */}
              <div className="pt-hero-slab">
                <span className="pt-eyebrow">{heroStory.category}</span>
                <h2 className="pt-headline-hero pt-underline-target">{heroStory.title}</h2>
                <p className="pt-sans pt-dek">{heroStory.excerpt}</p>
                <span className="pt-readmore">
                  Read the full story <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </div>

          {/* DARK OVERLAY FEATURE (uses sideStories[0]) */}
          <div className="col-span-12 lg:col-span-5 pt-load" style={{ animationDelay: "200ms" }}>
            {sideStories[0] && (
              <Link to={sideStories[0].link} className="group pt-feature">
                <ImageWithFallback
                  src={sideStories[0].image}
                  alt={sideStories[0].title}
                  className="pt-img pt-img-duo"
                />
                <div className="pt-scrim" />
                <div className="pt-feature-body pt-sans">
                  <span className="pt-eyebrow pt-eyebrow-ondark">{sideStories[0].tag}</span>
                  <h3 className="pt-serif pt-feature-title pt-underline-target">
                    {sideStories[0].title}
                  </h3>
                  <span className="pt-figure pt-timestamp pt-timestamp-onDark">
                    <Clock size={9} /> {sideStories[0].time}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* 2b. TOP STORIES (tabbed, real data) + MARKET SNAPSHOT sidebar */}
        <section className="grid grid-cols-12 gap-8 lg:gap-10 pt-section">

          {/* TOP STORIES GRID */}
          <div className="col-span-12 lg:col-span-8">
            <SectionHead title="Top Stories" />

            {/* Desk tabs — real buttons, so they're reachable by keyboard
                and announced as a tablist. State/behavior unchanged. */}
            <div className="pt-tabs pt-sans" role="tablist" aria-label="Story desks">
              {latestNewsTabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={activeNewsTab === t}
                  onClick={() => setActiveNewsTab(t)}
                  className={`pt-tab ${activeNewsTab === t ? "pt-tab-active" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Responsive story-card grid, sourced from latestNewsData[activeNewsTab].
                The first card runs wide — a lead within the section, so the grid
                reads as edited rather than auto-generated. */}
            <div className="pt-cardgrid">
              {(latestNewsData[activeNewsTab] ?? latestNewsData["All"]).map((item, i) => (
                <Link
                  key={item.id}
                  to={item.link}
                  data-reveal
                  className={`group pt-card ${i === 0 ? "pt-card-lead" : ""}`}
                  style={{ transitionDelay: `${Math.min(i, 5) * 60}ms` }}
                >
                  <div className="pt-card-frame">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="pt-img"
                    />
                  </div>
                  <div className="pt-card-body">
                    <span className="pt-eyebrow pt-eyebrow-sm">
                      {item.hot && <span className="pt-hot-dot" aria-hidden="true" />}
                      {deskLabel(item.link)}{item.hot ? " · Hot" : ""}
                    </span>
                    <h3 className="pt-card-title pt-underline-target">
                      {item.title}
                    </h3>
                    <span className="pt-figure pt-timestamp">
                      <Clock size={9} /> {item.time}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* MARKET SNAPSHOT (existing interactive state, unchanged) */}
          <aside className="col-span-12 lg:col-span-4 pt-sans">
            <div className="pt-panel">
              <SectionHead title="Market Snapshot" />

              <div className="pt-tabs pt-tabs-tight" role="tablist" aria-label="Market classes">
                {["Indices", "Crypto"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={activeMarketTab === t}
                    onClick={() => setActiveMarketTab(t)}
                    className={`pt-tab ${activeMarketTab === t ? "pt-tab-active" : ""}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="pt-quotes">
                {snapshotRows.map((m) => (
                  <div key={m.symbol} className="pt-quote-row">
                    <span className="pt-quote-symbol">{m.symbol}</span>
                    <span className="pt-figure pt-quote-value">{m.value}</span>
                    <div className="flex items-center gap-3 justify-self-end">
                      <svg width="40" height="18" viewBox="0 0 40 18" aria-hidden="true" className="pt-spark">
                        <polyline
                          points={m.up ? "0,14 8,10 16,12 24,6 32,8 40,3" : "0,4 8,8 16,6 24,12 32,10 40,15"}
                          fill="none"
                          stroke={m.up ? "#0F7B5F" : "#B0203C"}
                          strokeWidth="1.5"
                        />
                      </svg>
                      <ChangeChip change={m.change} up={m.up} />
                    </div>
                  </div>
                ))}

                {/* Quotes arrive asynchronously; say so rather than showing
                    an unexplained empty panel. */}
                {snapshotRows.length === 0 && (
                  <p className="pt-empty">Quotes load as soon as the market feed responds.</p>
                )}
              </div>

              <Link to="/markets" className="pt-textlink mt-4">
                View all markets <ArrowRight size={10} />
              </Link>
            </div>
          </aside>
        </section>

        {/* 2c. EDITOR'S PICKS: big feature + 2 real side cards */}
        <section className="pt-section">
          <SectionHead
            title="Editor's Picks"
            action={
              <Link to="/ceospotlight" className="pt-textlink">
                View all <ChevronRight size={10} />
              </Link>
            }
          />

          <div className="grid grid-cols-12 gap-8 lg:gap-10">
            <div className="col-span-12 lg:col-span-7" data-reveal>
              {editorsPicks.map((p) => (
                <Link key={p.id} to="/leadership" className="group block">
                  <div className="pt-pick-frame">
                    <ImageWithFallback
                      src={p.image}
                      alt={p.title}
                      className="pt-img"
                    />
                  </div>
                  <span className="pt-eyebrow">Editor's Pick</span>
                  <h3 className="pt-pick-title pt-underline-target">{p.title}</h3>
                  <p className="pt-sans pt-dek">{p.subtitle}</p>
                  <span className="pt-figure pt-timestamp">
                    <Clock size={9} /> {p.time}
                  </span>
                </Link>
              ))}
            </div>

            <div className="col-span-12 lg:col-span-5 pt-sans pt-stack" data-reveal>
              {/* Magazine pick */}
              <Link to="/magazine" className="group pt-brief">
                <div className="pt-brief-frame">
                  <ImageWithFallback
                    src={magazinePreview.image}
                    alt={magazinePreview.title}
                    className="pt-img"
                  />
                </div>
                <div className="min-w-0">
                  <span className="pt-eyebrow pt-eyebrow-sm">Magazine</span>
                  <h3 className="pt-serif pt-brief-title pt-underline-target">{magazinePreview.title}</h3>
                  <p className="pt-brief-dek">{magazinePreview.subtitle}</p>
                </div>
              </Link>

              {/* Finance pick (sideStories[1]) */}
              {sideStories[1] && (
                <Link to={sideStories[1].link} className="group pt-brief">
                  <div className="pt-brief-frame">
                    <ImageWithFallback
                      src={sideStories[1].image}
                      alt={sideStories[1].title}
                      className="pt-img"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="pt-eyebrow pt-eyebrow-sm">{sideStories[1].tag}</span>
                    <h3 className="pt-serif pt-brief-title pt-underline-target">{sideStories[1].title}</h3>
                    <p className="pt-brief-dek">{sideStories[1].excerpt}</p>
                  </div>
                </Link>
              )}

              {/* Business pick (real, unused item from latestNewsData) */}
              {latestNewsData.Business?.[2] && (
                <Link to={latestNewsData.Business[2].link} className="group pt-brief">
                  <div className="pt-brief-frame">
                    <ImageWithFallback
                      src={latestNewsData.Business[2].image}
                      alt={latestNewsData.Business[2].title}
                      className="pt-img"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="pt-eyebrow pt-eyebrow-sm">Business</span>
                    <h3 className="pt-serif pt-brief-title pt-underline-target">{latestNewsData.Business[2].title}</h3>
                    <span className="pt-figure pt-timestamp">
                      <Clock size={8} /> {latestNewsData.Business[2].time}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* 2d. TRENDING NOW — real Pride Times 30 leadership data.
             Ranks are genuine ordinal data here, so they're set large in the
             display face and used as the row's structural anchor. */}
        <section className="pt-section">
          <SectionHead
            title="Trending Now"
            action={
              <Link to="/billionaires" className="pt-textlink">
                Pride Times 30 <ChevronRight size={10} />
              </Link>
            }
          />
          <ol className="pt-ranklist pt-sans">
            {prideTimes30.slice(0, 5).map((p) => (
              <li key={p.rank} data-reveal>
                <Link to="/billionaires" className="group pt-rankrow">
                  <span className="pt-serif pt-rank">{String(p.rank).padStart(2, "0")}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="pt-rank-name pt-underline-target">
                      {p.name}
                      <span className="pt-rank-company"> — {p.company}</span>
                    </h3>
                    <p className="pt-rank-sector">{p.sector}</p>
                  </div>
                  <ArrowRight size={14} className="pt-rank-arrow" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* 2e. VISUAL STORIES — dark editorial grid, real unused articles */}
        <section className="pt-visual-dark">
          <div className="pt-visual-inner">
            <div className="pt-sectionhead pt-sectionhead-dark">
              <h2 className="pt-sectiontitle">Visual Stories</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                latestNewsData.Technology?.[2],
                latestNewsData.Energy?.[0],
                latestNewsData.Business?.[0],
              ].filter(Boolean).map((item, i) => item && (
                <Link
                  key={item.id}
                  to={item.link}
                  data-reveal
                  className="group pt-visual-card"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="pt-img pt-img-duo"
                  />
                  <div className="pt-scrim" />
                  <div className="pt-visual-body pt-sans">
                    <span className="pt-eyebrow pt-eyebrow-onDark pt-eyebrow-sm">
                      {deskLabel(item.link)}
                    </span>
                    <h3 className="pt-serif pt-visual-title pt-underline-target">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 2f. FEATURE BANNER — full-bleed treatment of the Pride Times 30 story */}
        {pt30.map((s) => (
          <Link to={s.link} key={s.id} className="group pt-banner" data-reveal>
            <ImageWithFallback
              src={s.image}
              alt={s.title}
              className="pt-img pt-img-duo"
            />
            <div className="pt-scrim pt-scrim-strong" />
            <div className="pt-banner-body pt-sans">
              <span className="pt-eyebrow pt-eyebrow-onDark">{s.tag}</span>
              <h3 className="pt-serif pt-banner-title pt-underline-target">{s.title}</h3>
              <p className="pt-banner-dek">{s.excerpt}</p>
              <span className="pt-readmore pt-readmore-onDark">
                Read more <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}

      </main>

      <style>{`
        /* ══════════════════════════════════════════════════════════════
           PRIDE TIMES — editorial design system
           Every rule here is namespaced .pt-*. Nothing overrides Tailwind
           utility classes, so this stylesheet cannot leak into other pages.
           ══════════════════════════════════════════════════════════════ */

        /* ── Type ──
           Bodoni Moda: a Didone, the historical face of newspaper mastheads —
             high stroke contrast that reads as engraved at large sizes.
           Archivo: a grotesque with a newsroom-signage feel, for UI and labels.
           IBM Plex Mono: every FIGURE on the page. Prices, timestamps, ranks
             and the tape all set in mono so data is visually a different class
             of information from prose. This is the page's signature. */
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,600;6..96,700;6..96,800;6..96,900&family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .pt-page {
          /* Palette: cool ash newsprint rather than warm cream, ink that
             carries a blue cast, and the masthead crimson kept as the single
             accent because it is the existing brand mark. */
          --pt-paper:      #EFEEE9;
          --pt-surface:    #FBFAF7;
          --pt-ink:        #14171C;
          --pt-ink-soft:   #33383F;
          --pt-muted:      #4F555E;
          --pt-rule:       #D3D2CB;
          --pt-rule-soft:  #E3E2DC;
          --pt-accent:     #A6192E;
          --pt-up:         #0F7B5F;
          --pt-down:       #B0203C;
          --pt-up-dark:    #38C79B;
          --pt-down-dark:  #F2708D;

          --pt-shell:      1600px;
          --pt-gap:        clamp(2.25rem, 1.4rem + 3vw, 4.5rem);

          background-color: var(--pt-paper);
          color: var(--pt-ink);
          overflow-x: hidden;
        }

        .pt-serif  { font-family: 'Bodoni Moda', Georgia, 'Times New Roman', serif; }
        .pt-sans   { font-family: 'Archivo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .pt-figure { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
                     font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }

        .pt-shell {
          width: 100%;
          max-width: var(--pt-shell);
          margin-inline: auto;
          padding-inline: clamp(1rem, 0.5rem + 2vw, 2.5rem);
        }

        .pt-muted { color: var(--pt-muted); }

        /* ── Masthead ── */
        .pt-masthead {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-weight: 900;
          font-size: clamp(2.9rem, 1.9rem + 4.4vw, 7rem);
          line-height: 0.9;
          letter-spacing: -0.025em;
          color: var(--pt-ink);
        }
        .pt-masthead-accent { color: var(--pt-accent); }

        .pt-masthead-rule {
          margin-top: 1.5rem;
          border-top: 3px solid var(--pt-ink);
          border-bottom: 1px solid var(--pt-ink);
          height: 4px;
        }

        .pt-utility {
          color: var(--pt-muted);
          transition: color 0.2s ease;
        }
        .pt-utility:hover { color: var(--pt-accent); }

        /* ── Sticky dock ── */
        .pt-dock { backdrop-filter: saturate(140%) blur(6px); }

        .pt-navbar {
          background-color: color-mix(in srgb, var(--pt-surface) 92%, transparent);
          border-bottom: 1px solid var(--pt-rule);
        }

        .pt-nav-link {
          position: relative;
          padding: 0.85rem clamp(0.65rem, 0.4rem + 0.6vw, 1.1rem);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          white-space: nowrap;
          color: var(--pt-muted);
          transition: color 0.2s ease;
        }
        .pt-nav-link:hover { color: var(--pt-ink); }
        .pt-nav-link.pt-nav-active { color: var(--pt-ink); }
        .pt-nav-link::after {
          content: "";
          position: absolute;
          left: 12px; right: 12px; bottom: 5px;
          height: 2px;
          background: var(--pt-accent);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pt-nav-link:hover::after,
        .pt-nav-link.pt-nav-active::after { transform: scaleX(1); }
        .pt-nav-link:focus-visible { outline: 2px solid var(--pt-accent); outline-offset: -3px; }

        /* ── Breaking bar ── */
        .pt-breaking { background-color: var(--pt-ink); }
        .pt-breaking-text  { color: #D8DBE0; letter-spacing: 0.01em; }
        .pt-breaking-meta  { color: #8B929C; }
        .pt-breaking-value { color: #FFFFFF; }
        .pt-breaking-divider { border-top: 1px solid #2A2F37; }
        @media (min-width: 1024px) {
          .pt-breaking-divider { border-top: 0; border-left: 1px solid #2A2F37; }
        }

        .pt-badge-breaking {
          background-color: var(--pt-accent);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          flex-shrink: 0;
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }

        .pt-up   { color: var(--pt-up); }
        .pt-down { color: var(--pt-down); }
        .pt-up-dark   { color: var(--pt-up-dark); }
        .pt-down-dark { color: var(--pt-down-dark); }

        .pt-ghost-btn {
          display: inline-flex; align-items: center; gap: 0.25rem;
          border: 1px solid #fff; color: #fff;
          font-size: 10px; padding: 0.4rem 0.75rem;
          text-transform: uppercase; letter-spacing: 0.1em;
          white-space: nowrap; flex-shrink: 0;
          transition: background-color 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
        }
        .pt-ghost-btn:hover {
          background: var(--pt-accent); border-color: var(--pt-accent);
          transform: translateY(-1px);
        }
        .pt-ghost-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

        /* ── Ticker tape ──
           Rendered three times and translated exactly -33.333% so the loop is
           seamless even when the feed returns only a handful of symbols. */
        .pt-tape { overflow: hidden; }
        .pt-tape-item {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 11px; white-space: nowrap;
          padding-inline: 1.1rem;
          border-right: 1px solid #2A2F37;
        }
        .pt-tape-label { color: #B5BBC4; text-transform: uppercase; letter-spacing: 0.1em; }
        .pt-tape-value { font-weight: 600; color: #FFFFFF; }

        .pt-ticker-track { animation: pt-ticker-scroll 42s linear infinite; }
        .pt-ticker-track:hover { animation-play-state: paused; }
        @keyframes pt-ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        /* ── Section rhythm ── */
        .pt-section {
          padding-bottom: var(--pt-gap);
          margin-bottom: var(--pt-gap);
          border-bottom: 1px solid var(--pt-rule);
        }

        .pt-sectionhead {
          position: relative;
          display: flex; align-items: baseline; justify-content: space-between; gap: 1rem;
          border-bottom: 2px solid var(--pt-ink);
          padding-bottom: 0.6rem;
          margin-bottom: 1.4rem;
        }
        .pt-sectionhead::after {
          content: ""; position: absolute; left: 0; bottom: -4px;
          width: 52px; height: 2px; background: var(--pt-accent);
        }
        .pt-sectionhead-dark { border-bottom-color: #3A3F47; }
        .pt-sectionhead-dark .pt-sectiontitle { color: #fff; }

        .pt-sectiontitle {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-size: clamp(1.15rem, 1rem + 0.6vw, 1.6rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.01em;
        }

        /* ── Shared media treatment ── */
        .pt-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s ease;
        }
        .group:hover .pt-img { transform: scale(1.035); }
        .pt-img-duo { filter: grayscale(35%) contrast(1.04); }
        .group:hover .pt-img-duo { filter: grayscale(0%) contrast(1); }

        .pt-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(9,11,14,0.94) 0%, rgba(9,11,14,0.45) 42%, rgba(9,11,14,0.05) 100%);
        }
        .pt-scrim-strong {
          background: linear-gradient(to top, rgba(9,11,14,0.96) 0%, rgba(9,11,14,0.6) 48%, rgba(9,11,14,0.15) 100%);
        }

        /* ── Eyebrows, timestamps, links ── */
        .pt-eyebrow {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'Archivo', sans-serif;
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.18em;
          color: var(--pt-accent);
          margin-bottom: 0.6rem;
        }
        .pt-eyebrow-sm { font-size: 10px; letter-spacing: 0.15em; margin-bottom: 0.4rem; }
        .pt-eyebrow-onDark, .pt-eyebrow-ondark { color: rgba(255,255,255,0.82); }

        .pt-hot-dot {
          width: 5px; height: 5px; border-radius: 9999px;
          background: var(--pt-accent); display: inline-block;
          animation: pt-pulse 2s ease-in-out infinite;
        }

        .pt-timestamp {
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-size: 11px; font-weight: 500; color: var(--pt-muted);
          letter-spacing: 0.02em;
        }
        .pt-timestamp-onDark { color: rgba(255,255,255,0.62); }

        .pt-textlink {
          display: inline-flex; align-items: center; gap: 0.25rem;
          font-family: 'Archivo', sans-serif;
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--pt-ink);
          border-bottom: 1px solid var(--pt-ink);
          padding-bottom: 2px;
          transition: color 0.2s ease, border-color 0.2s ease, gap 0.2s ease;
        }
        .pt-textlink:hover { color: var(--pt-accent); border-color: var(--pt-accent); gap: 0.5rem; }
        .pt-textlink:focus-visible { outline: 2px solid var(--pt-accent); outline-offset: 3px; }

        .pt-readmore {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: 'Archivo', sans-serif;
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--pt-ink);
          border-bottom: 1px solid var(--pt-ink);
          padding-bottom: 2px;
          transition: color 0.22s ease, border-color 0.22s ease, gap 0.22s ease;
        }
        .group:hover .pt-readmore { color: var(--pt-accent); border-color: var(--pt-accent); gap: 0.6rem; }
        .pt-readmore-onDark { color: #fff; border-color: #fff; }
        .group:hover .pt-readmore-onDark { color: #fff; border-color: var(--pt-accent); }

        /* Headline underline on hover — drawn left-to-right, not a blunt
           text-decoration toggle. */
        .pt-underline-target {
          background-image: linear-gradient(var(--pt-accent), var(--pt-accent));
          background-repeat: no-repeat;
          background-size: 0% 1px;
          background-position: 0 100%;
          transition: background-size 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          padding-bottom: 1px;
        }
        .group:hover .pt-underline-target { background-size: 100% 1px; }

        /* ── Hero ── */
        .pt-hero-frame {
          position: relative; overflow: hidden;
          height: clamp(260px, 20vw + 150px, 480px);
          background: var(--pt-rule-soft);
        }
        .pt-hero-slab {
          background: var(--pt-surface);
          padding: clamp(1.1rem, 0.7rem + 1.2vw, 1.9rem);
          border-top: 3px solid var(--pt-ink);
        }
        @media (min-width: 1024px) {
          /* The lead story's headline slab lifts up over its own image —
             the single intentional break in an otherwise strict grid. */
          .pt-hero-slab {
            position: relative;
            margin: -3.5rem 2.25rem 0 0;
            box-shadow: 0 -1px 0 var(--pt-rule);
          }
        }

        .pt-headline-hero {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-weight: 800;
          font-size: clamp(1.75rem, 1rem + 3.1vw, 3.5rem);
          line-height: 1.02;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .pt-dek {
          color: var(--pt-ink-soft);
          font-size: 0.9rem;
          line-height: 1.65;
          max-width: 62ch;
          margin-bottom: 1rem;
        }

        .pt-feature {
          position: relative; display: block; overflow: hidden;
          height: clamp(280px, 22vw + 160px, 560px);
          background: var(--pt-ink);
        }
        .pt-feature-body { position: absolute; inset-inline: 0; bottom: 0; padding: clamp(1rem, 0.6rem + 1vw, 1.6rem); }
        .pt-feature-title {
          color: #fff; font-weight: 700;
          font-size: clamp(1.05rem, 0.85rem + 0.7vw, 1.45rem);
          line-height: 1.22; margin-bottom: 0.55rem;
        }

        /* ── Story card grid ──
           Card 1 spans two columns and runs horizontally on wide screens, so
           the section has an internal lead instead of a uniform grid. */
        .pt-cardgrid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: clamp(1.25rem, 0.9rem + 1.2vw, 2rem);
        }
        @media (min-width: 640px)  { .pt-cardgrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 1280px) { .pt-cardgrid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

        .pt-card { display: flex; flex-direction: column; }
        .pt-card-frame {
          position: relative; overflow: hidden;
          aspect-ratio: 4 / 3;
          background: var(--pt-rule-soft);
          margin-bottom: 0.85rem;
        }
        .pt-card-body { display: flex; flex-direction: column; }
        .pt-card-title {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-size: 0.98rem; font-weight: 700; line-height: 1.28;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          margin-bottom: 0.5rem;
        }
        @media (min-width: 640px) {
          .pt-card-lead {
            grid-column: span 2;
            flex-direction: row;
            gap: 1.5rem;
            align-items: stretch;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--pt-rule);
          }
          .pt-card-lead .pt-card-frame { flex: 0 0 46%; aspect-ratio: 3 / 2; margin-bottom: 0; }
          .pt-card-lead .pt-card-body  { justify-content: center; flex: 1; }
          .pt-card-lead .pt-card-title {
            font-size: clamp(1.2rem, 0.95rem + 0.8vw, 1.7rem);
            line-height: 1.14; -webkit-line-clamp: 4;
          }
        }
        @media (min-width: 1280px) { .pt-card-lead { grid-column: span 3; } }

        /* ── Market snapshot panel ── */
        .pt-panel {
          background: var(--pt-surface);
          border: 1px solid var(--pt-rule);
          padding: clamp(1rem, 0.7rem + 0.8vw, 1.4rem);
          position: sticky; top: 124px;
        }
        @media (max-width: 1023px) { .pt-panel { position: static; } }

        .pt-tabs {
          display: flex; align-items: center; gap: 0.25rem;
          overflow-x: auto;
          border-bottom: 1px solid var(--pt-rule);
          margin-bottom: 1.1rem;
        }
        .pt-tabs::-webkit-scrollbar { display: none; }
        .pt-tabs { -ms-overflow-style: none; scrollbar-width: none; }
        .pt-tabs-tight { margin-bottom: 0.75rem; }

        .pt-tab {
          position: relative;
          padding: 0.5rem 0.75rem;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--pt-muted);
          white-space: nowrap;
          background: none; border: 0; cursor: pointer;
          transition: color 0.2s ease;
        }
        .pt-tab:hover { color: var(--pt-ink); }
        .pt-tab-active { color: var(--pt-ink); font-weight: 700; }
        .pt-tab-active::after {
          content: ""; position: absolute; left: 0.75rem; right: 0.75rem; bottom: -1px;
          height: 2px; background: var(--pt-accent);
        }
        .pt-tab:focus-visible { outline: 2px solid var(--pt-accent); outline-offset: -2px; }

        .pt-quotes > * + * { border-top: 1px solid var(--pt-rule-soft); }
        .pt-quote-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          align-items: center;
          gap: 0.75rem;
          padding-block: 0.6rem;
        }
        .pt-quote-symbol { font-size: 12.5px; font-weight: 600; color: var(--pt-ink); }
        .pt-quote-value  { font-size: 12.5px; font-weight: 600; color: var(--pt-ink); }
        .pt-spark { opacity: 0.85; }
        .pt-empty { font-size: 13px; color: var(--pt-muted); line-height: 1.5; padding-block: 1rem; }

        /* ── Editor's picks ── */
        .pt-pick-frame {
          position: relative; overflow: hidden;
          height: clamp(220px, 16vw + 130px, 360px);
          background: var(--pt-rule-soft);
          margin-bottom: 1rem;
        }
        .pt-pick-title {
          font-family: 'Bodoni Moda', Georgia, serif;
          font-size: clamp(1.25rem, 1rem + 0.9vw, 1.75rem);
          font-weight: 700; line-height: 1.16; margin-bottom: 0.6rem;
        }

        .pt-stack > * + * { border-top: 1px solid var(--pt-rule-soft); }
        .pt-brief {
          display: flex; gap: 1rem;
          padding-block: 1.1rem;
          transition: padding-left 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pt-stack > *:first-child { padding-top: 0; }
        .pt-brief:hover { padding-left: 0.4rem; }
        .pt-brief-frame {
          position: relative; overflow: hidden;
          flex: 0 0 112px; height: 88px;
          background: var(--pt-rule-soft);
        }
        .pt-brief-title { font-size: 0.9rem; font-weight: 700; line-height: 1.25; margin-bottom: 0.3rem; }
        .pt-brief-dek {
          font-size: 12.5px; color: var(--pt-muted); line-height: 1.6;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        /* ── Trending / rank list ── */
        .pt-ranklist { list-style: none; margin: 0; padding: 0; }
        .pt-ranklist > * + * { border-top: 1px solid var(--pt-rule-soft); }
        .pt-rankrow {
          display: flex; align-items: center;
          gap: clamp(1rem, 0.6rem + 1.2vw, 1.75rem);
          padding-block: 1.1rem;
          transition: padding-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pt-rankrow:hover { padding-left: 0.5rem; }
        .pt-rank {
          font-size: clamp(1.6rem, 1.1rem + 1.6vw, 2.6rem);
          font-weight: 800;
          color: var(--pt-accent);
          width: clamp(2.4rem, 1.6rem + 2vw, 3.6rem);
          flex-shrink: 0;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .pt-rank-name { font-size: clamp(0.9rem, 0.82rem + 0.35vw, 1.05rem); font-weight: 700; line-height: 1.3; }
        .pt-rank-company { color: var(--pt-muted); font-weight: 400; }
        .pt-rank-sector {
          font-size: 12.5px; color: var(--pt-muted); margin-top: 0.15rem;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .pt-rank-arrow { color: var(--pt-rule); flex-shrink: 0; transition: color 0.24s ease, transform 0.24s ease; }
        .group:hover .pt-rank-arrow { color: var(--pt-accent); transform: translateX(4px); }

        /* ── Visual stories (dark band) ── */
        .pt-visual-dark {
          background-color: var(--pt-ink);
          margin-inline: calc(50% - 50vw);
          padding-block: clamp(2rem, 1.4rem + 2vw, 3.5rem);
          margin-bottom: var(--pt-gap);
        }
        .pt-visual-inner {
          width: 100%; max-width: var(--pt-shell);
          margin-inline: auto;
          padding-inline: clamp(1rem, 0.5rem + 2vw, 2.5rem);
        }
        .pt-visual-card {
          position: relative; display: block; overflow: hidden;
          aspect-ratio: 4 / 5; background: #0B0D10;
        }
        .pt-visual-body { position: absolute; inset-inline: 0; bottom: 0; padding: 1rem; }
        .pt-visual-title {
          color: #fff; font-size: 0.9rem; font-weight: 700; line-height: 1.25; margin-top: 0.15rem;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        /* ── Full-bleed banner ── */
        .pt-banner {
          position: relative; display: block; overflow: hidden;
          height: clamp(320px, 24vw + 180px, 520px);
          margin-inline: calc(50% - 50vw);
          background: var(--pt-ink);
        }
        .pt-banner-body {
          position: absolute; inset-inline: 0; bottom: 0;
          padding: clamp(1.5rem, 1rem + 2.5vw, 3.5rem);
          max-width: min(56rem, 92%);
        }
        .pt-banner-title {
          color: #fff; font-weight: 800;
          font-size: clamp(1.5rem, 1rem + 2.4vw, 2.9rem);
          line-height: 1.08; margin-bottom: 0.75rem;
        }
        .pt-banner-dek {
          color: rgba(255,255,255,0.82);
          font-size: clamp(0.85rem, 0.8rem + 0.2vw, 1rem);
          line-height: 1.6; max-width: 60ch; margin-bottom: 1.1rem;
        }

        /* ── Motion ──
           Two devices only: an ordered page-load for the masthead and hero,
           and a scroll reveal for everything below. Both cut out entirely
           under prefers-reduced-motion. */
        @keyframes pt-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pt-load { animation: pt-fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }

        [data-reveal] {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.62s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.62s cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-reveal].pt-revealed { opacity: 1; transform: none; }

        .pt-live-dot {
          width: 6px; height: 6px; border-radius: 9999px;
          background: var(--pt-up-dark);
          display: inline-block; flex-shrink: 0;
          animation: pt-pulse 1.8s ease-in-out infinite;
        }
        @keyframes pt-pulse {
          0%, 100% { opacity: 1;    box-shadow: 0 0 0 0 rgba(56, 199, 155, 0.45); }
          50%      { opacity: 0.55; box-shadow: 0 0 0 4px rgba(56, 199, 155, 0); }
        }

        /* ── Utilities ── */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .pt-page ::selection { background: rgba(166, 25, 46, 0.16); color: inherit; }

        .pt-page a:focus-visible,
        .pt-page button:focus-visible {
          outline: 2px solid var(--pt-accent);
          outline-offset: 3px;
        }

        @media (max-width: 640px) {
          .pt-headline-hero { line-height: 1.1; }
          .pt-rank-sector { white-space: normal; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pt-load,
          .pt-ticker-track,
          .pt-live-dot,
          .pt-hot-dot { animation: none !important; }
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          .pt-img, .pt-underline-target, .pt-rankrow, .pt-brief { transition: none !important; }
          .group:hover .pt-img { transform: none; }
        }
      `}</style>
    </div>
  );
}
