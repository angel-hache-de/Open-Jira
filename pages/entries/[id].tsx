import React, { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";
import { ConfirmAction } from "../../components/ui";
import { UIContext } from "../../context/ui";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface EntryPageProps {
  entry: Entry;
}

const EntryPage: FC<EntryPageProps> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const {
    openDeleteConfirmation,
    closeDeleteConfirmation,
    deleteConfirmationOpen,
  } = useContext(UIContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  const onDelete = async () => {
    try {
      await deleteEntry(entry);
      closeDeleteConfirmation();
      router.replace("/");
    } catch (error) {}
  };

  return (
    <Layout title={inputValue.substring(0, 5) + "..."}>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry`}
              subheader={`Created ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )} ago`}
            />
            <CardContent>
              <TextField
                sx={{ mt: 2, mb: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="New entry"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onTextFieldChange}
                helperText={isNotValid && "Enter a value"}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={<Radio />}
                      value={option}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
        onClick={() => openDeleteConfirmation()}
      >
        <DeleteOutlined />
      </IconButton>

      {/* Backdrop to confirm delete */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={deleteConfirmationOpen}
      >
        <ConfirmAction
          message="Are you sure to delete this task?"
          color="error"
          onCancel={() => closeDeleteConfirmation()}
          onConfirm={onDelete}
        />
      </Backdrop>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
