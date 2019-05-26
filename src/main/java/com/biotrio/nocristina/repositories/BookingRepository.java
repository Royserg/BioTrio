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
public class BookingRepository implements IRepository<Booking>{

    @Autowired
    private JdbcTemplate jdbc;

    /**
     * Get a booking object of particular id
     * @param id (int) id of the booking to retrieve
     * @return (Booking)
     */
    public Booking findOne(int id) {

        String sql = "SELECT * FROM bookings WHERE id = ?";
        Booking booking = jdbc.queryForObject(sql, new Object[] {id}, new BeanPropertyRowMapper<>(Booking.class));

        return booking;
    }


    public List<Booking> findAll() {

        String sql = "SELECT * FROM bookings ORDER BY id DESC LIMIT 15;";
        List<Booking> bookings = jdbc.query(sql, new BeanPropertyRowMapper<>(Booking.class));

        return bookings;
    }

    public List<Booking> findByPhone(String phoneNumber) {
        System.out.println(phoneNumber);
        String sql = "SELECT * FROM bookings WHERE customer_phone_number LIKE '" + phoneNumber + "%'";
        List<Booking> bookings = jdbc.query(sql, new BeanPropertyRowMapper<>(Booking.class));

        return bookings;

    }

    public int addBooking(Booking newBooking){
        KeyHolder keyHolder = new GeneratedKeyHolder();

        String sql = "INSERT INTO bookings VALUES(null, ?, ?);";
        jdbc.update((Connection connection)->{

                    PreparedStatement ps = connection.prepareStatement(sql, new String[] {"id"});

                    ps.setString(1, newBooking.getCustomerPhoneNumber());
                    ps.setInt(2, newBooking.getScreening().getId());

                    return ps;
                }, keyHolder
        );

        return keyHolder.getKey().intValue();
    }

    public void deleteOne(int bookingId) {
        String sql = "DELETE FROM bookings WHERE id = ?";
        jdbc.update(sql, bookingId);

    }

    /**
     * Update phone number of booking with provided id
     * @param id (int) id of the booking to modify
     * @param itemToUpdate (Booking) object containing updated information
     */
    @Override
    public void updateOne(int id, Booking itemToUpdate) {
        String sql = "UPDATE bookings SET customer_phone_number = ? WHERE id = ?";
        jdbc.update(sql, itemToUpdate.getCustomerPhoneNumber(), id);
    }

}
