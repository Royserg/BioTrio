package com.biotrio.nocristina.controllers;
import com.biotrio.nocristina.models.Screening;
import com.biotrio.nocristina.services.BookingService;
import com.biotrio.nocristina.models.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class BookingController {

    @Autowired
    BookingService bookingService;

    @GetMapping("/api/screenings/{movieId}")
    @ResponseBody
    public List<Screening> screenings(@PathVariable int movieId) {
        return bookingService.getByMovieId(movieId);
    }

    @GetMapping("/api/bookings")
    @ResponseBody
    public List<Booking> bookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/bookings")
    public String showBookings(Model m){

        m.addAttribute("bookings", bookingService.getAllBookings());
        return "bookings";
    }

    // Show form to add bookings
    @GetMapping("/bookings/add")
    public String addBookings(Model model) {
        Booking newBooking = new Booking();
        model.addAttribute("bookingForm", newBooking);

        // Pass all movies to frontend
        model.addAttribute("movieList", bookingService.getAllMovies());
        // Testing: Pass all screenings
        model.addAttribute("screeningList", bookingService.getAllScreenings());

        return "add-booking";
    }
//
//    // Post method for form handling
//    @PostMapping("/bookings/add")
//    public String saveBooking(@ModelAttribute Booking booking) {
//        bookingRepo.getBookingList().add(booking);
//        return "redirect:/add";
//    }
//
//    @GetMapping ("/bookings/edit/{id}")
//    public String editBooking(@PathVariable int id, Model m){
//        Booking booking = bookingRepo.findBooking(id);
//        m.addAttribute("bookingToEdit",booking);
//        return "edit-booking";
//    }
//
//    @PostMapping("/bookings/edit/{id}")
//    public String saveEditBooking(@PathVariable int id, @ModelAttribute Booking booking){
//        bookingRepo.editBooking(id, booking);
//        return "redirect:/bookings";
//    }
//
//    @PostMapping("/bookings/delete/{id}")
//    public String deleteBooking(@PathVariable int id){
//        bookingRepo.deleteBooking(id);
//        return "redirect:/bookings";
//
//    }
}
