package com.biotrio.nocristina.models;

public class Theater {

    private int cinema_id;
    private String name;
    private int rows_number;
    private int columns_number;
    private boolean can3d;

    public Theater(){}

    public Theater(int cinema_id,String name, int rows_number, int columns_number, boolean can3d) {
        this.cinema_id=cinema_id;
        this.name = name;
        this.rows_number = rows_number;
        this.columns_number = columns_number;
        this.can3d=can3d;
    }

    public int getCinema_id() {
        return cinema_id;
    }

    public void setCinema_id(int cinema_id) {
        this.cinema_id = cinema_id;
    }

    public boolean isCan3d() {
        return can3d;
    }

    public void setCan3d(boolean can3d) {
        this.can3d = can3d;
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
}
