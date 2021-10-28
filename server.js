const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// configuration
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.DATABASE_SRV);
mongoose.connection.once("open", () => {
	console.log("Database Connected");
});

// routes
app.use("/posts", require("./routes/posts"));

app.listen(3000, () => {
	console.log("The Server is up and running");
});
