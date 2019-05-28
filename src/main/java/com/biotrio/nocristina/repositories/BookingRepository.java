package com.biotrio.nocristina.repositories;
import com.biotrio.nocristina.models.Booking;
import com.biotrio.nocristina.models.Ticket;
import org.simpleflatmapper.jdbc.spring.JdbcTemplateMapperFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.List;

@Repository
public class BookingRepository implements IRepository<Booking> {

    @Autowired
    private JdbcTemplate jdbc;

    // Maps one-to-many JOIN query into Bookings and List<Tickets> in each Booking
    private final ResultSetExtractor<List<Booking>> resultSetExtractor =
            JdbcTemplateMapperFactory
                .newInstance()
                .addKeys("id")
                .newResultSetExtractor(Booking.class);

    /**
     * Get a booking object of particular id
     * @param id (int) id of the booking to retrieve
     * @return (Booking)
     */
    public Booking findOne(int id) {

        String sql = "SELECT b.id as id, b.customer_phone_number, b.screening_id, " +
                "t.id as tickets_id, t.row_no as tickets_row_no, t.column_no as tickets_column_no, " +
                "s.id as screening_id, s.movie_id as screening_movie_id, s.theater_id as screening_theater_id, " +
                " s.time as screening_time, s.date as screening_date, s.price as screening_price," +
                "th.id as screening_theater_id, th.name as screening_theater_name, th.rows_number as screening_theater_rows_number," +
                "th.columns_number as screening_theater_columns_number, th.can3D as screening_theater_can3d, th.dolby as screening_theater_dolby," +
                "m.id as screening_movie_id, m.title as screening_movie_title, m.duration_in_minutes as screening_movie_duration_in_minutes," +
                "m.is3D as screening_movie_is3D, m.dolby as screening_movie_dolby" +
                " FROM bookings b" +
                " JOIN tickets t ON t.booking_id = b.id" +
                " JOIN screenings s ON s.id = b.screening_id" +
                " JOIN theaters th ON th.id = s.theater_id" +
                " JOIN movies m ON m.id = s.movie_id" +
                " WHERE b.id = ?";

        List<Booking> bookings = jdbc.query(sql, new Object[] {id}, resultSetExtractor);

        return bookings.get(0);
    }


    public List<Booking> findAll() {

        String sql = "SELECT b.id as id, b.customer_phone_number, b.screening_id, " +
                "t.id as tickets_id, t.row_no as tickets_row_no, t.column_no as tickets_column_no, " +
                "s.id as screening_id, s.movie_id as screening_movie_id, s.theater_id as screening_theater_id, " +
                    " s.time as screening_time, s.date as screening_date, s.price as screening_price," +
                "th.id as screening_theater_id, th.name as screening_theater_name, th.rows_number as screening_theater_rows_number," +
                "th.columns_number as screening_theater_columns_number, th.can3D as screening_theater_can3d, th.dolby as screening_theater_dolby," +
                "m.id as screening_movie_id, m.title as screening_movie_title, m.duration_in_minutes as screening_movie_duration_in_minutes," +
                "m.is3D as screening_movie_is3D, m.dolby as screening_movie_dolby" +
                " FROM bookings b" +
                " JOIN tickets t ON t.booking_id = b.id" +
                " JOIN screenings s ON s.id = b.screening_id" +
                " JOIN theaters th ON th.id = s.theater_id" +
                " JOIN movies m ON m.id = s.movie_id" +
                " ORDER BY b.id " +
                " DESC LIMIT 15;";

        List<Booking> bookings = jdbc.query(sql, resultSetExtractor);

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


    /**
     * Get list of bookings for a provided screening id
     * Bookings will contain also list of Tickets thanks to resultSetExtractor
     * @param screeningId
     * @return (Booking[]) list of bookings, and each booking will have list of Tickets (Ticket[])
     */
    public List<Booking> findByScreeningId(int screeningId) {

        String sql = "SELECT b.id as id, b.customer_phone_number, b.screening_id, " +
                        "t.id as tickets_id, t.row_no as tickets_row_no, t.column_no as tickets_column_no " +
                        "FROM bookings b" +
                        "  JOIN tickets t ON t.booking_id = b.id" +
                        "  WHERE b.screening_id = ?" +
                        "  ORDER BY b.id;";

        return jdbc.query(sql, new Object[] {screeningId}, resultSetExtractor);
    }

}
