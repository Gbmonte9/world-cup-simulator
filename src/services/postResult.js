export const sendResult = async (finalMatch) => {
  try {
    const response = await fetch(
      "https://development-internship-api.geopostenergy.com/WorldCup/FinalResult",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "git-user": "SEU_USUARIO_GITHUB" // 🔴 MUITO IMPORTANTE
        },
        body: JSON.stringify({
          teamA: finalMatch.teamA.token,
          teamB: finalMatch.teamB.token,
          goalsTeamA: finalMatch.goalsA,
          goalsTeamB: finalMatch.goalsB,
          penaltyTeamA: finalMatch.penaltyTeamA || 0,
          penaltyTeamB: finalMatch.penaltyTeamB || 0
        })
      }
    );

    const data = await response.json();

    console.log("✅ Resultado enviado com sucesso:", data);
  } catch (error) {
    console.error("❌ Erro ao enviar resultado:", error);
  }
};