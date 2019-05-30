package com.biotrio.nocristina.controllers;
import com.biotrio.nocristina.models.Cinema;
import com.biotrio.nocristina.models.Day;
import com.biotrio.nocristina.repositories.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;


@Controller
public class DashboardController {

    @Autowired
    CinemaRepository cinemaRepo;


    @GetMapping("/")
    public String dashboard(Model m) {
        Cinema cinema = cinemaRepo.findOne(1);
        String[] days = { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };
        m.addAttribute("days", days);
        m.addAttribute("schedule", cinema.getSchedule());

        return "index";
    }

    @GetMapping("/api/schedule")
    @ResponseBody
    public Day showSchedule() {

        LocalDate date = LocalDate.now();
        DayOfWeek dow = date.getDayOfWeek();
        int today = dow.getValue();
        Day schedule = cinemaRepo.findSchedule(today);

        return schedule;

    }


}
