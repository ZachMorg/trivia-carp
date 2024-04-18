\echo 'Delete and recreate trivia_carp db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE trivia_carp;
CREATE DATABASE trivia_carp;
\connect trivia_carp

\i schema.sql
\i seed.sql