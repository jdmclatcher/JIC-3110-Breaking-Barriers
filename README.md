# Breaking Barriers - Workforce Training Application

# Release Notes

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

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
