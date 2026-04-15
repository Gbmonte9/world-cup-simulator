const getRandomGoals = () => Math.floor(Math.random() * 6);

const simulatePenalty = () => {
  let teamA = Math.floor(Math.random() * 6);
  let teamB = Math.floor(Math.random() * 6);

  while (teamA === teamB) {
    teamB = Math.floor(Math.random() * 6);
  }

  return { teamA, teamB };
};

const simulateMatch = (teamA, teamB) => {
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
  return [
    [groups.A[0], groups.B[1]],
    [groups.C[0], groups.D[1]],
    [groups.E[0], groups.F[1]],
    [groups.G[0], groups.H[1]],
    [groups.B[0], groups.A[1]],
    [groups.D[0], groups.C[1]],
    [groups.F[0], groups.E[1]],
    [groups.H[0], groups.G[1]]
  ];
};

export const simulateKnockoutRound = (matches) => {
  return matches.map(([teamA, teamB]) => simulateMatch(teamA, teamB));
};

export const getWinners = (matches) => {
  return matches.map(match => match.winner);
};