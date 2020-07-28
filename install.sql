CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(80),
    img VARCHAR,
    dateofbirth date,
);

CREATE TABLE acct (
    id SERIAL PRIMARY KEY,
    profile_img BYTEA,
    bio TEXT
);