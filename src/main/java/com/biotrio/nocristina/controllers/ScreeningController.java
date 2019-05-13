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

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static java.time.LocalDateTime.of;

@Controller
public class ScreeningController {

    @Autowired
    ScreeningService screeningService;

    @GetMapping("/api/screenings")
    @ResponseBody
    public List<Screening> showScreenings() {
        List<Screening> screenings = screeningService.getAllScreenings();
        for (Screening screening : screenings) {
            System.out.println(screening);
        }
        return screenings;
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

    @PostMapping("/screenings")
    public String saveScreening(@RequestParam("date") String screeningDate, @RequestParam("time") String screeningStart, @RequestParam("price") String screeningPrice,@RequestParam("movie") String movie){
        Screening newScreening = new Screening();

        newScreening.setDate(LocalDate.parse(screeningDate));
        newScreening.setTime(LocalTime.parse(screeningStart));
        newScreening.setPrice(new BigDecimal(screeningPrice));


        screeningService.addScreening(newScreening);

        return "redirect:/screenings";
    }

    @DeleteMapping("/screenings/delete/{id}")
    @ResponseBody
    public String deleteScreening(@PathVariable(name = "id") int id) {
        screeningService.deleteScreening(id);
        return "redirect:/screenings";
    }

   /* @GetMapping("/screenings/delete/{id}")
    public String deleteScreening(@PathVariable int id){

        screeningService.deleteScreening(id);
        System.out.println("Screening " + id + " deleted");

        return "redirect:/screenings";
    }

    /*@ExceptionHandler(MissingServletRequestParameterException.class)
    public void handleMissingParams(MissingServletRequestParameterException ex) {
        String name = ex.getParameterName();
        System.out.println(name + " parameter is missing");
        // Actual exception handling
    } */
}
