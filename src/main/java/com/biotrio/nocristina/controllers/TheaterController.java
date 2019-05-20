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


    @GetMapping("/theaters")
    public List<Theater> theaters() {
        List<Theater> theaters = theaterRepo.findAll();

        return theaters;
    }

    @GetMapping("/theaters/{id}")
    @ResponseBody
    public Theater findById(@PathVariable int id) {
        return theaterRepo.findOne(id);
    }

    @GetMapping("/theaters/add")
    public String addTheater(Model model) {
        model.addAttribute("theaterForm", new Theater());
        // pass list of theaters
        List <Theater> tlist = theaterRepo.findAll();
        for (Theater theater : tlist) {
            System.out.println(theater);
        }
        model.addAttribute("theaterList", tlist);

        return "theaters";
    }

    @PostMapping("/theaters")
    @ResponseBody
    public Theater saveTheater(@RequestBody Theater newTheater) {
        theaterRepo.saveTheater(newTheater);
        return newTheater;
    }


    @PutMapping("/theaters/edit/{id}")
    @ResponseBody
    public int editTheater(@PathVariable(name = "id") int id, @RequestBody Theater theater) {
        theaterRepo.update(theater);
        System.out.println(theater);
        return id;
    }

    @DeleteMapping("/theaters/{id}")
    @ResponseBody
    public String deleteTheater(@PathVariable(name = "id") int id) {
        theaterRepo.delete(id);
        return "redirect:/theaters";
    }
}

// TODO:
// we were speaking today about keeping proper methods for HTTP requests
// examples
// (READ)GET: /theaters
//            /theaters/id
// (UPDATE) PUT: /theaters
// (CREATE) POST: /theaters
// (DELETE) DELETE: /theaters/id