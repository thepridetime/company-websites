/* =========================================================
   TECHNOLOGY NEWS — SHARED DATA
   THE PRIDE TIMES
   Updated: September 2026
========================================================= */

export type TechnologyArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  image: string;
  highlights: string[];
  sections: {
    heading: string;
    body: string;
  }[];
};

const AUTHOR = "The Pride Times Editorial Desk";

/* =========================================================
   ARTICLE 1
========================================================= */

const technologyLandscapeArticle: TechnologyArticle = {
  id: "tech-pagaya",
  category: "TECHNOLOGY",
  title:
    "Artificial Intelligence Becomes the Defining Theme of the Global Technology Landscape",
  excerpt:
    "Artificial intelligence has moved beyond the role of an assistive software tool and is increasingly becoming a core layer of enterprise decision-making, infrastructure planning and digital operations.",
  author: AUTHOR,
  publishedAt: "2026-09-29T06:00:00Z",
  image:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=85",
  highlights: [
    "Artificial intelligence is becoming a defining force across the global technology industry.",
    "AI systems are moving from assistive applications toward increasingly autonomous decision-making.",
    "Enterprise adoption is expanding across healthcare, logistics, finance and other operational sectors.",
    "The U.S.-China AI competition continues to combine model development, infrastructure and large-scale deployment.",
    "Data-center electricity demand and secure power availability are becoming strategic infrastructure issues.",
    "AI adoption is increasingly influencing technology regulation and corporate governance frameworks.",
  ],
  sections: [
    {
      heading: "AI becomes the defining technology theme",
      body:
        "Artificial intelligence has become one of the central forces shaping the global technology landscape in 2026. The industry's focus is no longer limited to chatbots, coding assistants or individual productivity tools. AI is increasingly being integrated into enterprise systems that can analyze information, recommend actions and, in some cases, execute multi-step tasks with limited human intervention. This transition is changing how companies think about software, computing infrastructure, data and workforce productivity.",
    },
    {
      heading: "From assistive AI to autonomous systems",
      body:
        "The most important change is the movement from assistive AI toward autonomous and agentic systems. Earlier generations of enterprise AI generally required a person to initiate an action, interpret the output and decide what to do next. Newer systems are being designed to operate across workflows, connect to enterprise data and tools, and complete sequences of tasks. This can include research, procurement, customer support, software development, document processing and operational planning.",
    },
    {
      heading: "Enterprise adoption expands",
      body:
        "AI adoption is spreading across sectors that depend heavily on information processing and operational coordination. Healthcare organizations are examining AI for clinical and administrative workflows. Logistics companies are using machine intelligence for routing and planning. Financial institutions are applying AI to research, risk analysis and customer operations. Enterprises are also experimenting with AI agents that can interact with internal software systems and automate repetitive processes.",
    },
    {
      heading: "The U.S.-China AI race",
      body:
        "Competition between the United States and China remains a major theme in the global AI industry. The two technology ecosystems are pursuing different combinations of model capability, computing infrastructure, semiconductor access and large-scale deployment. The United States continues to have major advantages in several areas of advanced AI development and private-sector investment, while China is emphasizing broad deployment, industrial integration and scale.",
    },
    {
      heading: "Compute is becoming strategic infrastructure",
      body:
        "The expansion of advanced AI is increasing demand for GPUs, specialized accelerators, cloud capacity and data centers. The result is that AI strategy increasingly depends on physical infrastructure. Companies developing advanced models require access to large computing clusters, while enterprises deploying AI at scale need reliable cloud and data-center capacity. This makes infrastructure availability a central part of technology planning.",
    },
    {
      heading: "Power availability becomes a constraint",
      body:
        "The electricity requirements associated with AI infrastructure are becoming increasingly important. Data centers require continuous power not only for computing but also for cooling and supporting infrastructure. Industry projections indicate that global data-center electricity consumption could approach 1,000 TWh by 2030. As a result, secure access to electricity is increasingly becoming a prerequisite for new AI infrastructure projects.",
    },
    {
      heading: "Infrastructure readiness versus demand",
      body:
        "The challenge is not simply constructing additional data-center buildings. Grid connections, transmission capacity, generation availability, cooling systems and permitting timelines can all affect how quickly computing capacity can become operational. In some markets, access to secure power may become a greater constraint than the physical construction of the data center itself.",
    },
    {
      heading: "Enterprise AI ecosystems are expanding",
      body:
        "The enterprise AI market is also becoming more interconnected. Model providers, semiconductor companies, cloud platforms, application developers and AI framework companies are increasingly working together. Partnerships involving NVIDIA-powered infrastructure and enterprise software ecosystems illustrate how AI deployment is becoming a multi-layer technology stack rather than a single-product market.",
    },
    {
      heading: "EY, NVIDIA and LangChain",
      body:
        "Enterprise adoption is also being supported by collaborations designed to make advanced AI systems easier to integrate into business environments. EY has expanded its NVIDIA-powered enterprise AI capabilities, while LangChain technology is being used in the broader ecosystem for developing and validating agent-based AI applications. These developments reflect the industry's move toward production-grade AI systems rather than experimental prototypes.",
    },
    {
      heading: "Regulation follows technological change",
      body:
        "As AI systems become more autonomous, regulators are examining questions that were less important when AI was primarily an assistive tool. Issues include accountability, transparency, privacy, safety, data governance and the appropriate level of human oversight. The transition toward autonomous decision-making therefore has implications beyond software engineering and into corporate governance and public policy.",
    },
    {
      heading: "The economic outlook",
      body:
        "The International Monetary Fund has projected global economic growth of 3.1% in 2026. Broader adoption of artificial intelligence is increasingly discussed as a potential upside factor for productivity and economic activity. The economic effect of AI will ultimately depend on how quickly businesses can translate technological capability into measurable productivity gains, new products and more efficient operations.",
    },
    {
      heading: "What technology companies are watching",
      body:
        "Technology companies are increasingly monitoring several connected variables: model capability, inference costs, semiconductor supply, data-center capacity, electricity availability, enterprise adoption and regulatory requirements. Together these factors are shaping investment decisions across the technology sector. The next phase of the AI industry will therefore be determined not only by better models, but also by the infrastructure and business systems capable of deploying them at scale.",
    },
  ],
};

