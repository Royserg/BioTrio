package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.MovieAPI;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.repositories.MovieRepository;
import com.biotrio.nocristina.repositories.ScreeningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


@Controller
public class PageController {

    @Autowired
    MovieRepository movieRepo;

    @Autowired
    ScreeningRepository screeningRepo;

    private static final String API_KEY = "02325bf00c28d42c083b25b3be60b75e";
    private static final String API_URL = "https://api.themoviedb.org/3/";

    private RestTemplate restTemplate = new RestTemplate();


    @GetMapping("/page")
    public String index(Model model) {

        RestTemplate restTemplate = new RestTemplate();
        // Prepare url to API for retrieving all information about the movie
        // `%s` after /movie/ is for dynamically injected id of a particular movie
        String apiResourceUrl = API_URL + "/movie/%s?api_key=" + API_KEY + "&language=en-US";

        // Get list of all movies from repository
        List<Movie> movies = movieRepo.findAll();

        List<MovieAPI> moviesFromAPI = new ArrayList<>();

        // Get information from API about each movie
        for (Movie movie : movies) {
            moviesFromAPI.add(restTemplate.getForObject(String.format(apiResourceUrl, movie.getId()), MovieAPI.class));
        }

        System.out.println("Api movies: " + moviesFromAPI);
        // Add movies to the model
        model.addAttribute("allMovies", moviesFromAPI);

        return "page/index";
    }

    @GetMapping("/page/{movieId}")
    public String bookScreening(Model model, @PathVariable int movieId) {

        // Get movie from API
        String apiResource = String.format("%smovie/%d?api_key=%s&language=en-US", API_URL, movieId, API_KEY);
        MovieAPI selectedMovie = restTemplate.getForObject(apiResource, MovieAPI.class);

        // Get all screenings for this movie
        List<Screening> screenings = screeningRepo.findByMovieId(movieId);

        model.addAttribute("movie", selectedMovie);
        model.addAttribute("screenings", screenings);

        return "page/book-movie";
    }
}



// Gets list of all movies from db
//        ResponseEntity<List<Movie>> response = restTemplate.exchange(
//                "http://localhost:8081/api/movies",
//                HttpMethod.GET,
//                null,
//                new ParameterizedTypeReference<List<Movie>>(){}
//                );
//        List<Movie> movies = response.getBody();
// Gets list of all movies -- end

// Get one object
//        String apiResource = String.format("%smovie/27205?api_key=%s&language=en-US", API_URL, API_KEY);
//        System.out.println(apiResource);
//
//        MovieAPI response = restTemplate.getForObject(apiResource, MovieAPI.class);
