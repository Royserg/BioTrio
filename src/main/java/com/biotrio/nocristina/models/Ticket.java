package com.biotrio.nocristina.models;

public class Ticket {

    private int id;
    private int bookingId;
    private int rowNo;
    private int columnNo;

    public Ticket(){}

    public Ticket(int id, int bookingId, int rowNo, int columnNo) {
        this.id = id;
        this.bookingId = bookingId;
        this.rowNo = rowNo;
        this.columnNo = columnNo;
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

    public int getRowNo() {
        return rowNo;
    }

    public void setRowNo(int rowNo) {
        this.rowNo = rowNo;
    }

    public int getColumnNo() {
        return columnNo;
    }

    public void setColumnNo(int columnNo) {
        this.columnNo = columnNo;
    }
}
