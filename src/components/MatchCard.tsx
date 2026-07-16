import { MapPin, CalendarDays, Star } from "lucide-react";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useWorldCupData } from "../hooks/useMatches";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import type { Match, Team } from "../types";

interface MatchCardProps {
  match: Match;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function TeamRow({
  team,
  score,
  isWinner,
}: {
  team?: Team;
  score: number | null;
  isWinner: boolean;
}) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  if (!team) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-2.5 px-1.5 rounded-xl hover:bg-white/[0.02] transition-colors duration-200">
      <button
        onClick={() => toggleFavorite(team.id)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left group"
        aria-pressed={isFavorite(team.id)}
        aria-label={`Marcar ${team.name} como favorito`}
      >
        <img
          src={`https://flagcdn.com/w40/${team.flag}.png`}
          alt=""
          className="h-5 w-7 shrink-0 rounded-sm object-cover shadow-md border border-white/10"
          loading="lazy"
        />
        <span
          className={`truncate text-sm font-extrabold ${
            isWinner ? "text-amber-400 text-glow" : "text-neutral-200"
          }`}
        >
          {team.name}
        </span>
        <Star
          className={`h-3.5 w-3.5 transition-all duration-300 ${
            isFavorite(team.id)
              ? "fill-amber-400 text-amber-400 scale-110"
              : "text-neutral-700 group-hover:text-amber-400/50"
          }`}
        />
      </button>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/40 border border-white/10 shadow-inner">
        <span
          className={`font-mono text-xl font-black ${isWinner ? "text-amber-400 text-glow" : "text-neutral-400"}`}
        >
          {score ?? "–"}
        </span>
      </div>
    </div>
  );
}

export function MatchCard({ match }: MatchCardProps) {
  const { data } = useWorldCupData();
  const home = data?.teams.find((t) => t.id === match.homeTeam);
  const away = data?.teams.find((t) => t.id === match.awayTeam);

  const homeWins =
    match.homeScore !== null &&
    match.awayScore !== null &&
    match.homeScore > match.awayScore;
  const awayWins =
    match.homeScore !== null &&
    match.awayScore !== null &&
    match.awayScore > match.homeScore;

  const statusTone =
    match.status === "live"
      ? "live"
      : match.status === "finished"
        ? "finished"
        : "scheduled";
  const statusLabel =
    match.status === "live"
      ? "Ao vivo"
      : match.status === "finished"
        ? "Encerrado"
        : "Agendado";

  return (
    <Card hoverable className="relative overflow-hidden p-6 sm:p-7 border border-white/5">
      {/* Indicador superior por gradiente de borda translúcida */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-amber-400/50 via-emerald-500/50 to-amber-400/50" />
      
      <div className="mb-5 flex items-center justify-between">
        <Badge tone={statusTone}>{statusLabel}</Badge>
        {match.group && (
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 bg-white/[0.04] border border-white/5 px-3 py-1 rounded-full">
            Grupo {match.group}
          </span>
        )}
      </div>

      <div className="space-y-2.5 my-5">
        <TeamRow team={home} score={match.homeScore} isWinner={homeWins} />
        <TeamRow team={away} score={match.awayScore} isWinner={awayWins} />
      </div>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-white/5 pt-5 text-[11px] text-neutral-400">
        <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
          <CalendarDays className="h-4 w-4 text-amber-400/60" />{" "}
          {formatDate(match.date)}
        </span>
        <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
          <MapPin className="h-4 w-4 text-amber-400/60" /> {match.stadium} ·{" "}
          {match.city}
        </span>
      </div>
    </Card>
  );
}