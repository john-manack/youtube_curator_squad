INSERT INTO user_info (first_name, last_name, email, password)
VALUES ('Kurtis', 'Garcia', 'kurtis@gmail.com', 'password');

INSERT INTO favorite_videos (video_reference, user_reference)
VALUES ('sample video reference', 1);

INSERT INTO tags (tag_body, video_reference, user_reference)
VALUES ('awesome', 'sample video reference', 1);