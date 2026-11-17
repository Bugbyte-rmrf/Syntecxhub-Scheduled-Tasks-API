# Syntecxhub Project – Scheduled Tasks API

## 1. Project Overview

The **Scheduled Tasks API** is a Node.js and Express-based application developed as part of the Syntecxhub project assignment.

The application demonstrates how to create, schedule, execute, monitor, and manually trigger background tasks using **Node.js, Express.js, and node-cron**.

It provides an API for managing scheduled jobs, viewing execution logs, and manually triggering tasks without needing to wait for their scheduled execution time.

The project is designed to demonstrate practical backend development concepts, including:

- Automated task scheduling.
- REST API development.
- Background job execution.
- File-based data management.
- Email notification integration.
- Error handling and execution logging.
- API testing using Thunder Client.
- Project version control and GitHub submission.

### Project Information

| Item | Description |
|---|---|
| Project Name | Scheduled Tasks API |
| Organization | Syntecxhub |
| Repository Name | Syntecxhub_Project_Name |
| Runtime | Node.js |
| Backend Framework | Express.js |
| Scheduling Library | node-cron |
| Email Library | Nodemailer |
| Data Storage | JSON files |
| API Testing | Thunder Client |
| Version Control | Git and GitHub |
| Default Port | 3000 |
| Time Zone | Africa/Nairobi |

---

## 2. Project Objectives

The main objectives of this project are to:

1. Build a backend API using Node.js and Express.
2. Implement automated background tasks using node-cron.
3. Create a task that identifies and deletes stale records.
4. Create a task that generates and sends an email summary.
5. Provide API endpoints for listing and manually executing scheduled jobs.
6. Record successful and failed job executions.
7. Handle errors without unexpectedly crashing the application.
8. Test API functionality using Thunder Client.
9. Organize and upload the complete source code to GitHub.

---

## 3. Technologies and Dependencies

The project uses the following technologies:

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Creates the REST API |
| node-cron | Schedules automated background tasks |
| Nodemailer | Handles email delivery |
| dotenv | Loads environment variables |
| Nodemon | Automatically restarts the server during development |
| Thunder Client | Tests API endpoints inside VS Code |
| Git | Tracks source code changes |
| GitHub | Hosts the project repository |

### Dependencies

The following packages are installed:

**Production dependencies**

- `express`
- `node-cron`
- `dotenv`
- `nodemailer`

**Development dependency**

- `nodemon`

---

## 4. Project Folder Structure

The project is organized into the following structure:

```text
Syntecxhub_Project_Name/
│
├── app.js
│
├── jobs.js
│
├── tasks.js
│
├── package.json
│
├── package-lock.json
│
├── .env
│
├── .gitignore
│
├── README.md
│
├── data/
│   └── records.json
│
├── logs/
│   └── job-logs.json
│
└── node_modules/
```

### File and Folder Descriptions

| File or Folder | Purpose |
|---|---|
| `app.js` | Main application entry point. Configures Express, defines API routes, starts scheduled jobs, and launches the server. |
| `jobs.js` | Defines scheduled jobs, cron expressions, job execution, and execution logging. |
| `tasks.js` | Contains the actual task logic, including stale-record cleanup and email summaries. |
| `package.json` | Stores project information, dependencies, and npm scripts. |
| `package-lock.json` | Records the exact dependency versions installed. |
| `.env` | Stores environment variables and optional email configuration. |
| `.gitignore` | Prevents private and unnecessary files from being uploaded to GitHub. |
| `README.md` | Provides project documentation and setup instructions. |
| `data/` | Contains application data. |
| `data/records.json` | Stores sample records used by the cleanup task. |
| `logs/` | Contains job execution history. |
| `logs/job-logs.json` | Stores success and failure records for executed jobs. |
| `node_modules/` | Contains installed Node.js dependencies. Generated automatically by npm and excluded from GitHub. |

