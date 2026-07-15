import { useGroupStandings } from "../hooks/useMatches";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

interface GroupTableProps {
  groupId: string;
}

const COLUMNS = ["P", "J", "V", "E", "D", "GP", "GC", "SG", "Pts"];

export function GroupTable({ groupId }: GroupTableProps) {
  const { standings, isLoading } = useGroupStandings(groupId);

  if (isLoading) {
    return (
      <Card className="animate-pulse p-5">
        <div className="h-40 w-full rounded-lg bg-pitch-lighter" />
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <h3 className="font-display text-xl tracking-wide text-bone">
          Grupo {groupId}
        </h3>
        <Badge tone="gold">{standings.length} seleções</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-widest2 text-bone/40">
              <th className="px-5 py-2 font-medium">Seleção</th>
              {COLUMNS.map((col) => (
                <th key={col} className="px-2 py-2 text-center font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => (
              <tr
                key={row.team.id}
                className={`border-t border-line ${index < 2 ? "bg-turf/10" : ""}`}
              >
                <td className="whitespace-nowrap px-5 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={`https://flagcdn.com/w40/${row.team.flag}.png`}
                      alt={`Bandeira de ${row.team.name}`}
                      className="h-4 w-6 rounded-[2px] object-cover"
                      loading="lazy"
                    />
                    <span className="font-medium text-bone">{row.team.name}</span>
                  </div>
                </td>
                <td className="px-2 py-2.5 text-center text-bone/70">{row.played}</td>
                <td className="px-2 py-2.5 text-center text-bone/70">{row.wins}</td>
                <td className="px-2 py-2.5 text-center text-bone/70">{row.draws}</td>
                <td className="px-2 py-2.5 text-center text-bone/70">{row.losses}</td>
                <td className="px-2 py-2.5 text-center text-bone/70">{row.goalsFor}</td>
                <td className="px-2 py-2.5 text-center text-bone/70">{row.goalsAgainst}</td>
                <td className="px-2 py-2.5 text-center text-bone/70">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td className="px-2 py-2.5 text-center font-bold text-gold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-line px-5 py-2.5 text-[11px] text-bone/40">
        Os dois primeiros colocados (destacados) avançam direto ao mata-mata.
      </p>
    </Card>
  );
}
