/* =========================================================
   THE PRIDE TIMES NEWS — LATEST TECHNOLOGY LAUNCH REPORT
   Edition of Friday, 16 October 2026
   Source: "Latest Technology Launch Report" (research snapshot,
   16 October 2026, prepared from public reporting).

   This file is ADDITIVE. It does not change the 13 October
   edition (oct13EditionData.ts), the 7 October edition
   (octEditionData.ts), the September digest (digestArticleData.ts)
   or Edition 1 (maEdition1Data.ts). The homepage leads with these
   stories; every older story stays in the Latest News feed
   ("Show more stories") and in its own section pages.

   Performance figures and prices are manufacturer, event or
   reported claims, not independent results. Check the company or
   the publisher named in each story for current details.
========================================================= */

import type { OctEditionArticle } from "./octEditionData";

import img_Techheroimage from "../../imports/Techheroimage.png";
import img_Smartc1 from "../../imports/Smartc1.png";
import img_warehouse_robotics from "../../imports/warehouse-robotics.png";
import img_Manu3 from "../../imports/Manu3.png";
import img_data_centre from "../../imports/data-centre.png";
import img_pt_digital_economy from "../../imports/pt-digital-economy.png";

export const techLaunchMeta = {
  title: "The Pride Times News",
  edition: "Latest Technology Launch Report",
  date: "16 October 2026",
  subtitle:
    "Tesla's flying-car-style Roadster demonstration, smart-home, robotics, physical AI, space computing and AI PC launches.",
};

const TECH16_NOTE =
  "The Pride Times News, Latest Technology Launch Report, 16 October 2026. Research snapshot prepared from public reporting. A launch can mean a product announcement, a public demonstration or a planned commercial release, and these are not the same thing. Performance figures and prices are manufacturer, event or reported claims rather than independent test results. Confirm availability, pricing and specifications with the company concerned. This report is a summary and not investment advice.";

const base = {
  author: "The Pride Times Newsroom",
  publishedAt: "16 October 2026",
  quote: { text: "", by: "" },
  /* -1 = no pull quote is rendered. */
  quoteAfter: -1,
  editorNote: TECH16_NOTE,
  sectionNumber: 2,
  section: "Technology and AI",
  sectionPath: "/technology",
};

type Story = Omit<
  OctEditionArticle,
  | "author"
  | "publishedAt"
  | "quote"
  | "quoteAfter"
  | "editorNote"
  | "sectionNumber"
  | "section"
  | "sectionPath"
  | "highlights"
> & {
  keyFacts: { label: string; value: string }[];
};

function story(fields: Story): OctEditionArticle {
  return {
    ...base,
    ...fields,
    highlights: fields.keyFacts.map((fact) => `${fact.label}: ${fact.value}`),
  };
}

