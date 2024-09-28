import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import path from "path";
import { fileURLToPath } from "url";

// Initialize dotenv
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

// Connect to MongoDB Atlas
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB Atlas");
})
.catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Serve static files from React app
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
