package com.biotrio.nocristina.models;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Screening {

    private int id;
    private int movieId;
    private int theaterId;
    // atm String, later to implement LocalDateTime
    private String startTime;
    private BigDecimal price;
    private boolean is3D = false;
    private boolean isDolby = false;
    private Movie movie;


    public Screening(){}

    public Screening(int id, int movieId, int theaterId, String startTime, BigDecimal price) {
        this.id = id;
        this.movieId = movieId;
        this.theaterId = theaterId;
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

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String start_time) {
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

    public boolean isDolby() {
        return isDolby;
    }

    public void setDolby(boolean dolby) {
        isDolby = dolby;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}


