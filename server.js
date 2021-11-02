const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

// configuration
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
mongoose.connect(process.env.DATABASE_SRV);
mongoose.connection.once("open", () => {
	console.log("Database Connected");
});

// routes
app.use("/posts", require("./routes/posts"));
app.use("/user", require("./routes/user"));
app.use("/products", require("./routes/products"));

app.listen(3000, () => {
	console.log("The Server is up and running");
});
