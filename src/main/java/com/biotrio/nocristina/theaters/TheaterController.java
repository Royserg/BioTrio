package com.biotrio.nocristina.theaters;

import com.biotrio.nocristina.models.Theater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class TheaterController {

    @Autowired
    TheaterRepository theaterRepo;


    @GetMapping("/api/theaters")
    @ResponseBody
    public List<Theater> theaters() {
        List<Theater> theaters = theaterRepo.findAll();

        return theaters;
    }

    @GetMapping("/theaters")
    public String addTheater(Model model) {
        Theater newTheater = new Theater();
        model.addAttribute("newTheater", newTheater);
        return "theaters";
    }

    @PostMapping("/theaters")
    public String saveTheater(@ModelAttribute Theater newTheater){
        theaterRepo.findAll().add(newTheater);
        return "redirct:/theaters";
    }

}
