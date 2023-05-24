import "./App.css";
import DataTable from "./components/DataTable";
import AddPlayer from "./components/AddPlayer";
import { useState} from "react";
import { v4 as uuidv4 } from "uuid";
import PlayerStat from "./components/PlayerStat";

const App = () => {
  const [finalData, setFinalData] = useState([
    {
      first: true,
      id: uuidv4(),
      playerName: "",
      totalScore: 0,
      history: [0],
    },
  ]);

  const getPlayerHandler = (player: string) => {
    const data = {
      first: false,
      id: uuidv4(),
      playerName: player,
      totalScore: 0,
      history: [0],
    };

    if (finalData[0].first) {
      setFinalData([data]);
    } else {
      setFinalData([data, ...finalData]);
    }
  };

  const getScoreHandler = (score: number, id: string) => {
    const newScore = finalData.map((obj) =>
      obj.id === id
        ? {
            ...obj,
            history: obj.history[0] === 0 ? [score] : [score, ...obj.history],
            totalScore: score + obj.history.reduce((a, b) => a + b),
          }
        : obj
    );
    setFinalData(newScore);
  };

  const deleteHandler = (id: string) => {
    const newData = finalData.filter((obj: any) => obj.id !== id);
    if (newData.length === 0) {
      setFinalData([
        {
          first: true,
          id: uuidv4(),
          playerName: "",
          totalScore: 0,
          history: [0],
        },
      ]);
    } else {
      setFinalData(newData);
    }
  };

  return (
    <div className="App">
      <AddPlayer getPlayerHandler={getPlayerHandler} />
      {!finalData[0].first ? (
        <>
          <DataTable
            finalData={finalData}
            getScore={getScoreHandler}
            onDelete={deleteHandler}
          />
          <PlayerStat finalData={finalData}></PlayerStat>
        </>
      ) : (
        <p>No Player Listed</p>
      )}
    </div>
  );
};

export default App;
