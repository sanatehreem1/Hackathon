const Diary = require("../models/Diary");

const getAllEntries = async (req, res) => {
  try {
    const entries = await Diary.getAll();
    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch diary entries" });
  }
};


const getEntryById = async (req, res) => {
  const { id } = req.params;

  try {
    const entry = await Diary.getOneById(id);

    if (!entry) {
      return res.status(404).json({ error: "Diary entry not found" });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch diary entry" });
  }
};

const createEntry = async (req, res) => {
  const { title, content, category, entry_date } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const newEntry = await Diary.create({
      title,
      content,
      category,
      entry_date,
    });

    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create diary entry" });
  }
};

const updateEntry = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  try {
    const updatedEntry = await Diary.update(id, {
      title,
      content,
      category,
    });

    if (!updatedEntry) {
      return res.status(404).json({ error: "Diary entry not found" });
    }

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update diary entry" });
  }
};


const deleteEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Diary.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: "Diary entry not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete diary entry" });
  }
};

module.exports = {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
};


