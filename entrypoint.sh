#!/bin/sh

# Stop on error
set -e

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting Next.js..."
exec node server.js
