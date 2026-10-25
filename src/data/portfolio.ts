export const profile = {
  name: "Ishita Agrawal",
  initials: "IA",
  college: "National Institute of Technology, Rourkela",
  year: "Fourth year",
  email: "ishitaag23@gmail.com",
  linkedin: "https://www.linkedin.com/in/ishita-agrawall/",
  instagram: "https://www.instagram.com/ishitaa_agrawall/",
  github: "https://github.com/ishitaag1",
  siteUrl: "",
  theme: "dark" as const,
  portrait: "/images/ishita-agrawal.jpg",
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Research", href: "#research" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export type ProjectCategory =
  | "AI/ML"
  | "Full-Stack"
  | "Research"
  | "Computer Vision"
  | "Generative AI"
  | "Data Analytics";

export type Project = {
  title: string;
  shortTitle: string;
  summary: string;
  categories: ProjectCategory[];
  technologies: string[];
  repository: string;
  published: boolean;
  status?: string;
  relatedProject?: {
    title: string;
    repository: string;
  };
  details: {
    objective: string;
    implementation: string[];
    decisions: string[];
    limitations: string;
  };
};

export const projects: Project[] = [
  {
    title: "Construction Activity Replanner",
    shortTitle: "Schedule intelligence",
    summary:
      "A local project-controls demonstration for exploring construction schedules, critical paths, and combined delay scenarios.",
    categories: ["AI/ML", "Full-Stack"],
    technologies: ["Python", "NetworkX", "Streamlit", "Pandas"],
    repository: "https://github.com/ishitaag1/Godrej_activity_replanner",
    published: true,
    status: "Godrej project · May–July 2026",
    details: {
      objective:
        "Make schedule dependencies and the downstream effects of delays easier to inspect before comparing alternative forecasts.",
      implementation: [
        "A deterministic scheduling engine validates activity IDs, dependencies, dates, durations, and cycles before recalculation.",
        "Forward and backward critical-path calculations provide forecast dates, float, and critical activities.",
        "Users can generate a configurable schedule, edit the activity register, apply simultaneous delay events, and compare scenarios in a Streamlit interface.",
        "A local Ollama tool loop is optional; scheduler calculations remain the source of truth.",
      ],
      decisions: [
        "The repository explicitly separates schedule calculations from optional language-model assistance.",
        "Dependencies are finish-to-start only, and the schedule uses calendar days rather than working-day calendars.",
      ],
      limitations:
        "The sample schedule is synthetic, with editable illustrative durations—not verified Godrej project records. The project does not perform resource leveling or cost analysis.",
    },
  },
  {
    title: "Air Pollution Forecasting",
    shortTitle: "PM2.5 · PM10",
    summary:
      "A time-series study comparing short-horizon particulate forecasts from historical observations at Brajrajnagar, Odisha.",
    categories: ["AI/ML", "Research", "Data Analytics"],
    technologies: ["Python", "Pandas", "Scikit-learn", "XGBoost"],
    repository: "https://github.com/ishitaag1/pm_forecast",
    published: true,
    status: "Research project",
    details: {
      objective:
        "Explore whether historical pollutant readings and recent trends can help forecast PM2.5 and PM10 concentrations one and seven days ahead.",
      implementation: [
        "The training script reads the cleaned GM Office monitoring-station data, orders timestamps, removes duplicate dates, and applies pollutant quality checks.",
        "It creates lag, rolling-window, delta, and calendar features, then compares persistence, Random Forest, XGBoost, and Support Vector Regression.",
        "Evaluation uses chronological train, validation, and test periods; metrics include RMSE, MAE, and R².",
      ],
      decisions: [
        "A persistence baseline provides context for machine-learning models.",
        "Time-ordered splits are used instead of random shuffling to better reflect forecasting on future observations.",
      ],
      limitations:
        "Forecasting estimates future concentrations; it does not establish the causes of pollution. No evaluation-result files are published in the repository, so no headline metric is shown here.",
    },
  },
  {
    title: "NuviX — Credit Risk Analyzer",
    shortTitle: "Credit risk",
    summary:
      "A credit-risk project with model-training notebooks, saved model artifacts, and a Next.js application.",
    categories: ["AI/ML", "Full-Stack", "Data Analytics"],
    technologies: ["Python", "PyTorch", "LightGBM", "Next.js", "TypeScript"],
    repository: "https://github.com/ishitaag1/NuviX",
    published: true,
    status: "Model and application prototype",
    details: {
      objective:
        "Explore model-based credit-risk analysis through separate credit-score and default-risk experiments.",
      implementation: [
        "The repository contains distinct notebooks for credit-score and default modeling, along with serialized model artifacts.",
        "The credit-score notebook imports LightGBM and uses an 80/20 train-test split; the default-risk notebook uses PyTorch with a random 80/20 split.",
        "A separate Next.js application provides the product interface.",
      ],
      decisions: [
        "The two prediction tasks are kept separate rather than presented as one interchangeable score.",
        "Risk estimates are analytical outputs, not lending decisions.",
      ],
      limitations:
          "The notebooks have no saved evaluation output. Previously circulated accuracy and R² figures are not published here because the underlying data and model evaluation could not be independently reproduced.",
    },
  },
  {
    title: "StoreVision AI",
    shortTitle: "Retail analytics",
    summary:
      "A retail analytics prototype combining person tracking, zone events, and timestamp-based POS matching.",
    categories: ["AI/ML", "Full-Stack", "Computer Vision", "Data Analytics"],
    technologies: ["Python", "YOLOv8", "FastAPI", "MongoDB", "Next.js", "Docker"],
    repository: "https://github.com/ishitaag1/StoreVision-AI",
    published: true,
    status: "Prototype",
    details: {
      objective:
        "Connect visual activity signals with store operations and transaction data to support retail analytics.",
      implementation: [
        "OpenCV and Ultralytics YOLO tracking process video frames; ByteTrack IDs and confidence values feed fixed camera-zone rules for entry, exit, dwell, and billing-queue events.",
        "A FastAPI service validates and stores event batches in MongoDB, with a WebSocket telemetry route and analytics endpoints.",
        "The analytics code parses sample POS timestamps and associates billing-area exits with sales inside a five-minute window; the README documents a Next.js dashboard and Docker Compose setup.",
      ],
      decisions: [
        "The POS association is a time-window heuristic, not an identity-level match between a tracked person and a transaction.",
        "Zone polygons are configured per camera; events can describe movement through those zones but cannot guarantee perfect multi-camera identity tracking.",
      ],
      limitations:
        "The five-minute time-window match can count unrelated checkout activity. Staff labeling uses a simple dark-color ratio, and no evaluation results establish tracking, classification, or business-impact accuracy. This is not a theft-detection system.",
    },
  },
  {
    title: "Cortex — RAG Application",
    shortTitle: "Retrieval + reasoning",
    summary:
      "A multi-tenant RAG architecture write-up for document ingestion, hybrid retrieval, and streamed answers.",
    categories: ["AI/ML", "Full-Stack", "Generative AI"],
    technologies: ["Next.js", "LangGraph", "Qdrant", "Neo4j"],
    repository: "https://github.com/ishitaag1/Cortex",
    published: true,
    status: "README describes the architecture",
    details: {
      objective:
        "The README outlines a system intended to answer questions from organization-specific document collections.",
      implementation: [
        "Documented pipeline: upload, background processing, chunking, embedding, vector indexing, and entity extraction.",
        "The described query path combines Qdrant semantic search with Neo4j entity relationships before an LLM response is streamed.",
      ],
      decisions: [
        "The documented design separates tenant authentication, retrieval, graph relationships, and answer generation.",
      ],
      limitations:
        "The repository currently contains only a README. These are documented design claims, not verified working application features; no demo or performance results are linked.",
    },
  },
  {
    title: "She-Connect",
    shortTitle: "Product website",
    summary:
      "A React website organized around feature, how-it-works, pricing, about, resource, and contact pages.",
    categories: ["Full-Stack"],
    technologies: ["React", "TypeScript", "Vite", "React Router"],
    repository: "https://github.com/ishitaag1/She-connect",
    published: true,
    status: "Frontend project",
    details: {
      objective:
        "The repository is structured as a multi-page website for a product named She-Connect.",
      implementation: [
        "The application routes to home, features, how-it-works, pricing, about, resources, and contact pages.",
        "The repository includes a backend directory, but its purpose and integration with the frontend were not verified in the files reviewed.",
      ],
      decisions: [
        "The portfolio describes only the routes and frontend stack visible in the repository entry point and package manifest.",
      ],
      limitations:
        "No README was present at the repository root, and the product's intended audience, backend behavior, and my specific contributions need confirmation.",
    },
  },
  {
    title: "Medi-link",
    shortTitle: "Patient experience",
    summary:
      "A React application with patient-facing appointment, profile, prescription, and emergency-service routes.",
    categories: ["Full-Stack"],
    technologies: ["React", "TypeScript", "React Router"],
    repository: "https://github.com/ishitaag1/medi-link",
    published: true,
    status: "Application prototype",
    relatedProject: {
      title: "Medi-link Doctor Dashboard",
      repository: "https://github.com/ishitaag1/Medi-link_doctor",
    },
    details: {
      objective:
        "The patient application groups several healthcare-related flows behind an authenticated interface.",
      implementation: [
        "The route configuration includes patient dashboards and profiles, emergency services, prescriptions, booking appointments, doctor profiles, and video-call routes.",
        "A shared authentication provider and protected routes wrap the application.",
      ],
      decisions: [
        "The project is presented as an application prototype, not a clinically validated system.",
      ],
      limitations:
        "The reviewed entry point does not establish a live shared backend or clinical validation. The doctor's dashboard repository is linked separately.",
    },
  },
  {
    title: "Medi-link Doctor Dashboard",
    shortTitle: "Doctor workspace",
    summary:
      "A separate React dashboard project with patient, prescription, and profile views.",
    categories: ["Full-Stack"],
    technologies: ["React", "TypeScript", "Vite"],
    repository: "https://github.com/ishitaag1/Medi-link_doctor",
    published: true,
    status: "Separate companion repository",
    relatedProject: {
      title: "Medi-link patient application",
      repository: "https://github.com/ishitaag1/medi-link",
    },
    details: {
      objective:
        "The repository presents a doctor-facing workspace with a dashboard, patient list, prescription manager, and profile section.",
      implementation: [
        "The application initializes sample patient, alert, and feedback data in client state.",
        "The entry point gates the dashboard behind an authentication state and routes between dashboard sections.",
      ],
      decisions: [
        "The companion application is treated as a separate frontend because a shared live backend was not established by the inspected code.",
      ],
      limitations:
        "Several sections are marked as coming soon, and the reviewed entry point uses sample data. Do not treat it as a production clinical system.",
    },
  },
  {
    title: "QuickCourt",
    shortTitle: "External repository",
    summary:
      "The supplied brief describes a sports-facility booking platform for users, facility owners, and administrators.",
    categories: ["Full-Stack"],
    technologies: [],
    repository: "https://github.com/Shail-ja/QuickCourt",
    published: false,
    details: {
      objective:
        "The user-provided brief describes a full-stack sports-facility booking platform with User, Facility Owner, and Admin roles.",
      implementation: [
        "The brief proposes a phased build: backend API and database, role-specific frontend flows, then machine-learning integration.",
      ],
      decisions: [],
      limitations:
        "The repository is private, so its implementation, technology stack, and my specific contribution could not be verified. This entry stays hidden until attribution is confirmed.",
    },
  },
  {
    title: "Courtly-Link",
    shortTitle: "External repository",
    summary: "Repository details and my contribution are not verified.",
    categories: ["Full-Stack"],
    technologies: [],
    repository: "https://github.com/swostideep/courtly-link",
    published: false,
    details: {
      objective: "",
      implementation: [],
      decisions: [],
      limitations: "Private repository; contribution details require confirmation.",
    },
  },
];

export const experience = [
  {
    organization: "Godrej Properties",
    role: "Construction activity replanning",
    location: "Pune, India",
    period: "May – July 2026",
    description:
      "Worked on a schedule-analysis project-controls demonstration. The repository models editable activities and dependencies, calculates critical-path forecasts, and compares delay scenarios using a synthetic sample schedule.",
    technologies: ["Python", "NetworkX", "Streamlit", "Pandas"],
    repository: "https://github.com/ishitaag1/Godrej_activity_replanner",
    repositoryPublic: true,
    published: true,
  },
  {
    organization: "Bluestock",
    role: "Freelance Internship",
    location: "Remote",
    period: "September – November 2025",
    description:
      "I contributed to backend work for Hirenext, including account sign-up and login flows plus APIs for roles, mock tests, questions, and test results. The codebase uses Express and PostgreSQL, with bcrypt password hashing and JWT-based login.",
    technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "bcrypt"],
    repository: "https://github.com/Harsh-Kumar-Pandey/Hirenext-Backend",
    repositoryPublic: false,
    published: true,
  },
];