**Important:** The `data` and `logs` folders contain JSON files for this demonstration. The current implementation does not use MongoDB or another external database.

---

## 5. Application Setup and Installation

### Prerequisites

Before running the project, install:

1. **Node.js and npm** – https://nodejs.org/
2. **Git** – https://git-scm.com/
3. **Visual Studio Code** – https://code.visualstudio.com/
4. **Thunder Client extension** – available through the VS Code Extensions Marketplace.

To confirm that Node.js and npm are installed, open the VS Code terminal and execute:

```bash
node -v
npm -v
```

To confirm that Git is installed:

```bash
git --version
```

### Step 1: Create the Project Folder

Create a folder named:

```text
Syntecxhub_Project_Name
```

Open the folder in Visual Studio Code.

### Step 2: Initialize the Node.js Project

Open the VS Code terminal and run:

```bash
npm init -y
```

This generates the `package.json` file.

### Step 3: Install Project Dependencies

Install the production dependencies:

```bash
npm install express node-cron dotenv nodemailer
```

Install Nodemon for development:

```bash
npm install --save-dev nodemon
```

### Step 4: Configure npm Scripts

In `package.json`, configure the scripts section as follows:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

The `start` command runs the application normally.

The `dev` command runs the application with Nodemon, which automatically restarts the server when code changes are detected.

### Step 5: Create the Project Files and Folders

Create the files and folders shown in the project structure above.

Ensure that the JSON files are initialized correctly:

**`data/records.json`**

```json
[
  {
    "id": 1,
    "name": "John",
    "createdAt": "2025-09-01T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Mary",
    "createdAt": "2026-11-15T10:00:00.000Z"
  },
  {
    "id": 3,
    "name": "David",
    "createdAt": "2025-10-01T10:00:00.000Z"
  },
  {
    "id": 4,
    "name": "Grace",
    "createdAt": "2026-11-16T10:00:00.000Z"
  }
]
```

**`logs/job-logs.json`**

```json
[]
```

These sample records allow the cleanup task to demonstrate how older records are identified and removed.

---

## 6. Environment Configuration

The project uses `dotenv` to load configuration values from an environment file.

Create a file named `.env` in the project root directory.

Add the following configuration:

```env
PORT=3000

SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=

EMAIL_FROM=
EMAIL_TO=
```

### Environment Variables Explained

| Variable | Description |
|---|---|
| `PORT` | Port on which the Express server runs. |
| `SMTP_HOST` | SMTP server hostname. |
| `SMTP_PORT` | SMTP server port. |
| `SMTP_SECURE` | Enables or disables secure SMTP connection mode. |
| `SMTP_USER` | SMTP authentication username. |
| `SMTP_PASS` | SMTP authentication password or app password. |
| `EMAIL_FROM` | Sender email address. |
| `EMAIL_TO` | Recipient email address. |

### Email Configuration

The email summary task supports Nodemailer.

If valid SMTP credentials are configured, the application can send an actual email summary.

If SMTP configuration is not provided, the application displays an email summary preview in the terminal instead.

This allows the scheduled task to be tested without requiring an email account during initial development.

**Security:** Never upload real SMTP credentials or passwords to GitHub.

---

## 7. Git Ignore Configuration

The `.gitignore` file prevents private configuration and unnecessary dependency files from being uploaded.

Its contents should be:

```gitignore
node_modules/
.env
npm-debug.log*
```

The `.env` file and `node_modules` directory should remain local to your computer.

Anyone downloading the project can install the dependencies using `npm install`.

---

## 8. Scheduled Tasks

The application currently implements two scheduled background tasks.

### Task 1: Delete Stale Records

**Job Name:** `deleteStaleRecords`

**Schedule:** Every five minutes.

**Cron Expression:**

```text
*/5 * * * *
```

**Functionality:**

- Reads records from `data/records.json`.
- Checks the creation date of each record.
- Identifies records older than 30 days.
- Removes stale records.
- Saves the updated records back to the JSON file.
- Records the task execution result in the job logs.

