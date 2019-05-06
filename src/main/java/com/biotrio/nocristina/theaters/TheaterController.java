package com.biotrio.nocristina.theaters;

import com.biotrio.nocristina.models.Theater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
        // TODO: implement Cinema Repo, model and controller => below dummy list of integers
        model.addAttribute("dummyCinema", 1);
        model.addAttribute("theaterForm", new Theater());
        // pass list of theaters
        model.addAttribute("theaterList", theaterRepo.findAll());
        return "theaters";
    }

    @PostMapping("/theaters")
    public String saveTheater(@ModelAttribute Theater newTheater){
        theaterRepo.saveTheater(newTheater);
        return "redirect:/theaters";
    }

}
