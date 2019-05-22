package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Cinema;
import com.biotrio.nocristina.repositories.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CinemaController {

    @Autowired
    CinemaRepository cinemaRepository;

    @GetMapping("/api/cinemas")
    @ResponseBody
    public List<Cinema> cinemaList() {
        return cinemaRepository.findAll();
    }

    @GetMapping("/api/cinemas/{id}")
    @ResponseBody
    public Cinema getOneCinema(@PathVariable int id){
        return cinemaRepository.findById(id);
    }

    @GetMapping("/cinemas")
    public String addMovie(Model model) {
        Cinema newCinema = new Cinema();
        model.addAttribute("newCinema", newCinema);
        model.addAttribute("cinemaList", cinemaRepository.findAll());
        return "cinemas";
    }

    @PostMapping("/cinemas")
    public String saveCinema(@ModelAttribute Cinema newCinema){
        cinemaRepository.addCinema(newCinema);
        return "redirect:/cinemas";
    }

    @GetMapping("/cinemas/delete/{id}")
    public String deleteCinema(@PathVariable int id){
        cinemaRepository.deleteCinemaById(id);
        return "redirect:/cinemas";
    }

    @PostMapping("/cinemas/edit/{id}")
    @ResponseBody
    public int editCinema(@PathVariable int id, @RequestBody Cinema cinemaToEdit){
        System.out.println("name of cinema we are editing: " + cinemaToEdit.getName());

        cinemaRepository.editCinemaById(id, cinemaToEdit);

        return id;
    }
}
