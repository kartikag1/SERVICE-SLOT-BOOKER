const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var path = require("path");
const cors = require("cors");

//importing ROUTES
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const bookingRouter = require("./routes/booking");

const app = express();

app.use(morgan("combined"));

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//DB CONNECTION
let MONGO_URI =
  "";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB CONNECTION ERROR => " + err);
  });

//ROUTES
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", bookingRouter);

app.use("*", (request, response) => {
  return response.status(404).json({ err: "page not found" });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`App up and listening on port: ${port}`);
});
