CREATE TABLE user_info (
    id serial PRIMARY KEY,
    first_name varchar(200),
    last_name varchar(200),
    email varchar(200),
    password varchar(2000)
);

CREATE TABLE favorite_videos (
    id serial PRIMARY KEY,
    video_reference varchar(2000),
    user_reference integer REFERENCES user_info (id)
);

CREATE TABLE tags (
    id serial PRIMARY KEY,
    tag_body text,
    video_reference varchar(2000),
    user_reference integer REFERENCES user_info (id)
);

