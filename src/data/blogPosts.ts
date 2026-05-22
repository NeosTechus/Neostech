// Public blog content. Articles are authored by the NeosTechs team.
// Each post renders on /blog (list) and /blog/:slug (detail).

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string; // ISO
  featured?: boolean;
  content: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-retrieval-augmented-generation",
    title: "What Is Retrieval-Augmented Generation (RAG)?",
    excerpt:
      "A plain-English introduction to RAG — why language models hallucinate, how retrieval grounds them in your own data, and where it fits in a real product.",
    category: "RAG",
    readingTime: "7 min read",
    date: "2026-05-04",
    featured: true,
    content: [
      {
        type: "p",
        text: "Large language models are trained on a snapshot of the internet. That makes them broadly knowledgeable but blind to two things that matter most in a business: your private data and anything that happened after training. Ask a raw model about last quarter's invoices or your internal runbook and it will either refuse or, worse, confidently make something up.",
      },
      {
        type: "p",
        text: "Retrieval-Augmented Generation (RAG) fixes this by separating knowledge from reasoning. Instead of expecting the model to memorize your data, you store that data in a searchable index, fetch the most relevant pieces at question time, and hand them to the model as context. The model then answers using facts it can see in front of it rather than facts it half-remembers.",
      },
      { type: "h2", text: "The core loop" },
      {
        type: "p",
        text: "Every RAG system, no matter how sophisticated, comes down to the same four steps:",
      },
      {
        type: "ul",
        items: [
          "Index — split your documents into chunks and convert each chunk into an embedding (a numeric vector capturing its meaning), then store them in a vector database.",
          "Retrieve — embed the user's question the same way and find the chunks whose vectors are closest to it.",
          "Augment — paste those chunks into the prompt alongside the question and clear instructions.",
          "Generate — the model writes an answer grounded in the retrieved context, ideally citing its sources.",
        ],
      },
      { type: "h2", text: "Why teams reach for RAG" },
      {
        type: "p",
        text: "RAG is popular because it is the cheapest, fastest way to make a model useful on your own content. You do not retrain anything. When a document changes, you re-index that document and the system is instantly up to date. Answers can cite their sources, which builds trust and makes review possible. And because the model only sees what you retrieve, you keep tight control over what data is exposed.",
      },
      {
        type: "p",
        text: "It is not magic, though. A RAG system is only as good as its retrieval — if the right chunk never makes it into the prompt, the model cannot use it. Most of the engineering effort goes into chunking, search quality, and evaluation, not the model itself.",
      },
      { type: "h2", text: "Where it fits" },
      {
        type: "p",
        text: "RAG shines for support assistants over a knowledge base, internal search across wikis and tickets, document Q&A, and any chatbot that must stay factual. If your use case is 'answer questions about this specific corpus,' RAG is almost always the right starting point.",
      },
    ],
  },
  {
    slug: "rag-in-production-architecture-and-retrieval",
    title: "RAG in Production: Chunking, Retrieval, and the Details That Matter",
    excerpt:
      "A prototype that works on ten documents often falls apart on ten thousand. Here are the production decisions — chunking, hybrid search, reranking, and guardrails — that separate a demo from a dependable system.",
    category: "RAG",
    readingTime: "9 min read",
    date: "2026-05-12",
    featured: true,
    content: [
      {
        type: "p",
        text: "Getting a RAG demo running is a weekend project. Getting one to answer reliably across a large, messy corpus is where the real work begins. The gap is almost never the model — it is everything around retrieval.",
      },
      { type: "h2", text: "Chunking is a product decision" },
      {
        type: "p",
        text: "How you split documents determines what the model can ever see. Chunks that are too large dilute the relevant sentence among noise; chunks that are too small lose the context needed to make sense of them. Start around 300–500 tokens with a small overlap, but respect natural boundaries — headings, sections, table rows. Carry metadata (title, source, date, section) with every chunk so you can filter and cite later.",
      },
      { type: "h2", text: "Pure vector search is rarely enough" },
      {
        type: "p",
        text: "Embeddings capture meaning but miss exact terms — product SKUs, error codes, names. The fix is hybrid search: combine dense vector similarity with classic keyword (BM25) search, then merge the results. This catches both 'what does this paragraph mean' and 'find the row that literally says ERR_4012.'",
      },
      { type: "h2", text: "Rerank before you generate" },
      {
        type: "p",
        text: "Retrieval gives you candidates; a reranker decides which actually belong in the prompt. Pull the top 20–50 chunks cheaply, then run a cross-encoder reranker to score them against the question and keep the best handful. This single step is often the biggest quality jump you can make.",
      },
      { type: "h2", text: "Guardrails and grounding" },
      {
        type: "ul",
        items: [
          "Instruct the model to answer only from the provided context and to say 'I don't know' when the answer isn't there.",
          "Require citations so every claim is traceable to a chunk.",
          "Filter retrieval by user permissions so people only ever see data they're allowed to.",
          "Log the retrieved chunks with each answer — when something goes wrong, you need to see what the model actually saw.",
        ],
      },
      { type: "h2", text: "Measure, don't guess" },
      {
        type: "p",
        text: "Build a small evaluation set of real questions with known good answers and run it on every change. Track retrieval quality (did the right chunk show up?) separately from answer quality (was the final response correct and grounded?). Without this, you are tuning blind, and every 'improvement' is a coin flip.",
      },
    ],
  },
  {
    slug: "rag-vs-fine-tuning-vs-long-context",
    title: "RAG vs Fine-Tuning vs Long Context: Which Do You Actually Need?",
    excerpt:
      "Three ways to make a model work with your data, often confused. A practical decision guide for picking the right one — or combining them.",
    category: "RAG",
    readingTime: "6 min read",
    date: "2026-05-18",
    content: [
      {
        type: "p",
        text: "When a model doesn't know something, teams reach for one of three tools. They solve different problems, and choosing wrong wastes time and money.",
      },
      { type: "h2", text: "RAG — for knowledge that changes" },
      {
        type: "p",
        text: "Use RAG when the answer lives in a body of documents that updates over time: policies, product docs, tickets, contracts. It keeps facts fresh, supports citations, and lets you control access per user. This is the default for factual question-answering over your own corpus.",
      },
      { type: "h2", text: "Fine-tuning — for behavior and format" },
      {
        type: "p",
        text: "Fine-tuning changes how a model responds, not what it knows. Reach for it to lock in a tone of voice, enforce a strict output format, or teach a narrow skill the base model handles poorly. It is the wrong tool for injecting facts — those go stale the moment your data changes, and you'd have to retrain.",
      },
      { type: "h2", text: "Long context — for one big thing right now" },
      {
        type: "p",
        text: "Modern models accept enormous prompts, so you can sometimes just paste an entire document and ask about it. That's great for a single report or contract in one session. It breaks down across a large corpus: cost and latency scale with every token, and models still lose track of details buried in the middle of a very long prompt.",
      },
      { type: "h2", text: "The honest answer: combine them" },
      {
        type: "p",
        text: "Production systems rarely pick just one. A common pattern is RAG for fresh facts, light fine-tuning for consistent format and tone, and a generous context window so each retrieved chunk has room to breathe. Start with RAG, add the others only when a specific problem demands it.",
      },
    ],
  },
  {
    slug: "agentic-rag-letting-models-decide-what-to-retrieve",
    title: "Agentic RAG: Letting the Model Decide What to Retrieve",
    excerpt:
      "Classic RAG retrieves once and answers. Agentic RAG lets the model plan, search multiple times, and check its own work — the direction most serious systems are heading in 2026.",
    category: "AI Engineering",
    readingTime: "6 min read",
    date: "2026-05-20",
    content: [
      {
        type: "p",
        text: "Traditional RAG is a straight line: retrieve once, then answer. It struggles with questions that need several lookups or a bit of reasoning between steps. Agentic RAG turns the model into an active participant that decides when and what to retrieve.",
      },
      { type: "h2", text: "What changes" },
      {
        type: "p",
        text: "The model is given retrieval as a tool it can call repeatedly. It can break a complex question into sub-questions, search for each, notice when results are thin and search again with better terms, and only answer once it has enough grounding. Some systems add a verification step where the model critiques its own draft against the sources before responding.",
      },
      { type: "h2", text: "The trade-off" },
      {
        type: "p",
        text: "More steps mean higher cost and latency, and more places for things to go wrong. Agentic RAG earns its keep on hard, multi-hop questions — comparing documents, reasoning across sources — but is overkill for simple lookups. The mature pattern is to route easy questions through plain RAG and reserve the agentic path for queries that need it.",
      },
    ],
  },
  {
    slug: "evaluating-rag-metrics-that-matter",
    title: "Evaluating RAG: The Metrics That Actually Matter",
    excerpt:
      "You can't improve what you don't measure. A practical look at faithfulness, answer relevance, and context precision — and how to build an eval set without boiling the ocean.",
    category: "AI Engineering",
    readingTime: "5 min read",
    date: "2026-05-21",
    content: [
      {
        type: "p",
        text: "The most common reason a RAG system stalls is that nobody can tell whether changes help or hurt. Vibes are not a metric. A small, honest evaluation set is the single highest-leverage thing you can build.",
      },
      { type: "h2", text: "Split retrieval from generation" },
      {
        type: "p",
        text: "Measure two things separately. Retrieval quality asks: did the chunks needed to answer the question actually get fetched? Generation quality asks: given those chunks, was the answer correct, complete, and free of invented claims? Conflating them hides where the problem really is.",
      },
      { type: "h2", text: "Three metrics to start with" },
      {
        type: "ul",
        items: [
          "Faithfulness — is every claim in the answer supported by the retrieved context, with no hallucinations?",
          "Answer relevance — does the response actually address what was asked?",
          "Context precision — of the chunks retrieved, how many were genuinely useful versus noise?",
        ],
      },
      {
        type: "p",
        text: "Hand-label 30–50 real questions with good answers, run them on every change, and use an LLM-as-judge to score the rest at scale. It won't be perfect, but it turns 'I think this is better' into a number you can defend.",
      },
    ],
  },
  {
    slug: "quantum-computing-what-it-means-for-software-teams",
    title: "Quantum Computing: What It Actually Means for Software Teams",
    excerpt:
      "Past the hype, quantum computers solve a narrow class of problems extraordinarily well. Here's what's real today, what's still years out, and how to prepare without betting the company on it.",
    category: "Emerging Tech",
    readingTime: "7 min read",
    date: "2026-05-22",
    content: [
      {
        type: "p",
        text: "Quantum computing gets discussed as if it will replace the laptop on your desk. It won't. A quantum computer is a specialized accelerator for a narrow set of problems, much like a GPU is for graphics and AI. Understanding which problems is the difference between useful preparation and wasted effort.",
      },
      { type: "h2", text: "Why it's different" },
      {
        type: "p",
        text: "Classical computers store information in bits that are either 0 or 1. Quantum computers use qubits, which can hold a blend of both states at once (superposition) and be linked so the state of one depends on another (entanglement). This lets a quantum machine explore many possibilities in parallel — but only for algorithms specifically designed to exploit it. For everyday software, a quantum computer is slower and far more fragile than the machine you already have.",
      },
      { type: "h2", text: "Where it genuinely helps" },
      {
        type: "ul",
        items: [
          "Simulating molecules and materials — chemistry and drug discovery, where the system being modeled is itself quantum.",
          "Optimization — routing, scheduling, and portfolio problems with enormous search spaces.",
          "Cryptography — Shor's algorithm could eventually break the public-key encryption securing the internet today.",
        ],
      },
      { type: "h2", text: "The catch: it's still early" },
      {
        type: "p",
        text: "Today's machines are noisy and error-prone. Qubits lose their state in microseconds, and it takes many physical qubits to build one reliable logical qubit. Real, fault-tolerant quantum computing at useful scale is still years away. Most current value comes from research, experimentation, and learning — not production workloads.",
      },
      { type: "h2", text: "What to do now" },
      {
        type: "p",
        text: "Two practical moves. First, treat quantum as a cloud service — providers already offer access, so you can prototype on real hardware and simulators without owning a machine. Second, take 'harvest now, decrypt later' seriously: attackers can store encrypted data today and decrypt it once quantum machines mature. Begin migrating sensitive systems toward post-quantum cryptography now. For most teams, that security migration is the only quantum work that's genuinely urgent.",
      },
    ],
  },
  {
    slug: "embodied-ai-when-models-get-a-body",
    title: "Embodied AI: When Models Get a Body",
    excerpt:
      "The same AI breakthroughs powering chatbots are now moving into robots, arms, and humanoids. A look at how physical AI works, why it's suddenly accelerating, and where it's headed.",
    category: "Emerging Tech",
    readingTime: "7 min read",
    date: "2026-05-22",
    content: [
      {
        type: "p",
        text: "For decades, robots were precise but rigid — they repeated pre-programmed motions and broke the moment the world deviated from the script. Embodied AI changes the premise: instead of scripting every movement, you give a robot a learned model that perceives its surroundings and decides how to act. The intelligence that fluently handles language and images is now learning to handle the physical world.",
      },
      { type: "h2", text: "From perception to action" },
      {
        type: "p",
        text: "Modern robots run on the same foundation-model ideas as chatbots, extended to the physical world. Vision-language-action models take in what a camera sees plus a goal in plain language ('pick up the red cup') and output the motor commands to do it. Trained on huge amounts of demonstration and simulation data, these models generalize to objects and situations they were never explicitly programmed for.",
      },
      { type: "h2", text: "Why now" },
      {
        type: "ul",
        items: [
          "Better models — transformers turned out to work for robot control, not just text.",
          "Cheaper simulation — robots can practice millions of times in a virtual world before touching reality.",
          "Falling hardware costs — capable arms, sensors, and humanoid platforms are far more affordable than a decade ago.",
        ],
      },
      { type: "h2", text: "Where it's showing up" },
      {
        type: "p",
        text: "The first wave is in structured commercial settings: warehouse picking and sorting, manufacturing, logistics, and inspection. Humanoid robots get the headlines, but the near-term value is in focused tasks where a learning-based system can adapt to variation that old automation couldn't handle. General-purpose home robots that fold laundry and load dishwashers reliably are coming, but they're a harder, longer problem.",
      },
      { type: "h2", text: "The honest limits" },
      {
        type: "p",
        text: "Physical AI inherits the reliability problem of all AI, with higher stakes — a hallucination in a chatbot is annoying; a wrong move from a robot arm can be dangerous. Safety, predictability, and graceful failure matter enormously. Expect rapid progress in capability alongside careful, slow rollout into anything that operates near people.",
      },
    ],
  },
  {
    slug: "model-context-protocol-connecting-ai-to-your-tools",
    title: "MCP: Connecting AI Models to Your Tools and Data",
    excerpt:
      "The Model Context Protocol is becoming the USB-C of AI integrations — a standard way to give models safe, structured access to your systems. Here's why it matters.",
    category: "AI Engineering",
    readingTime: "5 min read",
    date: "2026-05-22",
    content: [
      {
        type: "p",
        text: "Every AI integration used to be bespoke glue code: one connector for your database, another for your ticketing system, another for your docs. The Model Context Protocol (MCP) standardizes that plumbing so any compatible model can talk to any compatible tool through a single, well-defined interface.",
      },
      { type: "h2", text: "Why it matters" },
      {
        type: "p",
        text: "MCP lets you expose your data and actions as servers — read a file, query a table, create a ticket — and any MCP-aware assistant can use them with permission. Instead of rebuilding integrations for each model or app, you build the connector once. It pairs naturally with RAG: retrieval becomes just another tool the model can call, alongside live actions in your systems.",
      },
      {
        type: "p",
        text: "For teams, the payoff is composability and governance: a clear boundary around what the model can see and do, with auditable calls. It's early, but MCP is quickly becoming the default way to wire AI into real products.",
      },
    ],
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
