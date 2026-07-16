import { useMemo } from "react";
import { useWorldCupData } from "../hooks/useMatches";
import type { KnockoutMatch, Team } from "../types";

const STAGE_ORDER = ["Oitavas de Final", "Quartas de Final", "Semifinal", "Final"];

function TeamLine({ team, score, isWinner }: { team?: Team; score: number | null; isWinner: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-2 px-4 py-2 transition-colors duration-200 ${
        isWinner ? "bg-emerald-500/10" : ""
      }`}
    >
      <span className="flex min-w-0 items-center gap-2">
        {team && (
          <img
            src={`https://flagcdn.com/w40/${team.flag}.png`}
            alt=""
            className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover shadow-sm"
            loading="lazy"
          />
        )}
        <span className={`truncate text-xs ${isWinner ? "font-extrabold text-amber-400" : "text-neutral-400"}`}>
          {team?.name ?? "A definir"}
        </span>
      </span>
      <span className={`font-mono text-xs font-bold ${isWinner ? "text-amber-400 text-glow" : "text-neutral-500"}`}>
        {score ?? "–"}
      </span>
    </div>
  );
}

function BracketMatch({ match, teamsById }: { match: KnockoutMatch; teamsById: Map<string, Team> }) {
  const home = teamsById.get(match.homeTeam);
  const away = teamsById.get(match.awayTeam);
  const homeWins =
    match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore;
  const awayWins =
    match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore;

  return (
    <div className="w-52 shrink-0 rounded-xl border border-white/10 bg-[#060e0b]/40 backdrop-blur-md shadow-lg hover:border-white/20 transition-all duration-300">
      <TeamLine team={home} score={match.homeScore} isWinner={homeWins} />
      <div className="h-[1px] bg-white/5" />
      <TeamLine team={away} score={match.awayScore} isWinner={awayWins} />
      {match.status === "scheduled" && (
        <p className="border-t border-white/5 bg-white/[0.01] px-4 py-1 text-[9px] font-black uppercase tracking-widest text-amber-400/80">
          Próximo jogo
        </p>
      )}
    </div>
  );
}

export function Bracket() {
  const { data, isLoading } = useWorldCupData();

  const teamsById = useMemo(
    () => new Map((data?.teams ?? []).map((t) => [t.id, t])),
    [data]
  );

  const stages = useMemo(() => {
    if (!data) return [];
    return STAGE_ORDER.map((stage) => ({
      stage,
      matches: data.knockout.filter((m) => m.stage === stage),
    })).filter((s) => s.matches.length > 0);
  }, [data]);

  if (isLoading) {
    return <div className="h-64 w-full animate-pulse rounded-2xl bg-white/[0.02] border border-white/5" />;
  }

  return (
    <div className="overflow-x-auto pb-6 scrollbar-thin">
      <div className="flex min-w-max gap-10 py-4">
        {stages.map(({ stage, matches }) => (
          <div key={stage} className="flex flex-col gap-6">
            <h3 className="text-center text-[10px] font-black uppercase tracking-widest text-neutral-400/80">
              {stage}
            </h3>
            <div className="flex flex-1 flex-col justify-around gap-8">
              {matches.map((match) => (
                <BracketMatch key={match.id} match={match} teamsById={teamsById} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}