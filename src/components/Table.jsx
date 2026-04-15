const Table = ({ table, groupName }) => {
  return (
    <div className="table">
      <h3>Classificação Grupo {groupName}</h3>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Pts</th>
            <th>GP</th>
            <th>GC</th>
            <th>SG</th>
          </tr>
        </thead>

        <tbody>
          {table.map((teamData, index) => (
            <tr key={teamData.team.token}>
              <td>{index + 1}</td>
              <td>{teamData.team.nome}</td>
              <td>{teamData.points}</td>
              <td>{teamData.goalsFor}</td>
              <td>{teamData.goalsAgainst}</td>
              <td>{teamData.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;