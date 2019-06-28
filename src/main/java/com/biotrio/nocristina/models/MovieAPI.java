package com.biotrio.nocristina.models;

public class MovieAPI {

    private String backdrop_path;
    private int id;
    private String original_title;
    private String overview;
    private String poster_path;
    private String release_date;
    private String tagline;

    public MovieAPI() {
    }

    public MovieAPI(String backdrop_path, int id, String original_title, String overview, String poster_path, String release_date, String tagline) {
        this.backdrop_path = backdrop_path;
        this.id = id;
        this.original_title = original_title;
        this.overview = overview;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.tagline = tagline;
    }

    public String getBackdrop_path() {
        return backdrop_path;
    }

    public void setBackdrop_path(String backdrop_path) {
        this.backdrop_path = backdrop_path;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOriginal_title() {
        return original_title;
    }

    public void setOriginal_title(String original_title) {
        this.original_title = original_title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    @Override
    public String toString() {
        return "MovieAPI{" +
                "backdrop_path='" + backdrop_path + '\'' +
                ", id=" + id +
                ", original_title='" + original_title + '\'' +
                ", overview='" + overview + '\'' +
                ", poster_path='" + poster_path + '\'' +
                ", release_date='" + release_date + '\'' +
                ", tagline='" + tagline + '\'' +
                '}';
    }
}