/* =========================================================
   ARTICLE 2 — AGENTIC AI
========================================================= */

const agenticAIArticle: TechnologyArticle = {
  id: "tech-heidi",
  category: "ARTIFICIAL INTELLIGENCE",
  title:
    "Agentic AI Moves Into Enterprise Workflows and Embedded Procurement",
  excerpt:
    "AI agents are increasingly being designed to operate inside enterprise workflows, moving the technology conversation from generating information toward executing business processes.",
  author: AUTHOR,
  publishedAt: "2026-09-29T05:30:00Z",
  image:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=85",
  highlights: [
    "Agentic AI is moving beyond conversational interfaces.",
    "Enterprise agents can connect models with business applications and internal data.",
    "Procurement is emerging as an important use case for workflow automation.",
    "Companies must balance autonomy with controls, permissions and human oversight.",
    "Agent-based systems could change how enterprises organize repetitive knowledge work.",
  ],
  sections: [
    {
      heading: "The next phase of enterprise AI",
      body:
        "Enterprise artificial intelligence is entering a phase in which systems are increasingly expected to do more than answer questions. Agentic AI systems are being designed to reason through a sequence of tasks, use software tools, retrieve information and complete actions. This changes the role of AI from an interface for information retrieval into a potential operational layer for businesses.",
    },
    {
      heading: "Embedded procurement workflows",
      body:
        "Procurement is one example where agentic systems can potentially automate multiple connected steps. An AI system could compare suppliers, examine requirements, identify pricing information, prepare documentation and route a recommendation to the appropriate employee. The objective is not necessarily to eliminate human decision-making but to reduce the amount of repetitive administrative work surrounding it.",
    },
    {
      heading: "Why enterprise integration matters",
      body:
        "The usefulness of an AI agent depends heavily on its ability to access the systems where business information actually exists. Enterprise resource planning systems, customer relationship management platforms, procurement software, databases and internal knowledge repositories therefore become important components of an agentic architecture.",
    },
    {
      heading: "The control problem",
      body:
        "Greater autonomy also creates new governance requirements. Companies need to determine which actions an agent can perform independently, which actions require approval and what information it is permitted to access. Permission systems, audit trails, monitoring and human review are therefore becoming important components of enterprise AI deployments.",
    },
    {
      heading: "The road ahead",
      body:
        "The growth of agentic AI will depend on whether enterprises can demonstrate measurable improvements in cost, productivity and operational reliability. Companies will also need to establish clear controls around autonomous systems. The technology is developing quickly, but successful enterprise adoption will depend on implementation as much as model capability.",
    },
  ],
};

