package com.biotrio.nocristina.models;

import java.util.List;

public class Booking {

    private int id;
    private String customerPhoneNumber;
    private List<Ticket> tickets;
//    private int screeningId;
    // Screening contains Theater and a Movie
    private Screening screening;

//    private Theater theater;
//    private Movie movie;

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

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

//    public Screening getScreening() {
//        return screening;
//    }
//
//    public void setScreening(Screening screening) {
//        this.screening = screening;
//    }


//    public int getScreeningId() {
//        return screeningId;
//    }
//
//    public void setScreeningId(int screeningId) {
//        this.screeningId = screeningId;
//    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", customerPhoneNumber='" + customerPhoneNumber + '\'' +
                ", tickets=" + tickets +
                '}';
    }
}
