// All site copy lives here. Edit text, not components.

export const site = {
  name: "Amal Gafoor P K",
  shortName: "Amal",
  headline: "AI engineer building LLM infrastructure that works in production.",
  tagline:
    "NIT Calicut graduate. One year building RAG pipelines, agentic systems and async backends that don't break under load.",
  about: [
    "I'm a graduate from NIT Calicut who spent the last year building AI systems. I believe it's time to build infrastructure around AI (LLMs) that drives a shift as big as the internet and industrial revolutions.",
    "I build things that actually work in production — RAG pipelines, agentic AI systems, async backends. What excites me is the gap between \"AI demos\" and \"AI that doesn't break under load\": session management, rate limiting, retrieval quality, and the boring infrastructure that makes AI reliable.",
  ],
  email: "amalabdulgafoor9557@gmail.com",
  location: "Kerala, India",
  links: {
    github: "https://github.com/amal-gafoor",
    linkedin: "https://www.linkedin.com/in/amal-gafoor-p-k",
  },
  resumeUrl: "", // drop a PDF in /public and set "/resume.pdf"
};

export const stats = [
  { value: "1+", label: "year building AI systems" },
  { value: "3", label: "production AI products" },
  { value: "22+", label: "public repositories" },
  { value: "7", label: "live deployments" },
];

export type Project = {
  title: string;
  blurb: string;
  stack: string[];
  live?: string;
  code?: string;
  featured?: boolean;
  tag: string;
};

export const projects: Project[] = [
  {
    title: "Flowtropic",
    tag: "Conversational AI · Sales",
    blurb:
      "Full conversational AI sales agent for Instagram. Handles DMs end-to-end with multimodal RAG over product catalogues, session memory in Redis, and a Next.js dashboard for the business.",
    stack: ["FastAPI", "Redis", "Supabase", "Multimodal RAG", "Next.js"],
    featured: true,
  },
  {
    title: "Agentic ReAct Architecture",
    tag: "Agentic AI · Reliability",
    blurb:
      "An agentic ReAct system designed specifically to eliminate LLM hallucination — every claim is grounded through tool calls and verified before it reaches the user.",
    stack: ["Python", "LLM agents", "ReAct", "Tool calling"],
    code: "https://github.com/amal-gafoor/agentic-workflow",
  },
  {
    title: "B2B Sales Automation",
    tag: "Automation",
    blurb:
      "Pipeline that researches prospects, drafts outreach and keeps the CRM current — the manual part of B2B sales, automated.",
    stack: ["Python", "LLM", "Automation"],
    code: "https://github.com/amal-gafoor/B2B-Sales-Automation",
  },
  {
    title: "Industrial Gasifier Digital Twin",
    tag: "Digital twin · IoT",
    blurb:
      "Intelligent digital twin of an industrial gasifier with live sensor integration and an AI expert agent that explains plant state and recommends actions.",
    stack: ["Python", "Live sensors", "AI expert agent", "PostgreSQL"],
    featured: true,
  },
  {
    title: "License Plate Detection",
    tag: "Computer vision",
    blurb:
      "Detects and reads vehicle number plates from images and video frames using a trained detection model.",
    stack: ["PyTorch", "OpenCV", "Jupyter"],
    code: "https://github.com/amal-gafoor/license-plate-detection",
  },
  {
    title: "Syllabus Pacer",
    tag: "Ed-tech · Web",
    blurb:
      "A family of study-pacing apps (Commerce, Humanities, 12th, 9th) that turn a syllabus into a day-by-day plan.",
    stack: ["JavaScript", "Vercel"],
    live: "https://syllabus-pacer-commerce.vercel.app",
    code: "https://github.com/amal-gafoor/syllabus-pacer-commerce",
  },
  {
    title: "Time-table Scheduler",
    tag: "Scheduling · Web",
    blurb:
      "Generates clash-free class timetables from faculty, room and subject constraints, with the logic pushed down into PostgreSQL.",
    stack: ["PLpgSQL", "PostgreSQL", "Vercel"],
    live: "https://time-table-scheduler-kappa.vercel.app",
    code: "https://github.com/amal-gafoor/web",
  },
];

export const experience = [
  {
    period: "2025 — present",
    title: "AI Engineer",
    org: "Building production AI systems",
    points: [
      "Shipped a conversational AI sales agent for Instagram (FastAPI + Redis + Supabase + multimodal RAG + Next.js).",
      "Built a digital twin for an industrial gasifier with live sensor data and an AI expert agent.",
      "Designed an agentic ReAct system that grounds every answer to remove hallucination.",
    ],
  },
  {
    period: "Graduate",
    title: "B.Tech",
    org: "National Institute of Technology, Calicut",
    points: [],
  },
];

export const skills = [
  {
    group: "AI / ML",
    items: ["RAG", "Agentic systems", "PyTorch", "Machine Learning", "LLM infra"],
  },
  {
    group: "Backend",
    items: ["Python", "FastAPI", "Redis", "PostgreSQL", "SQLAlchemy", "SQL", "Async"],
  },
  {
    group: "Frontend",
    items: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    group: "Infra",
    items: ["Supabase", "Vercel", "Session management", "Rate limiting"],
  },
];

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
