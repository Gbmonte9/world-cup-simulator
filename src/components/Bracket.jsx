const Bracket = ({ matches = [] }) => {
  
  if (!matches || matches.length === 0) return null;

  return (
    <div className="bracket-wrapper">
      {matches.map((match, index) => {

        if (!match || !match.teamA || !match.teamB) return null;

        const matchKey = `${match.teamA.token || index}-${match.teamB.token || index}`;

        return (
          <div key={matchKey} className="match-card">
            
            <div className="match-team-row">
              <div className="team-info">
                {match.teamA.flag && (
                  <img src={match.teamA.flag} alt="" className="match-flag" />
                )}
                <span className="team-name-text">{match.teamA.nome || match.teamA.name}</span>
              </div>
              <span className="match-score-number">{match.goalsA}</span>
            </div>

            <div className="match-team-row">
              <div className="team-info">
                {match.teamB.flag && (
                  <img src={match.teamB.flag} alt="" className="match-flag" />
                )}
                <span className="team-name-text">{match.teamB.nome || match.teamB.name}</span>
              </div>
              <span className="match-score-number">{match.goalsB}</span>
            </div>

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