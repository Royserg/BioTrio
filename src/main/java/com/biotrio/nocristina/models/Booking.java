package com.biotrio.nocristina.models;

import java.util.List;

public class Booking {

    private int id;
    private int screeningId;
    private String phoneNumber;
    private List<Ticket> tickets;
    private Screening screening;

    public Booking(){}

    public Booking(int id, int screeningId, String phoneNumber) {
        this.id = id;
        this.screeningId = screeningId;
        this.phoneNumber = phoneNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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
}
