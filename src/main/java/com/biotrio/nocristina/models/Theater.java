package com.biotrio.nocristina.models;

public class Theater {

    private String name;
    private int rows_number;
    private int columns_number;

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
}
