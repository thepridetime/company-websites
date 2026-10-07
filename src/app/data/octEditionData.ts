/* =========================================================
   THE PRIDE TIMES NEWS — GLOBAL INDUSTRY EDITION
   Edition of Wednesday, 7 October 2026
   Source: "The Pride Times News — Global Industry Edition"
   (The_Pride_Times_News_Oct_2026.docx).

   This file is ADDITIVE. It does not change the September digest
   (digestArticleData.ts) or Edition 1 (maEdition1Data.ts). The
   homepage leads with these stories; the older stories stay in
   the Latest News feed ("Read more articles") and in the older
   homepage blocks behind the "More articles" toggle.
========================================================= */

import type { DigestArticle } from "./digestArticleData";

import img_FIN4 from "../../imports/FIN4.png";
import img_HC1 from "../../imports/HC1.png";
import img_Insightimage from "../../imports/Insightimage.png";
import img_Manu3 from "../../imports/Manu3.png";
import img_business_aviation_jet from "../../imports/business-aviation-jet.png";
import img_cyber_ops from "../../imports/cyber-ops.png";
import img_data_centre from "../../imports/data-centre.png";
import img_energy_tanks from "../../imports/energy-tanks.png";
import img_heroimage from "../../imports/heroimage.png";
import img_warehouse_robotics from "../../imports/warehouse-robotics.png";

export type OctEditionArticle = DigestArticle & {
  editorNote: string;
  /* Category label from the edition (shown above the headline). */
  industry: string;
};

export const octEditionMeta = {
  title: "The Pride Times News",
  edition: "Global Industry Edition",
  date: "7 October 2026",
  subtitle:
    "Global economy, energy, AI, semiconductors, deep technology, cybersecurity, healthcare, automotive and aerospace.",
};

const EDITION_NOTE =
  "The Pride Times News, Global Industry Edition, 7 October 2026. Compiled by Claude (AI) from published reports. Figures come from the sources named in each story; items flagged as unconfirmed in the text have not been verified against primary sources. This edition is a summary and not investment or medical advice.";

const base = {
  author: "The Pride Times Newsroom",
  publishedAt: "7 October 2026",
  quote: { text: "", by: "" },
  /* -1 = no pull quote is rendered. */
  quoteAfter: -1,
  editorNote: EDITION_NOTE,
};

