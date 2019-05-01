package com.biotrio.nocristina.movies;

import org.springframework.stereotype.Repository;
import java.util.ArrayList;

@Repository
public class MovieRepository {


    public Movie getMovie1(){
        Movie m1 = new Movie(1, "Avengers: Endgame", 240);
        return m1;
    }

    public Movie getMovie2() {
        Movie m2 = new Movie(2, "Captain Marvel", 170);
        return m2;
    }

    public ArrayList<Movie> getMovieList(){
        ArrayList<Movie> movieList = new ArrayList<>();
        Movie m2 = new Movie(2, "Captain Marvel", 170);
        Movie m1 = new Movie(1, "Avengers: Endgame", 240);

        if (movieList.size() < 1) {
            movieList.add(m1);
            movieList.add(m2);
        }

        return movieList;
    }
}
