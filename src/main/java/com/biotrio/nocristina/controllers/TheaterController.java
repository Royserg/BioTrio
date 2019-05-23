package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Theater;
import com.biotrio.nocristina.repositories.TheaterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TheaterController implements IController<Theater>{

    @Autowired
    TheaterRepository theaterRepo;

    //get all theaters
    @GetMapping("/api/theaters")
    @ResponseBody
    public List<Theater> findAll() {
        List<Theater> theaters = theaterRepo.findAll();
        return theaters;
    }

    //get a specific theater by id
    @GetMapping("/api/theaters/{id}")
    @ResponseBody
    public Theater findOne(@PathVariable int id) {
        return theaterRepo.findOne(id);
    }


    //save new theater
    @PostMapping("/api/theaters")
    @ResponseBody
    public int saveOne(@RequestBody Theater newTheater) {
        int theaterId = theaterRepo.addTheater(newTheater);
        return theaterId;
    }

    //update one theater
    @PutMapping("/api/theaters/{id}")
    @ResponseBody
    public void updateOne(@PathVariable(name = "id") int id, @RequestBody Theater theater) {
        theaterRepo.updateOne(id, theater);
        System.out.println("priting" + theater);
    }

    //delete one theater by id
    @DeleteMapping("/api/theaters/{id}")
    @ResponseBody
    public void deleteOne(@PathVariable(name = "id") int id) {
        theaterRepo.deleteOne(id);
    }

    @GetMapping("/theaters")
    public String showPage(Model m){
        m.addAttribute("theaterList",findAll());
        return "theaters";
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