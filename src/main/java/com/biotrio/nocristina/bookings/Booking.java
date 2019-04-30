package com.biotrio.nocristina.bookings;
import com.biotrio.nocristina.screenings.Screening;

public class Booking {

    private int id;
    private int amountOfTickets;
    private String phoneNumber;
    private Screening screening;

    public Booking(int id, int amountOfTickets, String phoneNumber, Screening screening) {
        this.id = id;
        this.amountOfTickets = amountOfTickets;
        this.phoneNumber = phoneNumber;
        this.screening = screening;
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
}
