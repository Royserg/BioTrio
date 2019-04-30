package com.biotrio.nocristina.dashboard;
import com.biotrio.nocristina.bookings.Booking;
import com.biotrio.nocristina.movies.Movie;
import com.biotrio.nocristina.screenings.Screening;
import com.biotrio.nocristina.theaters.Theater;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Controller
public class DashboardController {

    Movie someMovie = new Movie("avengers end game", 170);
    Theater someTheater = new Theater("blue", 14, 20);
    Screening someScreening = new Screening(someMovie, LocalDateTime.now(), 120,someTheater);
    Booking someBooking = new Booking(1,3, "22323232", someScreening);
    ArrayList<Booking> bookingList = new ArrayList<Booking>();


    @GetMapping("/")
    public String dashboard() {
        return "index";
    }

    @GetMapping("/bookings")
    public String bookings(Model m) {
        bookingList.add(someBooking);
        m.addAttribute("bookings", bookingList);

        return "bookings";
    }

    @GetMapping("/movies")
    public String movies() {
        return "movies";
    }

    @GetMapping("/cinemas")
    public String cinemas() {
        return "cinemas";
    }

    @GetMapping("/bookings/add")
    public String addBookings() {
        return "add-booking";
    }

    @GetMapping("/movies/add")
    public String addMovie() {
        return "add-movie";
    }

    @GetMapping("/screening/add")
    public String addScreening() {
        return "add-screening";
    }

    // add future mappings below
    // maybe functionality to add more theaters??

}
