package com.biotrio.nocristina.screenings;

import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.movies.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScreeningService {

    @Autowired
    ScreeningRepository screeningRepo;

    @Autowired
    MovieRepository movieRepo;

    public List<Screening> getScreenings() {
        return screeningRepo.getScreenings();
    }
}