export const techLaunchArticles: OctEditionArticle[] = [
  /* ---------------------------------------------------------
     1. LEAD STORY — TESLA ROADSTER DEMONSTRATION
  --------------------------------------------------------- */
  story({
    id: "tesla-roadster-demo-shows-thruster-assisted-flight",
    industry: "Automotive and Mobility",
    title: "Tesla Shows a Thruster-Equipped Roadster in a Flying-Car-Style Demonstration",
    lede: "A redesigned next-generation Roadster performed brief aerial manoeuvres and a controlled landing in Texas, but production is not expected until 2028.",
    location: "Texas, USA",
    readTime: "4 min read",
    image: img_Techheroimage,
    body: [
      "Tesla revealed a redesigned, next-generation Roadster at a demonstration in Texas on 15 October 2026. News reports describe a vehicle that used SpaceX-designed thrusters to perform brief aerial manoeuvres, including a flip and a controlled landing.",
      "The vehicle is an all-electric, two-seat Roadster, with special thruster-equipped configurations. Some of the manoeuvres were shown in a controlled test setting. The demonstration is extraordinary, but it does not show that an everyday road-legal flying car is ready for customers.",
      "Tesla executives reported performance claims of 0 to 60 mph in under one second, a top speed above 230 mph and more than 300 miles of range. These are manufacturer and event claims, not independent test results.",
      "Tesla has indicated a production target of 2028, although timing may change. Reservation deposits of $50,000 for a Performance version and $250,000 for a Thrust version have been reported. Availability, final pricing, specifications and delivery terms should be confirmed directly with Tesla.",
      "Several questions remain open. These include safety certification, aviation and road regulations, practical flight range, noise, operating costs, and whether the flight-capable configuration will be approved for public use.",
      "Why it matters: the demonstration is a strong signal of high-performance EV engineering, but the regulatory path is the real test. Readers should separate what was shown on stage from what can legally be sold and flown.",
    ],
    keyFacts: [
      { label: "Demonstration", value: "Texas, 15 October 2026" },
      { label: "Production target", value: "2028 (timing may change)" },
      { label: "Claimed performance", value: "0–60 mph in under 1 s; top speed above 230 mph; more than 300 miles range" },
      { label: "Reported deposits", value: "$50,000 Performance; $250,000 Thrust" },
    ],
  }),

  /* ---------------------------------------------------------
     2. APPLE HOMEVIEW
  --------------------------------------------------------- */
  story({
    id: "apple-homeview-brings-upgraded-siri-to-the-smart-home",
    industry: "Consumer Technology",
    title: "Apple Introduces HomeView, a $299 Smart-Home Screen With Upgraded Siri",
    lede: "The 7-inch device controls locks, thermostats and doorbells, and adds an upgraded Siri experience and facial recognition.",
    location: "Global",
    readTime: "3 min read",
    image: img_Smartc1,
    body: [
      "Reuters reported on 13 October 2026 that Apple had introduced HomeView, a 7-inch smart-home screen priced from $299.",
      "The device is designed to control connected home devices such as locks, thermostats and doorbells. It comes with an upgraded Siri experience and facial recognition.",
      "Shipping was expected to begin the following month. Regional availability may vary, so buyers should check local availability before planning a purchase.",
      "For households with several connected devices, the appeal is a single control point. Real-world performance and compatibility will matter more than the launch headline. Any screen that uses facial recognition also raises privacy questions, so buyers should review the device's settings and data options once it ships.",
    ],
    keyFacts: [
      { label: "Price", value: "From $299" },
      { label: "Screen", value: "7-inch smart-home display" },
      { label: "Expected shipping", value: "The month after the 13 October announcement (reported)" },
      { label: "Key features", value: "Upgraded Siri; facial recognition" },
    ],
  }),

  /* ---------------------------------------------------------
     3. LANTRONIX SPOTTER
  --------------------------------------------------------- */
  story({
    id: "lantronix-spotter-brings-ai-sensing-and-control-to-drones-and-robots",
    industry: "Robotics and Drones",
    title: "Lantronix Spotter Packs AI Processing, Sensing and Control Into One Platform",
    lede: "A compact computing platform for autonomous drones and robots combines AI, sensing and vehicle control, with availability planned for Q4 2026.",
    location: "Global",
    readTime: "3 min read",
    image: img_warehouse_robotics,
    body: [
      "Lantronix has announced Spotter, a compact computing and control platform for autonomous drones and robots.",
      "The platform combines AI processing, sensing and vehicle-control functions in one unit. According to the report, availability is planned for the fourth quarter of 2026.",
      "Modules like this can help developers add perception and autonomy to aerial, ground and maritime robots without building every layer from scratch.",
      "Real-world performance depends on the full system, including the sensors and software around it, and on rigorous safety testing. A compact platform is a building block, not a finished autonomous machine.",
    ],
    keyFacts: [
      { label: "Product", value: "Spotter compact computing and control platform" },
      { label: "Functions", value: "AI processing, sensing and vehicle control" },
      { label: "Planned availability", value: "Q4 2026" },
    ],
  }),

  /* ---------------------------------------------------------
     4. INNER SKY LABS PHYSICAL AI
  --------------------------------------------------------- */
  story({
    id: "inner-sky-labs-indian-physical-ai-models-target-safer-robots",
    industry: "Physical AI",
    title: "Inner Sky Labs Unveils India-Built Physical AI Models for Robots and Machines",
    lede: "The system pairs vision, audio and touch perception with action planning and a separate safety layer, and access is partner-based for now.",
    location: "India",
    readTime: "3 min read",
    image: img_Manu3,
    body: [
      "A report dated 12 October 2026 described a physical-AI system developed in India by Inner Sky Labs.",
      "The system combines perception models for vision, audio and touch with action-planning models. A separate safety layer is designed to keep the system's actions within defined rules.",
      "The stated goal is to help robots, drones and industrial machines understand their surroundings and act within those rules.",
      "Access was reported as partner or invitation based, so this is not necessarily a mass-market product. Companies evaluating it should look for independent benchmarks and deployment evidence before relying on it in a live operating environment.",
      "Physical AI is one of the clearest signs that AI is moving from screens into machines, which makes the safety layer as important as the models themselves.",
    ],
    keyFacts: [
      { label: "Perception", value: "Vision, audio and touch" },
      { label: "Safety", value: "Separate safety layer with defined rules" },
      { label: "Access", value: "Partner or invitation based (reported)" },
    ],
  }),

  /* ---------------------------------------------------------
     5. GOOGLE PROJECT SUNCATCHER
  --------------------------------------------------------- */
  story({
    id: "google-project-suncatcher-tests-ai-computing-in-orbit",
    industry: "Space and Deep Technology",
    title: "Google's Project Suncatcher Studies AI Computing in Orbit",
    lede: "An experimental satellite effort carrying Google TPU accelerators is testing whether AI computing can work in space. It is still research, not a replacement for data centres.",
    location: "Global",
    readTime: "3 min read",
    image: img_data_centre,
    body: [
      "Google's Project Suncatcher is an experimental effort to study AI computing in orbit, using satellites that carry Google TPU accelerators.",
      "Reporting ahead of a planned early-October test described a small prototype and short initial computing runs. The effort remains research, and it is not a deployed replacement for terrestrial data centres.",
      "The challenges are substantial. Power, cooling, communications, launch cost and maintenance all have to work together in orbit, and each is difficult on its own.",
      "The next milestones to watch are confirmation of successful orbital tests, actual compute uptime and communication performance, and the total economics of each mission.",
    ],
    keyFacts: [
      { label: "Hardware", value: "Google TPU accelerators on satellites" },
      { label: "Stage", value: "Experimental; short initial computing runs reported" },
      { label: "Key challenges", value: "Power, cooling, communications, launch cost, maintenance" },
    ],
  }),

  /* ---------------------------------------------------------
     6. LENOVO AND ACER AI PCS
  --------------------------------------------------------- */
  story({
    id: "lenovo-and-acer-plan-october-ai-pcs-on-nvidia-rtx-spark",
    industry: "AI Hardware",
    title: "Lenovo and Acer Plan October AI PCs Built on Nvidia's RTX Spark Platform",
    lede: "The systems pair a Blackwell GPU with a Grace CPU, part of a wider shift toward AI workloads running on the device itself.",
    location: "Global",
    readTime: "3 min read",
    image: img_pt_digital_economy,
    body: [
      "Reuters reported that PC makers Lenovo and Acer planned to release systems in October 2026 using Nvidia's RTX Spark platform.",
      "The platform combines a Blackwell GPU with a Grace CPU, bringing advanced AI chip designs into personal computers.",
      "The broader trend is on-device AI. Processing some workloads locally can reduce reliance on the cloud and cut response times.",
      "Capability will vary by model size, memory, power and software support, so buyers should check which AI features are actually available on a given machine.",
    ],
    keyFacts: [
      { label: "Platform", value: "Nvidia RTX Spark (Blackwell GPU and Grace CPU)" },
      { label: "Planned PC launches", value: "October 2026 (Lenovo and Acer, reported)" },
      { label: "Trend", value: "On-device AI" },
    ],
  }),
];
