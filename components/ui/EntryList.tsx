import React, { DragEvent, FC, useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";

import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";

import styles from "./EntryList.module.css";

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((e) => e._id === id);

    if (!entry) return;

    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: `calc(100vh - ${status === "pending" ? "230px" : "180px"})`,
          overflowY: "scroll",
          backgroundColor: "transparent",
          padding: "3px 10px",
        }}
      >
        {/* TODO: Change on dragg */}
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard entry={entry} key={entry._id} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
