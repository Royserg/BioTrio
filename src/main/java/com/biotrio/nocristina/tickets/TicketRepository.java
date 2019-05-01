package com.biotrio.nocristina.tickets;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class TicketRepository {

    private Ticket ticket1 = new Ticket(1, 5, 5);
    private Ticket ticket2 = new Ticket(2, 5, 6);
    private ArrayList<Ticket> ticketList = new ArrayList<>();

    public ArrayList<Ticket> getTicketList(){
        ticketList.add(ticket1);
        ticketList.add(ticket2);
        return ticketList;
    }
}