This task demonstrates automated data cleanup.

### Task 2: Send Email Summary

**Job Name:** `sendEmailSummary`

**Schedule:** Every day at 9:00 AM.

**Cron Expression:**

```text
0 9 * * *
```

**Time Zone:**

```text
Africa/Nairobi
```

**Functionality:**

- Generates a summary of the available records.
- Prepares an email notification.
- Sends the email through Nodemailer when SMTP credentials are configured.
- Displays a summary preview in the terminal when email credentials are not configured.
- Records the execution result.

### Scheduling Summary

| Job | Cron Expression | Frequency |
|---|---|---|
| Delete Stale Records | `*/5 * * * *` | Every 5 minutes |
| Send Email Summary | `0 9 * * *` | Daily at 9:00 AM |

The scheduled jobs run automatically while the Node.js application is running.

If the application is stopped, scheduled jobs will not execute until the application is started again.

---

## 9. API Endpoints

The application exposes the following REST API endpoints.

Base URL:

```text
http://localhost:3000
```

### Endpoint 1: Welcome Route

**Method:** GET

**URL:**

```text
http://localhost:3000/
```

**Purpose:**

Checks whether the API is running and accessible.

### Endpoint 2: List Scheduled Jobs

**Method:** GET

**URL:**

```text
http://localhost:3000/api/jobs
```

**Purpose:**

Returns information about the scheduled jobs.

The response includes information such as job names and their schedules.

### Endpoint 3: Manually Run the Cleanup Job

**Method:** POST

**URL:**

```text
http://localhost:3000/api/jobs/deleteStaleRecords/run
```

**Purpose:**

Manually triggers the stale-record cleanup task.

This allows the cleanup functionality to be tested without waiting for the next scheduled execution.

### Endpoint 4: Manually Run the Email Summary Job

**Method:** POST

**URL:**

```text
http://localhost:3000/api/jobs/sendEmailSummary/run
```

**Purpose:**

Manually triggers the email summary task.

If SMTP credentials are configured, an email will be sent. Otherwise, a preview is displayed in the terminal.

### Endpoint 5: View Job Execution Logs

**Method:** GET

**URL:**

```text
http://localhost:3000/api/logs
```

**Purpose:**

Returns the execution history of scheduled and manually triggered jobs.

The logs capture information such as:

- Job name.
- Execution timestamp.
- Execution status.
- Success or failure information.
- Error details when available.

### API Endpoint Summary

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API availability |
| GET | `/api/jobs` | List scheduled jobs |
| POST | `/api/jobs/deleteStaleRecords/run` | Manually run cleanup |
| POST | `/api/jobs/sendEmailSummary/run` | Manually run email summary |
| GET | `/api/logs` | Retrieve execution logs |

---

## 10. Testing with Thunder Client

Thunder Client is used to test the REST API directly inside Visual Studio Code.

It provides an alternative to Postman and allows API requests to be created, executed, and saved in collections.

### Step 1: Install Thunder Client

1. Open Visual Studio Code.
2. Select the Extensions icon.
3. Search for `Thunder Client`.
4. Install the Thunder Client extension.
5. Open Thunder Client from the VS Code sidebar.

### Step 2: Start the Application

In the VS Code terminal, execute:

```bash
npm run dev
```

The server should start on:

```text
http://localhost:3000
```

Keep the terminal running while testing.

### Step 3: Create a Thunder Client Collection

Create a collection named:

```text
Scheduled Tasks API
```

Organize the requests into the following folders:

```text
Scheduled Tasks API/
│
├── General/
│   └── Check API Status
│
├── Jobs/
│   ├── List Scheduled Jobs
│   ├── Run Cleanup Job
│   └── Run Email Summary Job
│
└── Logs/
    └── Get Job Execution Logs
```

### Step 4: Create and Execute the Requests

#### Request 1: Check API Status

