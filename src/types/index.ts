export type MatchStatus = "scheduled" | "live" | "finished";

export interface Team {
  id: string;
  code: string;
  name: string;
  group: string;
  flag: string; // código ISO2 usado para exibir a bandeira (ex.: "br", "mx")
}

export interface Match {
  id: string;
  stage: string;
  group: string | null;
  round: string | null;
  homeTeam: string; // Team["id"]
  awayTeam: string; // Team["id"]
  homeScore: number | null;
  awayScore: number | null;
  date: string; // ISO 8601
  stadium: string;
  city: string;
  status: MatchStatus;
}

export interface KnockoutMatch {
  id: string;
  stage: string; // "Oitavas de Final" | "Quartas de Final" | "Semifinal" | "Final" ...
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  stadium: string;
  city: string;
  status: MatchStatus;
}

export interface Group {
  id: string;
  teams: string[]; // Team["id"][]
}

export interface Tournament {
  name: string;
  hosts: string[];
  startDate: string;
  endDate: string;
  teamsCount: number;
  groupsCount: number;
}

export interface WorldCupData {
  note: string;
  tournament: Tournament;
  teams: Team[];
  groups: Group[];
  matches: Match[];
  knockout: KnockoutMatch[];
}

export interface GroupStanding {
  team: Team;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
