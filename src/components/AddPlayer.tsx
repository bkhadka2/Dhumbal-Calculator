import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import styles from "./AddPlayer.module.css";
import { useState } from "react";

const AddPlayer = (props: any) => {
  const [playerName, setPlayerName] = useState("");

  const onChangeHandler = (event: any) => {
    setPlayerName(event.target.value);
  };

  const onEnterHandler = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.getPlayerHandler(playerName);
      setPlayerName("");
    }
  };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    props.getPlayerHandler(playerName);
    setPlayerName("");
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0.5, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className={styles.addPlayerContainer}>
        <TextField
          id="outlined-search"
          label="Player Name"
          type="search"
          onChange={onChangeHandler}
          onKeyDown={onEnterHandler}
          value={playerName}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={onSubmitHandler}
        >
          Add
        </Button>
      </div>
    </Box>
  );
};

export default AddPlayer;
