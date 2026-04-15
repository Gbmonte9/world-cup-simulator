export const sendResult = async (finalMatch) => {
  try {
    if (!finalMatch) {
      console.error("sendResult: finalMatch inválido");
      return;
    }

    const response = await fetch(
      "https://development-internship-api.geopostenergy.com/WorldCup/FinalResult",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "git-user": "SEU_USUARIO_GITHUB"
        },
        body: JSON.stringify({
          teamA: finalMatch.teamA.id,
          teamB: finalMatch.teamB.id,
          goalsTeamA: finalMatch.goalsA,
          goalsTeamB: finalMatch.goalsB,
          penaltyTeamA: finalMatch.penaltyTeamA || 0,
          penaltyTeamB: finalMatch.penaltyTeamB || 0
        })
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao enviar resultado final");
    }

    const data = await response.json();

    console.log("✅ Resultado enviado com sucesso:", data);

  } catch (error) {
    console.error("❌ Erro ao enviar resultado:", error);
  }
};