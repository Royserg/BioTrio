package com.biotrio.nocristina.models;

public class Cinema {

    private String name;
    private int id;

    public Cinema(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public Cinema(String name) {
        this.name = name;
    }

    public Cinema() {}

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
