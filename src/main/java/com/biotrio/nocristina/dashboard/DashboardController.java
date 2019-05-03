package com.biotrio.nocristina.dashboard;
import com.biotrio.nocristina.bookings.Booking;
import com.biotrio.nocristina.movies.Movie;
import com.biotrio.nocristina.screenings.Screening;
import com.biotrio.nocristina.theaters.Theater;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.awt.print.Book;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Controller
public class DashboardController<someMovie> {


    @GetMapping("/")
    public String dashboard() {
        return "index";
    }

}
