const Match = ({ match }) => {
  if (!match || !match.teamA || !match.teamB) return null;

  const {
    teamA,
    teamB,
    goalsA,
    goalsB,
    penaltyTeamA,
    penaltyTeamB
  } = match;

  return (
    <div className="match-card">
      {/* Linha do Time A */}
      <div className="match-team-row">
        <div className="team-info">
          {teamA.flag && <img src={teamA.flag} alt="" className="match-flag" />}
          <span className="team-name-text">{teamA.nome || teamA.name}</span>
        </div>
        <span className="match-score-number">{goalsA}</span>
      </div>

      {/* Linha do Time B */}
      <div className="match-team-row">
        <div className="team-info">
          {teamB.flag && <img src={teamB.flag} alt="" className="match-flag" />}
          <span className="team-name-text">{teamB.nome || teamB.name}</span>
        </div>
        <span className="match-score-number">{goalsB}</span>
      </div>

      {/* Info de Pênaltis (aparece apenas se necessário) */}
      {(penaltyTeamA > 0 || penaltyTeamB > 0) && (
        <div className="match-penalty-small">
          Pênaltis: {penaltyTeamA} - {penaltyTeamB}
        </div>
      )}
    </div>
  );
};

export default Match;