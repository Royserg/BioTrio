package com.biotrio.nocristina.models;

import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class Screening {

    private int id;

    @NotNull
    private LocalTime time;

    @DateTimeFormat(pattern = "dd/mm/yyyy")
    @NotNull @FutureOrPresent
    private LocalDate date;

    @NotNull @Min(1)
    private BigDecimal price;

    @NotNull
    private Theater theater;

    @NotNull
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


