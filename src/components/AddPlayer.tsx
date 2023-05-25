import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import styles from "./AddPlayer.module.css";
import { useState } from "react";

const AddPlayer = (props: any) => {
  const [playerName, setPlayerName] = useState("");

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlayerName(event.target.value);
  };

  const handleSubmission = (
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (playerName === "") {
      setPlayerName("");
    } else {
      props.getPlayerHandler(playerName);
      setPlayerName("");
    }
  };

  const onEnterHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSubmission(event);
    }
  };

  const onSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleSubmission(event);
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
