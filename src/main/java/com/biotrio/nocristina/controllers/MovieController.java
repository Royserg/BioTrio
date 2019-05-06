package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MovieController {

    @Autowired
    MovieRepository movieRepo;

    @GetMapping("/api/movies")
    @ResponseBody
    public List<Movie> moviesList() {
        return movieRepo.FindAll();
    }

    @GetMapping("/movies")
    public String movies() {
        return "movies";
    }

    @GetMapping("/movies/add")
    public String addMovie(Model model) {
        Movie newMovie = new Movie();
        model.addAttribute("newMovie", newMovie);
        return "add-movie";
    }

    @PostMapping("/movies/save")
    public String saveMovie(@ModelAttribute Movie newMovie){
        movieRepo.addMovie(newMovie);
//        movieRepo.getMovies().add(newMovie);
        return "redirect:/movies/add";
    }

}
