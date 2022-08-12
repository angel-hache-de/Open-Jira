import { useState } from "react";
import { Button, Box, Paper, Typography, CircularProgress } from "@mui/material";

interface ConfirmActionProps {
  color: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmAction = ({
  color,
  message,
  onCancel,
  onConfirm,
}: ConfirmActionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickConfirm = () => {
    setIsLoading(true);
    onConfirm();
  };

  return (
    <Paper
      sx={{
        padding: 2,
      }}
    >
      <Typography variant="h6" align="center">
        {message}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button
          variant="contained"
          color={color as any}
          onClick={onClickConfirm}
          sx={{ mr: 1 }}
          disabled={isLoading}
        >
          {isLoading && <CircularProgress color="inherit" />}
          {!isLoading && "Confirm"}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};
