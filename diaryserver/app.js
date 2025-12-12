const express = require("express");
const app = express();

app.use(express.json());
app.use("/entries", require("./routes/diary"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
module.exports = app;
