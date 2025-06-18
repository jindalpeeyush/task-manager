# Task Management and Collaboration Tool

## Stack
- Next.js with T3 stack (TypeScript, Tailwind, tRPC, NextAuth.js, Prisma)
- Supabase for DB
- AWS (SST) for Serverless Deployment

## Features
- User Authentication
- Task CRUD with priority/tags/deadlines
- User Profile
- Supabase as database
- Deployed using SST on AWS

## Setup
1. Clone the repo
2. Run `npm install`
3. Set up `.env`
4. `npx prisma db push`
5. `npm run dev`

## Deployment
- SST used for AWS deployment: `npx sst deploy`

## Testing
- Run `npm test`

## License
MIT