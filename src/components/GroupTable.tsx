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
        <div className="h-44 w-full rounded-xl bg-white/[0.02]" />
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4 bg-white/[0.01]">
        <h3 className="font-display text-xl font-black tracking-tight text-neutral-100">
          Grupo {groupId}
        </h3>
        <Badge tone="gold">{standings.length} seleções</Badge>
      </div>

      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full min-w-[420px] text-xs">
          <thead>
            <tr className="text-left text-[10px] font-black uppercase tracking-widest text-neutral-500">
              <th className="px-5 py-3.5 font-bold">Seleção</th>
              {COLUMNS.map((col) => (
                <th key={col} className="px-2.5 py-3.5 text-center font-bold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {standings.map((row, index) => (
              <tr
                key={row.team.id}
                className={`transition-colors duration-200 hover:bg-white/[0.01] ${
                  index < 2 ? "bg-emerald-500/[0.03]" : ""
                }`}
              >
                <td className="whitespace-nowrap px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://flagcdn.com/w40/${row.team.flag}.png`}
                      alt={`Bandeira de ${row.team.name}`}
                      className="h-4 w-6 rounded-[2px] object-cover shadow-sm border border-white/10"
                      loading="lazy"
                    />
                    <span className="font-bold text-neutral-200">{row.team.name}</span>
                  </div>
                </td>
                <td className="px-2.5 py-3 text-center text-neutral-400 font-medium">{row.played}</td>
                <td className="px-2.5 py-3 text-center text-neutral-400 font-medium">{row.wins}</td>
                <td className="px-2.5 py-3 text-center text-neutral-400 font-medium">{row.draws}</td>
                <td className="px-2.5 py-3 text-center text-neutral-400 font-medium">{row.losses}</td>
                <td className="px-2.5 py-3 text-center text-neutral-400 font-medium">{row.goalsFor}</td>
                <td className="px-2.5 py-3 text-center text-neutral-400 font-medium">{row.goalsAgainst}</td>
                <td className="px-2.5 py-3 text-center text-neutral-400 font-medium">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td className="px-2.5 py-3 text-center font-black text-amber-400 text-glow">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-white/5 bg-white/[0.01] px-5 py-3 text-[10px] text-neutral-500 font-semibold leading-relaxed">
        Os dois primeiros colocados (destacados) avançam direto ao mata-mata[cite: 14].
      </p>
    </Card>
  );
}