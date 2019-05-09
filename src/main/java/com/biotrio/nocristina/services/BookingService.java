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
    private ScreeningService screeningService;

    @Autowired
    private MovieRepository movieRepo;


    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingRepo.findAll();
        List<Screening> screenings = screeningService.getAllScreenings();

        for (Booking booking : bookings) {
            // Fetch tickets for that booking
            booking.setTickets(ticketRepo.findTicketsByBookingId(booking.getId()));
            //fetch info from db for screening
           booking.setScreening(screeningService.findByBookingId(booking.getId()));

            //set screening to booking
            for (Screening screening : screenings) {
                if(screening.getId()==booking.getScreening().getId()) {
                    booking.setScreening(screening);
                }
            }
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
