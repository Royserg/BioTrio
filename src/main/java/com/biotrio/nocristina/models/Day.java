package com.biotrio.nocristina.models;

import java.time.LocalTime;

public class Day {

    private int dayNo;
    private LocalTime openingHour;
    private LocalTime closingHour;
    private int cinemaId;

    public Day() {}

    public Day(int dayNo, LocalTime openingHour, LocalTime closingHour, int cinemaId) {
        this.dayNo = dayNo;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
        this.cinemaId = cinemaId;
    }

    public int getDayNo() {
        return dayNo;
    }

    public void setDayNo(int dayNo) {
        this.dayNo = dayNo;
    }

    public int getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(int cinemaId) {
        this.cinemaId = cinemaId;
    }

    public LocalTime getOpeningHour() {
        return openingHour;
    }

    public void setOpeningHour(LocalTime openingHour) {
        this.openingHour = openingHour;
    }

    public LocalTime getClosingHour() {
        return closingHour;
    }

    public void setClosingHour(LocalTime closingHour) {
        this.closingHour = closingHour;
    }

    @Override
    public String toString() {
        return "Day{" +
                "dayNo=" + dayNo +
                ", openingHour=" + openingHour +
                ", closingHour=" + closingHour +
                ", cinemaId=" + cinemaId +
                '}';
    }
}
