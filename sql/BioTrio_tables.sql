DROP database BioTrio;

CREATE database BioTrio;
USE BioTrio;

CREATE TABLE cinemas(
  id int not null auto_increment primary key,
  name varchar(100)
);

CREATE TABLE theaters (
  id int not null auto_increment primary key,
  cinema_id int,
  name varchar(50),
  rows_number int,
  columns_number int,
  can3D bit,
  dolby bit,
  FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
);

CREATE TABLE movies (
  id int not null auto_increment primary key,
  title varchar(500),
  duration_in_minutes int,
  is3D bit,
  dolby bit
);

CREATE TABLE screenings(
  id int not null auto_increment primary key,
  movie_id int,
  theater_id int,
  time time,
  date date,
  price decimal(6,2),
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (theater_id) REFERENCES theaters(id)
);

CREATE TABLE bookings(
  id int not null auto_increment primary key,
  customer_phone_number varchar(100),
  screening_id int,
  FOREIGN KEY (screening_id) REFERENCES screenings(id) ON DELETE CASCADE
);

CREATE TABLE tickets(
  id int not null auto_increment primary key,
  booking_id int,
  row_no int,
  column_no int,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) On DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS opening_hours(
  day_no int not null primary key,
  opening_hour time not null,
  closing_hour time,
  cinema_id int,
  FOREIGN KEY (cinema_id) REFERENCES cinemas (id) ON DELETE CASCADE
);