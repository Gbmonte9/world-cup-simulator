export const calculateStandings = (matches) => {
  const table = {};

  matches.forEach(match => {
    const { teamA, teamB, goalsA, goalsB } = match;

    if (!table[teamA.token]) {
      table[teamA.token] = {
        team: teamA,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0
      };
    }

    if (!table[teamB.token]) {
      table[teamB.token] = {
        team: teamB,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0
      };
    }

    table[teamA.token].goalsFor += goalsA;
    table[teamA.token].goalsAgainst += goalsB;

    table[teamB.token].goalsFor += goalsB;
    table[teamB.token].goalsAgainst += goalsA;

    if (goalsA > goalsB) {
      table[teamA.token].points += 3;
    } else if (goalsB > goalsA) {
      table[teamB.token].points += 3;
    } else {
      table[teamA.token].points += 1;
      table[teamB.token].points += 1;
    }
  });

  Object.values(table).forEach(team => {
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });

  const sortedTable = Object.values(table).sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }

    return Math.random() - 0.5;
  });

  return sortedTable;
};