package com.biotrio.nocristina.models;

import java.util.Map;

public class JSONTicket {

    private int row;
    private int column;


    public JSONTicket() {
    }

    public JSONTicket(int row, int column) {
        this.row = row;
        this.column = column;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }
}
