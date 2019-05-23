package com.biotrio.nocristina.controllers;
import com.biotrio.nocristina.models.*;
import com.biotrio.nocristina.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class BookingController implements IController<Booking>{

    @Autowired
    BookingService bookingService;

    //Get all bookings
    @GetMapping("/api/bookings")
    @ResponseBody
    public List<Booking> findAll() {
        List<Booking> bookings = bookingService.getAllBookings();
        return bookings;
    }

    /*// @Override
    public void updateOne(Booking itemToUpdate) {
        //TODO: implement?
    }*/


    //Get one specific booking
    @GetMapping("/api/bookings/{id}")
    @ResponseBody
    public Booking findOne(@PathVariable int id) {
        Booking booking = bookingService.getBookingById(id);

        return booking;
    }

    /**
     * Save new booking into database and send back generated id from the db
     * @param newBooking (Booking) object to be added to the db
     * @return (int) id of the row inserted into db
     */
    //post one booking
    @PostMapping("/api/bookings")
    @ResponseBody
    public int saveOne(@RequestBody Booking newBooking) {
        int bookingId = bookingService.addBooking(newBooking);

        return bookingId;
    }

    // Delete booking of provided id
    @DeleteMapping("api/bookings/{bookingId}")
    @ResponseBody
    public void deleteOne(@PathVariable int bookingId) {
        bookingService.deleteBooking(bookingId);
    }

    //return html page
    @GetMapping("/bookings")
    public String showPage(Model m){

        m.addAttribute("bookings", bookingService.getAllBookings());
        return "bookings";
    }

    //get bookings by a phone number
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
