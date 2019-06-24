package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.repositories.MovieRepository;
import com.biotrio.nocristina.services.ScreeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MovieController implements IController<Movie>{

    @Autowired
    MovieRepository movieRepo;

    @Autowired
    ScreeningService screeningService;

    // Return html page
    @GetMapping("/movies")
    public String showPage(Model m) {

        m.addAttribute("movieList", findAll());
        m.addAttribute("theaterList",screeningService.getAllTheaters());
        m.addAttribute("cinema",screeningService.getOneCinema(1));
        return "movies";
    }

    // Get all movies
    @GetMapping("/api/movies")
    @ResponseBody
    public List<Movie> findAll() {
        return movieRepo.findAll();
    }

    // Get specific movie by id
    @GetMapping("/api/movies/{id}")
    @ResponseBody
    public Movie findOne(@PathVariable int id) {

        return movieRepo.findOne(id);

    }

    // Save newly created movie
    @PostMapping("/api/movies")
    @ResponseBody
    public int saveOne(@RequestBody Movie newMovie){

        int movieId = movieRepo.saveOne(newMovie);
        return movieId;
    }

    // Delete one movie
    @DeleteMapping("/api/movies/{id}")
    @ResponseBody
    public void deleteOne(@PathVariable int id){
        movieRepo.deleteOne(id);
    }

    @Override
    public void updateOne(int id, Movie itemToUpdate) {

    }

    // Return JSON list of screenings for provided movieId
    @GetMapping("/api/movies/{movieId}/screenings")
    @ResponseBody
    public List<Screening> screeningsForMovie(@PathVariable int movieId) {
        return screeningService.getByMovieId(movieId);
    }

}
