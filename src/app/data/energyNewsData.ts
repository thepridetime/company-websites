/* =========================================================
   ENERGY NEWS — SHARED DATA
   THE PRIDE TIMES
   Updated: October 2026
   Source: Global Corporate News Digest — "Energy & Climate"
   Format: blog-style posts. The `image` field is used ONLY by
   the Energy listing page (hero + cards). Inner article pages
   (SpecialBlog) never render it.
========================================================= */

import type { SpecialArticle } from "./specialArticleData";

const AUTHOR = "The Pride Times Editorial Desk";
const DATE = "October 2, 2026";

/* =========================================================
   ARTICLES (newest first)
========================================================= */

export const energyArticles: SpecialArticle[] = [
  /* ------------------------------------------------------- */
  {
    id: "energy-tidewater-green-hydrogen-shipment",
    section: "Energy",
    category: "GREEN HYDROGEN",
    title:
      "Why Tidewater Aerospace's First Green-Hydrogen Shipment Is a Bigger Deal Than It Looks",
    dek: "Tidewater Aerospace has delivered its first commercial shipment of green hydrogen, a milestone for an emerging fuel market. We look at what the milestone proves, and what it still leaves open.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=80",
    author: AUTHOR,
    publishedAt: DATE,
    readTime: "5 MIN READ",
    highlights: [
      "Tidewater Aerospace delivered its first commercial shipment of green hydrogen.",
      "The company calls it a milestone for the emerging fuel market.",
      "Shares moved 9.5% in early trading while peers were broadly flat.",
      "Pemberton Analytics rates the move 'constructive'.",
      "Approval processes in Chile and neighbouring markets have been lengthening.",
    ],
    sections: [
      {
        heading: "The short version",
        body: "Toronto-based Tidewater Aerospace has delivered its first commercial shipment of green hydrogen. The word 'commercial' is the important one, because it means a real delivery to a real customer rather than a pilot or a demonstration. It is a small first step in volume terms, but a meaningful one for a fuel that has had far more announcements than deliveries.",
      },
      {
        heading: "Why a first shipment matters",
        body: "Hydrogen has been a headline topic for years. Large energy and industrial gas companies such as Shell and Air Liquide have invested in it for a long time, and the lesson from their experience is that the hard part is not the announcement but the reliable, repeatable supply. A first commercial shipment shows the supply chain can work at least once, and that is where every scale-up has to begin.",
      },
      {
        heading: "How investors reacted",
        body: "Investors responded cautiously but positively. Tidewater's shares moved 9.5% in early trading, while peers in the sector were broadly flat. Market participants said attention now turns to grid investment, and to how quickly the company can turn a milestone into measurable results.",
      },
      {
        heading: "What the analysts are saying",
        body: "Samuel Ibrahim of Pemberton Analytics called the move consistent with broader trends in power markets. In his view, companies that act early tend to secure better terms and stronger partners, though execution is the risk. Pemberton's research also puts aggregate announcements in the commodity-prices area up 4% year on year, which suggests this space is growing steadily rather than explosively. The firm's overall view is 'constructive'.",
      },
      {
        heading: "Regulators, rivals and people",
        body: "Authorities in several jurisdictions will need to review aspects of the plan, and legal advisers note that approvals in Chile and neighbouring markets have lengthened in recent years, although most reviews finish without major changes. Quorum Capital, which operates in overlapping markets, declined to comment, but people familiar with its thinking say it is reviewing its own strategy. Tidewater says it will consult staff representatives and fund training in digital and technical skills, and local officials in Warsaw welcomed the news.",
      },
      {
        heading: "What we're watching next",
        body: "Management said the company will stay flexible if conditions change, and that it will give a detailed update, including milestones, budgets and risk factors, with its next earnings release. For us, the question is simple: does the second shipment follow quickly, and is it bigger than the first?",
      },
    ],
    keyFacts: [
      { label: "Company", value: "Tidewater Aerospace" },
      { label: "Headquarters / focus market", value: "Toronto / Chile" },
      { label: "Milestone", value: "First commercial green-hydrogen shipment" },
      { label: "Share move (early trading)", value: "9.5%" },
      { label: "Analyst view", value: "Pemberton Analytics: Constructive" },
    ],
  },

  /* ------------------------------------------------------- */
  {
    id: "energy-lumina-lng-supply-deal",
    section: "Energy",
    category: "LNG",
    title:
      "How Lumina Group's 15-Year LNG Deal Locks In Supply for Industrial Customers",
    dek: "Lumina Group has secured a 15-year liquefied natural gas supply contract with Brightmoor Logistics, locking in volumes for industrial customers. Here is why long contracts still matter in a fast-moving energy market.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
    author: AUTHOR,
    publishedAt: DATE,
    readTime: "5 MIN READ",
    highlights: [
      "Lumina Group secured a 15-year LNG supply contract with Brightmoor Logistics.",
      "The deal locks in volumes for industrial customers.",
      "Arden Bell Partners says announcements in transition finance rose 29% year on year.",
      "Arden Bell's view is 'watch closely'.",
      "Lumina has grown its Kenyan workforce by 29% in two years.",
    ],
    sections: [
      {
        heading: "The short version",
        body: "Lumina Group has signed a 15-year liquefied natural gas supply contract with Brightmoor Logistics. The point of the deal is certainty: it locks in volumes for the industrial customers who depend on a steady supply of gas. In a market where prices and policies can change quickly, fifteen years is a long time to commit.",
      },
      {
        heading: "Why long contracts still matter",
        body: "Long-term contracts have been a backbone of the LNG business for decades, and major suppliers and buyers around the world have relied on them to justify the huge cost of building export and import infrastructure. Industrial customers like them for a simple reason: they cannot easily shut down a factory because gas did not arrive. The trade-off is flexibility, because a long contract can look expensive if the market moves the other way.",
      },
      {
        heading: "What management said",
        body: "Speaking at a briefing in Warsaw, president Amara Tanaka said the decision reflects a long-term view and that the company is not reacting to a single quarter. She said Lumina is positioning for the next decade of demand, which requires patient capital and clear priorities. The company has also grown its workforce in Kenya by 29% over two years and says more hiring is possible if conditions stay supportive.",
      },
      {
        heading: "What the analysts think",
        body: "Elena Banerjee of Arden Bell Partners described the deal as consistent with broader trends in power markets. Her view is that companies that move early tend to secure better terms and stronger partners, but that execution is the risk. Arden Bell also reports that announcements in transition finance rose 29% year on year, and rates the situation 'watch closely'.",
      },
      {
        heading: "The skeptics' corner",
        body: "Not everyone is convinced. Rafael Petrov, a portfolio manager in Mexico City, said the ambition is clear but the proof will be in delivery. Critics point to elevated interest rates, supply bottlenecks and a tight labour market. Regulators will also need to review parts of the plan, and approvals in Kenya and neighbouring markets have been slower in recent years.",
      },
      {
        heading: "What to watch from here",
        body: "Lumina plans to share a detailed update with its next earnings release, covering milestones, budgets and risk factors. Customers may feel the effects first, with service improvements and new options rolling out progressively, starting in Warsaw. Local officials in Mexico City welcomed the news, and the company says it will consult staff and invest in training.",
      },
    ],
    keyFacts: [
      { label: "Company", value: "Lumina Group" },
      { label: "Headquarters / focus market", value: "Warsaw / Kenya" },
      { label: "Deal", value: "15-year LNG supply contract with Brightmoor Logistics" },
      { label: "Workforce growth", value: "29% over two years (Kenya)" },
      { label: "Analyst view", value: "Arden Bell Partners: Watch closely" },
    ],
  },

  /* ------------------------------------------------------- */
  {
    id: "energy-helix-retail-net-zero",
    section: "Energy",
    category: "NET ZERO",
    title:
      "Why Helix Retail Is Pulling Its Net-Zero Target Forward by Five Years",
    dek: "Helix Retail has brought its net-zero target forward by five years, backed by new renewable power purchase agreements. We look at what makes an earlier deadline believable.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
    author: AUTHOR,
    publishedAt: DATE,
    readTime: "5 MIN READ",
    highlights: [
      "Helix Retail moved its net-zero target forward by five years.",
      "New renewable power purchase agreements support the change.",
      "Shares moved 18.9% in early trading while peers were broadly flat.",
      "Calder & Voss Research says announcements in grid investment rose 15% year on year.",
      "Calder & Voss's view is 'neutral'.",
    ],
    sections: [
      {
        heading: "The short version",
        body: "Helix Retail, headquartered in Zurich, has moved its net-zero target five years earlier than planned. The company says the change is supported by new renewable power purchase agreements, often shortened to PPAs. A date on its own is only a promise, but a signed contract for clean power is something you can actually check.",
      },
      {
        heading: "Why power purchase agreements are the key",
        body: "A PPA is a long-term contract to buy electricity from a specific source at an agreed arrangement. Large technology companies such as Microsoft, Google and Amazon have used them widely to back up their own climate goals, which has made PPAs a familiar tool for companies that want to cut emissions without building their own generation. For Helix, the new agreements are what make an earlier target believable.",
      },
      {
        heading: "How the market responded",
        body: "Investors responded cautiously but positively, with Helix's shares moving 18.9% in early trading while peers stayed broadly flat. Market participants said attention now turns to commodity prices. Calder & Voss Research's Priya Okafor said the move is consistent with broader trends in transition finance, and that early movers tend to get better terms and partners, though execution is the risk.",
      },
      {
        heading: "The wider pattern",
        body: "According to Calder & Voss, aggregate announcements in grid investment rose 15% year on year, led by companies in North America, Europe and East Asia. Calder & Voss rates the Helix situation as 'neutral', which we read as a polite way of saying the plan looks sensible but still needs to be delivered.",
      },
      {
        heading: "The skeptics' corner",
        body: "Sunita Duarte, a portfolio manager in Sydney, said the ambition is clear but the proof will be in delivery. Others point to elevated interest rates, supply bottlenecks and a tight labour market. Regulators will need to review aspects of the plan, too, though the company says it has started early talks.",
      },
      {
        heading: "People, customers and what's next",
        body: "Helix has expanded its workforce in Indonesia by 15% over two years, and says it will consult staff and invest in digital and technical training. Local officials in Sydney welcomed the news. Customers may notice changes first, with service improvements arriving progressively, starting in Zurich, and chairperson Samuel Whitfield said the company will keep pricing competitive. A detailed update will follow with the next earnings release.",
      },
    ],
    keyFacts: [
      { label: "Company", value: "Helix Retail" },
      { label: "Headquarters / focus market", value: "Zurich / Indonesia" },
      { label: "Change", value: "Net-zero target brought forward by five years" },
      { label: "Share move (early trading)", value: "18.9%" },
      { label: "Analyst view", value: "Calder & Voss Research: Neutral" },
    ],
  },

  /* ------------------------------------------------------- */
  {
    id: "energy-helix-motors-net-zero",
    section: "Energy",
    category: "NET ZERO",
    title:
      "What Helix Motors' Earlier Net-Zero Target Says About Clean Power Contracts",
    dek: "Helix Motors has also brought its net-zero target forward by five years, supported by new renewable power purchase agreements. It is the second company in our coverage to make that move this week.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=80",
    author: AUTHOR,
    publishedAt: DATE,
    readTime: "4 MIN READ",
    highlights: [
      "Helix Motors brought its net-zero target forward by five years.",
      "New renewable power purchase agreements support the plan.",
      "Shares moved 14.4% in early trading.",
      "Arden Bell Partners rates the move 'cautiously positive'.",
      "Attention now turns to power markets.",
    ],
    sections: [
      {
        heading: "The short version",
        body: "Helix Motors, based in Mumbai, has moved its net-zero target five years earlier than planned. As with Helix Retail, the company points to new renewable power purchase agreements as the thing that makes the earlier date possible. Two companies making a similar move in the same week is worth noticing.",
      },
      {
        heading: "A pattern, not a coincidence",
        body: "Companies in many industries now treat clean power contracts as the fastest way to cut reported emissions. Buying renewable electricity under a long-term agreement is easier than rebuilding a factory, which is why we expect more earlier net-zero dates to follow. The question for each company is whether the contracts cover enough of its real power use.",
      },
      {
        heading: "How the market reacted",
        body: "Shares of Helix Motors moved 14.4% in early trading while peers in the sector were broadly flat. Market participants said attention will now turn to power markets and to how quickly the company can convert announcements into measurable results. Investors responded cautiously but positively.",
      },
      {
        heading: "What the analysts say",
        body: "Mateo Banerjee of Arden Bell Partners called the move consistent with broader trends in commodity prices. He said companies that act early tend to secure better terms and stronger partners, while warning that execution depends on how well management integrates the plan with existing operations. Arden Bell's overall view is 'cautiously positive'.",
      },
      {
        heading: "Approvals, rivals and what comes next",
        body: "Authorities in several jurisdictions will need to review aspects of the plan, and approval processes in Indonesia and neighbouring markets have lengthened in recent years. Ardent Industries is reportedly reviewing its own strategy. Chairperson Ingrid Novak said the company will stay flexible if conditions change, and a detailed update with milestones, budgets and risk factors will come with the next earnings release. Customers should see changes first in Mumbai, and local officials in Stockholm welcomed the news.",
      },
    ],
    keyFacts: [
      { label: "Company", value: "Helix Motors" },
      { label: "Headquarters / focus market", value: "Mumbai / Indonesia" },
      { label: "Change", value: "Net-zero target brought forward by five years" },
      { label: "Share move (early trading)", value: "14.4%" },
      { label: "Analyst view", value: "Arden Bell Partners: Cautiously positive" },
    ],
  },

  /* ------------------------------------------------------- */
  {
    id: "energy-meridian-foods-upstream-cuts",
    section: "Energy",
    category: "OIL & GAS",
    title:
      "Why Meridian Foods Is Trimming Exploration Budgets as Prices Soften",
    dek: "Meridian Foods has trimmed its planned exploration budgets, putting returns to shareholders ahead of volume growth. Here is what that shift means for the upstream business.",
    image:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1400&q=80",
    author: AUTHOR,
    publishedAt: DATE,
    readTime: "4 MIN READ",
    highlights: [
      "Meridian Foods trimmed planned exploration budgets as prices softened.",
      "The company is prioritising shareholder returns over volume growth.",
      "Arden Bell Partners rates the move 'neutral'.",
      "Meridian has grown its Chilean workforce by 13% in two years.",
      "A detailed update is due with the next earnings release.",
    ],
    sections: [
      {
        heading: "The short version",
        body: "Meridian Foods has cut its planned upstream spending as prices soften. Instead of chasing more barrels, the Jakarta-based company says it will put returns to shareholders first. It is a clear choice of discipline over growth.",
      },
      {
        heading: "Capital discipline is the new playbook",
        body: "Large oil and gas companies such as Shell, BP and ExxonMobil have all spent recent years talking about capital discipline, which means spending less on new supply and returning more cash to investors. The idea is that in a softer price environment, every new project has to clear a higher bar. Meridian is following the same logic at its own scale.",
      },
      {
        heading: "What management said",
        body: "Speaking at a briefing in Jakarta, chief executive Rafael Duarte said the decision reflects a long-term view and that the company is not reacting to a single quarter. He said the company will adapt if conditions change, but that its commitment to disciplined growth and to customers will not. Meridian has expanded its workforce in Chile by 13% over two years.",
      },
      {
        heading: "The analyst view",
        body: "Naledi Haddad of Arden Bell Partners described the cut as consistent with broader trends in commodity prices. She said early movers tend to secure better terms and stronger partners, and warned that the risk is execution, meaning how the plan fits with existing operations. Arden Bell's overall rating is 'neutral'.",
      },
      {
        heading: "Doubts and competition",
        body: "Priya Fischer, a portfolio manager in Nairobi, said the ambition is clear but the proof will be in delivery. Regulators will need to review parts of the plan, and approvals in Chile have lengthened recently. Kestrel Group declined to comment but is reportedly reviewing its own strategy, and observers expect similar moves across technology businesses in the coming months.",
      },
      {
        heading: "What to watch next",
        body: "Meridian will give a detailed update with its next earnings release, including milestones, budgets and risk factors. We are watching how much the cut slows production plans, and how quickly shareholder returns show up in the numbers.",
      },
    ],
    keyFacts: [
      { label: "Company", value: "Meridian Foods" },
      { label: "Headquarters / focus market", value: "Jakarta / Chile" },
      { label: "Move", value: "Exploration budgets trimmed; returns prioritised" },
      { label: "Workforce growth", value: "13% over two years (Chile)" },
      { label: "Analyst view", value: "Arden Bell Partners: Neutral" },
    ],
  },

  /* ------------------------------------------------------- */
  {
    id: "energy-meridian-partners-upstream-cuts",
    section: "Energy",
    category: "OIL & GAS",
    title:
      "What Meridian Partners' Spending Cut Says About Returns Versus Growth",
    dek: "Meridian Partners has also trimmed exploration budgets, choosing shareholder returns over volume growth. Two upstream companies making the same call is a signal worth reading carefully.",
    image:
      "https://images.unsplash.com/photo-1581093458791-9d42e3c0c0d5?auto=format&fit=crop&w=1400&q=80",
    author: AUTHOR,
    publishedAt: DATE,
    readTime: "4 MIN READ",
    highlights: [
      "Meridian Partners trimmed planned exploration budgets.",
      "Returns to shareholders take priority over volume growth.",
      "Shares moved 5.7% in early trading.",
      "Halvorsen Securities rates the move 'cautiously positive'.",
      "Meridian has grown its Nigerian workforce by 35% in two years.",
    ],
    sections: [
      {
        heading: "The short version",
        body: "Amsterdam-based Meridian Partners has trimmed its planned exploration budgets and says shareholder returns now come before volume growth. It is a very similar message to the one we heard from Meridian Foods, and the timing is not an accident.",
      },
      {
        heading: "Why two companies are saying the same thing",
        body: "When prices soften, the pressure on upstream companies is the same everywhere: spend less on new supply or accept lower returns. Investors have shown they prefer cash back over growth for its own sake. That is why we expect more companies to follow, and why a single announcement should be read as part of a wider mood.",
      },
      {
        heading: "How the market reacted",
        body: "Shares of Meridian Partners moved 5.7% in early trading while peers were broadly flat, a calmer reaction than some other stories this week. Market participants said attention now turns to power markets and to how fast the company can turn announcements into results. Investors responded cautiously but positively.",
      },
      {
        heading: "Management and analyst views",
        body: "Chief executive Elena Duarte said at a briefing in Amsterdam that the company is not reacting to a single quarter and is positioning for the next decade of demand. Rafael Banerjee of Halvorsen Securities called the move consistent with broader trends in commodity prices, adding that early movers tend to get better terms, and that execution is the risk. Halvorsen's view is 'cautiously positive'.",
      },
      {
        heading: "People, rivals and customers",
        body: "Meridian has expanded its workforce in Nigeria by 35% over two years, and says more hiring could follow if conditions stay supportive. It will consult staff and invest in digital and technical training, and local officials in Amsterdam welcomed the news. Kestrel Logistics is reportedly reviewing its own strategy, and customers will see service improvements arriving progressively, starting in Amsterdam.",
      },
      {
        heading: "What to watch next",
        body: "Meridian plans a detailed update with its next earnings release, including milestones, budgets and risk factors. Our questions are simple: do other upstream companies follow, and does discipline on spending hold up if prices move higher again?",
      },
    ],
    keyFacts: [
      { label: "Company", value: "Meridian Partners" },
      { label: "Headquarters / focus market", value: "Amsterdam / Nigeria" },
      { label: "Move", value: "Exploration budgets trimmed; returns prioritised" },
      { label: "Share move (early trading)", value: "5.7%" },
      { label: "Analyst view", value: "Halvorsen Securities: Cautiously positive" },
    ],
  },
];

