import { useEffect, useState } from "react";
import { getTeams } from "./services/api";
import { sendResult } from "./services/postResult";
import { getFlag } from "./utils/flags";
import { countryToCode } from "./utils/countries";

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

        const teamsWithFlags = data.map(team => {
          const code = countryToCode[team.nome];
          const flagUrl = code ? getFlag(code) : null;
          return { ...team, flag: flagUrl };
        });
        
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
      alert("Aguarde o carregamento das 32 seleções.");
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
  };

  return (
    <div className="app">
      <h1>🏆 Simulador de Copa do Mundo</h1>

      <div className="actions">
        <button onClick={simulateWorldCup} className="btn-simulate">
          Simular Copa Completa
        </button>
      </div>

      <div className="group-stage-section">
        {groups && ["A","B","C","D","E","F","G","H"].map((groupName) => (
          <div key={groupName} className="group-container-wrapper">
             <Group name={groupName} teams={groups[groupName] || []} />
             {tables[groupName] && <Table groupName={groupName} table={tables[groupName] || []} />}
          </div>
        ))}
      </div>

      {round16.length > 0 && (
        <div className="world-cup-diagram">
          
          {/* LADO ESQUERDO: Oitavas -> Quartas */}
          <div className="bracket-column left-side">
            <span className="phase-label">Oitavas</span>
            <Bracket matches={round16.slice(0, 4)} />
          </div>
          <div className="bracket-column left-side">
            <span className="phase-label">Quartas</span>
            <Bracket matches={quarters.slice(0, 2)} />
          </div>

          {/* CENTRO: PIRÂMIDE CENTRAL */}
          <div className="bracket-center-complex">
            
            {/* FINAL NO TOPO */}
            <div className="final-area">
              <span className="phase-label">Grande Final</span>
              <Bracket matches={[final]} />
            </div>

            {/* SEMIFINAIS LADO A LADO */}
            <div className="semis-row">
              <div className="semi-box">
                <span className="phase-label">Semifinal</span>
                {semis[0] && <Bracket matches={[semis[0]]} />}
              </div>
              <div className="semi-box">
                <span className="phase-label">Semifinal</span>
                {semis[1] && <Bracket matches={[semis[1]]} />}
              </div>
            </div>

            {/* CAMPEÃO NA BASE */}
            {final && final.winner && (
              <div className="champion-display">
                <h2 className="champion-title">🏆 CAMPEÃO</h2>
                <div className="champion-info">
                  {final.winner.flag && (
                    <img 
                      src={final.winner.flag} 
                      alt="" 
                      className="champion-flag-big" 
                    />
                  )}
                  <span className="champion-name">{final.winner.nome}</span>
                </div>
              </div>
            )}
          </div>

          {/* LADO DIREITO: Quartas <- Oitavas */}
          <div className="bracket-column right-side">
            <span className="phase-label">Quartas</span>
            <Bracket matches={quarters.slice(2, 4)} />
          </div>
          <div className="bracket-column right-side">
            <span className="phase-label">Oitavas</span>
            <Bracket matches={round16.slice(4, 8)} />
          </div>

        </div>
      )}
    </div>
  );
}

export default App;