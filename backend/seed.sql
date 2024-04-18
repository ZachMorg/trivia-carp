INSERT INTO users (username, password, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'test@email.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'test@otheremail.com',
        TRUE);

INSERT INTO games (username, num_questions, num_correct, category)
VALUES ('testuser',
        20,
        15,
        'general'),
       ('testuser',
        20,
        18,
        'general'),
       ('testadmin',
        50,
        50,
        'music');

INSERT INTO friends (username, friend_username)
VALUES ('testuser',
        'testadmin');