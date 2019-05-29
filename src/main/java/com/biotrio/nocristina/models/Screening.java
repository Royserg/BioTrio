package com.biotrio.nocristina.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class Screening {

    private int id;
    private LocalTime time;
    private LocalDate date;
    private BigDecimal price;
    private Theater theater;
    private int movieId;

    public Screening(){}

    public Screening(int id, LocalTime time, LocalDate date, BigDecimal price,int movieId) {
        this.id = id;
        this.time = time;
        this.date = date;
        this.price = price;
        this.movieId = movieId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
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

    @Override
    public String toString() {
        return "Screening{" +
                "id=" + id +
                ", theater=" + theater +
                ", price=" + price +
                ", date=" + date +
                ", time=" + time +
                '}';
    }
}


