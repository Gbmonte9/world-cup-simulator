const BASE_URL = "/api";

export const getTeams = async () => {
  try {
    const response = await fetch(`${BASE_URL}/WorldCup/GetAllTeams`, {
      method: "GET",
      headers: {
        "git-user": "SEU_USUARIO_GITHUB"
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar seleções: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erro na API:", error);
    return [];
  }
};