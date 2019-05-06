package com.biotrio.nocristina.models;

public class Theater {

    private int cinemaId;
    private String name;
    private int rows_number;
    private int columns_number;
    private boolean can3D;


    public Theater(){}

    public Theater(String name, int rows_number, int columns_number) {
        this.name = name;
        this.rows_number = rows_number;
        this.columns_number = columns_number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRows_number() {
        return rows_number;
    }

    public void setRows_number(int rows_number) {
        this.rows_number = rows_number;
    }


    public int getColumns_number() {
        return columns_number;
    }

    public void setColumns_number(int columns_number) {
        this.columns_number = columns_number;
    }

    public int getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(int cinemaId) {
        this.cinemaId = cinemaId;
    }

    public boolean isCan3D() {
        return can3D;
    }

    public void setCan3D(boolean can3D) {
        this.can3D = can3D;
    }

    @Override
    public String toString() {
        return "Theater{" +
                "cinemaId=" + cinemaId +
                ", name='" + name + '\'' +
                ", rows_number=" + rows_number +
                ", columns_number=" + columns_number +
                ", can3D=" + can3D +
                '}';
    }
}
