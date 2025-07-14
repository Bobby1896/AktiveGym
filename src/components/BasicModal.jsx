import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#181818",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
  textAlign: "center",
  borderRadius: 4,
};

export default function BasicModal({
  isOpen,
  onClose,
  title,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "#fff" }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{ backgroundColor: "#1976d2", color: "#fff", px: 4 }}
          >
            YES
          </Button>
          <Button
            onClick={onCancel}
            variant="contained"
            sx={{ backgroundColor: "#d32f2f", color: "#fff", px: 4 }}
          >
            NO
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
