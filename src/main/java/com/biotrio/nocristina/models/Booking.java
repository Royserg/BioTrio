package com.biotrio.nocristina.models;


import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class Booking{

    private int id;

    @NotEmpty @Min(8)
    private String customerPhoneNumber;

    @Size(min=1, max=4)
    private List<Ticket> tickets;
    // Screening Contains Theater object
    @NotNull
    private Screening screening;
    @NotNull
    private Movie movie;

    public Booking(){}

    public Booking(int id, String customerPhoneNumber) {
        this.id = id;
        this.customerPhoneNumber = customerPhoneNumber;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
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

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", customerPhoneNumber='" + customerPhoneNumber + '\'' +
                ", tickets=" + tickets +
                '}';
    }

}
