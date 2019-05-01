package com.biotrio.nocristina.tickets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

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

    @PostMapping("/tickets/add")
    public String saveTicket(@ModelAttribute Ticket newTicket){
        ticketRepo.getTicketList().add(newTicket);
        return "redirect:/tickets";
    }

    @GetMapping("/tickets")
    public String showTicket(){
        return "ticket";
    }
}
