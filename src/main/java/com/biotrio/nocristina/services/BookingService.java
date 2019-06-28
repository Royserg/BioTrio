package com.biotrio.nocristina.services;

import com.biotrio.nocristina.models.Booking;
import com.biotrio.nocristina.models.Ticket;
import com.biotrio.nocristina.repositories.BookingRepository;
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


    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingRepo.findAll();

        return bookings;
    }

    public List<Booking> getAllBookingsForStat() {
        List<Booking> allBookings = bookingRepo.findAll();
        return allBookings;
    }

    /**
     * Method returning list of bookings that match passed phone number beginning
     * with any random end of the phone number
     * @param phoneNumber (String) input phone number
     * @return (Booking[]) list of bookings matching beginning of the phone number
     */
    public List<Booking> getBookingByPhone(String phoneNumber) {
        List<Booking> bookings = bookingRepo.findByPhone(phoneNumber);

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

        return booking;
    }

    // Add booking into db and, get Id back to add tickets into db
    public int addBooking(Booking newBooking){

        int bookingId = bookingRepo.addBooking(newBooking);

        for (Ticket ticket : newBooking.getTickets()) {
            ticketRepo.saveTicket(bookingId, ticket);
        }

        // Return generated id of the new booking
        return bookingId;
    }

    public void deleteBooking(int bookingId) {
        // Delete booking and associated tickets
        // once booking is deleted, tickets that are connected
        // to that booking via foreign key are deleted (ON DELETE CASCADE)
        bookingRepo.deleteOne(bookingId);
    }

    /**
     * Method updating phone number of particular booking and seats.
     * Other information related to booking cannot be changed.
     * In real life, if screening time or movie would need to be changed,
     * easier option is to delete booking and create a new one
     * @param id (int) id of the booking to modify
     * @param booking (Booking) object containing updated information
     */
    public void editBooking(int id, Booking booking) {
        // Check if tickets have id already
        // Delete all tickets for this booking and save new ones
        ticketRepo.deleteAll(id);

        for (Ticket ticket : booking.getTickets()) {
            ticketRepo.saveTicket(booking.getId(), ticket);
        }

        // Update phone number of the booking
        bookingRepo.updateOne(id, booking);

    }
}
