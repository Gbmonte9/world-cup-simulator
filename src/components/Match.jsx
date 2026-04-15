const Match = ({ match }) => {
  const {
    teamA,
    teamB,
    goalsA,
    goalsB,
    penaltyTeamA,
    penaltyTeamB
  } = match;

  return (
    <div className="match">
      <p>
        <strong>{teamA.nome}</strong> {goalsA} x {goalsB}{" "}
        <strong>{teamB.nome}</strong>
      </p>

      {/* mostrar pênaltis só se houver */}
      {penaltyTeamA > 0 || penaltyTeamB > 0 ? (
        <p className="penalty">
          Pênaltis: {penaltyTeamA} x {penaltyTeamB}
        </p>
      ) : null}
    </div>
  );
};

export default Match;