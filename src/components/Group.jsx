const Group = ({ name, teams = [] }) => {
  if (!teams || teams.length === 0) return null;

  return (
    <div className="group-card">
      <h3>Grupo {name}</h3>
      <div className="group-teams-list">
        {teams.map((team, index) => {
          if (!team) return null;

          return (
            <div
              key={team.token || `${team.nome}-${index}`}
              className="group-team-item"
            >
              {team.flag && (
                <img
                  src={team.flag}
                  alt={team.nome}
                  className="group-flag"
                />
              )}
              <span className="group-team-name">{team.nome}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Group;