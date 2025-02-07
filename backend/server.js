import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

// Start Web App
const server = express();

// Set EJS view engine
server.set("view engine", "ejs");

// Configure middleware for parsing body, JSON, public folder
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(express.static("public"));

// Middleware for web security
server.use(helmet());

// Middleware for cross-origin resources
server.use(cors());

// Configure .env file
dotenv.config();

// Global Error Handling
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something unusual occurred");
});

// Landing Page
server.route("/")
.get(async (req, res) => {
  res.render("index");
});

// Listen for server
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
});