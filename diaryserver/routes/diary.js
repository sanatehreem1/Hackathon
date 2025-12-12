const { Router } = require('express');
const diaryController = require('../controllers/diary')

const diaryRouter = Router();

diaryRouter.get("/", diaryController.getAllEntries);
diaryRouter.get("/:q", diaryController.searchEntries);
diaryRouter.get("/:title", diaryController.getEntryById);
diaryRouter.post("/", diaryController.createEntry);
diaryRouter.patch("/:title", diaryController.updateEntry);
diaryRouter.delete("/:title", diaryController.deleteEntry);


module.exports = diaryRouter;
