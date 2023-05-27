import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DataInputBox from "./DataInputBox";
import classes from "./DataTable.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { StringDecoder } from "string_decoder";

const Row = (props: { row: any; getScore: any; onDeleteHandler: any }) => {
  const { row, getScore, onDeleteHandler } = props;
  const [open, setOpen] = useState(false);

  const deleteHandler = (id: string) => {
    onDeleteHandler(id);
  };

  const getScoreHandler = (score: number, id: string) => {
    getScore(score, id);
  };

  let style = `${classes.hoverBody}`;

  if (row.totalScore >= 50) {
    style = `${classes.almostDanger}`;
  }

  if (row.totalScore >= 100) {
    style = `${classes.danger}`;
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} className={style}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className={`${classes.capitalize} ${classes.bigText}`}>
          {row.playerName}
        </TableCell>
        <TableCell align="center">
          <DataInputBox id={row.id} rowData={row} getScore={getScoreHandler} />
        </TableCell>
        <TableCell align="center" className={classes.bigText}>{row.totalScore}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
                <IconButton onClick={() => deleteHandler(row.id)}>
                  <DeleteIcon sx={{ color: pink[500], margin: 1 }} />
                </IconButton>
              </Typography>
              <Table size="small">
                <TableBody>
                  {row.history.map((historyRow: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {historyRow}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const DataTable = (props: any) => {
  const deleteHandler = (id: StringDecoder) => {
    props.onDelete(id);
  };

  return (
    <TableContainer component={Paper} className={classes.borderColor}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={classes.heading}>Players</TableCell>
            <TableCell className={classes.heading} align="center">
              Input
            </TableCell>
            <TableCell className={classes.heading} align="center">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.finalData.map((row: any) => (
            <Row
              key={row.id}
              row={row}
              getScore={props.getScore}
              onDeleteHandler={deleteHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
