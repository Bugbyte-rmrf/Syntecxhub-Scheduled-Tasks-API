
require("dotenv").config();

const express = require("express");

const {
  startScheduledJobs,
  getJobs,
  getLogs,
  runJob
} = require("./jobs");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to read JSON requests
app.use(express.json());

// Home endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Scheduled Tasks API",
    endpoints: {
      jobs: "GET /api/jobs",
      runJob: "POST /api/jobs/:jobName/run",
      logs: "GET /api/logs"
    }
  });
});

// List all scheduled jobs
app.get("/api/jobs", (req, res) => {
  res.json({
    success: true,
    jobs: getJobs()
  });
});

// Trigger a job manually
app.post("/api/jobs/:jobName/run", async (req, res) => {
  try {
    const result = await runJob(req.params.jobName);

    if (!result.success && result.message === "Job not found") {
      return res.status(404).json(result);
    }

    if (result.status === "failure") {
      return res.status(500).json(result);
    }

    res.json({
      success: true,
      message: "Job executed successfully",
      result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// View job execution logs
app.get("/api/logs", async (req, res) => {
  try {
    const logs = await getLogs();

    res.json({
      success: true,
      totalExecutions: logs.length,
      logs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Start the scheduled jobs
startScheduledJobs();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
