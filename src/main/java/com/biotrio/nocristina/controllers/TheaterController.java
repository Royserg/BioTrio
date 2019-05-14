package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Theater;
import com.biotrio.nocristina.repositories.TheaterRepository;
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
    public String saveTheater(@ModelAttribute Theater newTheater) {
        theaterRepo.saveTheater(newTheater);
        return "redirect:/theaters";
    }

    @GetMapping("/api/theaters/{id}")
    @ResponseBody
    public Theater oneTheater(@PathVariable int id) {
        return theaterRepo.findOne(id);
    }

    @PostMapping("/theaters/edit/{id}")
    @ResponseBody
    public int editTheater(@PathVariable(name = "id") int id, @RequestBody Theater theater) {
        theater.setId(id);
        theaterRepo.update(theater);
        return id;
    }

    @DeleteMapping("/theaters/delete/{id}")
    @ResponseBody
    public String deleteTheater(@PathVariable(name = "id") int id) {
        theaterRepo.delete(id);
        return "redirect:/theaters";
    }
}