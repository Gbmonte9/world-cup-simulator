import { useState } from "react";

import Group from "../components/Group";
import Table from "../components/Table";
import Bracket from "../components/Bracket";

import { shuffleArray } from "../utils/shuffle";
import { createGroups } from "../utils/groupStage";
import { simulateGroupMatches } from "../utils/matchSimulator";
import { calculateStandings } from "../utils/standings";

import {
  createRoundOf16,
  simulateKnockoutRound,
  getWinners
} from "../utils/knockout";

const Home = ({ teams }) => {
  const [groups, setGroups] = useState(null);
  const [tables, setTables] = useState({});
  const [round16, setRound16] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [semis, setSemis] = useState([]);
  const [final, setFinal] = useState(null);

  const simulateWorldCup = () => {
    const shuffled = shuffleArray(teams);

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

    // OITAVAS
    const round16Matches = createRoundOf16(classified);
    const round16Results = simulateKnockoutRound(round16Matches);
    setRound16(round16Results);

    // QUARTAS
    const quarterTeams = getWinners(round16Results);
    const quarterMatches = chunkArray(quarterTeams, 2);
    const quarterResults = simulateKnockoutRound(quarterMatches);
    setQuarters(quarterResults);

    // SEMI
    const semiTeams = getWinners(quarterResults);
    const semiMatches = chunkArray(semiTeams, 2);
    const semiResults = simulateKnockoutRound(semiMatches);
    setSemis(semiResults);

    // FINAL
    const finalTeams = getWinners(semiResults);
    const finalResult = simulateKnockoutRound([finalTeams])[0];
    setFinal(finalResult);
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  return (
    <div>
      <button onClick={simulateWorldCup}>
        Simular Copa
      </button>

      {/* GRUPOS */}
      {groups &&
        Object.keys(groups).map((groupName) => (
          <Group
            key={groupName}
            name={groupName}
            teams={groups[groupName]}
          />
        ))}

      {/* TABELAS */}
      {tables &&
        Object.keys(tables).map((groupName) => (
          <Table
            key={groupName}
            groupName={groupName}
            table={tables[groupName]}
          />
        ))}

      {/* MATA-MATA */}
      {round16.length > 0 && (
        <Bracket title="Oitavas" matches={round16} />
      )}

      {quarters.length > 0 && (
        <Bracket title="Quartas" matches={quarters} />
      )}

      {semis.length > 0 && (
        <Bracket title="Semifinal" matches={semis} />
      )}

      {final && (
        <Bracket title="Final" matches={[final]} />
      )}
    </div>
  );
};

export default Home;