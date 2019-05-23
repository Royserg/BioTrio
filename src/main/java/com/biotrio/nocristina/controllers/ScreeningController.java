package com.biotrio.nocristina.controllers;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.services.ScreeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Controller
public class ScreeningController implements IController<Screening>{

    @Autowired
    ScreeningService screeningService;

    // Show page with the list of screenings
    @GetMapping("/screenings")
    public String showPage(Model m) {

        Screening newScreening = new Screening();

        m.addAttribute("newScreening",newScreening);
        m.addAttribute("movieList",screeningService.getAllMovies());
        m.addAttribute("theaterList",screeningService.getAllTheaters());
        m.addAttribute("screeningList",screeningService.getAllScreenings());
        return "screenings";
    }

    // == API ===
    // CRUD Operations
    @GetMapping("/api/screenings")
    @ResponseBody
    public List<Screening> findAll() {
        List<Screening> screenings = screeningService.getAllScreenings();
        return screenings;
    }

    // Get information about a specific screening
    @GetMapping("/api/screenings/{id}")
    @ResponseBody
    public Screening findOne(@PathVariable int id) {
        return screeningService.findById(id);
    }

    // Add new screening
    @PostMapping("/api/screenings")
    @ResponseBody
    public int saveOne(@RequestBody Screening newScreening) {
        int screeningId = screeningService.addScreening(newScreening);
        return screeningId;
    }

    // Delete Screening of provided id
    @DeleteMapping("/api/screenings/{id}")
    @ResponseBody
    public void deleteOne(@PathVariable(name = "id") int id) {
        screeningService.deleteScreening(id);
    }

    // Edit screening
    @PutMapping("/api/screenings/{id}")
    @ResponseBody
    public void updateOne(@PathVariable int id,  @RequestBody Screening screeningToEdit){
        screeningService.editScreening(id, screeningToEdit);
    }


    // return JSON list of screenings for provided movieId
    // TODO: suggestion for Endpoint => /api/movies/{movieId}/screenings and will be in movies repo
//    @GetMapping("/api/screenings/{movieId}")
//    @ResponseBody
//    public List<Screening> screeningsForMovie(@PathVariable int movieId) {
//        return screeningService.getByMovieId(movieId);
//    }

    // return JSON list of screenings for provided date
    @GetMapping("/api/screenings/date/{date}")
    @ResponseBody
    public List<Screening> screeningsByDate(@PathVariable String date) {
        System.out.println("date requested in controller: " + date);
        return screeningService.getScreeningsByDate(date);

    }
  
    // return JSON list of screenings between 2 dates
    @GetMapping("/api/screenings/dates/{date1}/{date2}")
    @ResponseBody
    public List<Screening> screeningsForMovie(@PathVariable(name = "date1") String date1, @PathVariable(name = "date2") String date2) {
        return screeningService.getBetweenDates(date1, date2);
    }
}
