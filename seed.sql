INSERT INTO user_info (first_name, last_name, email, password)
VALUES ('Kurtis', 'Garcia', 'kurtis@gmail.com', 'password');

INSERT INTO favorite_videos (video_reference, user_reference)
VALUES ('sample video reference', 1);

INSERT INTO tag_key (tag_name)
VALUES
('sports'),
('music'),
('kids'),
('learning'),
('diy'),
('movies'),
('fashion'),
('automobile'),
('gaming'),
('watersports'),
('hotweels'),
('comedy'),
('travel'),
('electronics'),
('news'),
('personal finance'),
('real estate'),
('technology'),
('science'),
('pranks'),
('medicine');

INSERT INTO user_tags (tag_key_reference, video_reference)
VALUES (1, 'qZHycHI3F1Q');