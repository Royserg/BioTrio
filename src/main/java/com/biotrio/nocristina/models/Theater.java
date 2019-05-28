package com.biotrio.nocristina.models;


public class Theater {

    private int id;
    private String name;
    private int rowsNumber;
    private int columnsNumber;
    private boolean can3d;
    private boolean dolby;

    public Theater(){}

    public Theater(String name, int rowsNumber, int columnsNumber, boolean can3d, boolean dolby) {
        this.name = name;
        this.rowsNumber = rowsNumber;
        this.columnsNumber = columnsNumber;
        this.can3d=can3d;
        this.dolby=dolby;
    }

    public int getId() {
        return id;
    }

    public boolean isDolby() {
        return dolby;
    }

    public void setDolby(boolean dolby) {
        this.dolby = dolby;
    }

    public void setId(int id) {
        this.id = id;
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
                "id=" + id +
                ", name='" + name + '\'' +
                ", rowsNumber=" + rowsNumber +
                ", columnsNumber=" + columnsNumber +
                ", can3d=" + can3d +
                ", dolby=" + dolby +
                '}';
    }
}