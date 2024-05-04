import React from "react";
import { Status } from "../Types/Status";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import { AxiosError } from "axios";

type Props = {
  status: Status;
  error: AxiosError | null;
  successMessage?: string;
};

function StatusInfo({ status, error, successMessage = "" }: Props) {
  console.log(status, error);
  if (status === "idle") {
    return <></>;
  } else if (status === "succeeded") {
    if (successMessage !== "") {
      return <Alert severity="success">{successMessage}</Alert>;
    }
  } else if (status === "loading") {
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );
  } else if (status === "failed") {
    if (error !== null) {
      return <Alert severity="error">{error.message}</Alert>;
    } else {
      return <Alert severity="error">Unknown error</Alert>;
    }
  }

  return <></>;
}

export default StatusInfo;
