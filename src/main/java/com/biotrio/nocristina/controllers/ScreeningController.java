package com.biotrio.nocristina.controllers;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.repositories.ScreeningRepository;
import com.biotrio.nocristina.services.ScreeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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

    // return JSON list of screenings between 2 dates
    @GetMapping("/api/screenings/dates/{date1}/{date2}")
    @ResponseBody
    public List<Screening> screeningsForMovie(@PathVariable(name = "date1") String date1, @PathVariable(name = "date2") String date2) {
        return screeningService.getBetweenDates(date1, date2);
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
        m.addAttribute("screeningList",screeningService.getAllScreenings());
        return "screenings";
    }

    /*
    @PostMapping("/screenings")
    public String saveScreening(@RequestBody Screening newScreening){
        screeningService.addScreening(newScreening);
        return "redirect:/screening";
    }
*/
}
