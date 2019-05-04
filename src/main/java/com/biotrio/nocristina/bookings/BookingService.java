package com.biotrio.nocristina.bookings;

import com.biotrio.nocristina.models.Booking;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.movies.MovieRepository;
import com.biotrio.nocristina.screenings.ScreeningRepository;
import com.biotrio.nocristina.tickets.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

}
