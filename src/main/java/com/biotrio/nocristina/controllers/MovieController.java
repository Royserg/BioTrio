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

    // Update one movie
    @PutMapping("/api/movies/{id}")
    @ResponseBody
    public void updateOne(@PathVariable int id, @RequestBody Movie movieToEdit){
        movieRepo.updateOne(id, movieToEdit);
    }

    // Delete one movie
    @DeleteMapping("/api/movies/{id}")
    @ResponseBody
    public void deleteOne(@PathVariable int id){
        movieRepo.deleteOne(id);
        System.out.println("movie " + id + " deleted.");
    }

    // return JSON list of screenings for provided movieId
    @GetMapping("/api/movies/{movieId}/screenings")
    @ResponseBody
    public List<Screening> screeningsForMovie(@PathVariable int movieId) {
        // TODO: I need to get list of screenings for a particular movie
        // TODO: So we need to add screenings list to Movie
        // TODO: or connect here Screening Repo
        return screeningService.getByMovieId(movieId);
    }

}
