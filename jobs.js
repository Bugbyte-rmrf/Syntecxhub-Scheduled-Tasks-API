
const cron = require("node-cron");

const {
  deleteStaleRecords,
  sendEmailSummary
} = require("./tasks");

const fs = require("fs/promises");
const path = require("path");

const logPath = path.join(__dirname, "logs", "job-logs.json");

// Store information about our jobs
const jobs = {
  deleteStaleRecords: {
    name: "deleteStaleRecords",
    description: "Deletes records older than 30 days",
    schedule: "*/5 * * * *",
    task: deleteStaleRecords
  },

  sendEmailSummary: {
    name: "sendEmailSummary",
    description: "Generates and sends a daily email summary",
    schedule: "0 9 * * *",
    task: sendEmailSummary
  }
};

// Save execution results
async function saveLog(logEntry) {
  const content = await fs.readFile(logPath, "utf8");
  const logs = JSON.parse(content);

  logs.push(logEntry);

  await fs.writeFile(
    logPath,
    JSON.stringify(logs, null, 2)
  );
}

// Run a job and handle errors
async function runJob(jobName) {
  const job = jobs[jobName];

  if (!job) {
    return {
      success: false,
      message: "Job not found"
    };
  }

  const startTime = new Date();

  try {
    console.log(`Running job: ${jobName}`);

    const result = await job.task();

    const logEntry = {
      jobName,
      status: "success",
      startTime: startTime.toISOString(),
      endTime: new Date().toISOString(),
      result
    };

    await saveLog(logEntry);

    console.log(`Job ${jobName} completed successfully.`);

    return logEntry;

  } catch (error) {
    const logEntry = {
      jobName,
      status: "failure",
      startTime: startTime.toISOString(),
      endTime: new Date().toISOString(),
      error: error.message
    };

    try {
      await saveLog(logEntry);
    } catch (loggingError) {
      console.error("Could not save failure log:", loggingError);
    }

    console.error(`Job ${jobName} failed:`, error.message);

    return logEntry;
  }
}

// Schedule all jobs
function startScheduledJobs() {
  Object.values(jobs).forEach((job) => {
    cron.schedule(
      job.schedule,
      () => {
        runJob(job.name);
      },
      {
        name: job.name,
        timezone: "Africa/Nairobi",
        noOverlap: true
      }
    );

    console.log(
      `Scheduled ${job.name}: ${job.schedule}`
    );
  });
}

// Get job information
function getJobs() {
  return Object.values(jobs).map((job) => ({
    name: job.name,
    description: job.description,
    schedule: job.schedule,
    timezone: "Africa/Nairobi"
  }));
}

// Get execution logs
async function getLogs() {
  const content = await fs.readFile(logPath, "utf8");
  return JSON.parse(content);
}

module.exports = {
  startScheduledJobs,
  getJobs,
  getLogs,
  runJob
};
