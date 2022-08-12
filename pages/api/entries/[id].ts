import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Readed as string
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: "Invalid id" });

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "Method does not exists" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entry = await Entry.findById(id);

    if (!entry) {
      await db.disconnect();
      return res.status(400).json({ message: "Id " + id + " not found" });
    }

    res.status(200).json(entry);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: "Ups, something went wrong" });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "Id " + id + " not found" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToDelete = await Entry.findById(id);

  if (!entryToDelete) {
    await db.disconnect();
    return res.status(400).json({ message: "Id " + id + " not found" });
  }

  try {
    const deletedEntry = await Entry.findByIdAndDelete(id);
    res.status(200).json(deletedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
