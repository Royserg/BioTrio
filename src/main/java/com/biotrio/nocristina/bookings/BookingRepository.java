package com.biotrio.nocristina.bookings;
import com.biotrio.nocristina.Database;
import com.biotrio.nocristina.models.Booking;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class BookingRepository {

    private Database db = Database.getInstance();

    public List<Booking> getBookings() {
        return db.bookings;
    }

//    public Booking findBooking(int id) {
//        for (Booking booking : bookingList) {
//            if (booking.getId() == id) {
//                return booking;
//            }
//        }
//        return null;
//    }

//    public void editBooking (int id, Booking edit){
//        Booking previousBooking = findBooking(id);
//        bookingList.remove(previousBooking);
//        bookingList.add(edit);
//    }
//
//    public void deleteBooking (int id){
//        Booking bookingToDelete = findBooking(id);
//        bookingList.remove(bookingToDelete);
//
//    }

}
