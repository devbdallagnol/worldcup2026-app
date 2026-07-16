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

      {/* Seção Filtros Refatorada */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#060e0b]/40 backdrop-blur-md px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-300 focus:border-amber-500/50 focus:outline-none transition-all cursor-pointer"
        >
          <option value="all" className="bg-[#060e0b] text-neutral-300">Todos os grupos</option>
          {data?.groups.map((g) => (
            <option key={g.id} value={g.id} className="bg-[#060e0b] text-neutral-300">
              Grupo {g.id}
            </option>
          ))}
        </select>

        <div className="flex gap-1 rounded-xl border border-white/5 bg-black/20 p-1">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                statusFilter === filter.value
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <p className="text-xs text-neutral-500 font-semibold animate-pulse">Carregando jogos...</p>}

      {!isLoading && filteredMatches.length === 0 && (
        <p className="text-xs text-neutral-500 font-semibold">Nenhum jogo encontrado para esse filtro.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}