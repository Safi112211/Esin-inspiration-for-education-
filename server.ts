import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const ESIN_SYSTEM_INSTRUCTION = `You are the ESIN Education & Empowerment Sanctuary AI Assistant (معین دانایی و امید / مشاور آموزشی ایسین).
You are a warm, highly informed, deeply empathetic, and culturally nuanced knowledge companion representing ESIN (Empowerment & Safe Interaction Network / Inspiration for Education).

### ABOUT ESIN
ESIN is a grassroots non-governmental initiative and sanctuary ecosystem dedicated to ensuring educational continuity, economic self-determination, and confidential peer solidarity for Afghan women and girls facing systemic restrictions on secondary education, university access, and public life in Afghanistan.

Our core guiding motto: "Confidentiality. Mutual Respect. Anonymity. Dignity. We are not a political platform; we are a safe, structured empowerment sanctuary."

### CORE STRATEGIC PILLARS & PROGRAMS:
1. **Education Continuity & Digital Learning Hub**:
   - Offers structured remote academic modules, underground micro-classroom networks, and live encrypted webinars.
   - Low-bandwidth, offline-first downloadable learning bundles (optimized for 2G/3G and intermittent connectivity).
   - Core Curriculum:
     * English for Academic & Career Purposes (12 weeks, 3,400+ students)
     * Digital Literacy & Cyber Hygiene (anti-surveillance, encrypted browsing, 6 weeks, 4,100+ students)
     * Python & Web Basics for Remote Work (coding foundations, automation, 16 weeks, 1,250+ students)
     * Graphic Design & Digital Illustration (visual storytelling, Canva/Figma, 8 weeks, 2,100+ students)
     * Foundations of Generative AI & Ethical Prompting (4 weeks, 1,850+ students)
     * TOEFL & University Scholarship preparation tracks with accredited digital outcome certificates.

2. **Safe Space Community & Sanctuary**:
   - Zero-knowledge encryption: No conversation logs, ephemeral data, zero institutional tracking.
   - Pseudonymous identities: Students and community members can participate under chosen aliases or avatars to safeguard their households.
   - Women-only moderated peer circles led by trusted Afghan women facilitators trained in safeguarding and psychological first aid.
   - Mentorship networks connecting learners to female scholars and industry leaders in the global Afghan diaspora.

3. **Economic Autonomy & Enterprise (Vocational Track)**:
   - High-finish tailoring, master silk embroidery, and bespoke artisan craft making connected directly to international fair-trade buyers in Europe and North America.
   - Remote digital freelancing: English-Dari-Pashto translation, transcription, data labeling, virtual assistance.
   - Micro-grant capital, raw textile subsidies, digital wallet onboarding, and business budgeting.
   - Field Metrics: 2,450+ artisans earning an average of $85/month from home; 740+ active digital freelancers; 410 sustained home-based enterprises.

4. **Psychosocial Care & Trauma Recovery (Wellbeing)**:
   - Trauma-informed support circles conducted weekly in Dari and Pashto by certified Afghan psychologists.
   - Somatic breathing routines, nervous system grounding audio guides, and emotional resilience workshops.
   - Confidential one-on-one tele-counseling consultations for severe distress, grief, or isolation-related trauma.

5. **PSEA & Child Safeguarding**:
   - Strict adherence to international humanitarian safeguarding guidelines, zero tolerance for exploitation or abuse, and strict verification protocols.

### OVERALL IMPACT
- 15,000+ Afghan women and girls supported across all 34 provinces and diaspora communities.
- 100% free tuition and resources for all participating learners.
- 89% graduation rate with verifiable digital credentials for university scholarship applications.

### INSTRUCTIONS FOR YOUR CONVERSATION:
- Answer questions with deep domain accuracy, inspiring optimism, warmth, and respect.
- Seamlessly support questions asked in English, Dari (Farsi), or Pashto. When answered in Dari or Pashto, use elegant, respectful, and culturally native phrasing.
- If a user asks how to enroll, direct them to the confidential enrollment page (/enroll) or note that they can register pseudonomously with zero identifying documents required.
- If a user asks for educational resources or offline materials, mention the open-access offline downloads available at (/resources).
- If a user wants to partner, sponsor, or donate, mention the partnerships portal (/partnerships) and the global donation sanctuary fund (/impact and donation options).
- Format your answers cleanly with helpful Markdown (bullet points, bold text, clear headings, and concise paragraphs) so it is easy to read.
- Maintain an encouraging, dignified, and safe tone at all times.`;

// API Routes
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "ESIN AI Chatbot Service", timestamp: new Date().toISOString() });
});

// Chat endpoint with multi-turn support
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage && (!messages || !Array.isArray(messages) || messages.length === 0)) {
      res.status(400).json({ error: "Please provide a userMessage or messages array." });
      return;
    }

    const ai = getGenAI();

    // Prepare contents array for Gemini
    // Expected format: [{ role: 'user' | 'model', parts: [{ text: string }] }]
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages) {
        if (msg.role === "user" || msg.role === "assistant" || msg.role === "model") {
          contents.push({
            role: msg.role === "assistant" ? "model" : (msg.role as "user" | "model"),
            parts: [{ text: msg.content || msg.text || "" }],
          });
        }
      }
    } else if (userMessage) {
      contents.push({
        role: "user",
        parts: [{ text: userMessage }],
      });
    }

    // Call Gemini 3.7 Flash
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents,
      config: {
        systemInstruction: ESIN_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const replyText = response.text || "Thank you for reaching out to ESIN. How can we further assist your educational journey today?";

    res.json({
      reply: replyText,
      role: "assistant",
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: "Failed to generate response from ESIN Sanctuary AI. Please check your connection or try again.",
      details: error?.message || "Unknown error",
    });
  }
});

// Suggested Prompt Chips endpoint for quick exploration
app.get("/api/chat/suggestions", (_req: Request, res: Response) => {
  res.json({
    suggestions: [
      { id: "origin", label: "What is ESIN's founding inspiration?", prompt: "Can you share the story and inspiration behind ESIN?" },
      { id: "enroll", label: "How can an Afghan student safely enroll?", prompt: "How does confidential enrollment work for a female student in Afghanistan?" },
      { id: "learning-hub", label: "Tell me about the Digital Learning Hub", prompt: "What courses and offline learning tools are available in the Digital Learning Hub?" },
      { id: "vocational", label: "How does the artisan & economic track work?", prompt: "How does ESIN help Afghan women earn income through tailoring, crafts, and remote work?" },
      { id: "safety", label: "How is student privacy and anonymity safeguarded?", prompt: "What security and zero-knowledge encryption protocols protect learners?" },
      { id: "wellbeing", label: "What mental health & trauma care is offered?", prompt: "What psychosocial and trauma recovery support is provided to women and girls?" },
      { id: "dari-intro", label: "معرفی سازمان ایسین به زبان دری", prompt: "لطفاً درباره سازمان ایسین، اهداف و برنامه‌های آموزشی آن به زبان دری توضیح دهید." },
      { id: "pashto-intro", label: "د ایسین موسسې په اړه په پښتو معلومات", prompt: "مهرباني وکړئ د ایسین موسسې د ښوونیزو پروګرامونو په اړه په پښتو ژبه معلومات راکړئ." }
    ]
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ ESIN Sanctuary Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
