import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { CountdownTimer } from "../components/CountdownTimer";
import { MatchCard } from "../components/MatchCard";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useWorldCupData } from "../hooks/useMatches";
import { askOpenRouter, OpenRouterError } from "../services/api";
import type { ChatMessage } from "../types";

function AiAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk() {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setQuestion("");
    setError(null);
    setLoading(true);

    try {
      const answer = await askOpenRouter(nextMessages);
      setMessages([...nextMessages, { role: "assistant", content: answer }]);
    } catch (err) {
      setError(
        err instanceof OpenRouterError
          ? err.message
          : "Algo deu errado ao falar com a IA.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-gold" />
        <h3 className="font-display text-xl tracking-wide">
          Pergunte ao comentarista IA
        </h3>
        <span className="ml-auto rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-widest2 text-bone/40">
          via OpenRouter
        </span>
      </div>

      <div className="mb-3 max-h-56 space-y-2 overflow-y-auto pr-1">
        {messages.length === 0 && (
          <p className="text-sm text-bone/40">
            Pergunte sobre uma seleção, um confronto ou peça uma previsão para a
            final. Ex.: "Quem tem mais chances de ser campeão?"
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-lg px-3 py-2 text-sm ${
              m.role === "user"
                ? "ml-auto max-w-[85%] bg-turf/20 text-bone"
                : "mr-auto max-w-[85%] bg-pitch-lighter text-bone/90"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-bone/40">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Consultando o
            modelo...
          </div>
        )}
      </div>

      {error && <p className="mb-2 text-xs text-flame">{error}</p>}

      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Digite sua pergunta..."
          className="w-full rounded-full border border-line bg-pitch px-4 py-2 text-sm text-bone placeholder:text-bone/30 focus:border-gold focus:outline-none"
        />
        <Button
          size="md"
          onClick={handleAsk}
          disabled={loading}
          aria-label="Enviar pergunta"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

export function Home() {
  const { data } = useWorldCupData();
  const finalMatch = data?.knockout.find((m) => m.stage === "Final");
  const featuredMatches = data?.matches.slice(0, 3) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-gold">
            México · Estados Unidos · Canadá
          </p>
          <h1 className="font-display text-5xl leading-[0.95] tracking-wide text-bone sm:text-6xl">
            A Copa do Mundo <span className="text-gold">2026</span> ao vivo,
            grupo a grupo.
          </h1>
          <p className="mt-4 max-w-md text-bone/60">
            Acompanhe os 48 países, a fase de grupos, o mata-mata e converse com
            um assistente de IA para tirar dúvidas sobre a maior Copa da
            história.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/grupos">
              <Button variant="primary" size="lg">
                Ver grupos
              </Button>
            </Link>
            <Link to="/mata-mata">
              <Button variant="outline" size="lg">
                Ver mata-mata
              </Button>
            </Link>
          </div>
        </div>

        {finalMatch && (
          <CountdownTimer
            targetDate={finalMatch.date}
            label="A grande final começa em"
          />
        )}
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-2xl tracking-wide text-bone">
            Jogos em destaque
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>

        <AiAssistant />
      </section>
    </div>
  );
}
