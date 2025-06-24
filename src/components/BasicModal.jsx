import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CustomButton from "./CustomButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#181818",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
  textAlign: "center",
  borderRadius: 4,
};

export default function BasicModal({
  isOpen,
  onClose,
  subTitle,
  title,
  icon,
  onContinue,
  buttonText,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {icon && (
          <div style={{ marginBottom: 16 }}>{icon}</div>
        )}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb:5 }}>
          {subTitle}
        </Typography>
        <CustomButton size="large" onClick={onContinue}>{buttonText}</CustomButton>
      </Box>
    </Modal>
  );
}