package com.biotrio.nocristina.controllers;

import com.biotrio.nocristina.models.Ticket;
import com.biotrio.nocristina.repositories.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class TicketController {

    @Autowired
    TicketRepository ticketRepo;

    @GetMapping("/tickets/add")
    public String addTicket(Model model){
        Ticket newTicket = new Ticket();
        model.addAttribute("newTicket", newTicket);
        return "add-ticket";
    }

    @PostMapping("/api/tickets")
    public String saveTicket(@RequestBody Ticket ticket) {
        System.out.println("ticket column no: " + ticket.getColumnNo());
        ticketRepo.saveTicket(ticket);
        return "redirect:/index";
    }

//    @PostMapping("/tickets/add")
//    public String saveTicket(@ModelAttribute Ticket newTicket){
//        ticketRepo.getTickets().add(newTicket);
//        return "redirect:/tickets";
//    }

    @GetMapping("/tickets")
    public String showTicket(){
        return "ticket";
    }
}
