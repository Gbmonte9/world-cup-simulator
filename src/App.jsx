import { useEffect, useState } from "react";
import { getTeams } from "./services/api";
import "./App.css";

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await getTeams();
      setTeams(data);
    };

    fetchTeams();
  }, []);

  return (
    <div className="app">
      <h1>🏆 Simulador de Copa do Mundo</h1>

      <button onClick={() => console.log(teams)}>
        Mostrar seleções no console
      </button>

      <div className="teams">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.token} className="team-card">
              <p>{team.nome}</p>
            </div>
          ))
        ) : (
          <p>Carregando seleções...</p>
        )}
      </div>
    </div>
  );
}

export default App;