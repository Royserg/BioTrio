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


    @PostMapping("/movies")
    @ResponseBody
    public int saveOne(@RequestBody Movie newMovie){

        Movie newMovieAdded = movieRepo.addMovie(newMovie);
        System.out.println("new movie " + newMovieAdded.getId() + " added");

        return newMovieAdded.getId();
    }

    //update one movie
    @PutMapping("/movies")
    @ResponseBody
    public void updateOne(@RequestBody Movie movieToEdit){
        movieRepo.updateOne(movieToEdit);
        System.out.println("movie " + movieToEdit.getId() + " edited.");
    }

    //delete one movie
    @DeleteMapping("/api/movies/{id}")
    public void deleteOne(@PathVariable int id){
        movieRepo.deleteOne(id);
        System.out.println("movie " + id + " deleted.");
    }

}
