package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.repositories.MovieRepository;
import com.biotrio.nocristina.repositories.ScreeningRepository;
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

    //get all movies
    @GetMapping("/api/movies")
    @ResponseBody
    public List<Movie> findAll() {
        return movieRepo.findAll();
    }

    //get specific movie by id
    @GetMapping("/api/movies/{id}")
    @ResponseBody
    public Movie findOne(@PathVariable int id) {

        return movieRepo.findOne(id);

    }

    //return html page
    @GetMapping("/movies")
    public String showPage(Model m) {

        Movie newMovie = new Movie();
        m.addAttribute("newMovie", newMovie);
        m.addAttribute("movieList", findAll());

        return "movies";
    }


    @PostMapping("/api/movies")
    @ResponseBody
    public int saveOne(@RequestBody Movie newMovie){

        Movie newMovieAdded = movieRepo.addMovie(newMovie);
        System.out.println("new movie " + newMovieAdded.getId() + " added");

        return newMovieAdded.getId();
    }

    //update one movie
    @PutMapping("/api/movies/{id}")
    @ResponseBody
    public void updateOne(@PathVariable int id, @RequestBody Movie movieToEdit){
        movieRepo.updateOne(id, movieToEdit);
    }

    //delete one movie
    @DeleteMapping("/api/movies/{id}")
    public void deleteOne(@PathVariable int id){
        movieRepo.deleteOne(id);
    }

    // TODO: Consider attaching Screenings to the Movie, not other way around
    // It is a movie that has multiple screenings (array), not repeating and attaching a movie to each screening
    // This also would allow by clicking a movie to see all screenings which would be a cleaner solution
    // suggestion for Endpoint => /api/movies/{movieId}/screenings and will be in movies repo
    // return JSON list of screenings for provided movieId
    @GetMapping("/api/movies/{movieId}/screenings")
    @ResponseBody
    public List<Screening> screeningsForMovie(@PathVariable int movieId) {
        // Later to change screeningService method
        return screeningService.getByMovieId(movieId);
    }

}
