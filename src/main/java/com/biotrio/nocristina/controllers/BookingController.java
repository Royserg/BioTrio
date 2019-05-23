package com.biotrio.nocristina.controllers;
import com.biotrio.nocristina.models.*;
import com.biotrio.nocristina.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class BookingController {

    @Autowired
    BookingService bookingService;


    @GetMapping("/api/bookings")
    @ResponseBody
    public List<Booking> bookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return bookings;
    }


    @GetMapping("/api/bookings/{id}")
    @ResponseBody
    public Booking getBooking(@PathVariable int id) {
        Booking booking = bookingService.getBookingById(id);

//        Booking test = new Booking(99, "12345");
        return booking;
    }

    /**
     * Save new booking into database and send back generated id from the db
     * @param newBooking (Booking) object to be added to the db
     * @return (int) id of the row inserted into db
     */
    @PostMapping("/api/bookings")
    @ResponseBody
    public int saveBooking(@RequestBody Booking newBooking) {
        int bookingId = bookingService.addBooking(newBooking);

        return bookingId;
    }

    // Delete booking of provided id
    @DeleteMapping("api/bookings/{bookingId}")
    @ResponseBody
    public int deleteBooking(@PathVariable int bookingId) {
        bookingService.deleteBooking(bookingId);

        return bookingId;
    }


    @GetMapping("/bookings")
    public String showBookingsPage(Model m){

        m.addAttribute("bookings", bookingService.getAllBookings());
        return "bookings";
    }

    @GetMapping("/api/bookings/phone/{phoneNumber}")
    @ResponseBody
    public List<Booking> getBookingsForPhone(@PathVariable String phoneNumber){


        return bookingService.getBookingByPhone(phoneNumber);
    }

    // Open page for adding new booking,
    // fetch only list of movies
    @GetMapping("/bookings/add")
    public String addBookings(Model model) {
        // Pass all movies to frontend
        model.addAttribute("movieList", bookingService.getAllMovies());

        return "add-booking";
    }
//


//    // Post method for form handling
//    @PostMapping("/bookings/add")
//    public String saveBooking(@ModelAttribute Booking booking) {
//        bookingService.getBookingList().add(booking);
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
