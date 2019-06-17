package com.biotrio.nocristina.models;


import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class Theater {

    private int id;

    @NotEmpty
    private String name;

    @NotNull @Min(1)
    private int rowsNumber;

    @NotNull @Min(1)
    private int columnsNumber;

    private boolean can3d;
    private boolean dolby;

    public Theater(){}

    public Theater(int id, String name, int rowsNumber, int columnsNumber, boolean can3d, boolean dolby) {
        this.id = id;
        this.name = name;
        this.rowsNumber = rowsNumber;
        this.columnsNumber = columnsNumber;
        this.can3d = can3d;
        this.dolby = dolby;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isDolby() {
        return dolby;
    }

    public void setDolby(boolean dolby) {
        this.dolby = dolby;
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