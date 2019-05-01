package com.biotrio.nocristina.bookings;
import com.biotrio.nocristina.screenings.ScreeningRepository;
import com.biotrio.nocristina.tickets.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;

@Repository
public class BookingRepository {


    @Autowired
    ScreeningRepository screeningRepo;
    @Autowired
    TicketRepository ticketRepo;

    Booking someBooking = new Booking(1, 3, "22323232", screeningRepo.getNewScreening(), ticketRepo.getTicketList());
    Booking someBookingOther = new Booking(2, 2, "45796666", screeningRepo.getNewScreening(), ticketRepo.getTicketList());
    ArrayList<Booking> bookingList = new ArrayList<>();

    public ArrayList<Booking> getBookingList() {
        if (bookingList.size() < 1) {
            bookingList.add(someBooking);
            bookingList.add(someBookingOther);
        }

        return bookingList;
    }

    public Booking findBooking(int id) {
        for (Booking booking : bookingList) {
            if (booking.getId() == id) {
                return booking;
            }
        }
        return null;
    }

    public void editBooking (int id, Booking edit){
        Booking previousBooking = findBooking(id);
        bookingList.remove(previousBooking);
        bookingList.add(edit);
    }

    public void deleteBooking (int id){
        Booking bookingToDelete = findBooking(id);
        bookingList.remove(bookingToDelete);

    }

}