export const skills = [
  {
    category: "Languages & data",
    items: ["Python", "JavaScript", "TypeScript", "Pandas", "NumPy"],
  },
  {
    category: "Machine learning & research",
    items: ["Scikit-learn", "XGBoost", "PyTorch", "LightGBM", "Time-series forecasting"],
  },
  {
    category: "Product & interfaces",
    items: ["React", "Next.js", "Vite", "Streamlit", "Tailwind CSS"],
  },
  {
    category: "Systems & tools",
    items: ["NetworkX", "Docker Compose", "OpenCV", "YOLOv8"],
  },
];

export const interests = [
  "Building useful technology",
  "Exploring AI and data",
  "Trying new activities",
  "Meeting people and sharing ideas",
  "Learning by experimenting",
  "Music and martial arts",
];

export const community = [
  {
    title: "APS Mentor",
    detail:
      "Designed event posters, banners, and content; coordinated Algoutsav and AlgoVision, supporting event execution and on-the-spot problem-solving.",
  },
  {
    title: "ICS Mentor",
    detail:
      "NIT Rourkela · August 2024–present. Mentored 8+ first-year students through academic onboarding and peer-learning support sessions.",
  },
  {
    title: "SSF Scholar",
    detail:
      "Shooting Stars Foundation. Supported 10+ events, including IBM Datathon, and facilitated 5+ aptitude workshops for 100+ students across India.",
  },
];

