import { useMemo, useState } from "react";
import { useWorldCupData } from "../hooks/useMatches";
import { Header } from "../components/layout/Header";
import { MatchCard } from "../components/MatchCard";
import type { MatchStatus } from "../types";

const STATUS_FILTERS: { value: MatchStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "scheduled", label: "Agendados" },
  { value: "live", label: "Ao vivo" },
  { value: "finished", label: "Encerrados" },
];

export function Matches() {
  const { data, isLoading } = useWorldCupData();
  const [groupFilter, setGroupFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<MatchStatus | "all">("all");

  const filteredMatches = useMemo(() => {
    if (!data) return [];
    return data.matches.filter((match) => {
      const matchesGroup = groupFilter === "all" || match.group === groupFilter;
      const matchesStatus = statusFilter === "all" || match.status === statusFilter;
      return matchesGroup && matchesStatus;
    });
  }, [data, groupFilter, statusFilter]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Header
        eyebrow="Fase de grupos"
        title="Jogos"
        description="Filtre por grupo e status para encontrar o confronto que você procura."
      />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="rounded-full border border-line bg-pitch-light px-4 py-2.5 text-sm text-bone focus:border-gold focus:outline-none"
        >
          <option value="all">Todos os grupos</option>
          {data?.groups.map((g) => (
            <option key={g.id} value={g.id}>
              Grupo {g.id}
            </option>
          ))}
        </select>

        <div className="flex gap-1 rounded-full border border-line bg-pitch-light p-1">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === filter.value
                  ? "bg-turf text-bone"
                  : "text-bone/50 hover:text-bone"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <p className="text-bone/40">Carregando jogos...</p>}

      {!isLoading && filteredMatches.length === 0 && (
        <p className="text-bone/40">Nenhum jogo encontrado para esse filtro.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
