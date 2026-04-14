const BASE_URL = "/api";

export const getTeams = async () => {
  try {
    const response = await fetch(`${BASE_URL}/WorldCup/GetAllTeams`, {
      method: "GET",
      headers: {
        "git-user": "Jogador"
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar seleções");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
};