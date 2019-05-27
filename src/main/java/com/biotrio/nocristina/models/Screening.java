package com.biotrio.nocristina.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class Screening {

    private int id;
    // We might not need it if we add a screening through the movies page
    private int movieId;
    private int theaterId;
    private BigDecimal price;
    private boolean is3D = false;
    private boolean isDolby = false;
    private LocalDate date;
    private LocalTime time;
    private List<Booking> bookings;

    public Screening(){}

    public Screening(int id, BigDecimal price) {
        this.id = id;
        this.price = price;
    }

    public Screening(int id, LocalTime time, LocalDate date, BigDecimal price) {
        this.id = id;
        this.time = time;
        this.date = date;
        this.price = price;

    }

    public Screening(int id, int movieId, int theaterId, BigDecimal price, boolean is3D, boolean isDolby, LocalDate date, LocalTime time) {
        this.id = id;
        this.movieId = movieId;
        this.theaterId = theaterId;
        this.price = price;
        this.is3D = is3D;
        this.isDolby = isDolby;
        this.date = date;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public boolean isIs3D() {
        return is3D;
    }

    public void setIs3D(boolean is3D) {
        this.is3D = is3D;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public boolean isDolby() {
        return isDolby;
    }

    public void setDolby(boolean dolby) {
        isDolby = dolby;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getTheaterId() {
        return theaterId;
    }

    public void setTheaterId(int theaterId) {
        this.theaterId = theaterId;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return "Screening{" +
                "id=" + id +
                ", movieId=" + movieId +
                ", theaterId=" + theaterId +
                ", price=" + price +
                ", is3D=" + is3D +
                ", isDolby=" + isDolby +
                ", date=" + date +
                ", time=" + time +
                ", bookings=" + bookings +
                '}';
    }
}


