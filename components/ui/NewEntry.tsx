import { ChangeEvent, useContext, useState } from "react";

import { Add, SaveOutlined } from "@mui/icons-material";
import { TextField, Box, Button } from "@mui/material";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { addingEntry, closeAddEntryForm, openAddEntryForm } =
    useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);
    closeAddEntryForm();
  };

  return (
    <Box sx={{ mb: 2, px: 2 }}>
      {!addingEntry && (
        <Button
          startIcon={<Add />}
          fullWidth
          variant="outlined"
          onClick={openAddEntryForm}
        >
          Add task
        </Button>
      )}

      {addingEntry && (
        <>
          <TextField
            fullWidth
            sx={{ mt: 2, mb: 1 }}
            placeholder="New entry"
            autoFocus
            multiline
            label="New entry"
            error={inputValue.length <= 0 && touched}
            helperText={inputValue.length <= 0 && touched && "Add a value"}
            onChange={onTextFieldChange}
            value={inputValue}
            onBlur={() => setTouched(true)}
          />

          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={closeAddEntryForm}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlined />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
