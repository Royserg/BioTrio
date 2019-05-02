package com.biotrio.nocristina;

import com.biotrio.nocristina.models.Booking;
import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.models.Theater;
import com.biotrio.nocristina.models.Ticket;

import java.util.ArrayList;
import java.util.List;

// Singleton Database
public class Database {
    // reference to itself
    private static Database _me = null;

    public List<Booking> bookings = new ArrayList<>();
    public List<Movie> movies = new ArrayList<>();
    public List<Screening> screenings = new ArrayList<>();
    public List<Theater> theaters = new ArrayList<>();
    public List<Ticket> tickets = new ArrayList<>();

    // when database created, fill it with dummy data
    private Database() {
        // fill movies
        movies.add(new Movie(1, "Avengers: Endgame", 240));
        movies.add(new Movie(2, "Captain Marvel", 170));
        // fill theaters
        theaters.add(new Theater("blue", 14, 20));
        theaters.add(new Theater("red", 8, 12));
        theaters.add(new Theater("orange", 8, 6));
        // fill screenings
        screenings.add(new Screening(1, 1, 1, "17:00", 100));
        screenings.add(new Screening(2, 1, 2, "19:30", 100));
        screenings.add(new Screening(3, 2, 3, "18:00", 100));
        // fill tickets
        tickets.add(new Ticket(1, 1, 1, 5, 6));
        tickets.add(new Ticket(2, 1, 1, 5, 7));
        tickets.add(new Ticket(3, 1, 1, 5, 8));
        tickets.add(new Ticket(4, 2, 2, 8, 1));
        tickets.add(new Ticket(5, 2, 2, 8, 2));
        // fill bookings
        bookings.add(new Booking(1, "50177722"));
        bookings.add(new Booking(2, "90385266"));

    }

    public static Database getInstance() {
        // if Database not created, make one and return pointer to it
        if (_me == null) {
            _me = new Database();
        }
        return _me;
    }



}
