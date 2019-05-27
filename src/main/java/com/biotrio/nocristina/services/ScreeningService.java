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

    @Autowired
    private BookingRepository bookingRepo;

    // Function that fetches movie and theater object
    // and attaches it to the screening
    public void populateBookingsList(Screening screening) {

        screening.setBookings(bookingRepo.fingByScreeingId(screening.getId()));
    }

    public List<Screening> getAllScreenings() {
        List<Screening> screenings = screeningRepo.findAll();

        return screenings;
    }

    public List<Screening> getScreeningsByDate(String date) {
        List<Screening> screenings = screeningRepo.findByDate(date);
        return screenings;
    }
  
    public List<Screening> getBetweenDates(String date1, String date2) {
        List<Screening> screenings = screeningRepo.findBetweenDates(date1, date2);
        for (Screening screening : screenings) {
            populateBookingsList(screening);
        }
        return screenings;

    }

    public List<Movie> getAllMovies() {
        return movieRepo.findAll();
    }

    public Screening findByBookingId(int bookingId) {
        Screening screening = screeningRepo.findByBookingId(bookingId);

        populateBookingsList(screening);

        return screening;
    }

    public List<Screening> getByMovieId(int movieId) {
        List<Screening> screenings = screeningRepo.findByMovieId(movieId);

        for (Screening screening : screenings) {
            populateBookingsList(screening);
        }

        return screenings;

    }

    public List<Theater> getAllTheaters () {
        return theaterRepo.findAll();
    }

    public int addScreening(Screening newScreening){
        int screeningId = screeningRepo.addScreening(newScreening);

        return screeningId;
    }

    public void deleteScreening(int screeningId){
        screeningRepo.deleteOne(screeningId);
    }

    public Screening findById(int screeningId) {
        Screening screening = screeningRepo.findOne(screeningId);
        populateBookingsList(screening);
        return screening;
    }

    public void editScreening(int id, Screening screening) {
        screeningRepo.updateOne(id, screening);
    }
}
