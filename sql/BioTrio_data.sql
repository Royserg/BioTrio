USE BioTrio;

INSERT INTO cinemas(name)
values ('BioTrio');

INSERT INTO theaters(cinema_id, name, rows_number, columns_number, can3D, dolby)
  VALUES (1, 'blue', 14, 20, 0, 0),
         (1, 'red', 8, 12, 0, 0),
         (1, 'orange', 8, 6, 0, 0);

INSERT INTO movies(title, duration_in_minutes, is3D, dolby)
  VALUES ('Avengers: Endgame', 240, 0, 0),
         ('Captain Marvel', 165, 0, 0),
         ('Rocketman', 121, 0, 0),
         ('Aladdin', 128, 0, 0),
         ('Pokemon Detective Pikachu', 104, 0, 0),
         ('Booksmart', 102, 0, 0),
         ('The Hustle', 93, 0, 0),
         ('Late Night', 102, 0, 0),
         ('Toy Story 4', 100, 0, 0),
         ('X-Men: Dark Phoenix', 113, 0, 0);

INSERT INTO screenings(movie_id, theater_id, date,time, price)
  VALUES (1, 1, '2019-06-07', '19:00:00', 100),
         (1, 2, '2019-06-07', '17:00:00', 100),
         (1, 3, '2019-07-06', '11:00:00', 80),
         (2, 1, '2019-07-06', '19:30:00', 120),
         (2, 2, '2019-06-07', '17:30:00', 120),
         (2, 3, '2019-06-12', '19:00:00', 100),
         (3, 1, '2019-06-26', '18:00:00', 100),
         (3, 2, '2019-06-27', '17:45:00', 100),
         (3, 3, '2019-06-29', '11:15:00', 80);


INSERT INTO bookings(customer_phone_number, screening_id)
  VALUES ('50177722', 1),
         ('90385266', 2);

INSERT INTO tickets(booking_id, row_no, column_no)
  VALUES (1, 5, 6),
         (1, 5, 7),
         (1, 5, 8),
         (2, 8, 1),
         (2, 8, 2);


INSERT INTO opening_hours (day_no, opening_hour, closing_hour, cinema_id)
  VALUES (1, '17:30:00', '23:00:00', 1),
         (2, '17:30:00', '23:00:00', 1),
         (3, '17:30:00', '23:00:00', 1),
         (4, '17:30:00', '23:00:00', 1),
         (5, '17:30:00', '23:00:00', 1),
         (6, '11:00:00', '23:00:00', 1),
         (7, '11:00:00', '23:00:00', 1);