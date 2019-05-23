package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Cinema;
import com.biotrio.nocristina.repositories.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class CinemaController implements IController<Cinema>{

    @Autowired
    CinemaRepository cinemaRepository;

    @GetMapping("/api/cinemas")
    @ResponseBody
    public List<Cinema> findAll() {
        return cinemaRepository.findAll();
    }

    @GetMapping("/api/cinemas/{id}")
    @ResponseBody
    public Cinema findOne(@PathVariable int id){
        return cinemaRepository.findOne(id);
    }

    @GetMapping("/cinemas")
    public String showPage(Model model) {
        Cinema newCinema = new Cinema();
        model.addAttribute("newCinema", newCinema);
        model.addAttribute("cinemaList", cinemaRepository.findAll());
        return "cinemas";
    }

    @PostMapping("/api/cinemas")
    @ResponseBody
    public int saveOne(@ModelAttribute Cinema newCinema){
        cinemaRepository.addCinema(newCinema);
        return newCinema.getId();
    }

    @DeleteMapping("/api/cinemas/{id}")
    @ResponseBody
    public void deleteOne(@PathVariable int id){
        cinemaRepository.deleteOne(id);
    }

    @PutMapping("/api/cinemas/{id}")
    @Override
    public void updateOne(@PathVariable int id, Cinema itemToUpdate) {
        //TODO: implement??
    }
}
