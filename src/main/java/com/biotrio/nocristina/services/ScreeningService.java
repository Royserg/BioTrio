package com.biotrio.nocristina.services;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScreeningService {

    @Autowired
    private TheaterRepository theaterRepo;

    @Autowired
    private ScreeningRepository screeningRepo;

    @Autowired
    private MovieRepository movieRepo;


    // Function that fetches movie and theater object
    // and attaches it to the screening
    public void populateScreeningData(Screening screening) {
        // set Movie for the screening by id of the movie
        screening.setMovie(movieRepo.findByScreeningId(screening.getId()));
        // set Theater for the screening by id of the theater
        screening.setTheater(theaterRepo.findByScreeningId(screening.getId()));


    }

    public List<Screening> getAllScreenings() {
        List<Screening> screenings = screeningRepo.findAll();

        for (Screening screening : screenings) {
            populateScreeningData(screening);
        }
        return screenings;
    }

    public List<Screening> getScreeningsByDate(String date) {
        List<Screening> screenings = screeningRepo.findByDate(date);

        for (Screening screening : screenings) {
            populateScreeningData(screening);
        }
        return screenings;

    }

    public List<Movie> getAllMovies() {
        return movieRepo.FindAll();
    }

    public Screening findByBookingId(int bookingId) {
        Screening screening = screeningRepo.findByBookingId(bookingId);

        populateScreeningData(screening);

        return screening;
    }

    public List<Screening> getByMovieId(int movieId) {
        List<Screening> screenings = screeningRepo.findByMovieId(movieId);
        for (Screening screening : screenings) {
            populateScreeningData(screening);
        }

        return screenings;
    }

}
