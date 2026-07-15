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
    return <div className="mx-auto max-w-4xl px-5 py-10 text-bone/40">Carregando...</div>;
  }

  if (!team) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-10">
        <p className="text-bone/60">Seleção não encontrada.</p>
        <Link to="/selecoes" className="mt-4 inline-flex items-center gap-2 text-gold">
          <ArrowLeft className="h-4 w-4" /> Voltar para seleções
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(team.id);

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Link to="/selecoes" className="mb-6 inline-flex items-center gap-2 text-sm text-bone/50 hover:text-bone">
        <ArrowLeft className="h-4 w-4" /> Voltar para seleções
      </Link>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={`https://flagcdn.com/w160/${team.flag}.png`}
            alt={`Bandeira de ${team.name}`}
            className="h-14 w-20 rounded object-cover shadow-card"
          />
          <div>
            <h1 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
              {team.name}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge tone="gold">Grupo {team.group}</Badge>
              <span className="text-xs uppercase tracking-widest2 text-bone/40">{team.code}</span>
            </div>
          </div>
        </div>

        <Button variant={favorite ? "primary" : "outline"} onClick={() => toggleFavorite(team.id)}>
          <Star className={`h-4 w-4 ${favorite ? "fill-ink" : ""}`} />
          {favorite ? "Favoritada" : "Favoritar"}
        </Button>
      </div>

      <h2 className="mb-4 mt-10 font-display text-2xl tracking-wide text-bone">Jogos</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {teamMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
        {teamMatches.length === 0 && (
          <p className="text-bone/40">Nenhum jogo cadastrado para esta seleção ainda.</p>
        )}
      </div>
    </div>
  );
}
