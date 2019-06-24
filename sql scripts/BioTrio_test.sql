USE BioTrio;


# testing cinema
SELECT * FROM cinemas;

SELECT c.id AS id, c.name AS name,
                    o.day_no AS schedule_day_no, o.opening_hour AS schedule_opening_hour, o.closing_hour AS schedule_closing_hour,
                    o.cinema_id AS schedule_cinema_id
                    FROM cinemas c
                    JOIN opening_hours o ON o.cinema_id = c.id WHERE id=1;

INSERT INTO cinemas (name) VALUES('second cinema');

UPDATE cinemas SET name = 'second cinema 2' WHERE id=2;

DELETE FROM cinemas WHERE id=2;


# testing theaters
SELECT * FROM theaters;

SELECT * FROM theaters WHERE id=2;

INSERT INTO theaters (cinema_id, name, rows_number, columns_number, can3D, dolby) VALUES  (1, 'new', 10, 12, 1, 0);

UPDATE theaters SET name='hello', columns_number=15 WHERE id=4;

DELETE FROM theaters WHERE id=4;


# testing movies
SELECT * FROM movies;

SELECT * FROM movies WHERE id = 3;

INSERT INTO movies (title, duration_in_minutes, is3D, dolby) VALUES ('new movie', 102, 1, 1);

UPDATE movies SET title='new movie hello' WHERE id=11;

DELETE FROM movies WHERE id=11;


# testing screenings
SELECT * FROM screenings;

SELECT * FROM screenings WHERE id=3;

SELECT screenings.* from screenings JOIN bookings b on screenings.id = b.screening_id where b.id=1;

SELECT * FROM screenings WHERE date BETWEEN '2019-06-12' AND '2019-07-06';

SELECT s.id AS id, s.time, s.date, s.price, s.movie_id,
                th.id as theater_id, th.name as theater_name, th.rows_number as theater_rows_number,
                th.columns_number as theater_columns_number,
                th.can3D as theater_can3d, th.dolby as theater_dolby
                FROM screenings s
                JOIN theaters th ON th.id = s.theater_id
                JOIN movies m ON m.id = s.movie_id
                WHERE m.id=3;

SELECT screenings.* from screenings JOIN bookings b on screenings.id = b.screening_id where b.id=1;

INSERT INTO screenings (movie_id, theater_id, time, date, price) VALUES(5, 1, '19:30:00', '2019-07-09', 120);

UPDATE screenings SET price=70 WHERE id=10;

DELETE FROM screenings WHERE id=10;


# testing bookings
SELECT * FROM bookings ORDER BY id DESC LIMIT 15;

SELECT * FROM bookings WHERE id=1;

SELECT * FROM bookings WHERE customer_phone_number LIKE '50177722';

SELECT b.id as id, b.customer_phone_number,
                t.id as tickets_id, t.row_no as tickets_row_no, t.column_no as tickets_column_no,
                s.id as screening_id, s.movie_id as screening_movie_id, s.theater_id as screening_theater_id,
                s.time as screening_time, s.date as screening_date, s.price as screening_price,
                th.id as screening_theater_id, th.name as screening_theater_name, th.rows_number as screening_theater_rows_number,
                th.columns_number as screening_theater_columns_number, th.can3D as screening_theater_can3d, th.dolby as screening_theater_dolby,
                m.id as movie_id, m.title as movie_title, m.duration_in_minutes as movie_duration_in_minutes
                FROM bookings b
                JOIN tickets t ON t.booking_id = b.id
                JOIN screenings s ON s.id = b.screening_id
                JOIN theaters th ON th.id = s.theater_id
                JOIN movies m ON m.id = s.movie_id
                WHERE b.customer_phone_number LIKE '50177722';

INSERT INTO bookings (customer_phone_number, screening_id) VALUES ('12345678', 3);

UPDATE bookings SET customer_phone_number='22334455' WHERE id=3;

DELETE FROM bookings WHERE id=3;


# testing tickets
SELECT * FROM tickets;

SELECT * FROM tickets WHERE booking_id=1;

SELECT tickets.* FROM tickets JOIN bookings ON tickets.booking_id = bookings.id
                     WHERE bookings.screening_id = 2;




