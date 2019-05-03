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


    public List<Booking> getBookings() {

        List<Booking> bookings = bookingRepo.getBookings();

        for (Booking booking : bookings) {
            // get tickets for that booking
            booking.setTickets(ticketRepo.getTickets(booking.getId()));
            // get info about screening
            Screening screening = screeningRepo.getScreening(booking.getScreeningId());
            // get movie for screening
            screening.setMovie(movieRepo.getMovie(screening.getMovieId()));

            booking.setScreening(screening);
        }

        return bookings;
    }

}
