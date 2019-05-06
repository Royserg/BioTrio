package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {

    @Autowired
    private JdbcTemplate jdbc;

    /**
     * Get tickets for a specific booking
     * @param bookingId id of the booking for which to find tickets
     * @return List of tickets for a particular booking id
     */
    public List<Ticket> findTicketsByBookingId(int bookingId){

        String sql = "SELECT * FROM tickets WHERE booking_id = " + bookingId;

        List<Ticket> tickets = jdbc.query(sql, new BeanPropertyRowMapper<>(Ticket.class));

        return tickets;
    }
}
