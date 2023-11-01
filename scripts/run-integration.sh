#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh

docker compose up -d

echo '🟡 - Waiting for database to be ready...'
$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'

npx prisma migrate deploy

if [ "$#" -eq  "0" ]
  then
    vitest run -c ./vitest.config.integration.ts
else
    vitest -c ./vitest.config.integration.ts --ui
fi

docker compose down -v