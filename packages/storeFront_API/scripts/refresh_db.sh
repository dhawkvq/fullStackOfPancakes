#!/bin/bash

source .env

psql -d postgres -c "DROP DATABASE $PG_DB"
psql -d postgres -c "DROP DATABASE $TEST_PG_DB"
psql -d postgres -c "CREATE DATABASE $PG_DB"
psql -d postgres -c "CREATE DATABASE $TEST_PG_DB"

yarn migrate-up:dev
yarn migrate-up:test
yarn seed-db