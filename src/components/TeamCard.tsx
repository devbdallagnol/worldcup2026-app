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
    <Card hoverable className="group relative p-5 transition-all duration-300">
      {/* Botão Favoritar mais moderno */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(team.id);
        }}
        className="absolute right-4 top-4 z-10 rounded-full p-2 bg-black/40 border border-white/5 text-bone/30 transition-all hover:scale-110 hover:border-gold/30 hover:text-gold"
        aria-pressed={favorite}
        aria-label={`Marcar ${team.name} como favorita`}
      >
        <Star className={`h-4 w-4 transition-transform group-hover:rotate-12 ${favorite ? "fill-gold text-gold" : ""}`} />
      </button>

      <Link to={`/selecoes/${team.id}`} className="block">
        {/* Bandeira com proporção de design de produto real */}
        <div className="relative overflow-hidden rounded-lg w-16 h-10 mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/10">
          <img
            src={`https://flagcdn.com/w80/${team.flag}.png`}
            alt={`Bandeira de ${team.name}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <h3 className="font-display text-xl font-bold tracking-tight text-bone transition-colors group-hover:text-gold">
          {team.name}
        </h3>
        
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
          <Badge tone="gold">Grupo {team.group}</Badge>
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-amber-400/60 transition-colors">
            {team.code}
          </span>
        </div>
      </Link>
    </Card>
  );
}