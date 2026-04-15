export const getFlag = (code) => {
  if (!code || typeof code !== "string") return null;

  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
};