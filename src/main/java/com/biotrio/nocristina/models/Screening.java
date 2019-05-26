package com.biotrio.nocristina.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class Screening {

    private int id;
    private BigDecimal price;
    private boolean is3D = false;
    private boolean isDolby = false;
    private Movie movie;
    private Theater theater;
    private LocalDate date;
    private LocalTime time;

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


