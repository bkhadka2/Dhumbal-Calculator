import "./App.css";
import DataTable from "./components/DataTable";
import AddPlayer from "./components/AddPlayer";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlayerStat from "./components/PlayerStat";
// import ModalBox from "./components/Modal";

interface playerData {
  id: string;
  playerName: string;
  totalScore: number;
  history: {
    id: string;
    score: number;
  }[];
}

const App = () => {
  const [finalData, setFinalData] = useState<playerData[]>([]);
  // const [modalOpen, setModalOpen] = useState(false);

  const getPlayerHandler = (player: string) => {
    const data = {
      id: uuidv4(),
      playerName: player,
      totalScore: 0,
      history: [],
    };
    setFinalData([data, ...finalData]);
  };

  const getScoreHandler = (score: number, id: string) => {
    const newScore = finalData.map((obj) =>
      obj.id === id
        ? {
            ...obj,
            history: [{ id: uuidv4(), score: score }, ...obj.history],
            totalScore: obj.history.length
              ? score +
                obj.history.reduce(
                  (currValue, currObj) => currValue + currObj.score,
                  0
                )
              : score,
          }
        : obj
    );
    setFinalData(newScore);
  };

  const rowDeleteHandler = (id: string) => {
    // setModalOpen(true);
    const newData = finalData.filter((obj: any) => obj.id !== id);
    setFinalData(newData);
  };

  const historyDeleteHandler = (rowId: string, historyId: string) => {
    const filteredRow = finalData.filter((obj) => obj.id === rowId);
    const history = filteredRow[0].history;
    const historyFilter = history.filter((hist) => hist.id === historyId);
    const score = historyFilter[0].score;

    const newData = finalData.map((obj) => {
      if (obj.id === rowId) {
        const newHist = obj.history.filter((hist) => {
          return hist.id !== historyId;
        });
        return {
          ...obj,
          history: newHist,
          totalScore: Math.abs(
            score - obj.history.reduce((a, b) => a + b.score, 0)
          ),
        };
      } else {
        return obj;
      }
    });
    setFinalData(newData);
  };

  return (
    <div className="App">
      {/* {modalOpen ? <ModalBox />: null} */}
      <AddPlayer getPlayerHandler={getPlayerHandler} />
      {finalData.length ? (
        <>
          <DataTable
            finalData={finalData}
            getScore={getScoreHandler}
            onDelete={rowDeleteHandler}
            onHistoryDelete={historyDeleteHandler}
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
