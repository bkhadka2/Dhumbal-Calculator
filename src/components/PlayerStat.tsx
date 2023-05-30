import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import classes from "./playerStat.module.css";

interface playerStatData {
  id: string;
  name: string;
  score: number;
}

interface playerDataProps {
  finalData: {
    id?: string;
    playerName?: string;
    totalScore?: number;
    // history: number[];
    history: {
      id: string;
      score: number;
    }[]
  }[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PlayerStat: React.FC<playerDataProps> = ({ finalData }) => {
  const newDataSortedData = finalData.map((obj: any) => ({
    id: obj.id,
    name: obj.playerName,
    score: obj.totalScore,
  }));
  newDataSortedData.sort(
    (a, b) => b.score - a.score
  );

  const lowestScore = newDataSortedData[newDataSortedData.length - 1].score;

  return (
    <TableContainer className={classes.container}>
      <Table
        sx={{ maxWidth: 500 }}
        aria-label="customized table"
        align="center"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Players</StyledTableCell>
            <StyledTableCell align="center">Total Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newDataSortedData.map((obj: playerStatData) => (
            <StyledTableRow
              key={obj.id}
              className={
                obj.score >= 100
                  ? classes.danger
                  : obj.score === lowestScore && obj.score !== 0
                  ? classes.notDanger
                  : ""
              }
            >
              <StyledTableCell
                align="center"
                component="th"
                scope="row"
                className={classes.capitalize}
              >
                {obj.name}
              </StyledTableCell>
              <StyledTableCell align="center">{obj.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerStat;
