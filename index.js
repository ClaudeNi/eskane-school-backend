require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const routes = require("./routes/user");

connection();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