/* =========================================================
   ARTICLE 3 — DATA CENTERS
========================================================= */

const dataCenterElectricityArticle: TechnologyArticle = {
  id: "tech-anthropic",
  category: "AI INFRASTRUCTURE",
  title:
    "Data-Center Electricity Demand Could Approach 1,000 TWh by 2030",
  excerpt:
    "Rapid growth in artificial intelligence workloads is increasing the amount of electricity required by data centers, putting power availability at the center of technology infrastructure planning.",
  author: AUTHOR,
  publishedAt: "2026-09-29T05:00:00Z",
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
  highlights: [
    "AI workloads are increasing demand for high-density computing infrastructure.",
    "Global data-center electricity demand could approach 1,000 TWh by 2030.",
    "Power availability can become a constraint on data-center expansion.",
    "Grid infrastructure and generation capacity are increasingly connected to AI strategy.",
    "Technology companies are examining energy efficiency alongside computing performance.",
  ],
  sections: [
    {
      heading: "AI changes the infrastructure equation",
      body:
        "Artificial intelligence is creating a new infrastructure demand cycle. Training large models requires substantial computing capacity, while widespread deployment can create significant ongoing inference demand. As more companies integrate AI into products and internal operations, data centers must support increasingly intensive workloads.",
    },
    {
      heading: "The 1,000 TWh question",
      body:
        "Industry and energy forecasts point toward a significant increase in data-center electricity consumption over the remainder of the decade. A potential approach toward 1,000 TWh of annual electricity demand by 2030 illustrates the scale of the infrastructure challenge facing the technology industry.",
    },
    {
      heading: "Power becomes a technology issue",
      body:
        "Electricity was historically treated primarily as an operating cost for technology infrastructure. AI is changing that relationship. The availability, reliability and price of power can now influence where companies build data centers and how quickly new computing capacity can be brought online.",
    },
    {
      heading: "Grid connections matter",
      body:
        "Even when companies have funding and equipment available, new computing facilities can face delays because of grid connection requirements. Transmission capacity, substations and generation availability can all affect project timelines. This creates a connection between AI investment and long-term energy infrastructure planning.",
    },
    {
      heading: "Efficiency becomes strategic",
      body:
        "Improving computing efficiency can reduce the amount of energy required for a given AI workload. Semiconductor efficiency, model optimization, cooling technology and data-center design are therefore becoming increasingly important areas of technology development.",
    },
  ],
};

/* =========================================================
   ARTICLE 4 — SECURE POWER
========================================================= */

const securePowerArticle: TechnologyArticle = {
  id: "tech-datacenter",
  category: "AI INFRASTRUCTURE",
  title:
    "Secure Power Access Becomes a Strategic Requirement for AI Infrastructure",
  excerpt:
    "The AI infrastructure race is increasingly constrained by access to reliable electricity, making energy security a core consideration for technology companies and data-center developers.",
  author: AUTHOR,
  publishedAt: "2026-09-29T04:30:00Z",
  image:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85",
  highlights: [
    "AI data centers require large quantities of reliable electricity.",
    "Power availability can determine where new computing capacity is built.",
    "Grid infrastructure may take longer to develop than data-center buildings.",
    "Energy procurement is increasingly becoming part of technology strategy.",
    "Companies are examining generation, storage and efficiency options.",
  ],
  sections: [
    {
      heading: "The infrastructure bottleneck",
      body:
        "AI investment is often discussed in terms of chips and data-center construction, but electricity is becoming an equally important constraint. High-density AI facilities can require substantial continuous power. If grid capacity is unavailable, additional computing infrastructure cannot simply be activated when the building is complete.",
    },
    {
      heading: "Why secure power matters",
      body:
        "AI workloads are sensitive to interruptions because large computing clusters operate continuously and support services that may be distributed across multiple systems. Reliable electricity therefore becomes a prerequisite for predictable performance and efficient infrastructure utilization.",
    },
    {
      heading: "Construction is only one part of the timeline",
      body:
        "A data center can be physically constructed faster than the surrounding energy infrastructure can be expanded. Grid studies, connection agreements, transmission upgrades and new generation projects can introduce lengthy development timelines. This difference is increasingly influencing where technology companies locate new facilities.",
    },
    {
      heading: "Technology and energy converge",
      body:
        "The AI infrastructure market is creating closer links between technology companies, utilities, energy developers and governments. Technology firms increasingly need to understand electricity markets while energy companies are becoming important partners in digital infrastructure expansion.",
    },
    {
      heading: "The next infrastructure cycle",
      body:
        "The next stage of AI investment will therefore involve more than purchasing accelerators. Companies will need coordinated strategies covering compute, data centers, electricity, cooling, connectivity and regulatory approvals. Infrastructure readiness could become one of the defining factors in the speed of AI deployment.",
    },
  ],
};

