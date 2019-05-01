package com.biotrio.nocristina.theaters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class TheaterController {

    @Autowired
    TheaterRepository theaterRepo;

    @GetMapping("/theaters")
    public String addTheater(Model model) {
        Theater newTheater = new Theater();
        model.addAttribute("newTheater", newTheater);
        return "theaters";
    }

    @PostMapping("/theaters")
    public String saveTheater(@ModelAttribute Theater newTheater){
        theaterRepo.getTheaterList().add(newTheater);
        return "redirct:/theaters";
    }

}
