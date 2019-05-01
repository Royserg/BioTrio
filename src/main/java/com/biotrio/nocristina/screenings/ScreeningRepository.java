package com.biotrio.nocristina.screenings;
import com.biotrio.nocristina.movies.MovieRepository;
import com.biotrio.nocristina.theaters.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Repository
public class ScreeningRepository {

    @Autowired
    private MovieRepository movieRepo;
    @Autowired
    private TheaterRepository theaterRepo;

    Screening s1 = new Screening(movieRepo.getMovie1(), LocalDateTime.now(), 100, theaterRepo.getNewTheater());
    Screening s2 = new Screening(movieRepo.getMovie1(), LocalDateTime.now(), 100, theaterRepo.getNewTheater());
    Screening s3 = new Screening(movieRepo.getMovie2(), LocalDateTime.now(), 120, theaterRepo.getNewTheater());

    ArrayList<Screening> screeningList = new ArrayList<>();

    public Screening getNewScreening(){
        return s1;
    }

    public ArrayList<Screening> getScreeningList(){
        if(screeningList.size() < 1){
            screeningList.add(s1);
            screeningList.add(s2);
            screeningList.add(s3);
        }
        return screeningList;
    }
}
