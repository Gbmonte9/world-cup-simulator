const Bracket = ({ title, matches }) => {
  return (
    <div className="bracket">
      <h2>{title}</h2>

      {matches.map((match, index) => (
        <div key={index} className="bracket-match">
          <p>
            {match.teamA.nome} {match.goalsA} x {match.goalsB}{" "}
            {match.teamB.nome}
          </p>

          {(match.penaltyTeamA > 0 || match.penaltyTeamB > 0) && (
            <p className="penalty">
              Pênaltis: {match.penaltyTeamA} x {match.penaltyTeamB}
            </p>
          )}

          <p className="winner">
            🏆 {match.winner.nome}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Bracket;