CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(80),
    img image,
    dateofbirth date,
);