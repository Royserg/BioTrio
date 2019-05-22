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
    private MovieRepository movieRepo;

    @Autowired
    private ScreeningService screeningService;


    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingRepo.findAll();

        for (Booking booking : bookings) {
            // Fetch tickets for that booking
            booking.setTickets(ticketRepo.findTicketsByBookingId(booking.getId()));
            //fetch info from db for screening
            booking.setScreening(screeningService.findByBookingId(booking.getId()));
        }

        return bookings;
    }

    public List<Booking> getBookingByPhone(String phoneNumber) {
        List<Booking> bookings = bookingRepo.findByPhone(phoneNumber);

        for (Booking booking : bookings) {
            // Fetch tickets for that booking
            booking.setTickets(ticketRepo.findTicketsByBookingId(booking.getId()));
            //fetch info from db for screening
            booking.setScreening(screeningService.findByBookingId(booking.getId()));
        }

        return bookings;
    }

    /**
     * Function that retrieves queried booking by its id,
     * and attaches other objects connected with that booking
     * @param id (int) id of the booking to get
     * @return (Booking) with populated attributes
     */
    public Booking getBookingById(int id) {
        Booking booking = bookingRepo.findOne(id);

        // TODO: Get other objects related to the booking
        booking.setScreening(screeningService.findByBookingId(id));
        booking.setTickets(ticketRepo.findTicketsByBookingId(id));

        return booking;
    }

    public List<Movie> getAllMovies() {
        return movieRepo.findAll();
    }

    // testing: , get all of them
    public List<Screening> getAllScreenings() {
        return screeningRepo.findAll();
    }

    // Add booking into db and, get Id back to add tickets into db
    public int addBooking(Booking newBooking){

        int bookingId = bookingRepo.addBooking(newBooking);

        for (Ticket ticket : newBooking.getTickets()) {
            
            ticket.setBookingId(bookingId);
            ticketRepo.saveTicket(ticket);

        }

        // Return generated id of the new booking
        return bookingId;
    }

    public void deleteBooking(int bookingId) {
        // Delete booking and associated tickets
        // once booking is deleted, tickets that are connected
        // to that booking via foreign key are deleted (ON DELETE CASCADE)
        bookingRepo.deleteBooking(bookingId);
    }
}
