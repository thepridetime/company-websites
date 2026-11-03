import type { SpecialArticle } from "./specialArticleData";
import type { InnovationStory } from "./innovationData";

import satelliteImg from "../../imports/satellite-orbit-space.jpg";
import quantumImg from "../../imports/quantum-computing-chip.jpg";
import warehouseRobotImg from "../../imports/warehouse-robotics.png";
import photonicsImg from "../../imports/photonics-chip-engineer.jpg";
import digitalTwinImg from "../../imports/Manu2.png";
import rocketImg from "../../imports/space-tech-rocket.jpg";
import dataCentreImg from "../../imports/data-centre.png";
import batteryImg from "../../imports/Energy1.png";

/* =========================================================
   INNOVATION ARTICLES
   Full article pages for the Innovation page. Connected to
   getSpecialArticleById through specialArticleData.ts, so every
   headline on the Innovation page opens a real article.
========================================================= */

export const innovationExtraArticles: SpecialArticle[] = [
  {
    id: "innovation-leo-broadband-remote-regions",
    section: "Innovation",
    category: "SPACE TECH",
    title: "Low-Orbit Satellite Networks Push Broadband Into Remote Regions",
    dek: "Satellite operators are positioning low-orbit networks as a practical route to high-speed internet where fibre and mobile towers are expensive to build.",
    image: satelliteImg,
    author: "The Pride Times Editorial",
    publishedAt: "October 1, 2026",
    readTime: "7 MIN READ",
    highlights: [
      "Low-orbit constellations can reach areas where laying cable is slow and costly.",
      "Coverage quality depends on satellite density, ground equipment and spectrum access.",
      "Governments are weighing connectivity goals against licensing and national security rules.",
      "Pricing will determine whether rural adoption moves beyond early pilot users.",
    ],
    sections: [
      {
        heading: "Why connectivity is the central argument",
        body: "Low-orbit networks are attractive because they avoid much of the ground infrastructure that makes rural broadband expensive. A single satellite network can serve areas that would otherwise wait years for fibre, which makes it relevant to schools, clinics, farms and small businesses.",
      },
      {
        heading: "What determines real-world performance",
        body: "Speed and reliability depend on how many satellites are in orbit, how much ground equipment is deployed and how much capacity is available over each region. Early performance figures often describe ideal conditions, so buyers will look for consistent results across weather, terrain and peak usage.",
      },
      {
        heading: "The policy and pricing questions",
        body: "Spectrum allocation, landing rights and data-sovereignty rules can shape how quickly these networks expand. Pricing is equally important: services must be affordable to households and institutions that currently have few alternatives.",
      },
    ],
    keyFacts: [
      { label: "Desk", value: "Innovation" },
      { label: "Format", value: "Analysis" },
      { label: "Sector", value: "Space technology" },
      { label: "Publication", value: "The Pride Times" },
    ],
  },
  {
    id: "innovation-quantum-error-correction",
    section: "Innovation",
    category: "QUANTUM COMPUTING",
    title: "Error Correction Becomes the Deciding Test for Commercial Quantum Systems",
    dek: "Raw qubit counts no longer tell the full story. Researchers and vendors are now judged on how reliably their machines can detect and correct errors.",
    image: quantumImg,
    author: "The Pride Times Editorial",
    publishedAt: "October 5, 2026",
    readTime: "8 MIN READ",
    highlights: [
      "Quantum processors are highly sensitive to noise, making error handling essential.",
      "Logical qubits, built from many physical qubits, are becoming the more meaningful benchmark.",
      "Commercial use cases depend on stable operation over long computations.",
      "Hardware, control software and cooling systems all influence overall reliability.",
    ],
    sections: [
      {
        heading: "Why qubit counts are not enough",
        body: "A large number of qubits is only useful if those qubits can hold information long enough to complete a calculation. Noise introduces errors quickly, so the number of physical qubits matters less than how many can be combined into reliable logical qubits.",
      },
      {
        heading: "What changes for businesses",
        body: "For companies evaluating quantum computing, the practical question is whether a system can run a specific workload with acceptable accuracy and cost. That shifts procurement toward performance benchmarks, pilot results and clear roadmaps rather than headline hardware announcements.",
      },
      {
        heading: "What to watch",
        body: "Progress will be visible in published error rates, the number of logical qubits demonstrated, and the availability of software tools that let developers work without deep hardware expertise.",
      },
    ],
    keyFacts: [
      { label: "Desk", value: "Innovation" },
      { label: "Format", value: "Analysis" },
      { label: "Sector", value: "Quantum computing" },
      { label: "Publication", value: "The Pride Times" },
    ],
  },
  {
    id: "innovation-warehouse-robots-networks",
    section: "Innovation",
    category: "ROBOTICS",
    title: "Warehouse Robots Move From Pilot Projects to Full Logistics Networks",
    dek: "Companies that once tested a few robots in one facility are now connecting automated systems across entire distribution networks.",
    image: warehouseRobotImg,
    author: "The Pride Times Editorial",
    publishedAt: "October 8, 2026",
    readTime: "6 MIN READ",
    highlights: [
      "Pilot programmes are giving way to multi-site deployments.",
      "Software that coordinates robots matters as much as the hardware itself.",
      "Labour availability and wage pressure continue to drive automation decisions.",
      "Integration with existing warehouse management systems remains a key challenge.",
    ],
    sections: [
      {
        heading: "From single sites to networks",
        body: "Early warehouse automation was often limited to one building with carefully controlled conditions. The next stage connects robots, inventory systems and transport planning across several sites, so operators can move stock where demand is highest.",
      },
      {
        heading: "The software layer",
        body: "Fleet management software decides how robots share routes, charge their batteries and respond to changing orders. Companies that get this layer right can expand automation without rebuilding their operations each time they add a site.",
      },
      {
        heading: "The workforce question",
        body: "Automation changes the roles people perform in warehouses rather than removing them entirely. Maintenance, exception handling and supervision become more important, which means training programmes are becoming part of every deployment plan.",
      },
    ],
    keyFacts: [
      { label: "Desk", value: "Innovation" },
      { label: "Format", value: "Analysis" },
      { label: "Sector", value: "Logistics robotics" },
      { label: "Publication", value: "The Pride Times" },
    ],
  },
  {
    id: "innovation-photonics-data-centres",
    section: "Innovation",
    category: "AI HARDWARE",
    title: "Photonics Emerges as a Possible Route Around Data-Centre Power Limits",
    dek: "As AI workloads grow, engineers are testing optical connections that could move data with less energy than conventional electrical links.",
    image: photonicsImg,
    author: "The Pride Times Editorial",
    publishedAt: "October 10, 2026",
    readTime: "7 MIN READ",
    highlights: [
      "Data movement between chips is becoming a major source of energy consumption.",
      "Optical interconnects promise higher bandwidth at lower power per bit.",
      "Manufacturing photonic components at scale remains technically demanding.",
      "Adoption will depend on compatibility with existing chip and server designs.",
    ],
    sections: [
      {
        heading: "The bottleneck is moving data",
        body: "Training and running large AI models requires constant movement of data between processors and memory. As those connections become faster, the energy spent moving data can rival the energy spent on computation itself.",
      },
      {
        heading: "Why light is attractive",
        body: "Photonic links can carry more information over shorter distances with less heat than electrical wiring. That makes them a candidate for connecting chips inside a server or linking servers across a data centre.",
      },
      {
        heading: "The engineering hurdles",
        body: "Lasers, modulators and detectors must be integrated reliably into chip packages, and their yields must be high enough for mass production. Standards for interoperability will also determine whether photonic components can be adopted without redesigning entire systems.",
      },
    ],
    keyFacts: [
      { label: "Desk", value: "Innovation" },
      { label: "Format", value: "Analysis" },
      { label: "Sector", value: "AI hardware" },
      { label: "Publication", value: "The Pride Times" },
    ],
  },
  {
    id: "innovation-digital-twins-daily-operations",
    section: "Innovation",
    category: "SMART MANUFACTURING",
    title: "Digital Twins Shift From Showcase Projects to Daily Plant Operations",
    dek: "Virtual replicas of factories are moving out of innovation labs and into the routine work of scheduling, maintenance and quality control.",
    image: digitalTwinImg,
    author: "The Pride Times Editorial",
    publishedAt: "October 12, 2026",
    readTime: "6 MIN READ",
    highlights: [
      "Digital twins are being used to test production changes before they reach the floor.",
      "Maintenance teams use them to anticipate equipment problems.",
      "Data quality from sensors determines how useful a twin can be.",
      "Plants are starting with one line or one process before scaling up.",
    ],
    sections: [
      {
        heading: "Testing before changing",
        body: "A digital twin lets engineers simulate a change to a production line, such as a new layout or a different product mix, before committing equipment and labour. This reduces the risk of costly disruption on the actual shop floor.",
      },
      {
        heading: "Maintenance and quality",
        body: "By combining sensor data with the virtual model, plants can flag unusual patterns that often come before a breakdown or a defect. The value comes from acting on those signals early rather than producing reports after the fact.",
      },
      {
        heading: "Starting small",
        body: "Most successful projects begin with a single line or process. The lessons learned there, particularly about data collection and staff training, shape how the approach is extended to other parts of the plant.",
      },
    ],
    keyFacts: [
      { label: "Desk", value: "Innovation" },
      { label: "Format", value: "Analysis" },
      { label: "Sector", value: "Smart manufacturing" },
      { label: "Publication", value: "The Pride Times" },
    ],
  },
  {
    id: "innovation-reusable-rockets-launch-economics",
    section: "Innovation",
    category: "SPACE TECH",
    title: "Reusable Rockets Reshape the Economics of Launch Services",
    dek: "Recovering and reflying rocket stages is changing how launch providers price missions and how satellite operators plan their deployments.",
    image: rocketImg,
    author: "The Pride Times Editorial",
    publishedAt: "October 14, 2026",
    readTime: "7 MIN READ",
    highlights: [
      "Reusable boosters lower the cost of each launch when recovery and refurbishment work reliably.",
      "Lower launch costs make smaller satellite missions more economical.",
      "Reliability and turnaround time matter as much as headline price.",
      "New entrants must prove they can reuse hardware at a sustained pace.",
    ],
    sections: [
      {
        heading: "What reuse changes",
        body: "A rocket that can fly again spreads its manufacturing cost across several missions. That changes the price of each launch and, over time, the range of missions that are financially practical.",
      },
      {
        heading: "Who benefits",
        body: "Satellite operators gain flexibility in scheduling and cost planning. Smaller companies and research groups that could not justify a dedicated launch may now be able to reach orbit through shared missions.",
      },
      {
        heading: "The test ahead",
        body: "Savings only hold if refurbishment is quick and inspection standards are strict enough to protect payloads. The most useful indicator will be how many times a single booster flies with minimal rework.",
      },
    ],
    keyFacts: [
      { label: "Desk", value: "Innovation" },
      { label: "Format", value: "Analysis" },
      { label: "Sector", value: "Space technology" },
      { label: "Publication", value: "The Pride Times" },
    ],
  },
  {
    id: "innovation-data-centre-cooling",
    section: "Innovation",
    category: "AI HARDWARE",
    title: "Data Centres Redesign Cooling as AI Workloads Concentrate Heat",
    dek: "Dense AI racks generate far more heat than traditional servers, pushing operators toward liquid cooling and new facility designs.",
    image: dataCentreImg,
    author: "The Pride Times Editorial",
    publishedAt: "October 16, 2026",
    readTime: "6 MIN READ",
    highlights: [
      "AI accelerators concentrate far more heat into each rack than earlier servers.",
      "Liquid cooling is moving from specialist use to mainstream planning.",
      "Water use and energy efficiency are becoming central to site approvals.",
      "Facility design now begins with the cooling system, not the building shell.",
    ],
    sections: [
      {
        heading: "The heat problem",
        body: "Traditional air cooling struggles when racks draw very high power. Operators are therefore rethinking how heat is removed, from the chip package to the building's external systems.",
      },
      {
        heading: "Liquid and hybrid designs",
        body: "Direct-to-chip liquid cooling and immersion systems can remove heat more efficiently than air alone. Many operators are adopting hybrid designs that combine both approaches, depending on hardware and location.",
      },
      {
        heading: "Planning and permits",
        body: "Local authorities increasingly ask about water use, energy sources and waste heat. Projects that plan these details early are more likely to secure approval and avoid costly redesigns.",
      },
    ],
    keyFacts: [
      { label: "Desk", value: "Innovation" },
      { label: "Format", value: "Analysis" },
      { label: "Sector", value: "Data centres" },
      { label: "Publication", value: "The Pride Times" },
    ],
  },
  {
    id: "innovation-battery-storage-grid",
    section: "Innovation",
    category: "ENERGY TECH",
    title: "Battery Storage Designs Compete on Safety as Grid Demand Rises",
    dek: "As utilities add more batteries to balance renewable power, safety, lifespan and fire prevention are becoming key buying criteria.",
    image: batteryImg,
    author: "The Pride Times Editorial",
    publishedAt: "October 19, 2026",
    readTime: "6 MIN READ",
    highlights: [
      "Grid-scale batteries store surplus renewable power and release it when demand peaks.",
      "Safety design, including thermal management, is now a leading purchasing factor.",
      "Battery lifespan affects the long-term cost of storage projects.",
      "Recycling and supply-chain sourcing are becoming part of project approvals.",
    ],
    sections: [
      {
        heading: "Why storage matters now",
        body: "Solar and wind generation vary with weather and time of day. Batteries allow grids to hold energy for later use, which is becoming essential as renewable capacity grows.",
      },
      {
        heading: "Safety as a design requirement",
        body: "Thermal management, monitoring and containment systems are increasingly built into storage projects from the start. Operators and regulators want evidence that a single cell failure will not spread through a site.",
      },
      {
        heading: "Cost over the full life",
        body: "The cheapest battery to purchase is not always the cheapest to operate. Lifespan, degradation rates and replacement planning will shape which designs win long-term contracts.",
      },
    ],
    keyFacts: [
      { label: "Desk", value: "Innovation" },
      { label: "Format", value: "Analysis" },
      { label: "Sector", value: "Energy storage" },
      { label: "Publication", value: "The Pride Times" },
    ],
  },
];

/* Same articles in the shape the Innovation page's story cards use */
export const innovationExtraStories: InnovationStory[] = innovationExtraArticles.map(
  (article) => ({
    id: article.id,
    category: article.category,
    title: article.title,
    summary: article.dek,
    publishedAt: article.publishedAt,
    readTime: article.readTime.toLowerCase(),
    image: article.image as string,
    url: `/article/${article.id}`,
  })
);
