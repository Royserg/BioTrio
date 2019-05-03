package com.biotrio.nocristina.movies;

import com.biotrio.nocristina.Database;
import com.biotrio.nocristina.models.Movie;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class MovieRepository {

    private Database db = Database.getInstance();

    public List<Movie> getMovies(){

        return db.movies;
    }

    public Movie getMovie(int movieId) {
        for (Movie movie : db.movies) {
            if (movie.getId() == movieId) {
                return movie;
            }
        }

        return null;
    }
}