/* =========================================================
   ARTICLE 5 — EY / NVIDIA / LANGCHAIN
========================================================= */

const enterpriseAIArticle: TechnologyArticle = {
  id: "tech-doordash",
  category: "ENTERPRISE AI",
  title:
    "EY Expands NVIDIA-Powered Enterprise AI Capabilities With LangChain Validation",
  excerpt:
    "Enterprise AI development is increasingly moving toward production systems built around model platforms, accelerated computing and frameworks for creating reliable agent-based applications.",
  author: AUTHOR,
  publishedAt: "2026-09-29T04:00:00Z",
  image:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85",
  highlights: [
    "Enterprise AI requires more than access to a foundation model.",
    "NVIDIA computing infrastructure is becoming an important part of enterprise AI deployments.",
    "Frameworks such as LangChain support the development of agent-based applications.",
    "Consulting and technology companies are helping businesses move AI from pilots into production.",
    "Governance and validation remain important as AI becomes operational.",
  ],
  sections: [
    {
      heading: "From experiments to production",
      body:
        "Enterprise AI is moving beyond isolated demonstrations toward systems that are expected to operate reliably inside business environments. This requires computing infrastructure, data integration, application frameworks, security controls and monitoring. As a result, enterprise AI is increasingly becoming a systems-engineering challenge rather than simply a model-selection exercise.",
    },
    {
      heading: "The NVIDIA layer",
      body:
        "NVIDIA's accelerated computing ecosystem has become an important component of the infrastructure used to develop and operate advanced AI systems. Enterprise deployments can require substantial processing capacity for training, fine-tuning and inference, creating demand for specialized hardware and software optimization.",
    },
    {
      heading: "The role of LangChain",
      body:
        "Frameworks such as LangChain are designed to help developers build applications that connect language models with tools, data sources and multi-step workflows. This becomes particularly relevant as companies experiment with AI agents capable of performing sequences of business tasks.",
    },
    {
      heading: "Consulting becomes an AI deployment layer",
      body:
        "Large enterprises often need assistance integrating AI into existing technology environments. Consulting firms can provide architecture, governance, workflow redesign and implementation support. This creates a growing market around the deployment of AI rather than only the development of models.",
    },
    {
      heading: "Validation and governance",
      body:
        "Production AI systems need to be evaluated for reliability, security and consistency. Validation frameworks and monitoring can help organizations understand how an AI system behaves under real-world conditions. These controls become more important as systems gain greater autonomy.",
    },
  ],
};

/* =========================================================
   ARTICLE 6 — U.S. / CHINA AI COMPETITION
========================================================= */

const usChinaAIArticle: TechnologyArticle = {
  id: "tech-peloton",
  category: "GLOBAL AI",
  title:
    "U.S.-China AI Competition Intensifies Around Capability and Deployment",
  excerpt:
    "The global AI race is increasingly shaped by two connected objectives: developing highly capable models and deploying artificial intelligence at industrial scale.",
  author: AUTHOR,
  publishedAt: "2026-09-29T03:30:00Z",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
  highlights: [
    "The U.S. and China remain central players in the global AI race.",
    "Model capability is only one component of technological leadership.",
    "China is emphasizing large-scale deployment across industrial sectors.",
    "The U.S. ecosystem benefits from major private-sector AI investment and infrastructure.",
    "Semiconductors, energy and data remain strategic parts of AI competition.",
  ],
  sections: [
    {
      heading: "Two dimensions of the AI race",
      body:
        "Competition in artificial intelligence is increasingly taking place on two fronts. The first involves developing increasingly capable foundation models. The second involves deploying those models across businesses, industries and government systems. Leadership in one area does not automatically guarantee leadership in the other.",
    },
    {
      heading: "The U.S. technology ecosystem",
      body:
        "The United States continues to host major AI model developers, semiconductor companies, cloud providers and technology investors. This creates a dense ecosystem connecting research, computing infrastructure, venture capital and enterprise deployment.",
    },
    {
      heading: "China emphasizes deployment at scale",
      body:
        "China has placed significant emphasis on integrating AI into manufacturing, logistics, consumer technology and other industrial applications. Large-scale deployment can provide companies with practical experience and create demand for AI systems across a broad range of sectors.",
    },
    {
      heading: "Semiconductors remain critical",
      body:
        "Advanced AI requires large amounts of computing capacity. Access to leading semiconductor technology and the ability to manufacture or procure accelerators therefore remain important components of national AI strategy. Semiconductor supply chains have become closely linked to the broader technology competition.",
    },
    {
      heading: "Infrastructure determines scale",
      body:
        "AI leadership ultimately depends on more than model performance. Data centers, electricity, networking, cloud infrastructure and skilled technical teams are all required to deploy systems at scale. This makes infrastructure investment an important part of the competitive landscape.",
    },
  ],
};

