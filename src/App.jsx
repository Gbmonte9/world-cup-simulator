import { useEffect, useState } from "react";
import { getTeams } from "./services/api";
import { sendResult } from "./services/postResult";
import { getFlag } from "./utils/flags";

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
        if (!Array.isArray(data)) return;
        const teamsWithFlags = data.map(team => ({
          ...team,
          flag: team.code ? getFlag(team.code) : null
        }));
        setTeams(teamsWithFlags);
      } catch (error) {
        console.error("Erro ao buscar times:", error);
      }
    };
    fetchTeams();
  }, []);

  const chunkArray = (array, size) => {
    if (!array || array.length === 0) return [];
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const simulateWorldCup = async () => {
    if (!teams || teams.length !== 32) {
      console.error("Times inválidos");
      return;
    }

    const shuffled = shuffleArray([...teams]);
    const createdGroups = createGroups(shuffled);
    setGroups(createdGroups);

    const tablesData = {};
    const classified = {};

    Object.keys(createdGroups).forEach((group) => {
      const groupTeams = createdGroups[group];
      if (!groupTeams || groupTeams.length !== 4) return;
      const matches = simulateGroupMatches(groupTeams);
      const table = calculateStandings(matches);
      tablesData[group] = table;
      if (table && table.length >= 2) {
        classified[group] = [table[0].team, table[1].team];
      }
    });

    setTables(tablesData);

    const round16Matches = createRoundOf16(classified);
    const round16Results = simulateKnockoutRound(round16Matches);
    setRound16(round16Results);

    const quarterTeams = getWinners(round16Results);
    const quarterMatches = chunkArray(quarterTeams, 2);
    const quarterResults = simulateKnockoutRound(quarterMatches);
    setQuarters(quarterResults);

    const semiTeams = getWinners(quarterResults);
    const semiMatches = chunkArray(semiTeams, 2);
    const semiResults = simulateKnockoutRound(semiMatches);
    setSemis(semiResults);

    const finalTeams = getWinners(semiResults);
    if (!finalTeams || finalTeams.length < 2) return;

    const finalResult = simulateKnockoutRound([finalTeams])[0];
    setFinal(finalResult);

    try {
      await sendResult(finalResult);
    } catch (e) {
      console.error("Erro ao enviar resultado:", e);
    }
    alert(`🏆 Campeão: ${finalResult.winner?.nome}`);
  };

  return (
    <div className="app">
      <h1>🏆 Simulador de Copa do Mundo</h1>

      <div className="actions">
        <button onClick={simulateWorldCup}>Simular Copa Completa</button>
      </div>

      {/* FASE DE GRUPOS (Seções originais) */}
      <div className="group-stage-container">
        {groups && ["A","B","C","D","E","F","G","H"].map((groupName) => (
          <div key={groupName} className="group-wrapper">
             <Group name={groupName} teams={groups[groupName] || []} />
             {tables[groupName] && <Table groupName={groupName} table={tables[groupName]} />}
          </div>
        ))}
      </div>

      {/* 🏆 DIAGRAMA MATA-MATA (Visual da Imagem) */}
      {round16.length > 0 && (
        <div className="world-cup-diagram">
          
          {/* LADO ESQUERDO: GRUPOS A, B, C, D */}
          <div className="bracket-side">
            <div className="bracket-column groups-labels">
              <div className="group-tag">A</div>
              <div className="group-tag">B</div>
              <div className="group-tag">C</div>
              <div className="group-tag">D</div>
            </div>
            <div className="bracket-column">
              <span className="phase-label">OITAVAS</span>
              <Bracket matches={round16.slice(0, 4)} />
            </div>
            <div className="bracket-column">
              <span className="phase-label">QUARTAS</span>
              <Bracket matches={quarters.slice(0, 2)} />
            </div>
          </div>

          {/* CENTRO: SEMIS E FINAL */}
          <div className="bracket-center">
            <div className="semi-section">
              <span className="phase-label">SEMIFINAL</span>
              <Bracket matches={semis} />
            </div>
            
            {final && (
              <div className="final-highlight">
                <span className="phase-label">FINAL</span>
                <Bracket matches={[final]} />
                <h2 className="champion-title">🏆 {final.winner?.nome}</h2>
              </div>
            )}
          </div>

          {/* LADO DIREITO: GRUPOS E, F, G, H */}
          <div className="bracket-side side-right">
            <div className="bracket-column">
              <span className="phase-label">QUARTAS</span>
              <Bracket matches={quarters.slice(2, 4)} />
            </div>
            <div className="bracket-column">
              <span className="phase-label">OITAVAS</span>
              <Bracket matches={round16.slice(4, 8)} />
            </div>
            <div className="bracket-column groups-labels">
              <div className="group-tag">E</div>
              <div className="group-tag">F</div>
              <div className="group-tag">G</div>
              <div className="group-tag">H</div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;