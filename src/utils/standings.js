export const calculateStandings = (matches) => {
  if (!Array.isArray(matches)) {
    console.error("calculateStandings: esperado um array de partidas");
    return [];
  }

  const table = {};

  matches.forEach(match => {
    const { teamA, teamB, goalsA, goalsB } = match;

    if (!teamA || !teamB) return;

    const idA = teamA.token || teamA.id || teamA.nome;
    const idB = teamB.token || teamB.id || teamB.nome;

    if (!table[idA]) {
      table[idA] = {
        team: teamA,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0
      };
    }

    if (!table[idB]) {
      table[idB] = {
        team: teamB,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0
      };
    }

    table[idA].goalsFor += goalsA;
    table[idA].goalsAgainst += goalsB;

    table[idB].goalsFor += goalsB;
    table[idB].goalsAgainst += goalsA;

    if (goalsA > goalsB) {
      table[idA].points += 3;
    } else if (goalsB > goalsA) {
      table[idB].points += 3;
    } else {
      table[idA].points += 1;
      table[idB].points += 1;
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