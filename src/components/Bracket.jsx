const Bracket = ({ title, matches = [] }) => {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="bracket-wrapper">
      {/* Removemos o H2 de dentro para o título não quebrar o alinhamento das chaves */}
      {matches.map((match, index) => {
        if (!match || !match.teamA || !match.teamB) return null;

        const key = match.teamA.token || match.teamA.nome || index;

        return (
          <div key={`${key}-${index}`} className="match-card">
            
            {/* Time A */}
            <div className="team-row">
              {match.teamA.flag && <img src={match.teamA.flag} alt="" className="mini-flag" />}
              <span className="team-name">{match.teamA.nome}</span>
              <span className="score">{match.goalsA}</span>
            </div>

            {/* Time B */}
            <div className="team-row">
              {match.teamB.flag && <img src={match.teamB.flag} alt="" className="mini-flag" />}
              <span className="team-name">{match.teamB.nome}</span>
              <span className="score">{match.goalsB}</span>
            </div>

            {/* Placar de Pênaltis (bem pequeno se houver) */}
            {(match.penaltyTeamA > 0 || match.penaltyTeamB > 0) && (
              <div className="penalty-info">
                ({match.penaltyTeamA} - {match.penaltyTeamB})
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Bracket;