const BASE_URL = "https://development-internship-api.geopostenergy.com";

export const getTeams = async () => {
  const response = await fetch(`${BASE_URL}/WorldCup/GetAllTeams`, {
    headers: {
      "git-user": "seu_usuario"
    }
  });
  return response.json();
};

export const sendResult = async (data) => {
  return fetch(`${BASE_URL}/WorldCup/FinalResult`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "git-user": "seu_usuario"
    },
    body: JSON.stringify(data)
  });
};