const Table = ({ table = [], groupName }) => {
  // Verificação de segurança
  if (!table || table.length === 0) return null;

  return (
    <div className="group-table-container">
      <h3>GRUPO {groupName}</h3>

      <table className="world-cup-table">
        <thead>
          <tr>
            <th>#</th>
            <th>SELEÇÃO</th>
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
                  {team.flag ? (
                    <img 
                      src={team.flag} 
                      alt={`Bandeira de ${team.nome}`} 
                      className="table-flag" 
                    />
                  ) : (
                    <div className="table-flag-placeholder" /> /* Caso a bandeira falhe */
                  )}
                  <span className="team-name-table">{team.nome}</span>
                </td>

                <td className="points-cell">{teamData.points}</td>
                <td className="goals-cell">{teamData.goalsFor}</td>
                <td className="sg-cell">{teamData.goalDifference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;