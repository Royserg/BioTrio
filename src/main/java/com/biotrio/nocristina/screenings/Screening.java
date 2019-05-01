package com.biotrio.nocristina.screenings;
import com.biotrio.nocristina.movies.Movie;
import com.biotrio.nocristina.theaters.Theater;

import java.time.LocalDateTime;

public class Screening {

    private Movie movie;
    private LocalDateTime dateTime;
    private int price;
    private Theater theater;

    public Screening(){}

    public Screening(Movie movie, LocalDateTime dateTime, int price, Theater theater) {
        this.movie = movie;
        this.dateTime = dateTime;
        this.price = price;
        this.theater = theater;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void getFormattedDate() {
        // TODO:
        //  make formatted date for displaying on frontend
        //  and change return type to String
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Theater getTheater() {
        return theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }
}


