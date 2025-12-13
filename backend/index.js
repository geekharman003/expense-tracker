const express = require("express");
const db = require("./utils/db-connection");
const expenseRoutes = require("./routes/expenseRoutes");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/expenses", expenseRoutes);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
