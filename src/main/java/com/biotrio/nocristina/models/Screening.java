package com.biotrio.nocristina.models;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Screening {

    private int id;
   // private int movieId;
   // private int theaterId;
    // atm String, later to implement LocalDateTime
    private LocalDateTime startTime;
    private BigDecimal price;
    private boolean is3D = false;
    private boolean isDolby = false;
    private Movie movie = null;
    private Theater theater = null;
    private LocalDate date;
    private LocalTime time;


    public Screening(){}

    public Screening(int id, LocalDateTime startTime, BigDecimal price) {
        this.id = id;
        //this.movieId = movieId;
        //this.theaterId = theaterId;
        this.startTime = startTime;
        this.price = price;
    }public Screening(int id, LocalDate date, LocalTime time, BigDecimal price) {
        this.id = id;
        //this.movieId = movieId;
        //this.theaterId = theaterId;
        this.date = date;
        this.time = time;
        this.startTime = startTime;
        this.price = price;
    }

    public void getFormattedDate() {
        // TODO:
        //  make formatted date for displaying on frontend
        //  and change return type to String
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime start_time) {
        this.startTime = start_time;
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

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
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

    public Theater getTheater() {
        return theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }

    public boolean isDolby() {
        return isDolby;
    }

    public void setDolby(boolean dolby) {
        isDolby = dolby;
    }

    @Override
    public String toString() {
        return "Screening{" +
                "id=" + id +
                ", startTime=" + startTime +
                ", price=" + price +
                ", is3D=" + is3D +
                ", isDolby=" + isDolby +
                ", movie=" + movie +
                ", theater=" + theater +
                ", date=" + date +
                ", time=" + time +
                '}';
    }
}


