import { useState } from "react";
import Group from "../components/Group";
import Table from "../components/Table";
import Bracket from "../components/Bracket";
import { shuffleArray } from "../utils/shuffle";
import { createGroups } from "../utils/groupStage";
import { simulateGroupMatches } from "../utils/matchSimulator";
import { calculateStandings } from "../utils/standings";
import { createRoundOf16, simulateKnockoutRound, getWinners } from "../utils/knockout";
import { sendResult } from "../services/api";

const Home = ({ teams }) => {
  const [groups, setGroups] = useState(null);
  const [tables, setTables] = useState({});
  const [round16, setRound16] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [semis, setSemis] = useState([]);
  const [final, setFinal] = useState(null);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const simulateWorldCup = () => {
    if (!teams || teams.length === 0) return;
    const shuffled = shuffleArray(teams);
    const createdGroups = createGroups(shuffled);
    setGroups(createdGroups);

    const tablesData = {};
    const classified = {};

    Object.keys(createdGroups).forEach((group) => {
      const matches = simulateGroupMatches(createdGroups[group]);
      const table = calculateStandings(matches);
      tablesData[group] = table;
      if (table.length >= 2) {
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
    const finalResult = simulateKnockoutRound([finalTeams])[0];
    setFinal(finalResult);
    sendResult(finalResult);
  };

  return (
    <div className="app">
      <h1>🏆 Simulador de Copa do Mundo</h1>

      <div className="actions">
        <button onClick={simulateWorldCup}>Simular Copa</button>
      </div>

      {/* SEÇÃO INICIAL: GRUPOS E TABELAS */}
      {(groups || Object.keys(tables).length > 0) && (
        <div className="group-stage-section">
          {["A", "B", "C", "D", "E", "F", "G", "H"].map((groupName) => (
            <div key={groupName} className="group-container">
              {groups && <Group name={groupName} teams={groups[groupName]} />}
              {tables[groupName] && <Table groupName={groupName} table={tables[groupName]} />}
            </div>
          ))}
        </div>
      )}

      {/* DIAGRAMA DE MATA-MATA ATUALIZADO */}
      {round16.length > 0 && (
        <div className="world-cup-diagram">
          
          {/* LADO ESQUERDO: Oitavas e Quartas */}
          <div className="bracket-column">
            <span className="phase-label">Oitavas</span>
            <Bracket matches={round16.slice(0, 4)} />
          </div>

          <div className="bracket-column">
            <span className="phase-label">Quartas</span>
            <Bracket matches={quarters.slice(0, 2)} />
          </div>

          {/* BLOCO CENTRAL: PIRÂMIDE (FINAL NO TOPO, SEMIS ABAIXO) */}
          <div className="bracket-center-complex">
            
            <div className="final-area">
              <span className="phase-label">Final</span>
              <Bracket matches={[final]} />
            </div>

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

            {final && (
              <div className="champion-podium">
                <h2 className="champion-title">🏆 CAMPEÃO</h2>
                <div className="champion-card">
                  {final.winner?.flag && (
                    <img src={final.winner.flag} alt="" className="champion-flag" />
                  )}
                  <span className="champion-name">{final.winner?.nome || final.winner?.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* LADO DIREITO: Quartas e Oitavas */}
          <div className="bracket-column">
            <span className="phase-label">Quartas</span>
            <Bracket matches={quarters.slice(2, 4)} />
          </div>

          <div className="bracket-column">
            <span className="phase-label">Oitavas</span>
            <Bracket matches={round16.slice(4, 8)} />
          </div>

        </div>
      )}
    </div>
  );
};

export default Home;