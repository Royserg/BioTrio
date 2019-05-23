package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MovieController implements IController<Movie>{

    @Autowired
    MovieRepository movieRepo;

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

    // Return html page
    @GetMapping("/movies")
    public String showPage(Model m) {

        Movie newMovie = new Movie();
        m.addAttribute("newMovie", newMovie);
        m.addAttribute("movieList", findAll());

        return "movies";
    }

    // Save newly created movie
    @PostMapping("/movies")
    @ResponseBody
    public int saveOne(@RequestBody Movie newMovie){

        Movie newMovieAdded = movieRepo.addMovie(newMovie);
        System.out.println("new movie " + newMovieAdded.getId() + " added");

        return newMovieAdded.getId();
    }

    // Update one movie
    @PutMapping("/movies")
    @ResponseBody
    public void updateOne(@RequestBody Movie movieToEdit){
        movieRepo.updateOne(movieToEdit);
        System.out.println("movie " + movieToEdit.getId() + " edited.");
    }

    // Delete one movie
    @DeleteMapping("/api/movies/{id}")
    @ResponseBody
    public void deleteOne(@PathVariable int id){
        movieRepo.deleteOne(id);
        System.out.println("movie " + id + " deleted.");
    }

}
