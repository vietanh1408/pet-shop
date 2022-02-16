const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./utils/mongo.connect");

const environments = require("./constants/environment");

const app = express();

const authRoute = require("./routes/auth.route");

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

app.use("/api/auth", authRoute);

connectDB();

app.listen(environments.PORT, () => {
    console.log(`Server listening on port ${environments.PORT}`);
});