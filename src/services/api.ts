import rawData from "../data/worldcup2026.json";
import type { ChatMessage, WorldCupData } from "../types";

// -----------------------------------------------------------------------
// Dados da Copa do Mundo 2026
// -----------------------------------------------------------------------

export async function fetchWorldCupData(): Promise<WorldCupData> {
  // simula latência de rede para os estados de loading ficarem visíveis
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // Mapeamos os dados injetando a propriedade 'round' exigida pelo tipo Match
  // para sanar o erro TS2352 de build na Vercel
  const optimizedData: WorldCupData = {
    ...rawData,
    tournament: {
      ...rawData.tournament,
      // Se seu tipo Tournament ainda não possui os campos novos do topo do JSON,
      // este spread garante a compatibilidade total
    },
    matches: rawData.matches.map((match) => ({
      ...match,
      round: null, // Injeta o valor nulo aceito pela sua interface Match
    })),
    // Caso sua interface KnockoutMatch também precise, mantemos a estrutura íntegra
    knockout: rawData.knockout.map((match) => ({
      ...match,
    })) as WorldCupData["knockout"],
  } as unknown as WorldCupData;

  return optimizedData;
}

// -----------------------------------------------------------------------
// OpenRouter — assistente de IA (previsões, curiosidades, resumo de jogos)
// -----------------------------------------------------------------------

const OPENROUTER_BASE_URL =
  import.meta.env.VITE_OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";
const OPENROUTER_MODEL =
  import.meta.env.VITE_OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct:free";
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as
  | string
  | undefined;

export class OpenRouterError extends Error {}

interface OpenRouterResponse {
  choices?: { message?: { role: string; content: string } }[];
  error?: { message: string };
}

/**
 * Envia uma conversa para a OpenRouter e retorna o texto de resposta.
 * Lança OpenRouterError com uma mensagem amigável em caso de falha.
 */
export async function askOpenRouter(
  messages: ChatMessage[],
  systemPrompt = "Você é um comentarista especialista na Copa do Mundo FIFA 2026. Responda em português, de forma breve, animada e factual, deixando claro quando estiver especulando."
): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    throw new OpenRouterError(
      "Configure VITE_OPENROUTER_API_KEY no arquivo .env para habilitar o assistente de IA."
    );
  }

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      // headers recomendados pela OpenRouter para identificar o app nos rankings
      "HTTP-Referer": import.meta.env.VITE_APP_URL ?? "http://localhost:5173",
      "X-Title": import.meta.env.VITE_APP_NAME ?? "Copa 2026 App",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 400,
    }),
  });

  const data: OpenRouterResponse = await response.json();

  if (!response.ok || data.error) {
    throw new OpenRouterError(
      data.error?.message ?? `Erro ao consultar a OpenRouter (HTTP ${response.status}).`
    );
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new OpenRouterError("A OpenRouter retornou uma resposta vazia.");
  }

  return content;
}