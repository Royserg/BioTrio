package com.biotrio.nocristina.models;

import org.json.JSONObject;

import java.util.List;

public class JSONBooking {

    private List<JSONObject> tickets;
    private int screeningId;
    private String phoneNumber;

    public JSONBooking() {
    }

    public JSONBooking(List<JSONObject> tickets, int screeningId, String phoneNumber) {
        this.tickets = tickets;
        this.screeningId = screeningId;
        this.phoneNumber = phoneNumber;
    }

    public List<JSONObject> getTickets() {
        return tickets;
    }

    public void setTickets(List<JSONObject> tickets) {
        this.tickets = tickets;
    }

    public int getScreeningId() {
        return screeningId;
    }

    public void setScreeningId(int screeningId) {
        this.screeningId = screeningId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "JSONBooking{" +
                "tickets=" + tickets +
                ", screeningId=" + screeningId +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
