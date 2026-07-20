import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Send, Loader2, Trophy, Medal } from "lucide-react";
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
              Pergunte sobre a campanha da Espanha, estatísticas dos jogos ou curiosidades do mata-mata. Ex.:{" "}
              <span className="text-amber-400 font-bold block mt-1">
                &quot;Como foi o gol da Espanha na final?&quot;
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
  const featuredMatches = data?.matches.slice(0, 3) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:py-20">
      
      {/* Hero Principal */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/5 bg-[#060e0b]/30 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-12 lg:p-16">
        {/* Glow de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(227,178,60,0.1),_transparent_45%)]" />
        
        <div className="relative grid gap-8 lg:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
                ⭐ 48 seleções
              </span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                🏆 Torneio Encerrado
              </span>
            </div>
            <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-amber-400/80 text-glow">
              México · Estados Unidos · Canadá
            </p>
            <h1 className="font-display text-3xl leading-tight font-black tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
              A Copa do Mundo <span className="gold-gradient-text">2026</span> consagrou sua campeã!
            </h1>
            <p className="mt-5 max-w-xl text-sm text-neutral-400 leading-relaxed font-medium">
              A Espanha superou a Argentina em uma final histórica e conquistou o título. 
              Revise todos os confrontos da fase de grupos, a árvore do mata-mata e use nossa IA para analisar as estatísticas.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/grupos" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center">
                  📊 Ver grupos
                </Button>
              </Link>
              <Link to="/mata-mata" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                  ⚡ Ver mata-mata
                </Button>
              </Link>
            </div>
          </div>

          {/* Card de Destaque da Campeã (Substitui o countdown de forma responsiva) */}
          <div className="glass-panel rounded-2xl border border-white/5 bg-black/40 p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">
                Resultado Final
              </span>
              <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Trophy className="h-2.5 w-2.5" /> Campeã
              </span>
            </div>

            <div className="flex flex-col items-center py-2 text-center">
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-md animate-pulse" />
                <div className="relative rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 p-3.5 text-black shadow-lg">
                  <Trophy className="h-8 w-8 text-neutral-900 stroke-[2.5]" />
                </div>
              </div>
              <h2 className="font-display text-2xl font-black text-neutral-100 tracking-tight">
                Espanha Bicampeã!
              </h2>
              <p className="text-xs text-neutral-400 font-medium mt-1">
                Placar da Final: ESP 1 x 0 ARG (Prorrogação)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 text-left">
              <div className="rounded-xl bg-white/[0.02] border border-white/5 p-2.5">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                  <Medal className="h-3 w-3 text-neutral-400" /> Vice-campeã
                </span>
                <p className="text-xs font-black text-neutral-200 mt-0.5">Argentina</p>
              </div>
              <div className="rounded-xl bg-white/[0.02] border border-white/5 p-2.5">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                  <Medal className="h-3 w-3 text-amber-600" /> 3º Lugar
                </span>
                <p className="text-xs font-black text-neutral-200 mt-0.5">Inglaterra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Secundário */}
      <section className="mt-16 lg:mt-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-neutral-100">
                🎯 Partidas de Destaque
              </h2>
              <p className="mt-1 text-xs text-neutral-500 font-semibold">
                Resultados marcantes do torneio
              </p>
            </div>
            <Link
              to="/jogos"
              className="rounded-xl border border-amber-500/30 px-3 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-300 whitespace-nowrap"
            >
              Ver mais →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 auto-rows-max">
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