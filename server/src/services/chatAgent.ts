import { contactInfo, projects, services, valuePropositions } from '../data/content.js';
import { ChatMessage } from '../types/index.js';

const SERVICE_AREA = 'Northern Virginia and the Washington, D.C. area';

function buildKnowledgeBase(): string {
  const serviceList = services.map((s) => `- ${s.title}: ${s.description}`).join('\n');
  const projectList = projects.map((p) => `- ${p.name} (${p.location})`).join('\n');
  const valuesList = valuePropositions.map((v) => `- ${v.title}: ${v.description}`).join('\n');

  return `
Company: Portillo Ceramic and Tile (family-owned)
Owner: ${contactInfo.name}
Phone: ${contactInfo.phone}
Email: ${contactInfo.email}
Service area: ${SERVICE_AREA}

Services:
${serviceList}

Notable projects:
${projectList}

Why customers choose Portillo:
${valuesList}

Quote requests: Direct customers to the Contact page or call ${contactInfo.phone}.
Cost guides: City-by-city typical tile cost ranges are at /cost-guides.
Material library: Porcelain vs ceramic, mosaics, stone looks, and common sizes with photos at /materials.
`.trim();
}

const SYSTEM_PROMPT = `You are the live assistant for Portillo Ceramic and Tile, a family-owned ceramic and tile company owned by Abel Portillo.

Answer questions helpfully, warmly, and concisely using only the business information below.
If asked about pricing, share that typical bathroom tile in the DMV often falls in a local range (roughly $8,000–$32,000 installed depending on the city) and send them to the Cost Guides pages at /cost-guides. Quotes are still personalized — suggest calling ${contactInfo.phone} or using the Contact page.
If asked about porcelain vs ceramic, mosaics, stone-look tile, or typical sizes, send them to the Material Library at /materials.
If you cannot answer something specific, recommend contacting Abel Portillo at ${contactInfo.phone} or ${contactInfo.email}.
Never invent project details, prices, or services not listed below.

${buildKnowledgeBase()}`;

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function findMatchingServices(text: string) {
  return services.filter((service) => {
    const title = normalize(service.title);
    const id = service.id.replace(/-/g, ' ');
    return text.includes(title) || text.includes(id) || text.includes(normalize(service.title.split(' ')[0]));
  });
}

function generateLocalResponse(messages: ChatMessage[]): string {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');
  if (!latestUserMessage) {
    return `Hi! I'm the Portillo Ceramic and Tile assistant. Ask me about our services, experience, or how to request a quote. You can also reach Abel Portillo directly at ${contactInfo.phone}.`;
  }

  const text = normalize(latestUserMessage.content);

  if (includesAny(text, ['hello', 'hi ', 'hi!', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
    return `Hello! I'm here to help with questions about Portillo Ceramic and Tile. We specialize in bathroom renovations, shower installation, ceramic and porcelain tile, and commercial work across ${SERVICE_AREA}. How can I help you today?`;
  }

  if (includesAny(text, ['thank', 'thanks', 'appreciate'])) {
    return `You're welcome! If you'd like a quote or want to discuss your project with Abel Portillo, call ${contactInfo.phone} or visit our Contact page.`;
  }

  if (includesAny(text, ['quote', 'estimate', 'pricing', 'price', 'cost', 'how much'])) {
    return `Typical bathroom tile in Northern Virginia and nearby cities often falls in a local installed range—for example Arlington is usually higher than Martinsburg. Browse our Cost Guides for city-by-city numbers, use the Cost Estimator for a project ballpark, or call ${contactInfo.phone} for a personalized quote.`;
  }

  if (includesAny(text, ['contact', 'phone', 'email', 'call', 'reach', 'abel'])) {
    return `You can reach Abel Portillo at ${contactInfo.phone} or ${contactInfo.email}. Use the Contact page on this site to send project details and request a quote.`;
  }

  if (includesAny(text, ['porcelain', 'ceramic', 'mosaic', 'zellige', 'subway', 'material library', 'types of tile', 'tile types'])) {
    return `Browse our Material Library at /materials for porcelain vs ceramic, mosaics, stone-look tile, and typical sizes with photos. We install all of these in bathrooms, showers, kitchens, and commercial spaces.`;
  }

  if (includesAny(text, ['where', 'location', 'area', 'service area', 'northern virginia', 'dc', 'd.c', 'virginia'])) {
    return `Portillo Ceramic and Tile serves ${SERVICE_AREA}. Contact us to confirm availability for your specific location.`;
  }

  if (includesAny(text, ['experience', 'portfolio', 'project', 'work', 'capitals', 'pentagon', 'orangetheory', 'commercial'])) {
    return `Our portfolio includes professional work at Capital One Arena for the Washington Capitals, restroom and professional spaces at the Pentagon, and locker room facilities at Orangetheory Fitness in Leesburg, Virginia—along with many residential bathroom and tile projects. Visit the Experience page to learn more.`;
  }

  if (includesAny(text, ['why portillo', 'why choose', 'family', 'quality', 'trust', 'detail'])) {
    return `Portillo Ceramic and Tile is family-owned, with a focus on professional experience, attention to detail, quality without shortcuts, and installations built to last. Visit the Why Portillo page to read more about what sets us apart.`;
  }

  if (includesAny(text, ['service', 'offer', 'do you do', 'install', 'renovation', 'shower', 'bathroom', 'tile', 'backsplash', 'locker', 'waterproof', 'demolition', 'repair', 'replace'])) {
    const matches = findMatchingServices(text);
    if (matches.length === 1) {
      return `${matches[0].title}: ${matches[0].description} Visit our Services page or ask for a quote to discuss your project.`;
    }
    if (matches.length > 1) {
      return `We can help with ${matches.map((service) => service.title).join(', ')}. Tell me more about your project, or see full details on the Services page.`;
    }

    return `We offer ${services.map((service) => service.title).join(', ')}. Tell me which type of project you're planning and I can point you in the right direction.`;
  }

  if (includesAny(text, ['hour', 'open', 'available', 'schedule', 'when'])) {
    return `For scheduling and availability, please contact Abel Portillo directly at ${contactInfo.phone} or ${contactInfo.email}.`;
  }

  return `I can help with our services, service area, notable projects, and how to request a quote. For detailed project advice, Abel Portillo is available at ${contactInfo.phone} or through the Contact page.`;
}

export function isAiChatConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export function getChatMode(): 'ai' | 'local' {
  return isAiChatConfigured() ? 'ai' : 'local';
}

async function generateAiResponse(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return generateLocalResponse(messages);
  }

  const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 400,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    }),
  });

  if (!response.ok) {
    console.error('OpenAI chat request failed:', response.status, await response.text());
    return generateLocalResponse(messages);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  return content || generateLocalResponse(messages);
}

export async function generateChatResponse(messages: ChatMessage[]): Promise<{
  reply: string;
  mode: 'ai' | 'local';
}> {
  if (isAiChatConfigured()) {
    return {
      reply: await generateAiResponse(messages),
      mode: 'ai',
    };
  }

  return {
    reply: generateLocalResponse(messages),
    mode: 'local',
  };
}
