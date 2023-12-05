# Breaking Barriers - Workforce Training Application

# Release Notes

## v0.5.0

### Features
- Post Messages for Administrators (as Instructor)
- Mark Messages as Resolved (as Instructor or Adminstrator)
- Create Pages in Courses (as Instructor)

### Bug Fixes
- *FIXED:* Backend - 'Sessions' needs rework & optimization (#001)
- *FIXED:* Issues with syncing quizzes and files across modules/courses (#002)
- *FIXED:* Front-end UI styling is inconsistent across some pages (#003)

### Known Issues
- *MISSING FEATURE*: Quiz scoring needs to be done manually (Multiple Choice questions are not auto-graded)

## v0.4.0

### Features

- Create Module (as Administrator)
- Assign Instructor to Module (as Administrator)
- Create Course (as Instructor)
- Assign Trainee to Course (as Instructor)

### Bug Fixes

- N/A

### Known Issues

- Backend - 'Sessions' needs rework & optimization (#001)
- Issues with syncing quizzes and files across modules/courses (#002)
- Front-end UI styling is inconsistent across some pages (#003)

## v0.3.0

### Features

- Upload Files (as Instructor)
- Delete Files (as Instructor)
- View Files
- Download Files
- Quiz Submission (as Trainee)

### Bug Fixes

- Fixed quiz submission issues

### Known Issues

- Backend - 'Sessions' needs rework & optimization (#001)

## v0.2.0

### Features

- View Quiz Results Page (as Trainee)
- View Trainee Stats Page (as Instructor)

### Bug Fixes

- Fixed server logic for quiz creation
- Fixed server logic for assigning quizzes to trainees
- Fixed server logic for account creation

### Known Issues

- Quiz Submission (as Trainee) - _moved to v0.3_

## v0.1.0

### Features

- _Back-end_: Administrator, Instructor, and Trainee OldLogin
- _Front-end_: User Login Form
- _Front-end_: Quiz Creation Form
- _Front-end_: Display List of Quizzes (as Trainee/Instructor)
- _Database_: Database Scaffolding Complete for Users and Quizzes

### Bug Fixes

- N/A

### Known Issues

- Server logic for quiz creation not working correctly
- Server logic for assigning quizzes to trainees not working correctly
- Server logic for account creation not working correctly

# Install Guide

The following guide will detail how to install and run the project locally on your machine.

## Prerequisites
Before starting the installation, ensure your system meets the following requirements:

### Hardware Requirements
- **Processor:** Dual-core processor or better
- **Memory:** 4GB RAM minimum, 8GB recommended
- **Storage:** At least 10GB of free disk space

### Operating System
- **Supported OS:** Windows 10/11, macOS Big Sur (11.x), Ubuntu 20.04 LTS (or similar)

Ensure your hardware and operating system meet these minimum requirements to ensure the application runs smoothly.

## Dependent Libraries Installation (Node.js)
The application relies on Node.js as its runtime environment. Follow these steps to install Node.js:

1. **Visit the Node.js Download Page:** [Node.js Official Website](https://nodejs.org/en/download/)

2. **Choose Your Operating System:** Select the appropriate installer for your OS (Windows, macOS, or Linux).

3. **Download and Run the Installer:** Follow the installation prompts and ensure Node.js and npm (Node Package Manager) are successfully installed.

4. **Verify Installation:** Open a terminal or command prompt and run the following commands to ensure Node.js and npm are installed:

    ```bash
    node -v
    npm -v
    ```

   These commands should display the installed Node.js and npm versions, confirming a successful installation.

## Download Instructions
To access the source code, you can either clone the repository using Git (Option 1) or download the ZIP file directly from GitHub (Option 2):

### Clone the Repository (Option 1):
If you have Git installed, use the following command in your terminal or command prompt:

```bash
git clone https://github.com/jdmclatcher/JIC-3110-Breaking-Barriers.git
```

If you don't have Git installed, you can download it from the [official Git website](https://git-scm.com/downloads).

### Download ZIP (Option 2):

Alternatively, you can download the source code as a ZIP file:

1. **Download ZIP:** Scroll to the top of this page and click on the 'Code' button and select 'Download ZIP'.

2. **Extract ZIP:** Once downloaded, unzip the file to access the source code on your local machine.

## Run Instructions

Follow these steps to run the application on your local machine:

### Naviagte to the Project Directory

Using the Terminal or Command Prompt/Windows Powershell, navigate to the project folder:
```bash
cd path/to/Breaking-Barriers-Workforce-Training-App
```

Replace `path/to/JIC-3110-Breaking-Barriers` with the actual path where the project is located on your system.

### Install Dependencies

Once inside the project directory, install the required Node.js packages:

```bash
npm install
```

This command will install all the necessary packages for the application.

### Run the Application

After installing dependencies, start the application by running the following command:

```bash
npm run dev
```

This will initiate the Next.js development server. Open your web browser and go to `http://localhost:3000` to view the running application.

## Troubleshooting

Listed below are common issues that are often faced when attempting to install or run the application.

### Common Errors and Solutions
- **Error: Port 3000 is already in use:** Another application might be using port 3000. Try stopping any other applications using that port or change the port in the project configuration.
- **Module not found:** Ensure you have installed all dependencies using `npm install`. You can also try running `npm ci` instead for a clean install.
- **Build failing:** Check your Node.js version and ensure it meets the minimum requirement.
