require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const express = require("express");
const http = require("http");
const app = express();
const connectDB = require("./config/db");
const server = http.createServer(app);
const userRoutes = require("./routes/userRoutes");
// app.get("/",(req, res)=>{
//     return res.status(200).send("<h1>Welcome to Node Server!</h1>");
// });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  console.log("In Server.js file");
  res.status(500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });

// const express = require('express')

// // rest object

// const app = express()

// // route
// // url => http:// localhost : 8080

// app.get("/",(req, res)=>{
//     return res.status(200).send("<h1> Welcome to Food Server </h1>");

// });

// // PORT
// const PORT= 8080;
// // listen

// app.listen(PORT,()=>{
//     console.log("Server Running");
// });
