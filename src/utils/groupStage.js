export const createGroups = (teams) => {
  
  if (!Array.isArray(teams) || teams.length !== 32) {
    console.error("createGroups: esperado um array com 32 times");
    return {};
  }

  const groups = {};
  const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H"];

  groupNames.forEach((group, index) => {
    const start = index * 4;
    const end = start + 4;

    groups[group] = teams.slice(start, end);
  });

  return groups;
};