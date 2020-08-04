CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20),
    password VARCHAR(100),
    email VARCHAR(80),
    pro_url VARCHAR(255),
	cov_url VARCHAR(255),
    full_name VARCHAR(20),
	bio VARCHAR(255)
);

CREATE TABLE blogs (
    bid SERIAL PRIMARY KEY,
    title VARCHAR(20),
    blog_text VARCHAR(255),
    date_created TIMESTAMP,
    blog_img VARCHAR(255),
    user_id INT REFERENCES users(id)
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    blog_id INT REFERENCES users(id),
    luser_id INT REFERENCES users(id),
    likes INT DEFAULT 0
);

CREATE TABLE messages (
    message VARCHAR,
    from_u INT REFERENCES users(id),
    to_u INT REFERENCES users(id),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);