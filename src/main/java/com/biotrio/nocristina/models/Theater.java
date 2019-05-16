package com.biotrio.nocristina.models;

public class Theater {

    private int id;
    private int cinemaId;
    private String name;
    private int rowsNumber;
    private int columnsNumber;
    private boolean can3d;


    public Theater(){}

    public Theater(int cinemaId,String name, int rowsNumber, int columnsNumber, boolean can3d) {
        this.cinemaId=cinemaId;
        this.name = name;
        this.rowsNumber = rowsNumber;
        this.columnsNumber = columnsNumber;
        this.can3d=can3d;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(int cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRowsNumber() {
        return rowsNumber;
    }

    public void setRowsNumber(int rowsNumber) {
        this.rowsNumber = rowsNumber;
    }

    public int getColumnsNumber() {
        return columnsNumber;
    }

    public void setColumnsNumber(int columnsNumber) {
        this.columnsNumber = columnsNumber;
    }

    public boolean isCan3d() {
        return can3d;
    }

    public void setCan3d(boolean can3d) {
        this.can3d = can3d;
    }

    @Override
    public String toString() {
        return "Theater{" +
                "cinemaId=" + cinemaId +
                ", name='" + name + '\'' +
                ", rowsNumber=" + rowsNumber +
                ", columnsNumber=" + columnsNumber +
                ", can3d=" + can3d +
                '}';
    }
}