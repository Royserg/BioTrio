package com.biotrio.nocristina.repositories;
import com.biotrio.nocristina.models.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
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

    public int addBooking(Booking newBooking){

        KeyHolder keyHolder = new GeneratedKeyHolder();

        String sql = "INSERT INTO bookings VALUES(null, ?, ?);";
        jdbc.update((Connection connection)->{

                    PreparedStatement ps = connection.prepareStatement(sql, new String[] {"id"});

                    ps.setString(1, newBooking.getCustomerPhoneNumber());
                    ps.setInt(2, newBooking.getScreeningId());

                    return ps;
                }, keyHolder
        );

        return keyHolder.getKey().intValue();
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
