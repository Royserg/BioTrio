package com.biotrio.nocristina.models;

public class Theater {

    private String name;
    private int rows;
    private int columns;

    public Theater(){}

    public Theater(String name, int rows, int columns) {
        this.name = name;
        this.rows = rows;
        this.columns = columns;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }


    public int getColumns() {
        return columns;
    }

    public void setColumns(int columns) {
        this.columns = columns;
    }
}
