CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL
        REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
    num_questions INTEGER NOT NULL,
    num_correct INTEGER NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE friends (
    username VARCHAR(25)
        REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE,
    friend_username VARCHAR(25)
        REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE
)