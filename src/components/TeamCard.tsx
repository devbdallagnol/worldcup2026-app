import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Team } from "../types";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(team.id);

  return (
    <Card hoverable className="group relative overflow-hidden p-5">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(team.id);
        }}
        className="absolute right-4 top-4 rounded-full p-1.5 text-bone/30 transition-colors hover:text-gold"
        aria-pressed={favorite}
        aria-label={`Marcar ${team.name} como favorita`}
      >
        <Star className={`h-4 w-4 ${favorite ? "fill-gold text-gold" : ""}`} />
      </button>

      <Link to={`/selecoes/${team.id}`} className="block">
        <img
          src={`https://flagcdn.com/w80/${team.flag}.png`}
          alt={`Bandeira de ${team.name}`}
          className="mb-4 h-10 w-16 rounded object-cover shadow-card"
          loading="lazy"
        />
        <h3 className="font-display text-2xl tracking-wide text-bone">{team.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <Badge tone="gold">Grupo {team.group}</Badge>
          <span className="text-xs uppercase tracking-widest2 text-bone/40">{team.code}</span>
        </div>
      </Link>
    </Card>
  );
}
