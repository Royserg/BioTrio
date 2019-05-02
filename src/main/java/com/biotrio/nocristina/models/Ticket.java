package com.biotrio.nocristina.tickets;

public class Ticket {

    private int id;
    private int bookingId;
    private int screeningId;
    private int row;
    private int column;

    public Ticket(){}

    public Ticket(int id, int bookingId, int screeningId, int row, int column) {
        this.id = id;
        this.bookingId = bookingId;
        this.screeningId = screeningId;
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

    public int getScreeningId() {
        return screeningId;
    }

    public void setScreeningId(int screeningId) {
        this.screeningId = screeningId;
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