/* =========================================================
   ARTICLE 7 — REGULATION
========================================================= */

const AIRegulationArticle: TechnologyArticle = {
  id: "tech-softbank",
  category: "AI POLICY",
  title:
    "AI Adoption Moves From Assistive to Autonomous, Increasing Regulatory Pressure",
  excerpt:
    "As artificial intelligence systems become more capable of making and executing decisions, regulators and enterprises are examining how accountability should work when AI takes a larger operational role.",
  author: AUTHOR,
  publishedAt: "2026-09-29T03:00:00Z",
  image:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85",
  highlights: [
    "AI is increasingly moving from assistance toward autonomous execution.",
    "Greater autonomy creates new questions around accountability.",
    "Companies need clear policies for human oversight and AI permissions.",
    "Privacy, transparency and auditability remain important governance issues.",
    "Regulation is evolving alongside the technology.",
  ],
  sections: [
    {
      heading: "Why autonomy changes the regulatory discussion",
      body:
        "Earlier AI applications generally produced information that a human employee interpreted before taking action. Autonomous systems can increasingly initiate or complete actions themselves. This changes the question from whether an AI-generated recommendation is useful to who is responsible when an AI system actually performs an operation.",
    },
    {
      heading: "Accountability",
      body:
        "Organizations deploying autonomous AI systems need clear responsibility structures. Businesses may need to identify who approves an AI system, who monitors it and who is accountable for outcomes. These questions become more significant when AI systems interact directly with customers, financial systems or operational infrastructure.",
    },
    {
      heading: "Human oversight",
      body:
        "Human oversight does not necessarily mean manually reviewing every AI action. Instead, organizations can establish approval thresholds, exception handling and monitoring systems. The appropriate level of oversight will vary depending on the consequences of an AI decision.",
    },
    {
      heading: "Privacy and data governance",
      body:
        "Enterprise AI systems often interact with large amounts of internal and customer data. Organizations therefore need controls determining what information an AI system can access, how information is stored and how outputs are monitored. Data governance is becoming a central part of enterprise AI implementation.",
    },
    {
      heading: "The regulatory landscape",
      body:
        "Governments and regulators are continuing to develop approaches to artificial intelligence. The rules differ between jurisdictions and continue to evolve as technology advances. Companies operating internationally therefore need to monitor regulatory developments across multiple markets.",
    },
  ],
};

/* =========================================================
   ARTICLE 8 — IMF / ECONOMIC OUTLOOK
========================================================= */

const globalGrowthAIArticle: TechnologyArticle = {
  id: "tech-founder",
  category: "GLOBAL ECONOMY",
  title:
    "Broader AI Adoption Becomes a Potential Upside Risk to the Global Growth Outlook",
  excerpt:
    "The economic impact of artificial intelligence is increasingly being considered alongside traditional drivers of global growth, with productivity gains representing a potential upside factor.",
  author: AUTHOR,
  publishedAt: "2026-09-29T02:30:00Z",
  image:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1400&q=85",
  highlights: [
    "The IMF projects 3.1% global economic growth in 2026.",
    "Broader AI adoption could create productivity gains across sectors.",
    "The economic impact depends on how quickly companies convert AI capability into measurable output.",
    "Infrastructure, skills and regulation can influence the pace of adoption.",
    "AI could affect both technology-intensive and traditional industries.",
  ],
  sections: [
    {
      heading: "AI enters the macroeconomic discussion",
      body:
        "Artificial intelligence is increasingly being discussed not only as a technology-sector development but also as a potential driver of productivity and economic growth. As companies adopt AI across different industries, the potential effects can extend into investment, employment, productivity and consumer services.",
    },
    {
      heading: "The 3.1% growth outlook",
      body:
        "The International Monetary Fund has projected global economic growth of 3.1% for 2026. Within a broader economic outlook, increased adoption of technologies that improve productivity can provide upside potential if businesses are able to implement them effectively.",
    },
    {
      heading: "Productivity is the key test",
      body:
        "The economic impact of AI ultimately depends on measurable productivity improvements. Companies may use AI to reduce processing time, automate repetitive work, improve forecasting or develop new products. The cumulative effect of these changes could influence economic output if adoption becomes broad enough.",
    },
    {
      heading: "Adoption barriers",
      body:
        "AI adoption is not automatic. Companies must invest in infrastructure, employee training, data systems and governance. Some industries also face regulatory or operational constraints. These factors can determine how quickly theoretical AI capabilities become practical productivity improvements.",
    },
    {
      heading: "The broader business impact",
      body:
        "AI adoption can affect sectors that are not traditionally considered technology industries. Manufacturing, healthcare, finance, logistics, professional services and retail can all integrate AI into operations. This broad applicability is what gives AI the potential to influence the wider economy.",
    },
  ],
};

