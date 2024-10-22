import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

type ModalWindowProps = {
  message?: string;
  title?: string;
  onClose?: (goHome?: boolean) => void;
  isActive?: boolean;
  goHome?: boolean;
};

const ModalWindow: React.FC<ModalWindowProps> = ({
  message,
  title,
  isActive,
  goHome,
  onClose = () => {},
}: ModalWindowProps) => {
  const handleCloseModalWindowDialog = () => onClose(goHome);

  return (
    <Modal
      open={isActive || true}
      onClose={handleCloseModalWindowDialog}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ height: "100%" }}
      id="modal"
    >
      <Box
        sx={{ minWidth: 700 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          backgroundColor: "#fff",
          boxShadow:
            "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
          padding: "32px",
          outline: "none",
        }}
      >
        <div>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "#fff",
              zIndex: "10",
            }}
          >
            {title}
          </Typography>
          <div style={{ marginTop: "15px" }}>
            <Typography id="modal-message">{message}</Typography>
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              id="cancel-button-modal"
              variant="outlined"
              color="error"
              onClick={handleCloseModalWindowDialog}
            >
              Закрыть
            </Button>
          </Stack>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
