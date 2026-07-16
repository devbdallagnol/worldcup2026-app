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
    <Card className="border-white/5 bg-[#060e0b]/20 p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-500/10 p-2 border border-amber-500/20">
            <Sparkles className="h-5 w-5 text-amber-400" />
          </div>
          <h3 className="font-display text-lg font-black tracking-tight text-neutral-100">
            Comentarista IA
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-neutral-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          OpenRouter
        </span>
      </div>

      <div className="max-h-60 space-y-4 overflow-y-auto pr-1 scrollbar-thin">
        {messages.length === 0 && (
          <div className="rounded-xl bg-white/[0.01] p-4 border border-white/5 text-center">
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pergunte sobre uma seleção, um confronto ou peça uma previsão para
              a final. Ex.:{" "}
              <span className="text-amber-400 font-bold block mt-1">
                &quot;Quem tem mais chances de ser campeão?&quot;
              </span>
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
              m.role === "user"
                ? "ml-auto max-w-[85%] bg-emerald-500/10 border border-emerald-500/20 text-neutral-100 font-bold"
                : "mr-auto max-w-[85%] bg-white/[0.03] border border-white/5 text-neutral-300 font-medium"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" /> Consultando o modelo...
          </div>
        )}
      </div>

      {error && (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-[11px] font-bold text-red-400 border border-red-500/20">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Pergunte à inteligência artificial..."
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4.5 py-3 text-xs font-semibold text-neutral-200 placeholder:text-neutral-500 focus:border-amber-500/50 focus:outline-none transition-all hover:border-white/20"
        />
        <Button
          size="sm"
          onClick={handleAsk}
          disabled={loading}
          aria-label="Enviar pergunta"
          className="rounded-xl"
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
    <div className="mx-auto max-w-6xl px-5 py-12 lg:py-20">
      
      {/* Hero Principal */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/5 bg-[#060e0b]/30 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-12 lg:p-16">
        {/* Glow de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(227,178,60,0.1),_transparent_45%)]" />
        
        <div className="relative grid gap-12 lg:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-400">
                ⭐ 48 seleções
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-300">
                🏆 Fase de grupos
              </span>
            </div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-amber-400/80 text-glow">
              México · Estados Unidos · Canadá
            </p>
            <h1 className="font-display text-4xl leading-tight font-black tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
              A Copa do Mundo <span className="gold-gradient-text">2026</span> ao vivo, grupo a grupo.
            </h1>
            <p className="mt-5 max-w-xl text-sm text-neutral-400 leading-relaxed font-medium">
              Acompanhe os 48 países, a fase de grupos, o mata-mata e converse
              com um assistente de IA para tirar dúvidas sobre a maior Copa da história[cite: 17].
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link to="/grupos" className="flex-shrink-0">
                <Button variant="primary" size="lg">
                  📊 Ver grupos
                </Button>
              </Link>
              <Link to="/mata-mata" className="flex-shrink-0">
                <Button variant="outline" size="lg">
                  ⚡ Ver mata-mata
                </Button>
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/5 bg-black/20 p-2 shadow-2xl">
            {finalMatch ? (
              <CountdownTimer
                targetDate={finalMatch.date}
                label="A grande final começa em"
              />
            ) : (
              <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 text-center">
                <p className="text-xs font-semibold text-neutral-500">
                  A programação será atualizada em breve[cite: 17].
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid Secundário */}
      <section className="mt-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-black tracking-tight text-neutral-100">
                🎯 Jogos em destaque
              </h2>
              <p className="mt-1 text-xs text-neutral-500 font-semibold">
                Próximas rodadas da fase de grupos
              </p>
            </div>
            <Link
              to="/jogos"
              className="rounded-xl border border-amber-500/30 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-300"
            >
              Ver mais →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 auto-rows-max">
            {featuredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>

        {/* Bloco Assistente IA lateral */}
        <div className="glass-panel rounded-3xl border border-white/5 bg-black/15 p-1 flex flex-col justify-center">
          <AiAssistant />
        </div>
      </section>
    </div>
  );
}