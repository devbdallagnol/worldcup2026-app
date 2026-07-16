import { useMemo } from "react";
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
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}

/** 
 * Retorna os jogos de um grupo específico (ex.: "A").
 */
export function useMatchesByGroup(groupId?: string) {
  const { data, ...rest } = useWorldCupData();
  
  const matches = useMemo(() => {
    if (!data?.matches) return [];
    if (!groupId) return data.matches;
    return data.matches.filter((m) => m.group === groupId);
  }, [data?.matches, groupId]);

  return { matches, ...rest };
}

/** 
 * Calcula a tabela de classificação de um grupo a partir dos jogos finalizados.
 * Envolvido em useMemo para otimização de performance.
 */
export function useGroupStandings(groupId: string) {
  const { data, isLoading, error } = useWorldCupData();

  const standings = useMemo<GroupStanding[]>(() => {
    if (!data) return [];

    const group = data.groups.find((g: Group) => g.id === groupId);
    if (!group) return [];

    // Mapeia os IDs dos times do grupo para as entidades completas de Team
    const teams = (group.teams ?? [])
      .map((teamId) => data.teams.find((t: Team) => t.id === teamId))
      .filter((t): t is Team => !!t);

    // Inicializa a tabela de classificação para cada seleção do grupo
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

    // Filtra apenas os jogos encerrados pertencentes a este grupo
    const groupMatches = data.matches.filter(
      (m: Match) => m.group === groupId && m.status === "finished"
    );

    // Processa os resultados de cada partida
    for (const match of groupMatches) {
      const home = table.get(match.homeTeam);
      const away = table.get(match.awayTeam);
      
      if (!home || !away || match.homeScore === null || match.awayScore === null) {
        continue;
      }

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

    // Calcula o saldo de gols e converte o Map para array
    const list: GroupStanding[] = [];
    for (const row of table.values()) {
      row.goalDifference = row.goalsFor - row.goalsAgainst;
      list.push(row);
    }

    // Ordenação seguindo regras oficiais da FIFA:
    // 1. Pontos -> 2. Saldo de Gols -> 3. Gols Pró -> 4. Ordem Alfabética
    return list.sort(
      (a, b) =>
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor ||
        a.team.name.localeCompare(b.team.name)
    );
  }, [data, groupId]);

  return { standings, isLoading, error };
}