- Folder: `General`
- Request Name: `Check API Status`
- Method: GET
- URL:

```text
http://localhost:3000/
```

Expected result: A response confirming that the API is running.

#### Request 2: List Scheduled Jobs

- Folder: `Jobs`
- Request Name: `List Scheduled Jobs`
- Method: GET
- URL:

```text
http://localhost:3000/api/jobs
```

Expected result: A response containing the registered scheduled jobs and their schedules.

#### Request 3: Run Cleanup Job

- Folder: `Jobs`
- Request Name: `Run Cleanup Job`
- Method: POST
- URL:

```text
http://localhost:3000/api/jobs/deleteStaleRecords/run
```

Expected result: The cleanup task executes and returns its execution result.

#### Request 4: Run Email Summary Job

- Folder: `Jobs`
- Request Name: `Run Email Summary Job`
- Method: POST
- URL:

```text
http://localhost:3000/api/jobs/sendEmailSummary/run
```

Expected result: The email summary task executes. Depending on the SMTP configuration, it either sends an email or displays a preview in the terminal.

#### Request 5: Get Job Execution Logs

- Folder: `Logs`
- Request Name: `Get Job Execution Logs`
- Method: GET
- URL:

```text
http://localhost:3000/api/logs
```

Expected result: A response containing the recorded job execution history.

### Thunder Client Testing Checklist

- [ ] API status endpoint responds successfully.
- [ ] Scheduled jobs endpoint returns the registered jobs.
- [ ] Cleanup task can be triggered manually.
- [ ] Email summary task can be triggered manually.
- [ ] Job execution logs can be retrieved.
- [ ] Successful executions are recorded.
- [ ] Failed executions are handled and logged.

**Note:** The Thunder Client collection is a testing collection inside VS Code. The folder structure above documents how the requests should be organized; it does not automatically create those folders inside the project repository. If the collection is exported, it can also be included in the repository as a separate testing artifact.

---

## 11. Running the Application

After completing the installation and configuration steps, use the following commands.

### Development Mode

```bash
npm run dev
```

Runs the application using Nodemon.

### Production-Style Start

```bash
npm start
```

Runs the application using Node.js directly.

### Stop the Application

Press:

```text
Ctrl + C
```

in the terminal.

---

## 12. Error Handling and Logging

The application includes basic error handling for job execution.

When a job is executed:

1. The application identifies the requested job.
2. The corresponding task is executed.
3. The result is recorded.
4. Successful executions are marked as successful.
5. Failed executions are marked as failures.
6. Error information is stored in the execution log where available.

The log file is:

```text
logs/job-logs.json
```

The API endpoint for accessing the logs is:

```text
GET /api/logs
```

This makes it possible to monitor task execution without manually inspecting every task.

---

## 13. Important Implementation Notes and Limitations

This project is a demonstration of scheduled background processing.

The following considerations apply to the current implementation:

- The application must remain running for scheduled jobs to execute.
- Data is stored in local JSON files rather than a database.
- Actual email delivery requires valid SMTP configuration.
- Execution logs are stored locally.
- Scheduled jobs are registered again whenever the application restarts.
- The current implementation does not provide a persistent distributed job queue or multi-server locking mechanism.
- The sample cleanup task uses a 30-day age threshold.

For a production application, future improvements could include:

- MongoDB or PostgreSQL integration.
- A persistent background job queue such as BullMQ.
- Distributed job locking.
- More advanced logging and monitoring.
- Authentication and authorization.
- Automated unit and integration tests.
- Deployment to a cloud hosting platform.

---

## 14. Troubleshooting

### Problem: Node.js Is Not Recognized

Check that Node.js is installed correctly.

Run:

```bash
node -v
npm -v
```

If the commands are not recognized, install Node.js and restart VS Code.

### Problem: The Server Cannot Start

Check whether another application is already using port 3000.

You can also change the `PORT` value in `.env`.

### Problem: Thunder Client Cannot Connect

