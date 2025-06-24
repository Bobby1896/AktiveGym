import { Button as MUIButton } from "@mui/material";
import "../styles/components/CustomButton.scss";

const sizeStyles = {
  small: {
    fontSize: "0.75rem",
    padding: "6px 12px",
    borderRadius: "30px",
    textTransform: "none"
  },
  medium: {
    fontSize: "1rem",
    padding: "0.4rem 2rem",
    borderRadius: "30px",
    textTransform: "none"
  },
  large: {
    fontSize: "1.25rem",
    padding: "0.5rem 3rem",
    borderRadius: "30px",
    textTransform: "none",
  },
};

const CustomButton = ({
  children,
  bgColor = "#1A85C8",
  textColor = "#ffffff",
  hoverBgColor,
  size = "medium", 
  style = {},
  type = "button",
  disabled,
  ...rest
}) => {
  return (
    <MUIButton
      {...rest}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        "&:hover": {
          backgroundColor: hoverBgColor || bgColor,
        },
        ...sizeStyles[size],
        ...style,
      }}
      className="custom-button"
      type={type}
      disabled= {disabled}
    >
      {children}
    </MUIButton>
  );
};

export default CustomButton;