export const octEditionArticles: OctEditionArticle[] = [
  {
    ...base,
    id: "growth-holds-near-3-as-the-wars-inflation-shock-lingers",
    sectionNumber: 1,
    section: "Markets & Finance",
    sectionPath: "/markets",
    industry: "Global Economy & Finance",
    title: "Growth Holds Near 3% as the War's Inflation Shock Lingers",
    lede: "The IMF expects a V-shaped recovery, but price pressures are proving stubborn and the Fed's latest move still needs confirming.",
    location: "Global",
    readTime: "3 min read",
    image: img_Insightimage,
    body: [
      "The world economy is getting through 2026 more steadily than many forecasters feared in the spring, but inflation is proving harder to tame. In its July World Economic Outlook update, the International Monetary Fund projected global growth of 3.0% this year, a tenth of a point below its April estimate, and 3.4% in 2027. Growth was 3.5% in both 2024 and 2025.",
      "The Fund framed the outlook as a contest between two forces: a negative supply shock from the Middle East conflict that began at the end of February, and a positive technology cycle fuelled by investment in artificial intelligence and related tools. IMF economist Petya Koeva Brooks said the Fund expects a V-shaped path, with weaker growth this year than before the war and a rebound next year.",
      "Inflation is the weak spot. The IMF raised its 2026 global headline inflation forecast to 4.7%, up 0.3 points from April and above the 4.1% recorded in 2025, before easing to 3.9% in 2027. It said the disinflation trend that began in early 2024 has stalled, even though its core inflation forecast is broadly unchanged. Global trade growth is projected to slow to 3.5% this year from 5% in 2025.",
      "The regional picture is uneven. The US forecast was left at 2.3% for 2026, with 2.2% pencilled in for 2027. The euro area was cut to 0.9% and Japan to 0.6%. Emerging economies are expected to grow 3.8% this year and 4.5% next. China's 2026 outlook was raised to 4.6%, while India's was trimmed to 6.4% for 2026 and lifted to 6.7% for 2027. IMF officials said the energy shock was cushioned by releases from strategic petroleum reserves, drawdowns of commercial inventories, efficiency gains and the private sector's ability to find alternative supply routes.",
      "Central banks are caught between those pressures. The US Federal Reserve met on 15 to 16 September. Several secondary sources, including a data-feed site and a real-estate analysis blog, report that it raised its target range by a quarter point to 3.75%-4.00%, after holding at 3.50%-3.75% in July, and that the median projection points to one more increase before year-end. We could not retrieve the Fed's own statement, and some pre-meeting market pricing had favoured a hold, so readers should confirm the decision at federalreserve.gov before relying on it.",
      "The main downside risk the IMF has flagged this year sits in the technology sector itself. In January it warned that a reassessment of AI productivity gains could weaken investment and trigger a sharp market correction that spreads beyond AI-related firms. With AI spending now propping up growth in North America and Asia, that risk and the energy and inflation story are linked, which is why the technology and energy reports in this edition are best read together.",
      "Why it matters: Growth is holding, but global inflation is forecast at 4.7%.",
    ],
    keyFacts: [{"label": "Global growth forecast, 2026 / 2027", "value": "3.0% / 3.4% (IMF, July 2026)"}, {"label": "Global headline inflation forecast, 2026", "value": "4.7% (IMF, July 2026)"}, {"label": "Global trade growth, 2026", "value": "3.5%, down from 5% in 2025"}],
    highlights: ["Global growth forecast, 2026 / 2027: 3.0% / 3.4% (IMF, July 2026)", "Global headline inflation forecast, 2026: 4.7% (IMF, July 2026)", "Global trade growth, 2026: 3.5%, down from 5% in 2025"],
  },
  {
    ...base,
    id: "hormuz-fades-from-the-headlines-not-from-the-balance-sheets",
    sectionNumber: 3,
    section: "Energy & Climate",
    sectionPath: "/energy",
    industry: "Energy",
    title: "Hormuz Fades From the Headlines, Not From the Balance Sheets",
    lede: "The largest oil supply disruption on record is easing, but forecasters still disagree on how quickly markets return to surplus.",
    location: "Strait of Hormuz",
    readTime: "3 min read",
    image: img_energy_tanks,
    body: [
      "No industry has been reshaped this year like energy. The war that began at the end of February, and the near-total disruption of shipping through the Strait of Hormuz, a channel that carries roughly a fifth of the world's oil and LNG, produced what the World Bank described as the largest oil market disruption in history. Global oil supply fell by 10.1 million barrels per day in March alone as energy infrastructure was attacked and tanker traffic restricted.",
      "Forecasts swung wildly. Brent touched about $109 a barrel at one point, according to a Bloomberg report on a Goldman Sachs note. In May, Moody's said it expected prices to stay in a $90-110 range through 2026 and called the disruption a structural constraint rather than a passing shock. On 20 May, Wood Mackenzie warned that Brent could approach $200 by year-end if the disruption lasted beyond September without a US-Iran settlement, with more than 11 million barrels per day of Gulf crude and condensate shut in and about a fifth of global LNG supply cut off.",
      "Since then the picture has improved. A Reuters poll relayed by IDN Financials reports that shipping through the strait has resumed and that analysts cut their 2026 price forecasts by more than 6% from May. Frank Schallenberger of LBBW said that if traffic returns fully to normal the market is likely to swing back into surplus, adding downward pressure on prices in the second half. HSBC's Kim Fustier still expects a deficit of about 2 million barrels per day this year. The International Energy Agency's preliminary 2027 outlook points to significant oversupply, and respondents expect OPEC+ to keep raising output gradually to regain market share.",
      "The timeline is not fully settled in our sources. Video news digests from June described a US-Iran peace agreement as expected to be signed in Switzerland, while a late-July digest referred to a Gulf-backed proposal for voluntary fees for Hormuz transit and to the interception of Iranian missiles. These are low-reliability sources, and we have not confirmed the current status of the strait with a primary source. Tanker-tracking data and official statements are the places to check.",
      "For companies, the shock has had three lasting effects. Importers and energy-intensive manufacturers have faced higher costs: Moody's warned that energy scarcity would feed headline and core inflation, raise production costs and tighten financing for exposed borrowers. Producers outside the Gulf have gained pricing power, even as Saudi and Emirati efforts to raise pipeline throughput could not offset lost exports through the strait. And energy security has moved up boardroom agendas, with Goldman Sachs analysts noting that the crisis exposes the risk of concentrating production and spare capacity in the Middle East.",
      "Energy is also a technology story. South Korea and the United States are advancing a $22 billion, 6.47-gigawatt gas-fired power project in Texas, part of a broader Korea-US investment package of up to $350 billion, aimed at meeting rising power demand from chip plants and AI data centres. Samsung's $1 billion commitment to Helix Digital Infrastructure likewise bundles data centres with power generation and transmission.",
      "Why it matters: Even with shipping resuming, inventories were drawn down and forecasts remain wide. Companies exposed to fuel, freight or petrochemical inputs should plan for volatility rather than a clean return to 2025 prices.",
    ],
    keyFacts: [{"label": "Global oil supply loss, March 2026", "value": "10.1 million bpd (World Bank)"}, {"label": "Brent peak cited", "value": "About $109 a barrel"}, {"label": "Korea-US Texas gas project", "value": "$22 billion, 6.47 GW"}],
    highlights: ["Global oil supply loss, March 2026: 10.1 million bpd (World Bank)", "Brent peak cited: About $109 a barrel", "Korea-US Texas gas project: $22 billion, 6.47 GW"],
  },
  {
    ...base,
    id: "ais-spending-boom-meets-the-funding-question",
    sectionNumber: 2,
    section: "Technology & AI",
    sectionPath: "/technology",
    industry: "AI & Cloud Infrastructure",
    title: "AI's Spending Boom Meets the Funding Question",
    lede: "Hyperscalers are committing hundreds of billions of dollars and Nvidia is booking record revenue, while the debate shifts to who pays and whether it lasts.",
    location: "Global",
    readTime: "3 min read",
    image: img_data_centre,
    body: [
      "AI's capital cycle is the defining corporate story of 2026. According to a RexShares analysis of company filings, the four largest hyperscalers spent $130.6 billion on capital expenditure in the first quarter alone, up 193% in nine quarters. After first-quarter earnings calls, the Motley Fool put the group's planned 2026 spending at about $725 billion, while a July article from the same publisher used a figure nearer $650 billion, so estimates vary by source and date. Alphabet has guided to $180-190 billion for 2026 and told investors to expect significantly more in 2027.",
      "Nvidia sits at the receiving end. For its first quarter of fiscal 2027, it reported total revenue of $81.6 billion, up 85%, with data-center revenue of $75.2 billion, up 92%. It guided to about $91 billion for the next quarter, a forecast that excludes any data-center compute revenue from China. Networking was the fastest-growing piece, at $14.8 billion, up 199% year on year.",
      "Nvidia has argued that annual global data-center capital spending could reach $3 trillion to $4 trillion by 2030, and expects hyperscalers to spend around $1 trillion next year. Bank of America earlier raised its 2030 estimate for the AI data-center systems market to about $1.4 trillion. These are forecasts from interested parties and analysts, not results.",
      "The harder question is funding. Writer Tarry Singh argues in a June essay that capex is now rising faster than operating cash flow, and says more than $120 billion of AI data-center spending has moved off corporate balance sheets through special-purpose vehicles backed by investors including Pimco, BlackRock and Apollo. That is commentary rather than reporting. A related data point surfaced on 1 October: Anthropic's IPO filing revealed it as the customer behind Broadcom's previously disclosed arrangement to lend up to $42 billion to lease its chips, according to Reuters. Disclosure: Anthropic makes Claude, the AI system used to compile this edition.",
      "Skeptics are vocal. Investor Michael Burry has bet against the chip trade, arguing that the companies spending the most are not performing as well as the semiconductor firms they fund. A UBS survey cited by Gotrade indicated that roughly 60% of businesses are reducing AI expenditure, though we found this figure in only one secondary source and treat it cautiously. The IMF has separately warned that a reassessment of AI productivity gains could trigger a sharp market correction.",
      "Meanwhile the technology stack keeps shifting. Synopsys signed a multi-year agreement with OpenAI to build GPT-Synopsys for chip design and expanded its custom-silicon IP work with Amazon. Nvidia launched an Open Agent Safety Platform for securing AI agents. In China, DeepSeek was reported by Reuters in July to be developing its own inference chip, and on 30 September to be building programming tools optimised for Huawei's AI processors, reducing reliance on Nvidia.",
      "Why it matters: Demand signals are strong, but the build-out increasingly depends on external financing. Watch disclosures on off-balance-sheet structures and any slowdown in enterprise AI budgets.",
    ],
    keyFacts: [{"label": "Big-4 hyperscaler capex, Q1 2026", "value": "$130.6 billion"}, {"label": "Nvidia data-center revenue, fiscal Q1 FY27", "value": "$75.2 billion, +92%"}, {"label": "Alphabet 2026 capex guidance", "value": "$180-190 billion"}],
    highlights: ["Big-4 hyperscaler capex, Q1 2026: $130.6 billion", "Nvidia data-center revenue, fiscal Q1 FY27: $75.2 billion, +92%", "Alphabet 2026 capex guidance: $180-190 billion"],
  },
  {
    ...base,
    id: "memory-becomes-the-chip-industrys-bottleneck-and-bonanza",
    sectionNumber: 2,
    section: "Technology & AI",
    sectionPath: "/technology",
    industry: "Semiconductors",
    title: "Memory Becomes the Chip Industry's Bottleneck and Bonanza",
    lede: "Tight supply, rising prices and record exports are reshaping capacity plans from Texas to Singapore.",
    location: "South Korea",
    readTime: "3 min read",
    image: img_heroimage,
    body: [
      "If GPUs defined the first phase of the AI build-out, memory is defining the second. Micron told investors that memory supply will stay tight through 2028, that more than 75% of its 2027 output is already committed, and that 2027 high-bandwidth memory pricing will be significantly higher than in 2026. Semiconductor Engineering reports that Micron's record fiscal fourth-quarter revenue reached $54 billion, up from $11 billion a year earlier.",
      "A Samsung executive told Reuters that HBM will take nearly 30% of DRAM makers' wafer capacity in 2027, up from about 20% now. That squeezes conventional memory: TrendForce expects DRAM contract prices to rise 10-15% in the fourth quarter and NAND flash prices 15-20%, with enterprise SSD bit demand projected to grow more than 80% in 2026. South Korea's semiconductor exports surged more than 262% year on year to a record $60 billion in September on higher volumes and prices.",
      "The wider manufacturing ecosystem is booming. Counterpoint Research says revenue across foundries, integrated device makers, packaging and test reached a record $96.6 billion in the second quarter, up 25%. Bain's 2026 technology report argues AI has reversed the long-running advantage of software over hardware, with semiconductor and hardware stocks compounding at 24% a year from 2020 to 2026 against 6% for software.",
      "Capacity is following the money. TSMC is reportedly weighing a multibillion-dollar Texas campus that would extend its US footprint beyond the $265 billion Arizona build-out, according to Bloomberg. Samsung Electro-Mechanics plans to invest about $4.9 billion in package-substrate capacity in South Korea and Vietnam for AI servers, and Toppan opened its first overseas FC-BGA substrate site in Singapore. Infineon opened the first phase of a back-end hub in Bangkok, and VSMC, the VIS-NXP joint venture, opened a 300mm fab in Singapore and is reportedly considering a second.",
      "Deals continue. onsemi revised its planned acquisition of Synaptics to a $5.7 billion all-cash offer at $123 a share after an unsolicited rival proposal, down from the roughly $7 billion value of the June agreement. Applied Materials added Kioxia and Besi as partners at its $5 billion EPIC Center, and SK hynix's US unit Solidigm is reportedly weighing an IPO that could value it at up to $150 billion, though SK says nothing has been decided.",
      "Technology is moving too. Lam Research proposed a self-aligned CFET architecture that its digital-twin modelling suggests could extend CMOS scaling below 10 angstroms, with a six-transistor SRAM bit cell 52.7% smaller than on N3. The constraint now is people: Stanton Chase estimates the US could need 88,000 new semiconductor engineers by 2029, and nearly 30% of Europe's semiconductor workforce is expected to retire by 2030. A second federal court ruling blocking enforcement of the $100,000 H-1B fee adds uncertainty to hiring plans.",
      "Why it matters: Memory makers have pricing power and multi-year commitments, but conventional DRAM and NAND buyers face higher costs. Device makers outside AI should budget for memory inflation through 2027.",
    ],
    keyFacts: [{"label": "South Korea chip exports, September 2026", "value": "$60 billion record, +262% y/y"}, {"label": "Chip manufacturing revenue, Q2 2026", "value": "$96.6 billion record (Counterpoint Research)"}, {"label": "onsemi / Synaptics revised offer", "value": "$5.7 billion cash"}],
    highlights: ["South Korea chip exports, September 2026: $60 billion record, +262% y/y", "Chip manufacturing revenue, Q2 2026: $96.6 billion record (Counterpoint Research)", "onsemi / Synaptics revised offer: $5.7 billion cash"],
  },
  {
    ...base,
    id: "photonics-physical-ai-and-quantum-move-from-labs-toward-deals",
    sectionNumber: 2,
    section: "Technology & AI",
    sectionPath: "/technology",
    industry: "Deep Technology",
    title: "Photonics, Physical AI and Quantum Move From Labs Toward Deals",
    lede: "Light-based interconnects and robot-ready AI are attracting real money, while quantum computing remains earlier-stage.",
    location: "Global",
    readTime: "3 min read",
    image: img_warehouse_robotics,
    body: [
      "Beyond today's chips, three frontiers drew money and milestones in the past week. The first is light. Counterpoint Research says network bottlenecks are becoming a larger constraint on AI accelerators, with GPUs spending roughly 12.5% of their time waiting on the network in some workloads, and expects near-packaged optics to begin sampling in late 2026 or early 2027, followed by co-packaged optics. JEDEC published the industry's first silicon photonics reliability standard, giving suppliers common qualification requirements as optical interconnects scale.",
      "Investors are backing the shift. CScale emerged from stealth with $145 million for an optical interconnect designed to contain optical failures without interrupting compute, and Volantis raised $88 million for a photonic approach that links large numbers of memory chips into a single pool for AI inference. Efficient Computer raised $97 million for an energy-efficient general-purpose processor. In chip-design software, Synopsys launched long-horizon engineering agents and signed a multi-year deal with OpenAI to build GPT-Synopsys, a model tuned to its tools.",
      "The second frontier is physical AI, which puts intelligence into robots, vehicles and edge devices. AMD plans to buy World Labs, a developer of spatial-intelligence models that simulate interactive 3D environments for robotics, in an all-stock deal valued at $8.2 billion and expected to close by the end of 2026. SiMa.ai raised $150 million for silicon exceeding 1,000 TOPS aimed at humanoids, automotive and drones. Semiconductor Engineering notes that edge AI raises demands for compute, memory, connectivity, power efficiency and security all at once.",
      "The third is quantum computing, where this week's announcements were incremental rather than breakthroughs. Quantum Computing Inc. introduced its Dirac-3S photonic system, demonstrated with up to 9,980 variables versus 949 for the current Dirac-3. Alice & Bob proposed a faster way to stabilise cat qubits, and Xanadu and Bluefors are developing a modular cryogenic system for photonic quantum computers. New Mexico opened the Roadrunner Quantum Lab, California announced $30 million for quantum and deep-space research, and Fairfax County Public Schools plans to host a 4-qubit room-temperature quantum computer in a high school in December.",
      "Materials research continues underneath. A team from the University of Tokyo, NTU and others reported boron carbon nitride as a high-performance p-type semiconductor, with hole mobility up to 100 cm²/V·s and on/off ratios up to 10⁸, published in Nature. Stockholm University researchers developed an electrically tunable superconducting diode that works without an applied magnetic field. These are laboratory results, not products, and commercial relevance is years away.",
      "The pattern is consistent. AI's bandwidth and power limits are creating markets for optics, memory and packaging, while physical AI is attracting acquisitions. Quantum remains earlier-stage, with funding and facilities growing faster than demonstrated commercial advantage. That reading is our analysis rather than a claim from any single source.",
      "Why it matters: Optical interconnects now have a reliability standard and venture funding, a sign the technology is nearing qualification. Physical AI is the area most likely to see further acquisitions.",
    ],
    keyFacts: [{"label": "AMD / World Labs", "value": "$8.2 billion all-stock"}, {"label": "CScale funding", "value": "$145 million"}, {"label": "SiMa.ai funding", "value": "$150 million"}],
    highlights: ["AMD / World Labs: $8.2 billion all-stock", "CScale funding: $145 million", "SiMa.ai funding: $150 million"],
  },
  {
    ...base,
    id: "zero-days-a-pentagon-breach-and-the-post-quantum-deadline",
    sectionNumber: 2,
    section: "Technology & AI",
    sectionPath: "/technology",
    industry: "Cybersecurity",
    title: "Zero-Days, a Pentagon Breach and the Post-Quantum Deadline",
    lede: "Internet-facing systems remain the weak point, while policymakers set long-range encryption deadlines.",
    location: "United States",
    readTime: "3 min read",
    image: img_cyber_ops,
    body: [
      "A data breach at the Pentagon's Defense Manpower Data Center exposed unencrypted personal information on more than 3 million people, ABC News reported. The breach stemmed from a vulnerability in the agency's file-sharing system.",
      "In the enterprise, CISA reported that Citrix disclosed eight new vulnerabilities in NetScaler ADC and NetScaler Gateway, including two critical zero-days that are being actively exploited and can enable remote code execution. Organisations running affected products should consult CISA's advisories and apply vendor fixes without delay.",
      "On the hardware side, researchers at VUSec and SSSA disclosed Branch Target Reuse, a new Spectre-v2-class attack aimed at just-in-time compilers. They demonstrated an end-to-end Linux attack that can leak arbitrary memory, including a root password hash, even with existing Spectre defences enabled. Hardware vendors said existing mitigation mechanisms can address it, with protections deployed through software.",
      "AI agents are creating a new security category. Nvidia launched an Open Agent Safety Platform combining open-source software with hardware-based controls. Its Sentry reference design runs on BlueField-4 DPUs to monitor agent behaviour independently in silicon and quarantine agents that move outside defined boundaries. Cadence is integrating the platform with its AI Super Agents to add runtime controls around autonomous chip-design workflows.",
      "Policy is setting long deadlines. The NSA announced post-quantum cryptography requirements for National Security Systems, including quantum-resistant support for new commercial systems from 2027 and the phase-out of incompatible legacy systems by 2030. NIST released a draft white paper on false base stations, finding that 5G standards have reduced privacy and location-tracking risks, although devices can still be vulnerable to denial-of-service attacks.",
      "Spending is rising to match. A PwC report found that 84% of security and finance leaders expect cyber budgets to increase over the next year amid growing AI-driven threats. Separately, a security researcher said an access-control flaw in Flock Safety's infrastructure exposed ArcGIS location data that let him map more than 300,000 Flock-associated surveillance devices across the United States. That finding comes from the researcher's own paper, and we have not seen a response from the company.",
      "Taken together, the Pentagon incident and the NetScaler zero-days both involve internet-facing file-transfer or gateway systems, a recurring weak point. The Spectre finding shows how hardware defences are layered and patched in software, and the NSA timetable is a reminder that encryption migration takes years. Organisations that have not inventoried their cryptography and exposed gateways are starting late.",
      "Why it matters: Patch speed on internet-facing gateways is the clearest lever. The 2027 and 2030 post-quantum milestones are worth putting into procurement plans now.",
    ],
    keyFacts: [{"label": "Pentagon DMDC breach", "value": "More than 3 million people (ABC News)"}, {"label": "Citrix NetScaler", "value": "8 new vulnerabilities, 2 critical zero-days"}, {"label": "NSA post-quantum milestones", "value": "2027 (new systems) and 2030 (legacy phase-out)"}],
    highlights: ["Pentagon DMDC breach: More than 3 million people (ABC News)", "Citrix NetScaler: 8 new vulnerabilities, 2 critical zero-days", "NSA post-quantum milestones: 2027 (new systems) and 2030 (legacy phase-out)"],
  },
  {
    ...base,
    id: "obesity-drugs-keep-driving-pharmas-profits-as-pills-go-mainstream",
    sectionNumber: 6,
    section: "Healthcare & Pharma",
    sectionPath: "/healthcare",
    industry: "Healthcare & Pharma",
    title: "Obesity Drugs Keep Driving Pharma's Profits as Pills Go Mainstream",
    lede: "Lilly and Novo both raised forecasts in August, but pricing deals and new entrants are changing the economics.",
    location: "Global",
    readTime: "3 min read",
    image: img_HC1,
    body: [
      "The obesity-drug race remains the engine of pharma growth. IQVIA data cited by BNN Bloomberg put the global obesity drug market at $66 billion in 2025. In early August, Eli Lilly beat quarterly expectations and raised its full-year revenue forecast, sending shares up about 5% in premarket trading. Novo Nordisk raised its own profit and sales forecasts less than a day earlier.",
      "Lilly's Mounjaro and Zepbound together accounted for 64.7% of revenue in the latest reported quarter. The company's newly launched once-daily obesity pill, Foundayo, generated $98 million, short of analysts' average estimate of $105.6 million. Lilly's valuation passed $1 trillion in 2025.",
      "Novo's answer is its oral Wegovy pill. After the FDA approved the first oral GLP-1 for obesity at the end of 2025, Novo launched it in January at $149 a month out of pocket for lower doses, and the company is using it to try to claw back ground. Novo's shares fell by almost half in 2025, according to The Pharma Letter.",
      "Pricing is the backdrop. Both companies struck deals with the White House for lower prices through TrumpRx, including an initial $150 price point for future pills, and BioSpace reported at the start of the year that only about half of big pharmas had signed most-favoured-nation pricing agreements. PitchBook argues the deals have cleared a runway for new entrants by smoothing insurance coverage, though they also entrench the incumbents, whose manufacturing logistics are already resolved.",
      "Challengers are circling. In earlier readouts tracked by BioSpace, Pfizer licensed a new GLP-1 from YaoPharma after its contest with Novo for Metsera, and Structure Therapeutics' oral aleniglipron produced more than 11% weight loss in a Phase II trial, sending its shares up nearly 103% in a day. In a Phase III study, participants who switched to Lilly's orforglipron after 72 weeks on Wegovy or Zepbound largely maintained their weight loss for up to a year, suggesting a possible maintenance role for pills.",
      "Outside obesity, big pharma has been buying into CAR-T cell therapy, antibody-drug conjugates and small molecules, according to PitchBook, with larger deals such as Cidara, Verona Pharma and Avidity lifting exit values even as deal counts stayed muted. Analysts also said the failure of semaglutide to slow Alzheimer's progression removed an overhang on Biogen and Lilly's anti-amyloid drugs. Readers should note that several of these items date from late 2025 and early 2026, and we did not find fresher October-specific pharma coverage. Nothing here is medical advice.",
      "Why it matters: Volume is rising as prices fall. The winners will be the companies that can manufacture oral and injectable drugs at scale and live with lower per-patient pricing.",
    ],
    keyFacts: [{"label": "Global obesity drug market, 2025", "value": "$66 billion (IQVIA via BNN Bloomberg)"}, {"label": "Mounjaro and Zepbound share of Lilly revenue", "value": "64.7%"}, {"label": "Foundayo launch-quarter revenue", "value": "$98 million"}],
    highlights: ["Global obesity drug market, 2025: $66 billion (IQVIA via BNN Bloomberg)", "Mounjaro and Zepbound share of Lilly revenue: 64.7%", "Foundayo launch-quarter revenue: $98 million"],
  },
  {
    ...base,
    id: "tariffs-and-the-end-of-ev-credits-reshape-the-product-plan",
    sectionNumber: 7,
    section: "Industry & Supply Chain",
    sectionPath: "/supply-chain",
    industry: "Automotive & Mobility",
    title: "Tariffs and the End of EV Credits Reshape the Product Plan",
    lede: "Automakers are leaning on trucks, SUVs and hybrids while electric programmes are cut back or reworked.",
    location: "United States",
    readTime: "3 min read",
    image: img_Manu3,
    body: [
      "The US car market is settling rather than growing, according to a July analysis cited in Foley & Lardner's August automotive update. Ford and GM both raised full-year 2026 guidance on expectations of continued strong sales of higher-priced pickups and SUVs, even as Ford's second-quarter sales fell nearly 10% year on year during recovery from a supplier fire and EV-related charges produced a $1.3 billion net loss.",
      "The EV reset is the biggest driver. The $7,500 federal EV credit expired on 30 September 2025, after a record third quarter in which EVs reached 9.9% of US sales, per Cox Automotive. By December, EV share had fallen to 6.6% from 11.2% a year earlier. Ford took a $19.5 billion charge after abandoning the battery-electric F-150 Lightning and planned next-generation EV trucks and vans, and GM and others scaled back programmes.",
      "Tariffs add cost. One analysis estimates average new-vehicle prices in early 2026 were $8,000-$12,000 above late 2024, with $4,000-$6,000 of that attributable to tariffs; the Korea-built Hyundai Kona Electric was paused for 2026 and the Kia Niro EV discontinued. Cox's late-2025 forecast saw 2026 US sales falling 2.4% to 15.8 million units, and described a K-shaped market in which wealthier households keep buying while others are priced out.",
      "Demand has shifted toward hybrids. In California, hybrids reached a record 22.1% share in the first half of 2026, with 191,000 registrations, ahead of battery EVs at 15.9%, or about 137,000, while total new-vehicle sales in the state fell 7.7%. Rivian raised its 2026 guidance to 65,000-70,000 vehicles, and also issued a software recall affecting rearview camera visibility on its R1T, R1S and R2 models.",
      "Technology bets continue. GM and LG Energy Solution plan to produce lithium-manganese-rich prismatic cells at their Tennessee plant; GM says the cells are designed to offer 33% higher energy density than LFP at comparable cost. Delta Electronics is collaborating with Nvidia on autonomous-driving systems, and Semiconductor Engineering notes that AI-defined vehicles are pushing compute, memory bandwidth and validation requirements higher.",
      "China looms over trade. Chinese brands took 17% of new-vehicle sales in Mexico in the first half of 2026, up from 14%, selling 137,525 vehicles against 107,712 a year earlier, according to the Mexican dealers' association as cited by Reuters. Meanwhile the used-EV market has become the value story, with prices in the mid-$20,000s and often at or below comparable gasoline cars, according to one consumer analysis. Several figures above pre-date this edition by many months, and we did not find fresh September US sales data.",
      "Why it matters: Automakers are protecting margins with trucks, SUVs and hybrids and delaying EV volume. Expect more localisation of production and more write-downs tied to cancelled programmes.",
    ],
    keyFacts: [{"label": "California hybrid share, H1 2026", "value": "22.1% (battery EVs 15.9%)"}, {"label": "Ford EV-related charge", "value": "$19.5 billion"}, {"label": "Chinese brands' share in Mexico, H1 2026", "value": "17%"}],
    highlights: ["California hybrid share, H1 2026: 22.1% (battery EVs 15.9%)", "Ford EV-related charge: $19.5 billion", "Chinese brands' share in Mexico, H1 2026: 17%"],
  },
  {
    ...base,
    id: "airbus-retakes-the-delivery-lead-as-engines-remain-the-choke-point",
    sectionNumber: 7,
    section: "Industry & Supply Chain",
    sectionPath: "/supply-chain",
    industry: "Aerospace",
    title: "Airbus Retakes the Delivery Lead as Engines Remain the Choke Point",
    lede: "Boeing led the first quarter, but Airbus pulled ahead by mid-year even as supply chains limit both.",
    location: "Global",
    readTime: "3 min read",
    image: img_business_aviation_jet,
    body: [
      "The commercial aircraft race has swung back and forth this year. Boeing delivered 143 aircraft in the first quarter against Airbus's 114, its first quarterly lead since the 737 MAX crisis began in 2018, according to a Bangladesh Monitor report. Airbus's adjusted operating profit fell 52% to 300 million euros in the quarter, and chief executive Guillaume Faury said the company was suffering more than he could recall.",
      "The root cause was engines. Pratt & Whitney could not supply enough Geared Turbofan engines, with some 550 grounded aircraft awaiting repairs taking priority over new deliveries, and finished Airbus jets were parked awaiting powerplants. Reuters reported on 19 March that Airbus was seeking damages over delayed Pratt & Whitney deliveries, and that cabin-panel problems also weighed on early-year output.",
      "Airbus then recovered. According to InsideFlyer, it delivered 351 aircraft in the first half, led by 190 A320neos, against Boeing's 307, mostly 737 MAX jets. Airbus regained the lead in May after resolving administrative delays affecting 20 planes bound for China, and June deliveries of 89 were its highest month of the year. Boeing's recovery was constrained by production limits and a 2024 machinists' strike, and wiring damage on about 25 737 MAX aircraft was expected to trim first-quarter deliveries.",
      "Airbus is still targeting about 870 deliveries in 2026 and investing to raise A320-family production to 75 aircraft a month, though after the first quarter it needed 756 more deliveries in nine months. It has also told some customers of delays affecting A320neo deliveries scheduled for 2027 and 2028. The A320neo family has more than 7,000 aircraft on order.",
      "The constraints are structural. Both manufacturers face decade-long backlogs. Analysis by Oliver Wyman and IATA, as cited by eplaneai, says supply-chain disruption cost airlines more than $11 billion in the past year. AirInsight expects supply constraints to affect the industry through 2027 and notes Airbus cut its 2026 A220 target from 14 to 12 per month. It also expects sustainable aviation fuel to meet less than 3% of industry needs.",
      "Fuel costs added another wrinkle. One industry analysis described a fuel-driven airline slowdown as carriers recalculated growth during the Hormuz disruption, tying aerospace to the energy story elsewhere in this edition. For airlines, the implication is longer waits for new jets and effects on lease pricing; for investors, deliveries remain the cleanest near-term gauge of how quickly production converts into cash. Delivery figures here come from trade outlets and secondary reports rather than the manufacturers' own releases.",
      "Why it matters: Engine supply, not demand, is limiting output. Airlines planning fleet growth should assume long lead times at both manufacturers through at least 2027.",
    ],
    keyFacts: [{"label": "Airbus vs Boeing deliveries, H1 2026", "value": "351 vs 307 (InsideFlyer)"}, {"label": "Airbus 2026 delivery target", "value": "About 870"}, {"label": "Supply-chain cost to airlines, past year", "value": "More than $11 billion"}],
    highlights: ["Airbus vs Boeing deliveries, H1 2026: 351 vs 307 (InsideFlyer)", "Airbus 2026 delivery target: About 870", "Supply-chain cost to airlines, past year: More than $11 billion"],
  },
  {
    ...base,
    id: "deals-and-moves-roundup",
    sectionNumber: 4,
    section: "Mergers & Acquisitions",
    sectionPath: "/mergers-acquisitions",
    industry: "Corporate",
    title: "Deals and Moves Roundup",
    lede: "Transactions and partnerships reported in the past few weeks, mostly via Semiconductor Engineering's 2 October review.",
    location: "Global",
    readTime: "1 min read",
    image: img_FIN4,
    body: [
      "AMD / World Labs: $8.2 billion all-stock acquisition of a spatial-intelligence AI developer; close expected by end-2026.",
      "onsemi / Synaptics: Revised to $5.7 billion cash at $123 per share after a rival proposal; the June deal was worth about $7 billion.",
      "Broadcom / Anthropic: Anthropic's IPO filing identified it as the customer for Broadcom's financing of up to $42 billion to lease chips (Reuters).",
      "Samsung / Helix: $1 billion into an integrated AI infrastructure company spanning data centres, power and fibre.",
      "Synopsys / OpenAI: Multi-year agreement to develop GPT-Synopsys for chip-design workflows.",
      "Synopsys / Amazon: Multi-year custom-silicon IP agreement, extending to cloud and AI-powered engineering.",
      "DeepSeek / Huawei: DeepSeek to build programming tools optimised for Huawei's AI chips (Reuters).",
      "SK hynix / Solidigm: Reportedly weighing an IPO valuing the unit at up to $150 billion; SK says nothing is decided.",
      "Applied Materials: Kioxia and Besi join the $5 billion EPIC Center for memory and advanced packaging.",
      "Samsung Electro-Mechanics: About $4.9 billion for FC-BGA substrate capacity in South Korea and Vietnam.",
    ],
    keyFacts: [{"label": "AMD / World Labs", "value": "$8.2 billion all-stock"}, {"label": "onsemi / Synaptics", "value": "$5.7 billion cash, $123 a share"}, {"label": "Broadcom / Anthropic", "value": "Financing of up to $42 billion"}],
    highlights: ["AMD / World Labs: $8.2 billion all-stock", "onsemi / Synaptics: $5.7 billion cash, $123 a share", "Broadcom / Anthropic: Financing of up to $42 billion"],
  },
];

