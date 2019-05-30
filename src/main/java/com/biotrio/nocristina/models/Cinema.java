package com.biotrio.nocristina.models;

import java.util.List;

public class Cinema {

    private String name;
    private int id;
    private List<Day> schedule;

    public Cinema(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public Cinema(String name) {
        this.name = name;
    }

    public Cinema() {}

    public List<Day> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<Day> schedule) {
        this.schedule = schedule;
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
