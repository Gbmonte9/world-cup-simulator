const Group = ({ name, teams = [] }) => {
  if (!teams || teams.length === 0) return null;

  return (
    <div className="group-card">
      <div className="group-header">
        <h3>GRUPO {name}</h3>
      </div>
      
      <div className="group-teams-list">
        {teams.map((team, index) => {

          if (!team) return null;

          return (
            <div
              key={team.token || `${team.nome}-${index}`}
              className="group-team-item"
            >
              <div className="group-team-content">
                {team.flag && (
                  <img
                    src={team.flag}
                    alt={`Bandeira de ${team.nome}`}
                    className="group-flag"
                  />
                )}
                <span className="group-team-name">{team.nome}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Group;