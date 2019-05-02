package com.biotrio.nocristina.tickets;

import com.biotrio.nocristina.Database;
import com.biotrio.nocristina.models.Ticket;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TicketRepository {

    private Database db = Database.getInstance();

    /**
     * Get tickets for a specific booking
     * @param bookingId id of the booking for which to find tickets
     * @return List of tickets for a praticular id
     */
    public List<Ticket> getTickets(int bookingId){
        List<Ticket> tickets = new ArrayList<>();

        /* Will be replaced by sql query to the database */
        for (Ticket ticket : db.tickets) {
            if (ticket.getBookingId() == bookingId) {
                tickets.add(ticket);
            }
        }

        return tickets;
    }
}
