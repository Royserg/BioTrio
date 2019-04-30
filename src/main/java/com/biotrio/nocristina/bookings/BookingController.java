package com.biotrio.nocristina.bookings;
import com.biotrio.nocristina.movies.Movie;
import com.biotrio.nocristina.screenings.Screening;
import com.biotrio.nocristina.theaters.Theater;
import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

@Controller
public class BookingController {

    /*
    Movie someMovie = new Movie("avengers end game", 170);
    Theater someTheater = new Theater("blue", 14, 20);
    Screening someScreening = new Screening(someMovie, LocalDateTime.now(), 120,someTheater);
    Booking someBooking = new Booking(1,3, "22323232", someScreening);
    */


    @GetMapping("/add")
    public String addBookings() {
        return "add-booking";
    }




}
