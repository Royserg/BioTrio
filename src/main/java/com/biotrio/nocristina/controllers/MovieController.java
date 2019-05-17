package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class MovieController {

    @Autowired
    MovieRepository movieRepo;

    @GetMapping("/api/movies")
    @ResponseBody
    public List<Movie> moviesList() {
        return movieRepo.findAll();
    }


    @GetMapping("api/movie/{id}")
    @ResponseBody
    public Movie findById(@PathVariable int id) {

        return movieRepo.findById(id);

    }

    @GetMapping("/movies")
    public String addMovie(Model model) {

        Movie newMovie = new Movie();
        model.addAttribute("newMovie", newMovie);
        model.addAttribute("movieList", moviesList());

        return "movies";
    }

    @PostMapping("/movies")
    @ResponseBody
    public int saveMovie(@RequestBody Movie newMovie){

        movieRepo.addMovie(newMovie);
        System.out.println("new movie added");

        return newMovie.getId();
    }

    @PostMapping("/movies/edit/{id}")
    @ResponseBody
    public int editMovie(@PathVariable int id, @RequestBody Movie movieToEdit){

        movieRepo.editMovie(id, movieToEdit);
        System.out.println("movie " + id + " edited");

        return id;
    }

    @DeleteMapping("/movies/delete/{id}")
    @ResponseBody
    public int deleteMovie(@PathVariable int id){

        movieRepo.deleteMovie(id);
        System.out.println("movie " + id + " deleted");

        return id;
    }

}
