package com.biotrio.nocristina.controllers;
import com.biotrio.nocristina.models.*;
import com.biotrio.nocristina.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
public class BookingController implements IController<Booking>{

    @Autowired
    BookingService bookingService;

    // Show page with the list of bookings
    @GetMapping("/bookings")
    public String showPage(Model m){
        // Pass just bookings
        m.addAttribute("bookings", bookingService.getAllBookings());

        return "bookings";
    }

    // Get all bookings
    @GetMapping("/api/bookings")
    @ResponseBody
    public List<Booking> findAll() {
        List<Booking> bookings = bookingService.getAllBookings();
        return bookings;
    }

    @GetMapping("/api/bookings/{id}")
    @ResponseBody
    public Booking findOne(@PathVariable int id) {
        Booking booking = bookingService.getBookingById(id);

        return booking;
    }


    @Override
    @PutMapping("/api/bookings/{id}")
    @ResponseBody
    public void updateOne(@PathVariable int id, @Valid @RequestBody Booking itemToUpdate) {
        bookingService.editBooking(id, itemToUpdate);
    }


    /**
     * Save new booking into database and send back generated id from the db
     * @param newBooking (Booking) object to be added to the db
     * @return (int) id of the row inserted into db
     */
    @PostMapping("/api/bookings")
    @ResponseBody
    public int saveOne(@Valid @RequestBody Booking newBooking) {
        int bookingId = bookingService.addBooking(newBooking);

        return bookingId;
    }

    // Delete booking of provided id
    @DeleteMapping("/api/bookings/{bookingId}")
    @ResponseBody
    public void deleteOne(@PathVariable int bookingId) {
        bookingService.deleteBooking(bookingId);
    }


    //get bookings by a phone number
    @GetMapping("/api/bookings/phone/{phoneNumber}")
    @ResponseBody
    public List<Booking> getBookingsForPhone(@PathVariable String phoneNumber){
        return bookingService.getBookingByPhone(phoneNumber);
    }
}
