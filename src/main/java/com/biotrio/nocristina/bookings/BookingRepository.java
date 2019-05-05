package com.biotrio.nocristina.bookings;
import com.biotrio.nocristina.models.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class BookingRepository {

    @Autowired
    private JdbcTemplate jdbc;


    public List<Booking> findAll() {
        String sql = "SELECT * FROM bookings";
        List<Booking> bookings = jdbc.query(sql, new BeanPropertyRowMapper<>(Booking.class));

        return bookings;
    }


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
