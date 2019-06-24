package com.biotrio.nocristina.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebpageController {


    @GetMapping("/page")
    public String index() {
        return "index";
    }

}