/* =========================================================
   ARTICLE 9 — TECHNOLOGY STRATEGY
========================================================= */

const technologyStrategyArticle: TechnologyArticle = {
  id: "tech-verda",
  category: "TECHNOLOGY STRATEGY",
  title:
    "Technology Strategy Is Being Rebuilt Around Compute, Power and Autonomous AI",
  excerpt:
    "The technology industry is increasingly connecting software strategy with physical infrastructure as AI systems require more computing capacity, energy and operational integration.",
  author: AUTHOR,
  publishedAt: "2026-09-29T02:00:00Z",
  image:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
  highlights: [
    "Technology strategy is increasingly connected to physical infrastructure.",
    "Compute capacity and energy availability are becoming strategic considerations.",
    "Autonomous AI is changing enterprise software design.",
    "Companies need to evaluate infrastructure and software together.",
    "AI deployment is becoming a long-term organizational transformation.",
  ],
  sections: [
    {
      heading: "Software meets infrastructure",
      body:
        "For much of the cloud era, software companies could scale primarily by purchasing additional computing capacity from cloud providers. The growth of advanced AI is making the underlying infrastructure more visible. Companies now need to consider accelerator availability, data-center capacity, networking and electricity as part of their long-term technology planning.",
    },
    {
      heading: "Compute becomes strategic",
      body:
        "Advanced AI workloads can require substantial computing resources. Organizations developing AI products therefore need predictable access to infrastructure. This can influence partnerships, capital expenditure, cloud strategy and product design.",
    },
    {
      heading: "Autonomous software",
      body:
        "AI agents are changing the concept of enterprise software. Instead of employees navigating every step of an application manually, future systems may allow users to describe an objective while AI agents coordinate multiple underlying tools. This could alter the way software interfaces and enterprise workflows are designed.",
    },
    {
      heading: "Energy enters technology planning",
      body:
        "The growing electricity requirements of data centers mean that energy strategy can no longer be separated entirely from technology strategy. Companies planning large-scale AI infrastructure increasingly need to consider the availability, reliability and long-term cost of power.",
    },
    {
      heading: "A longer transformation cycle",
      body:
        "AI adoption is likely to be an extended transformation rather than a single software upgrade. Organizations will need to update data infrastructure, workflows, employee skills, governance processes and technology architectures. The companies that successfully integrate these layers will determine how quickly AI moves from experimentation into everyday operations.",
    },
  ],
};

/* =========================================================
   TECHNOLOGY ARTICLES
========================================================= */

export const technologyArticles: TechnologyArticle[] = [
  technologyLandscapeArticle,
  agenticAIArticle,
  dataCenterElectricityArticle,
  securePowerArticle,
  enterpriseAIArticle,
  usChinaAIArticle,
  AIRegulationArticle,
  globalGrowthAIArticle,
  technologyStrategyArticle,
];

/* =========================================================
   ARTICLE HELPERS
========================================================= */

export function getTechnologyArticleById(
  id: string | undefined
): TechnologyArticle | undefined {
  return technologyArticles.find(
    (article) => article.id === id
  );
}

export function getRelatedTechnologyArticles(
  article: TechnologyArticle,
  limit = 4
): TechnologyArticle[] {
  return technologyArticles
    .filter((item) => item.id !== article.id)
    .slice(0, limit);
}

export function technologyArticlePath(id: string): string {
  return `/article/${id}`;
}
