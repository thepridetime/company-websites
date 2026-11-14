const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Security & Parsing Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check for AWS Elastic Load Balancer (ALB / Target Group)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Pride Times AWS Backend API"
  });
});

app.get("/api/v1/meta", (req, res) => {
  res.status(200).json({
    platform: "The Pride Times Editorial Engine",
    version: "1.0.0",
    cloud: "AWS",
    environment: process.env.NODE_ENV || "production"
  });
});

// Editorial & Magazine Endpoints
app.get("/api/v1/magazine/editions", (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: "sept-2026",
        title: "The Global Business Issue 2026",
        category: "Business",
        edition: "September 2026",
        isCoverStory: true
      },
      {
        id: "aug-2026",
        title: "Healthcare Innovation & Biotechnology Frontiers",
        category: "Healthcare",
        edition: "August 2026",
        isCoverStory: false
      },
      {
        id: "jul-2026",
        title: "The Electric Future: How EVs Are Rewriting Mobility",
        category: "Technology",
        edition: "July 2026",
        isCoverStory: false
      },
      {
        id: "jun-2026",
        title: "Person of the Year: The Leaders of the New Business Era",
        category: "Leadership",
        edition: "June 2026",
        isCoverStory: false
      }
    ]
  });
});

// Catch-all route
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "production" ? "Something went wrong" : err.message
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Pride Times Backend] Server running on port ${PORT}`);
  console.log(`[HealthCheck] http://localhost:${PORT}/health`);
});

module.exports = app;
