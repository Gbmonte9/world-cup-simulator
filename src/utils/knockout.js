const getRandomGoals = () => Math.floor(Math.random() * 6);

const simulatePenalty = () => {
  let teamA = Math.floor(Math.random() * 3) + 3;
  let teamB = Math.floor(Math.random() * 3) + 3;

  while (teamA === teamB) {
    teamB = Math.floor(Math.random() * 3) + 3;
  }

  return { teamA, teamB };
};

const simulateMatch = (teamA, teamB) => {
  if (!teamA || !teamB) {
    console.warn("⚠️ simulateMatch: corrigindo times inválidos");
    return {
      teamA: teamA || { nome: "Time A" },
      teamB: teamB || { nome: "Time B" },
      goalsA: 0,
      goalsB: 0,
      penaltyTeamA: 0,
      penaltyTeamB: 0,
      winner: teamA || teamB
    };
  }

  let goalsA = getRandomGoals();
  let goalsB = getRandomGoals();

  let penaltyTeamA = 0;
  let penaltyTeamB = 0;
  let winner;

  if (goalsA === goalsB) {
    const penalties = simulatePenalty();
    penaltyTeamA = penalties.teamA;
    penaltyTeamB = penalties.teamB;

    winner = penaltyTeamA > penaltyTeamB ? teamA : teamB;
  } else {
    winner = goalsA > goalsB ? teamA : teamB;
  }

  return {
    teamA,
    teamB,
    goalsA,
    goalsB,
    penaltyTeamA,
    penaltyTeamB,
    winner
  };
};

export const createRoundOf16 = (groups) => {
  if (!groups) return [];

  return [
    [groups.A?.[0], groups.B?.[1]],
    [groups.C?.[0], groups.D?.[1]],
    [groups.E?.[0], groups.F?.[1]],
    [groups.G?.[0], groups.H?.[1]],
    [groups.B?.[0], groups.A?.[1]],
    [groups.D?.[0], groups.C?.[1]],
    [groups.F?.[0], groups.E?.[1]],
    [groups.H?.[0], groups.G?.[1]]
  ];
};

export const simulateKnockoutRound = (matches) => {
  if (!matches || matches.length === 0) return [];

  return matches.map(([teamA, teamB]) =>
    simulateMatch(teamA, teamB)
  );
};

export const getWinners = (matches) => {
  if (!matches || matches.length === 0) return [];

  return matches.map(match => match.winner);
};