package com.biotrio.nocristina.models;

import java.util.List;

public class Booking {

    private int id;
    private int screeningId;
    private String customerPhoneNumber;
    private List<Ticket> tickets;
    private Screening screening;
    private String ticketString;

    public Booking(){}

    public Booking(int id, int screeningId, String customerPhoneNumber) {
        this.id = id;
        this.screeningId = screeningId;
        this.customerPhoneNumber = customerPhoneNumber;
    }public Booking(int screeningId, String customerPhoneNumber, String tickets) {
        this.id = id;
        this.screeningId = screeningId;
        this.customerPhoneNumber = customerPhoneNumber;
        this.ticketString = tickets;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomerPhoneNumber() {
        return customerPhoneNumber;
    }

    public void setCustomerPhoneNumber(String customerPhoneNumber) {
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public int getScreeningId() {
        return screeningId;
    }

    public void setScreeningId(int screeningId) {
        this.screeningId = screeningId;
    }

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "screeningId=" + screeningId +
                ", customerPhoneNumber='" + customerPhoneNumber + '\'' +
                ", ticketString='" + ticketString + '\'' +
                '}';
    }
}
