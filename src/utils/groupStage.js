export const createGroups = (teams) => {
  const groups = {};

  const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H"];

  groupNames.forEach((group, index) => {
    groups[group] = teams.slice(index * 4, index * 4 + 4);
  });

  return groups;
};