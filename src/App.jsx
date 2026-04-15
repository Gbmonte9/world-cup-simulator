import { useEffect, useState } from "react";
import { getTeams } from "./services/api";
import { sendResult } from "./services/postResult";

import Group from "./components/Group";
import Table from "./components/Table";
import Bracket from "./components/Bracket";

import { shuffleArray } from "./utils/shuffle";
import { createGroups } from "./utils/groupStage";
import { simulateGroupMatches } from "./utils/matchSimulator";
import { calculateStandings } from "./utils/standings";

import {
  createRoundOf16,
  simulateKnockoutRound,
  getWinners
} from "./utils/knockout";

import "./App.css";

function App() {
  const [teams, setTeams] = useState([]);
  const [groups, setGroups] = useState(null);
  const [tables, setTables] = useState({});
  const [round16, setRound16] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [semis, setSemis] = useState([]);
  const [final, setFinal] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error("Erro ao buscar times:", error);
      }
    };

    fetchTeams();
  }, []);

  const simulateWorldCup = async () => {
    if (teams.length === 0) return;

    const shuffled = shuffleArray([...teams]);

    // 🏆 GRUPOS
    const createdGroups = createGroups(shuffled);
    setGroups(createdGroups);

    const tablesData = {};
    const classified = {};

    Object.keys(createdGroups).forEach((group) => {
      const matches = simulateGroupMatches(createdGroups[group]);
      const table = calculateStandings(matches);

      tablesData[group] = table;
      classified[group] = [table[0].team, table[1].team];
    });

    setTables(tablesData);

    // 🔥 OITAVAS
    const round16Results = simulateKnockoutRound(
      createRoundOf16(classified)
    );
    setRound16(round16Results);

    // 🔥 QUARTAS
    const quarterResults = simulateKnockoutRound(
      chunkArray(getWinners(round16Results), 2)
    );
    setQuarters(quarterResults);

    // 🔥 SEMI
    const semiResults = simulateKnockoutRound(
      chunkArray(getWinners(quarterResults), 2)
    );
    setSemis(semiResults);

    // 🏆 FINAL
    const finalResult = simulateKnockoutRound([
      getWinners(semiResults),
    ])[0];

    setFinal(finalResult);

    console.log("🏆 Campeão:", finalResult.winner.nome);

    // 🚀 ENVIO PARA API
    await sendResult(finalResult);

    // 💡 UX extra (opcional)
    alert(`🏆 Campeão: ${finalResult.winner.nome}`);
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  return (
    <div className="app">
      <h1>🏆 Simulador de Copa do Mundo</h1>

      <div className="actions">
        <button onClick={() => console.log(teams)}>
          Mostrar seleções
        </button>

        <button onClick={simulateWorldCup}>
          Simular Copa Completa
        </button>
      </div>

      {/* GRUPOS */}
      {groups &&
        Object.entries(groups).map(([groupName, teams]) => (
          <Group key={groupName} name={groupName} teams={teams} />
        ))}

      {/* TABELAS */}
      {Object.keys(tables).length > 0 &&
        Object.entries(tables).map(([groupName, table]) => (
          <Table
            key={groupName}
            groupName={groupName}
            table={table}
          />
        ))}

      {/* MATA-MATA */}
      {round16.length > 0 && (
        <Bracket title="Oitavas de Final" matches={round16} />
      )}

      {quarters.length > 0 && (
        <Bracket title="Quartas de Final" matches={quarters} />
      )}

      {semis.length > 0 && (
        <Bracket title="Semifinal" matches={semis} />
      )}

      {final && (
        <div className="final-section">
          <Bracket title="Final" matches={[final]} />

          <h2 className="champion">
            🏆 Campeão: {final.winner.nome}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;