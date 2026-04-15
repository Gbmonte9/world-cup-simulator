const Group = ({ name, teams }) => {
  return (
    <div className="group">
      <h2>Grupo {name}</h2>

      {teams.map((team) => (
        <p key={team.token}>{team.nome}</p>
      ))}
    </div>
  );
};

export default Group;