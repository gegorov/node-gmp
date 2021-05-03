CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4 (),
    login varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    age int NOT NULL,
    is_deleted boolean NOT NULL,
    created_at timestamp DEFAULT now (),
    updated_at timestamp DEFAULT transaction_timestamp(),
    PRIMARY KEY (id)
);

INSERT INTO users
    (login, password, age, is_deleted)
VALUES
    ('Luke Skywalker', 'nO60cmH8', 24, false),
    ('Leia Organa', 'q13hRp7s', 27, false),
    ('Han Solo', 'QLz5RK5h', 50, false),
    ('Kylo Ren', 'kGco0xdp', 22, false),
    ('Padme Amidala', 'ofuaiqNR', 25, false),
    ('Obi-Wan Kenobi', '5JdJEBdk', 40, false),
    ('Bobba Fett', 'DxUwBgTT', 35, false),
    ('Moradmin Bast', '2mzSPGTS', 31, false),
    ('Ello Asty', 'afJASriY', 20, false),
    ('Gor Koresh', 'B1b1Tbjs', 50, false),
    ('Slowen Lo', 'kGco0xdp', 43, false),
    ('Rio Durant', 'AV3O4QzC', 29, false),
    ('Po Nudo', 'HhKGfdQa', 30, false),
    ('Dexter Jettster', 'j7Ac5ggI', 32, false),
    ('Figrin Dan', 'qWoZarTo', 47, false),
    ('Ohn Gos', '4eW18gpE', 55, false)
