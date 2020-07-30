CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(80),
    dateofbirth date
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id),
    img_type  IMG_TYPE,
    img_url VARCHAR
);

CREATE TABLE blogs (
  bid SERIAL PRIMARY KEY,
  title VARCHAR(255),
  body VARCHAR,
  user_id INT REFERENCES users(id),
  author VARCHAR REFERENCES users(username),
  date_created TIMESTAMP,
  likes INT DEFAULT 0
);

CREATE TABLE profile (
	id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id),
	full_name VARCHAR,
	pro_id INT REFERENCES images(id),
	cov_id INT REFERENCES images(id),
	bio VARCHAR(255)
);