export const achievements = [
  { title: "Top 10 Finalist", event: "Odoo" },
  { title: "Rank 13", event: "HackBlitz" },
];

export const certificates = [
  {
    title: "Internship Completion Certificate",
    issuer: "Godrej Properties Limited",
    date: "May 15 – July 14, 2026 · Operations, West East Zone",
    file: "/certificates/godrej-internship.jpg",
    documentType: "image" as const,
  },
  {
    title: "Software Development Engineer Internship",
    issuer: "Bluestock Fintech",
    date: "September 1 – October 30, 2025",
    file: "/certificates/bluestock-internship.jpg",
    documentType: "image" as const,
  },
  {
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle University",
    date: "September 5, 2026 · valid through September 5, 2028",
    file: "/certificates/oracle-agentic-ai-2026.pdf",
    documentType: "pdf" as const,
  },
  {
    title: "Certificate of Participation · Odoo Hackathon 2025",
    issuer: "Odoo",
    date: "August 11–12, 2025 · Gandhinagar, Gujarat",
    file: "/certificates/odoo-hackathon-2025.pdf",
    documentType: "pdf" as const,
  },
  {
    title:
      "Applications of Machine Learning Techniques in Sustainable Technologies (AMLST-2024)",
    issuer: "NIT Rourkela · Computer Science & Engineering and Electrical Engineering",
    date: "January 24–28, 2024",
    file: "/certificates/amlst-2024.pdf",
    documentType: "pdf" as const,
  },
  {
    title: "Online Aptitude Training Program · Certificate of Achievement",
    issuer: "Shooting Stars Foundation",
    date: "September 2024",
    file: "/certificates/ssf-aptitude-2024.pdf",
    documentType: "pdf" as const,
  },
];

export const research = {
  title: "Forecasting particulate pollution",
  station: "GM Office monitoring station · Brajrajnagar, Odisha",
  context:
    "Brajrajnagar sits in Odisha's Jharsuguda coal-belt region. Estimating near-term PM2.5 and PM10 levels from historical monitoring data can support situational awareness; it cannot by itself explain the causes of pollution.",
  evaluation: "Validation from Jan 2023 · test period from Jan 2024",
  steps: [
    "Clean timestamps and pollutant readings",
    "Build lag, rolling, and calendar features",
    "Compare persistence and ML baselines",
    "Evaluate 1-day and 7-day forecasts chronologically",
  ],
  models: ["Persistence", "Random Forest", "XGBoost", "SVR"],
  repository: "https://github.com/ishitaag1/pm_forecast",
};
