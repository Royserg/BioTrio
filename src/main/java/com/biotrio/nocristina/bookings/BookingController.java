package com.biotrio.nocristina.bookings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class BookingController {

    @Autowired
    BookingRepository bookingRepo;

    @GetMapping("/bookings")
    public String showBookings(Model m){
        System.out.println(bookingRepo.getBookingList());
        m.addAttribute("bookings", bookingRepo.getBookingList());
        System.out.println("tickets: " + bookingRepo.getBookingList().get(1).getTickets());
        return "bookings";
    }

    // Show form to add bookings
    @GetMapping("/bookings/add")
    public String addBookings(Model model) {
        Booking newBooking = new Booking();
        model.addAttribute(newBooking);
        return "add-booking";
    }

    // Post method for form handling
    @PostMapping("/bookings/add")
    public String saveBooking(@ModelAttribute Booking booking) {
        bookingRepo.getBookingList().add(booking);
        return "redirect:/add";
    }

    @GetMapping ("/bookings/edit/{id}")
    public String editBooking(@PathVariable int id, Model m){
        Booking booking = bookingRepo.findBooking(id);
        m.addAttribute("bookingToEdit",booking);
        return "edit-booking";
    }

    @PostMapping("/bookings/edit/{id}")
    public String saveEditBooking(@PathVariable int id, @ModelAttribute Booking booking){
        bookingRepo.editBooking(id, booking);
        return "redirect:/bookings";
    }

    @PostMapping("/bookings/delete/{id}")
    public String deleteBooking(@PathVariable int id){
        bookingRepo.deleteBooking(id);
        return "redirect:/bookings";

    }
}
