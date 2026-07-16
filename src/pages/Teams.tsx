import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useWorldCupData } from "../hooks/useMatches";
import { Header } from "../components/layout/Header";
import { TeamCard } from "../components/TeamCard";

export function Teams() {
  const { data, isLoading } = useWorldCupData();
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("all");

  const filteredTeams = useMemo(() => {
    if (!data) return [];
    return data.teams.filter((team) => {
      const matchesSearch = team.name.toLowerCase().includes(search.toLowerCase());
      const matchesGroup = groupFilter === "all" || team.group === groupFilter;
      return matchesSearch && matchesGroup;
    });
  }, [data, search, groupFilter]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Header
        eyebrow="48 seleções"
        title="Seleções"
        description="Busque por nome ou filtre por grupo para conhecer cada seleção classificada."
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Input de Busca de Vidro */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar seleção..."
            className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-xs font-semibold text-neutral-200 placeholder:text-neutral-500 focus:border-amber-500/50 focus:outline-none transition-all hover:border-white/20"
          />
        </div>

        {/* Dropdown de Vidro */}
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#060e0b]/40 px-4.5 py-3 text-xs font-bold uppercase tracking-wider text-neutral-300 focus:border-amber-500/50 focus:outline-none transition-all cursor-pointer"
        >
          <option value="all" className="bg-[#060e0b] text-neutral-300">Todos os grupos</option>
          {data?.groups.map((g) => (
            <option key={g.id} value={g.id} className="bg-[#060e0b] text-neutral-300">
              Grupo {g.id}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <p className="text-xs text-neutral-500 font-semibold animate-pulse">Carregando seleções...</p>}

      {!isLoading && filteredTeams.length === 0 && (
        <p className="text-xs text-neutral-500 font-semibold">Nenhuma seleção encontrada para essa busca.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}