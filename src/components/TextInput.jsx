import "../styles/components/TextInput.scss";
import "../styles/components/TextInput.scss";
import TextField from "@mui/material/TextField";

const BasicTextField = ({
  label,
  type = "text",
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      type={type}
      fullWidth={fullWidth}
      margin="normal"
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#E0E0E0",
          },
          "&:hover fieldset": {
            borderColor: "#1A85C8",
          },
        },
      }}
    />
  );
};

export default BasicTextField;
