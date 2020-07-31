CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    img_url VARCHAR
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20),
    password VARCHAR(100),
    email VARCHAR(80),
    pro_id INT REFERENCES images(id),
	cov_id INT REFERENCES images(id),
    full_name VARCHAR(20),
	bio VARCHAR(255)
);

CREATE TABLE blogs (
    bid SERIAL PRIMARY KEY,
    title VARCHAR(20),
    blog_text VARCHAR(255),
    user_id INT REFERENCES users(id),
    date_created TIMESTAMP,
    blog_img INT REFERENCES images(id)
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
    date TIMESTAMP
);