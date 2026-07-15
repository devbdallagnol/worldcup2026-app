import { MapPin, CalendarDays } from "lucide-react";
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

function TeamRow({ team, score, isWinner }: { team?: Team; score: number | null; isWinner: boolean }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  if (!team) return null;

  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <button
        onClick={() => toggleFavorite(team.id)}
        className="flex min-w-0 items-center gap-2.5 text-left"
        aria-pressed={isFavorite(team.id)}
        aria-label={`Marcar ${team.name} como favorito`}
      >
        <img
          src={`https://flagcdn.com/w40/${team.flag}.png`}
          alt=""
          className="h-4 w-6 shrink-0 rounded-[2px] object-cover"
          loading="lazy"
        />
        <span
          className={`truncate text-sm ${
            isWinner ? "font-bold text-bone" : "font-medium text-bone/80"
          }`}
        >
          {team.name}
        </span>
        <span
          className={`text-xs ${isFavorite(team.id) ? "text-gold" : "text-bone/20"}`}
          aria-hidden
        >
          ★
        </span>
      </button>
      <span className={`font-mono text-lg ${isWinner ? "text-gold" : "text-bone/70"}`}>
        {score ?? "–"}
      </span>
    </div>
  );
}

export function MatchCard({ match }: MatchCardProps) {
  const { data } = useWorldCupData();
  const home = data?.teams.find((t) => t.id === match.homeTeam);
  const away = data?.teams.find((t) => t.id === match.awayTeam);

  const homeWins =
    match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore;
  const awayWins =
    match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore;

  const statusTone =
    match.status === "live" ? "live" : match.status === "finished" ? "finished" : "scheduled";
  const statusLabel =
    match.status === "live" ? "Ao vivo" : match.status === "finished" ? "Encerrado" : "Agendado";

  return (
    <Card hoverable className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <Badge tone={statusTone}>{statusLabel}</Badge>
        {match.group && <span className="text-xs font-semibold text-bone/40">Grupo {match.group}</span>}
      </div>

      <TeamRow team={home} score={match.homeScore} isWinner={homeWins} />
      <TeamRow team={away} score={match.awayScore} isWinner={awayWins} />

      <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 text-xs text-bone/40">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" /> {formatDate(match.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> {match.stadium} · {match.city}
        </span>
      </div>
    </Card>
  );
}
