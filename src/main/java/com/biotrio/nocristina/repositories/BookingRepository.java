package com.biotrio.nocristina.repositories;
import com.biotrio.nocristina.models.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
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

    public void addBooking(Booking newBooking){
        String sql = "INSERT INTO bookings(customer_phone_number, screening_id) VALUES(?,?);";
        jdbc.update((Connection connection)->{

                    PreparedStatement ps = connection.prepareStatement(sql);

                    ps.setString(1, newBooking.getCustomerPhoneNumber());
                    ps.setInt(2, newBooking.getScreeningId());

                    return ps;
                }
        );
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