Confirm that:

1. The application is running.
2. The correct URL is being used.
3. The server terminal does not display an error.
4. The request method matches the endpoint.

### Problem: Email Is Not Being Sent

Check that all required SMTP environment variables are configured correctly.

Confirm that the SMTP provider permits the connection and that the authentication credentials are valid.

Without SMTP configuration, the application should display a summary preview instead.

### Problem: Scheduled Jobs Are Not Running

Confirm that:

- The application is still running.
- The cron expressions are configured correctly.
- The server has not been stopped.
- The system time and configured time zone are correct.

---

## 15. Git and GitHub Submission

The project source code is intended to be uploaded to a GitHub repository named:

```text
Syntecxhub_Project_Name
```

### Step 1: Create a GitHub Repository

1. Sign in to GitHub.
2. Create a new repository.
3. Set the repository name to `Syntecxhub_Project_Name`.
4. Choose Public unless the assignment instructions require Private.
5. Do not initialize the repository with another README or `.gitignore` because these already exist locally.
6. Create the repository.

### Step 2: Initialize Git

Open the VS Code terminal inside the project folder.

Run:

```bash
git init
```

### Step 3: Stage Project Files

```bash
git add .
```

### Step 4: Commit the Project

```bash
git commit -m "Initial commit - Scheduled Tasks API"
```

### Step 5: Set the Main Branch

```bash
git branch -M main
```

### Step 6: Connect the GitHub Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin 
```

### Step 7: Push the Project to GitHub

```bash
git push -u origin main
```

Complete any authentication prompts from GitHub.

### Step 8: Verify the Upload

Open the GitHub repository in your browser and confirm that the source files have been uploaded.

The repository should contain:

- `app.js`
- `jobs.js`
- `tasks.js`
- `package.json`
- `package-lock.json`
- `.gitignore`
- `README.md`
- `data/records.json`
- `logs/job-logs.json`

The repository should not contain:

- `node_modules/`
- `.env`

### Updating the Repository

After making additional changes, use:

```bash
git add .
git commit -m "Updated scheduled tasks API"
git push
```

---

## 16. Final Project Completion Checklist

Before submitting the project, verify the following:

### Development

- [ ] Node.js and npm are installed.
- [ ] Project folder is correctly named.
- [ ] Dependencies are installed.
- [ ] Project files are organized correctly.
- [ ] Environment configuration is created.
- [ ] Scheduled cleanup task is implemented.
- [ ] Scheduled email summary task is implemented.
- [ ] Job execution logging is implemented.
- [ ] API endpoints are available.

### Testing

- [ ] Server starts successfully.
- [ ] API status endpoint works.
- [ ] Scheduled jobs can be listed.
- [ ] Cleanup task can be manually triggered.
- [ ] Email summary task can be manually triggered.
- [ ] Job logs can be retrieved.
- [ ] Thunder Client requests are organized and tested.
- [ ] No unexpected errors remain.

### Documentation and Submission

- [ ] README.md is complete.
- [ ] `.gitignore` excludes private files.
- [ ] Git repository is initialized.
- [ ] GitHub repository is created.
- [ ] All required source files are uploaded.
- [ ] `.env` is not uploaded.
- [ ] `node_modules` is not uploaded.
- [ ] GitHub repository link is ready for submission.

---

## 17. Conclusion

The Syntecxhub Scheduled Tasks API demonstrates the implementation of automated background tasks using Node.js, Express.js, and node-cron.

It provides scheduled data cleanup, email summary generation, manual job execution, REST API endpoints, and execution logging.

The project also demonstrates practical development workflows, including dependency management, environment configuration, API testing with Thunder Client, and version control using Git and GitHub.

The application provides a foundation for more advanced backend automation systems and can be extended with database integration, persistent job queues, monitoring, and cloud deployment.

**Project Repository:** `Syntecxhub_Project_Name`

**Status:** Developed as a scheduled task management API demonstration.