/* =========================================================
   LISTING-PAGE DATA (Energy page only)
========================================================= */

/* Digest "Section at a glance". */
export const energyGlance = [
  { theme: "Power markets", momentum: "Moderate", outlook: "Neutral" },
  { theme: "Grid investment", momentum: "Uneven", outlook: "Neutral" },
  { theme: "Transition finance", momentum: "Strong", outlook: "Positive" },
  { theme: "Commodity prices", momentum: "Moderate", outlook: "Neutral" },
];

export const energyCompanies = [
  {
    company: "Tidewater Aerospace",
    location: "Toronto",
    headline: "First green-hydrogen shipment",
    detail: "Pemberton: Constructive",
    articleId: "energy-tidewater-green-hydrogen-shipment",
  },
  {
    company: "Lumina Group",
    location: "Warsaw",
    headline: "15-year LNG supply deal",
    detail: "Arden Bell: Watch closely",
    articleId: "energy-lumina-lng-supply-deal",
  },
  {
    company: "Helix Retail",
    location: "Zurich",
    headline: "Net zero, five years earlier",
    detail: "Calder & Voss: Neutral",
    articleId: "energy-helix-retail-net-zero",
  },
  {
    company: "Helix Motors",
    location: "Mumbai",
    headline: "Net zero, five years earlier",
    detail: "Arden Bell: Cautiously positive",
    articleId: "energy-helix-motors-net-zero",
  },
  {
    company: "Meridian Foods",
    location: "Jakarta",
    headline: "Exploration budgets trimmed",
    detail: "Arden Bell: Neutral",
    articleId: "energy-meridian-foods-upstream-cuts",
  },
  {
    company: "Meridian Partners",
    location: "Amsterdam",
    headline: "Exploration budgets trimmed",
    detail: "Halvorsen: Cautiously positive",
    articleId: "energy-meridian-partners-upstream-cuts",
  },
];

export const energyOutlookNote = {
  kicker: "Energy & Climate",
  title: "Energy Outlook: Returns, Reliability and the Transition",
  body: "This week's stories share a theme: discipline. Oil and gas companies are trimming spending and favouring shareholder returns, buyers are locking in long-term gas supply, and others are pulling net-zero dates forward by signing clean-power contracts. At the same time, green hydrogen has made its first commercial delivery. Transition finance looks strong, while power markets, grid investment and commodity prices remain mixed.",
  tiles: [
    { label: "Oil & Gas", text: "Spending discipline and long-term supply deals" },
    { label: "Transition", text: "Net-zero dates move forward on clean-power contracts" },
  ],
};
