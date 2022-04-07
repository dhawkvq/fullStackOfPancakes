#!/bin/bash

source .env

psql -d postgres -c "CREATE DATABASE $PG_DB"
psql -d postgres -c "CREATE DATABASE $TEST_PG_DB"
