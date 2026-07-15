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

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar seleção..."
            className="w-full rounded-full border border-line bg-pitch-light py-2.5 pl-10 pr-4 text-sm text-bone placeholder:text-bone/30 focus:border-gold focus:outline-none"
          />
        </div>

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
      </div>

      {isLoading && <p className="text-bone/40">Carregando seleções...</p>}

      {!isLoading && filteredTeams.length === 0 && (
        <p className="text-bone/40">Nenhuma seleção encontrada para essa busca.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTeams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
