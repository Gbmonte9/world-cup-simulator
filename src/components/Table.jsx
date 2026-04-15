const Table = ({ table = [], groupName }) => {
  if (!table || table.length === 0) return null;

  return (
    <div className="group-table-container">
      <h3>Grupo {groupName}</h3>

      <table className="world-cup-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Seleção</th>
            <th>P</th>
            <th>GP</th>
            <th>SG</th>
          </tr>
        </thead>

        <tbody>
          {table.map((teamData, index) => {
            const team = teamData.team;
            if (!team) return null;

            return (
              <tr
                key={team.token || `${team.nome}-${index}`}
                className={index < 2 ? "row-qualified" : "row-eliminated"}
              >
                <td className="rank">{index + 1}</td>

                <td className="team-cell">
                  {team.flag && (
                    <img
                      src={team.flag}
                      alt={team.nome}
                      className="table-flag"
                    />
                  )}
                  <span className="team-name-table">{team.nome}</span>
                </td>

                <td className="points">{teamData.points}</td>
                <td>{teamData.goalsFor}</td>
                <td className="sg">{teamData.goalDifference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;