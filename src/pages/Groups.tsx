import { useWorldCupData } from "../hooks/useMatches";
import { Header } from "../components/layout/Header";
import { GroupTable } from "../components/GroupTable";

export function Groups() {
  const { data, isLoading } = useWorldCupData();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Header
        eyebrow="Fase de grupos"
        title="Grupos de A a L"
        description="12 grupos de 4 seleções. Os dois primeiros de cada grupo avançam direto às oitavas de final."
      />

      {isLoading && <p className="text-bone/40">Carregando grupos...</p>}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.groups.map((group) => (
          <GroupTable key={group.id} groupId={group.id} />
        ))}
      </div>
    </div>
  );
}
