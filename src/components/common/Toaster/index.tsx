import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GlobalContext from "../../../context";

export interface ISimpleSnackBar {
  message: string;
  severity: "error" | "success" | "warning" | "info";
  show: boolean;
  hide?: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Toaster = () => {
  const { setToaster, toaster } = React.useContext(GlobalContext);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setToaster({ ...toaster, show: false });
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={toaster.show}
        autoHideDuration={toaster.hide || 4000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          variant="outlined"
          severity={toaster.severity}
          sx={{ width: "100%", background: "white" }}
        >
          {toaster.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
