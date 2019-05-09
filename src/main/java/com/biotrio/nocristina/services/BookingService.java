package com.biotrio.nocristina.services;

import com.biotrio.nocristina.models.Booking;
import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.models.Ticket;
import com.biotrio.nocristina.repositories.MovieRepository;
import com.biotrio.nocristina.repositories.BookingRepository;
import com.biotrio.nocristina.repositories.ScreeningRepository;
import com.biotrio.nocristina.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private TicketRepository ticketRepo;

    @Autowired
    private ScreeningRepository screeningRepo;

    

    @Autowired
    private MovieRepository movieRepo;


    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingRepo.findAll();

        for (Booking booking : bookings) {
            // Fetch tickets for that booking
            booking.setTickets(ticketRepo.findTicketsByBookingId(booking.getId()));
            // get screening and keep reference for adding movie info inside
            Screening screening = screeningRepo.findById(booking.getScreeningId());
            // set movie for screening object
            screening.setMovie(movieRepo.findById(screening.getMovieId()));
            // attach screening to booking
            booking.setScreening(screening);
        }

        return bookings;
    }

    public List<Movie> getAllMovies() {
        return movieRepo.FindAll();
    }

    // testing: , get all of them
    public List<Screening> getAllScreenings() {
        return screeningRepo.findAll();
    }

    // TODO: getScreeningByMovieID -> screening for selected movie from the list

    // get screenings for particular movie
    public List<Screening> getByMovieId(int movieId) {

        List<Screening> screeningList = screeningRepo.findByMovieId(movieId);

        // separate LocalDateTime into LocalDate and LocalTime
        for (Screening screening : screeningList) {
            screening.setDate(screening.getStartTime().toLocalDate());
            screening.setTime(screening.getStartTime().toLocalTime());
        }

        return screeningList;
    }

    //add booking in database and then get booking ID to add tickets in database
    public void addBooking(Booking newBooking){

        int bookingID = bookingRepo.addBooking(newBooking);

        for (Ticket ticket : newBooking.getTickets()) {
            
            ticket.setBookingId(bookingID);
            ticketRepo.saveTicket(ticket);

        }

    }

}
