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


    public List<Screening> getAllScreenings() {
        List<Screening> screenings = screeningRepo.findAll();

        for (Screening screening : screenings) {
            // set Movie for the screening by id of the movie
            screening.setMovie(movieRepo.findbyScreeningId(screening.getId()));
            // set Theater for the screening by id of the theater
            screening.setTheater(theaterRepo.findbyScreeningId(screening.getId()));

            // separate Date and Time of the screening
            screening.setDate(screening.getStartTime().toLocalDate());
            screening.setTime(screening.getStartTime().toLocalTime());
        }
        return screenings;
    }
    public List<Movie> getAllMovies() {
        return movieRepo.FindAll();
    }

    public Screening findByBookingId(int screeningId) {

        getAllScreenings();
        Screening screening = screeningRepo.findByBookingId(screeningId);
        return screening;
    }

}
