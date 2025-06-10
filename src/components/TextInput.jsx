import "../styles/components/TextInput.scss";
import React, { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "../svg";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const BasicTextField = ({
  label,
  type = "text",
  fullWidth = true,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      type={isPasswordField && !showPassword ? "password" : "text"}
      fullWidth={fullWidth}
      className={className}
      margin="normal"
      InputProps={{
        endAdornment: isPasswordField && (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#2c2c2c",
          color: "white",
          caretColor: "white",

          "& input": {
            color: "white",
            caretColor: "white",
          },
          "& fieldset": {
            borderColor: "none",
          },
          "&:hover fieldset": {
            borderColor: "#E0E0E0",
          },
        },
      }}
     
    />
  );
};

export default BasicTextField;
