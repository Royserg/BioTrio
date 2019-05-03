package com.biotrio.nocristina.models;

public class Ticket {

    private int id;
    private int bookingId;
    private int row;
    private int column;

    public Ticket(){}

    public Ticket(int id, int bookingId, int row, int column) {
        this.id = id;
        this.bookingId = bookingId;
        this.row = row;
        this.column = column;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
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