/* "Numbers at a Glance" — headline figures from the edition. */
export const octEditionGlance: { indicator: string; figure: string; source: string }[] = [
  { indicator: "Global growth forecast, 2026 / 2027", figure: "3.0% / 3.4%", source: "IMF, July 2026" },
  { indicator: "Global headline inflation forecast, 2026", figure: "4.7%", source: "IMF, July 2026" },
  { indicator: "Global oil supply loss in March 2026", figure: "10.1 million bpd", source: "World Bank" },
  { indicator: "Big-4 hyperscaler capex, Q1 2026", figure: "$130.6 billion", source: "RexShares (company filings)" },
  { indicator: "Nvidia data-center revenue (fiscal Q1 FY27)", figure: "$75.2 billion, +92%", source: "Gotrade; RexShares" },
  { indicator: "South Korea chip exports, September 2026", figure: "$60 billion record, +262% y/y", source: "Semiconductor Engineering" },
  { indicator: "Airbus vs Boeing deliveries, H1 2026", figure: "351 vs 307", source: "InsideFlyer" },
  { indicator: "Global obesity drug market, 2025", figure: "$66 billion", source: "IQVIA via BNN Bloomberg" },
];

export function octEditionArticlePath(article: Pick<OctEditionArticle, "id">) {
  return `/article/${article.id}`;
}

/* Business-related stories of the edition. Deep Technology and Cybersecurity
   stay on the homepage and their own sections; they are not business news. */
const NON_BUSINESS_INDUSTRIES = ["Deep Technology", "Cybersecurity"];

export const octBusinessArticles: OctEditionArticle[] =
  octEditionArticles.filter(
    (article) => !NON_BUSINESS_INDUSTRIES.includes(article.industry)
  );

export function isOctBusinessArticle(id?: string) {
  return octBusinessArticles.some((article) => article.id === id);
}
