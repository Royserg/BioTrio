package com.biotrio.nocristina.models;

import java.util.List;

public class Booking {

    private int id;
    private String customerPhoneNumber;
    private List<Ticket> tickets;
    private Screening screening;

    public Booking(){}

    public Booking(int id, String customerPhoneNumber) {
        this.id = id;
        this.customerPhoneNumber = customerPhoneNumber;
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

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", customerPhoneNumber='" + customerPhoneNumber + '\'' +
                ", tickets=" + tickets +
                ", screening=" + screening +
                '}';
    }
}
