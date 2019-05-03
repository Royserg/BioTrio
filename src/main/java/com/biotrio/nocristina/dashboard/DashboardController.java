package com.biotrio.nocristina.dashboard;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    @GetMapping("/")
    public String dashboard() {
        return "index";
    }

    // add future mappings below
    // maybe functionality to add more theaters??

}
