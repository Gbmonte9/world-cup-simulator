const getRandomGoals = () => Math.floor(Math.random() * 6);

export const simulateGroupMatches = (groupTeams) => {
  if (!Array.isArray(groupTeams) || groupTeams.length !== 4) {
    console.error("simulateGroupMatches: esperado um grupo com 4 times");
    return [];
  }

  const matches = [];

  for (let i = 0; i < groupTeams.length; i++) {
    for (let j = i + 1; j < groupTeams.length; j++) {
      const teamA = groupTeams[i];
      const teamB = groupTeams[j];

      const goalsA = getRandomGoals();
      const goalsB = getRandomGoals();

      matches.push({
        teamA,
        teamB,
        goalsA,
        goalsB
      });
    }
  }

  return matches;
};