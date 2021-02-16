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

CREATE TABLE tag_key (
    id serial PRIMARY KEY,
    tag_name varchar(2000)
);

CREATE TABLE user_tags (
    id serial PRIMARY KEY,
    tag_key_reference integer REFERENCES tag_key(id),
    video_reference varchar(2000)
);