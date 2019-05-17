package com.biotrio.nocristina.models;

public class Movie {

    private int id;
    private String title;
    private int durationInMinutes;
    private boolean is3D;
    private boolean dolby;

    public Movie() {
    }

//    public Movie(int id, String title, int durationInMinutes) {
//        this.id = id;
//        this.title = title;
//        this.durationInMinutes = durationInMinutes;
//    }

    public Movie(int id, String title, int durationInMinutes, boolean is3D, boolean dolby) {
        this.id = id;
        this.title = title;
        this.durationInMinutes = durationInMinutes;
        this.is3D = is3D;
        this.dolby = dolby;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getDurationInMinutes() {
        return durationInMinutes;
    }

    public void setDurationInMinutes(int durationInMinutes) {
        this.durationInMinutes = durationInMinutes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isIs3D() {
        return is3D;
    }

    public void setIs3D(boolean is3D) {
        this.is3D = is3D;
    }

    public boolean isDolby() {
        return dolby;
    }

    public void setDolby(boolean dolby) {
        this.dolby = dolby;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", durationInMinutes=" + durationInMinutes +
                ", is3D=" + is3D +
                ", dolby=" + dolby +
                '}';
    }
}

