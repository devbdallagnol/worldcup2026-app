import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { useWorldCupData } from "../hooks/useMatches";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { MatchCard } from "../components/MatchCard";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export function TeamDetail() {
  const { teamId } = useParams<{ teamId: string }>();
  const { data, isLoading } = useWorldCupData();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const team = data?.teams.find((t) => t.id === teamId);
  const teamMatches = data?.matches.filter(
    (m) => m.homeTeam === teamId || m.awayTeam === teamId
  ) ?? [];

  if (isLoading) {
    return <div className="mx-auto max-w-4xl px-5 py-10 text-xs text-neutral-500 font-bold animate-pulse">Carregando...</div>;
  }

  if (!team) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-10">
        <p className="text-xs font-semibold text-neutral-500">Seleção não encontrada.</p>
        <Link to="/selecoes" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-400">
          <ArrowLeft className="h-4 w-4" /> Voltar para seleções
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(team.id);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Link to="/selecoes" className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-300 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Voltar para seleções
      </Link>

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4.5">
          <img
            src={`https://flagcdn.com/w160/${team.flag}.png`}
            alt={`Bandeira de ${team.name}`}
            className="h-14 w-22 rounded object-cover shadow-2xl border border-white/10"
          />
          <div>
            <h1 className="font-display text-4xl font-black tracking-tight text-neutral-100 sm:text-5xl">
              {team.name}
            </h1>
            <div className="mt-2.5 flex items-center gap-2">
              <Badge tone="gold">Grupo {team.group}</Badge>
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{team.code}</span>
            </div>
          </div>
        </div>

        <Button variant={favorite ? "primary" : "outline"} onClick={() => toggleFavorite(team.id)} className="rounded-xl">
          <Star className={`h-4 w-4 ${favorite ? "fill-neutral-950" : ""}`} />
          {favorite ? "Favoritada" : "Favoritar"}
        </Button>
      </div>

      <h2 className="mb-5 mt-12 font-display text-2xl font-black tracking-tight text-neutral-100">Próximas Partidas</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {teamMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
        {teamMatches.length === 0 && (
          <p className="text-xs font-semibold text-neutral-500">Nenhum jogo cadastrado para esta seleção ainda.</p>
        )}
      </div>
    </div>
  );
}