package com.biotrio.nocristina.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class Screening {

    private int id;
    private LocalTime time;
    private LocalDate date;
    private BigDecimal price;
    private boolean is3D = false;
    private boolean isDolby = false;
    private Theater theater;
    private Movie movie;

    public Screening(){}

    public Screening(int id, LocalTime time, LocalDate date, BigDecimal price, boolean is3D, boolean isDolby) {
        this.id = id;
        this.time = time;
        this.date = date;
        this.price = price;
        this.is3D = is3D;
        this.isDolby = isDolby;
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

    public Theater getTheater() {
        return theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    @Override
    public String toString() {
        return "Screening{" +
                "id=" + id +
                ", theater=" + theater +
                ", movie=" + movie +
                ", price=" + price +
                ", is3D=" + is3D +
                ", isDolby=" + isDolby +
                ", date=" + date +
                ", time=" + time +
                '}';
    }
}


