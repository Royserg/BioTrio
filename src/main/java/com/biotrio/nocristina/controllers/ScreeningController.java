package com.biotrio.nocristina.controllers;
import com.biotrio.nocristina.models.Movie;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.models.Theater;
import com.biotrio.nocristina.repositories.MovieRepository;
import com.biotrio.nocristina.repositories.ScreeningRepository;
import com.biotrio.nocristina.services.ScreeningService;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Controller
public class ScreeningController {

    @Autowired
    ScreeningService screeningService;

    @GetMapping("/api/screenings")
    @ResponseBody
    public List<Screening> showScreenings() {
        List<Screening> screenings = screeningService.getAllScreenings();
        return screenings;
    }

    // return JSON list of screenings for provided movieId
    @GetMapping("/api/screenings/{movieId}")
    @ResponseBody
    public List<Screening> screeningsForMovie(@PathVariable int movieId) {
        return screeningService.getByMovieId(movieId);
    }


       /* @GetMapping("/screenings")
        public String showScreeningsT(Model model) {
        List<Screening> screenings = screeningService.getAllScreenings();
        model.addAttribute("screeningList",screenings);
        return "screenings";
    } */

       @GetMapping("/screenings")
        public String addScreeningT(Model m) {

        Screening newScreening = new Screening();

        m.addAttribute("newScreening",newScreening);
        m.addAttribute("movieList",screeningService.getAllMovies());
        m.addAttribute("theaterList",screeningService.getAllTheaters());
        m.addAttribute("screeningList",screeningService.getAllScreenings());

           //System.out.println(screeningService.getAllScreenings());
        return "screenings";
    }

    /*
    @PostMapping("/screenings")
    public String saveScreening(Screening newScreening){
        screeningService.addScreening(newScreening);
        return "redirect:/screening";
    }
    */


    @PostMapping("/api/screenings/add")
    @ResponseBody
    public int saveScreening(@RequestBody Screening newScreening) {
        System.out.println(newScreening);
        screeningService.addScreening(newScreening);
        return newScreening.getId();
    }

    @DeleteMapping("/screenings/delete/{id}")
    @ResponseBody
    public String deleteScreening(@PathVariable(name = "id") int id) {
        screeningService.deleteScreening(id);
        return "redirect:/screenings";
    }

    @GetMapping("/screenings/find/{id}")
    @ResponseBody
    public Screening findById(@PathVariable int id) {
        return screeningService.findById(id);
    }

    @PostMapping("/screenings/edit/{id}")
    @ResponseBody
    public int editMovie(@RequestBody Screening screeningToEdit){

        screeningService.editScreening(screeningToEdit);
        System.out.println("screening " + screeningToEdit.getId() + " edited");

        return screeningToEdit.getId();
    }

    /*@ExceptionHandler(MissingServletRequestParameterException.class)
    public void handleMissingParams(MissingServletRequestParameterException ex) {
        String name = ex.getParameterName();
        System.out.println(name + " parameter is missing");
        // Actual exception handling
    } */
}
