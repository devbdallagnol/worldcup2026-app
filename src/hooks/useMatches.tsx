import { useQuery } from "@tanstack/react-query";
import { fetchWorldCupData } from "../services/api";
import type { Group, GroupStanding, Match, Team, WorldCupData } from "../types";

const QUERY_KEY = ["worldcup2026"] as const;

/**
 * Busca (e cacheia) todo o dataset da Copa 2026: seleções, grupos, jogos e mata-mata.
 */
export function useWorldCupData() {
  return useQuery<WorldCupData>({
    queryKey: QUERY_KEY,
    queryFn: fetchWorldCupData,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

/** Retorna os jogos de um grupo específico (ex.: "A"). */
export function useMatchesByGroup(groupId?: string) {
  const { data, ...rest } = useWorldCupData();
  const matches = groupId
    ? data?.matches.filter((m) => m.group === groupId) ?? []
    : data?.matches ?? [];
  return { matches, ...rest };
}

/** Calcula a tabela de classificação de um grupo a partir dos jogos finalizados. */
export function useGroupStandings(groupId: string) {
  const { data, isLoading, error } = useWorldCupData();

  const standings: GroupStanding[] = [];

  if (data) {
    const group = data.groups.find((g: Group) => g.id === groupId);
    const teams = (group?.teams ?? [])
      .map((teamId) => data.teams.find((t: Team) => t.id === teamId))
      .filter(Boolean) as Team[];

    const table = new Map<string, GroupStanding>(
      teams.map((team) => [
        team.id,
        {
          team,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
        },
      ])
    );

    const groupMatches = data.matches.filter(
      (m: Match) => m.group === groupId && m.status === "finished"
    );

    for (const match of groupMatches) {
      const home = table.get(match.homeTeam);
      const away = table.get(match.awayTeam);
      if (!home || !away || match.homeScore === null || match.awayScore === null) continue;

      home.played += 1;
      away.played += 1;
      home.goalsFor += match.homeScore;
      home.goalsAgainst += match.awayScore;
      away.goalsFor += match.awayScore;
      away.goalsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        home.wins += 1;
        home.points += 3;
        away.losses += 1;
      } else if (match.homeScore < match.awayScore) {
        away.wins += 1;
        away.points += 3;
        home.losses += 1;
      } else {
        home.draws += 1;
        away.draws += 1;
        home.points += 1;
        away.points += 1;
      }
    }

    for (const row of table.values()) {
      row.goalDifference = row.goalsFor - row.goalsAgainst;
      standings.push(row);
    }

    standings.sort(
      (a, b) =>
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor ||
        a.team.name.localeCompare(b.team.name)
    );
  }

  return { standings, isLoading, error };
}
