import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const DataInputBox = (props: any) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const onEnterHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (parseInt(inputValue) < 0 || !Number.isFinite(parseInt(inputValue))) {
        setInputValue("");
      } else {
        props.getScore(parseInt(inputValue), props.id);
      }
      setInputValue("");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0.5, width: "15ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-number"
          label="Number"
          type="Number"
          InputProps={{ inputProps: { min: 0, max: 200 } }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChangeHandler}
          onKeyDown={onEnterHandler}
          value={inputValue}
        />
      </div>
    </Box>
  );
};

export default DataInputBox;
