package com.biotrio.nocristina.bookings;
import com.biotrio.nocristina.screenings.Screening;
import com.biotrio.nocristina.tickets.Ticket;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Booking {

    private int id;
    private int amountOfTickets;
    private String phoneNumber;
    private Screening screening;
    private ArrayList<Ticket> tickets = new ArrayList<>();

    public Booking(){}

    public Booking(int id, int amountOfTickets, String phoneNumber, Screening screening, ArrayList<Ticket> tickets) {
        this.id = id;
        this.amountOfTickets = amountOfTickets;
        this.phoneNumber = phoneNumber;
        this.screening = screening;
        this.tickets = tickets;
    }

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAmountOfTickets() {
        return amountOfTickets;
    }

    public void setAmountOfTickets(int amountOfTickets) {
        this.amountOfTickets = amountOfTickets;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public ArrayList<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(ArrayList<Ticket> tickets) {
        this.tickets = tickets;
    }


}
