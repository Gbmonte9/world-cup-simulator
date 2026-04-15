const Bracket = ({ matches = [] }) => {
  // Se não houver jogos, não renderiza nada
  if (!matches || matches.length === 0) return null;

  return (
    <div className="bracket-wrapper">
      {matches.map((match, index) => {
        // Validação de segurança para garantir que o objeto match e os times existem
        if (!match || !match.teamA || !match.teamB) return null;

        // Gerar uma chave única baseada nos tokens dos times ou índice
        const matchKey = `${match.teamA.token || index}-${match.teamB.token || index}`;

        return (
          <div key={matchKey} className="match-card">
            
            {/* Linha do Time A */}
            <div className="match-team-row">
              <div className="team-info">
                {match.teamA.flag && (
                  <img src={match.teamA.flag} alt="" className="match-flag" />
                )}
                <span className="team-name-text">{match.teamA.nome || match.teamA.name}</span>
              </div>
              <span className="match-score-number">{match.goalsA}</span>
            </div>

            {/* Linha do Time B */}
            <div className="match-team-row">
              <div className="team-info">
                {match.teamB.flag && (
                  <img src={match.teamB.flag} alt="" className="match-flag" />
                )}
                <span className="team-name-text">{match.teamB.nome || match.teamB.name}</span>
              </div>
              <span className="match-score-number">{match.goalsB}</span>
            </div>

            {/* Exibição de Pênaltis caso o jogo tenha sido decidido neles */}
            {(match.penaltyTeamA > 0 || match.penaltyTeamB > 0) && (
              <div className="match-penalty-small">
                ({match.penaltyTeamA} - {match.penaltyTeamB} nos pênaltis)
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Bracket;