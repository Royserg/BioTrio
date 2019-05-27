package com.biotrio.nocristina.services;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.repositories.MovieRepository;
import com.biotrio.nocristina.repositories.ScreeningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    ScreeningRepository screeningRepo;

    @Autowired
    MovieRepository movieRepo;

    @Autowired
    ScreeningService screeningService;

    // Get all movies
    public List<Movie> getAll() {

        List<Movie> movies = movieRepo.findAll();

        // Populate list of screenings for each movie
        for (Movie movie : movies) {
            movie.setScreenings(screeningService.getByMovieId(movie.getId()));
        }

        return movies;
    }

    // Get one movie
    public Movie getOne(int movieId) {
        Movie movie = movieRepo.findOne(movieId);

        // Populate list of screenings
        movie.setScreenings(screeningRepo.findByMovieId(movieId));

        return movie;
    }

    // Save movie and send back id that was generated in the db
    public int saveOne(Movie movie) {
        return movieRepo.saveOne(movie);
    }

    // Update movie
    public void updateOne(int id, Movie movieToEdit) {
        movieRepo.updateOne(id, movieToEdit);
    }

    public void deleteOne(int id) {
        movieRepo.deleteOne(id);
    }

    // Get list of screenings for a particular movie, found by movieId
    public List<Screening> getScreeningsByMovieId (int movieId){

        return screeningRepo.findByMovieId(movieId);
    }

}
