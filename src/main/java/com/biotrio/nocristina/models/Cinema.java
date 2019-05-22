package com.biotrio.nocristina.models;

import java.time.LocalTime;

public class Cinema {

    private String name;
    private int id;
    private LocalTime opening_hour;
    private LocalTime closing_hour;

    public Cinema(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public Cinema(String name) {
        this.name = name;
    }

    public Cinema() {}

    public LocalTime getOpeningHour() {
        return opening_hour;
    }

    public void setOpeningHour(LocalTime openingHour) {
        this.opening_hour = openingHour;
    }

    public LocalTime getClosingHour() {
        return closing_hour;
    }

    public void setClosingHour(LocalTime closingHour) {
        this.closing_hour = closingHour;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
