package com.biotrio.nocristina.repositories;

import com.biotrio.nocristina.models.Ticket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
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



    public Ticket saveTicket(Ticket ticket){
        PreparedStatementCreator psc = connection -> {
            PreparedStatement ps = connection.prepareStatement("insert into tickets values (null, ?,?,?)");
            ps.setInt(1,ticket.getBookingId());
            ps.setInt(2,ticket.getRowNo()+1);
            ps.setInt(3,ticket.getColumnNo()+1);
            return ps;
        };
        jdbc.update(psc);
        return ticket;

    }

    public List<Ticket> findTicketsForScreening(int screeningId) {

        String sql = "SELECT * FROM tickets JOIN bookings ON tickets.booking_id = bookings.id " +
                     "WHERE bookings.screening_id =" + screeningId;
        List<Ticket> reservedSeats = jdbc.query(sql, new BeanPropertyRowMapper<>(Ticket.class));

        return reservedSeats;
    }

}
