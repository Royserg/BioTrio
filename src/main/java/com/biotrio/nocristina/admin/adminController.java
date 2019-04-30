package com.biotrio.nocristina.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class adminController {

    @GetMapping("/")
    public String indexPage() {
        return "index.html";
    }
}
