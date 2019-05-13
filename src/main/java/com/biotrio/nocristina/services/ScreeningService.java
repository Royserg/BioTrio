package com.biotrio.nocristina.services;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.models.Theater;
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
        }
        return screenings;
    }
    public List<Movie> getAllMovies() {
        return movieRepo.FindAll();
    }

    public Screening findByBookingId(int screeningId) {


        Screening screening = screeningRepo.findByBookingId(screeningId);
        return screening;
    }

    public List<Theater> getAllTheaters () {return theaterRepo.findAll();}

    public void addScreening(Screening newScreening){
        screeningRepo.addScreening(newScreening);

    }

    public void deleteScreening(int screeningId){
        screeningRepo.deleteScreening(screeningId);
    }

}
