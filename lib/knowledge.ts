import { experience, projects, site, skills } from "@/content/site";

export type Chunk = { id: string; title: string; text: string };

/**
 * The knowledge base the agent retrieves from. It is generated from
 * content/site.ts, so editing that file updates what the bot knows.
 */
export const chunks: Chunk[] = [
  {
    id: "about",
    title: "About Amal",
    text: `${site.name} is an AI engineer. ${site.about.join(" ")} Location: ${site.location}.`,
  },
  ...projects.map((p, i) => ({
    id: `project-${i + 1}`,
    title: `Project: ${p.title}`,
    text: `${p.title} (${p.tag}). ${p.blurb} Tech stack: ${p.stack.join(", ")}.${
      p.live ? ` Live demo: ${p.live}.` : ""
    }${p.code ? ` Code: ${p.code}.` : ""}`,
  })),
  ...experience.map((x, i) => ({
    id: `experience-${i + 1}`,
    title: `Experience: ${x.title}`,
    text: `${x.title}, ${x.org} (${x.period}). ${x.points.join(" ")}`,
  })),
  ...skills.map((g) => ({
    id: `skills-${g.group.toLowerCase().replace(/[^a-z]+/g, "-")}`,
    title: `Skills: ${g.group}`,
    text: `${g.group} skills and tools Amal works with: ${g.items.join(", ")}.`,
  })),
  {
    id: "education",
    title: "Education",
    text: "Amal graduated from the National Institute of Technology (NIT) Calicut. Education, degree, college, university.",
  },
  {
    id: "how-this-works",
    title: "How this chatbot works",
    text: "This chatbot is a small agent built by Amal. Each question goes to an LLM that can call tools: search_knowledge (retrieval over chunks of Amal's profile, the RAG step), show_projects (renders project cards in the chat), set_theme (switches the site between light and dark) and get_contact. The steps it takes are shown in the trace above each answer, the retrieved chunks are listed as sources, and the stats line shows latency and token use. It is rate limited and it refuses to answer when retrieval finds nothing, instead of guessing. Built with Next.js route handlers and an OpenAI-compatible LLM API.",
  },
];
