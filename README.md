# Open Source Company Task Manager

A robust, self-hosted task management and collaboration tool designed for companies. Manage tasks with priorities, tags, and deadlines across your team, all deployed seamlessly on your own domain using Docker.

## Stack
- **Frontend/Backend:** Next.js with the T3 stack (TypeScript, Tailwind CSS, tRPC, NextAuth.js, Prisma)
- **Database:** PostgreSQL
- **Deployment:** Docker & Docker Compose

## Features
- **User Authentication:** Secure login using NextAuth.js.
- **Task Management:** Full CRUD operations for tasks including statuses (pending/completed) and priority tagging.
- **Self-Hosted:** Fully containerized for easy deployment on any VPS or local server.
- **Automated Migrations:** Database migrations run automatically on container startup.

## Quickstart with Docker (Recommended for Self-Hosting)

The easiest way to get the application running on your own infrastructure is using Docker Compose. This spins up the Next.js application and a local PostgreSQL database.

### Prerequisites
- Docker & Docker Compose installed on your host machine.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/task-manager.git
   cd task-manager
   ```
2. Configure Environment Variables:
   Copy `.env.example` to `.env` and fill in your authentication provider secrets (e.g., Discord or GitHub) and change the `NEXTAUTH_SECRET`.
   ```bash
   cp .env.example .env
   ```
3. Start the Services:
   Run the following command to build the Docker image and start the containers in detached mode:
   ```bash
   docker-compose up -d --build
   ```
4. Access the Application:
   Navigate to `http://localhost:3000` (or your configured domain). 

*Note: The `entrypoint.sh` script automatically applies database migrations using Prisma before starting the Next.js server.*

## Local Development (Without Docker)

1. Clone the repo and run `npm install`
2. Set up a local PostgreSQL database and configure `.env`
3. Run migrations: `npx prisma db push`
4. Start the dev server: `npm run dev`

## Testing
- Run tests using `npm run lint` and `npx jest`

## License
MIT