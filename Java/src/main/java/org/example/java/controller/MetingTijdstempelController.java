package org.example.java.controller;

import org.example.java.model.MetingTijdstempel;
import org.example.java.service.MetingTijdstempelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meting-tijdstempels")
public class MetingTijdstempelController {

    private final MetingTijdstempelService metingTijdstempelService;

    public MetingTijdstempelController(MetingTijdstempelService metingTijdstempelService) {
        this.metingTijdstempelService = metingTijdstempelService;
    }

    @GetMapping
    public List<MetingTijdstempel> getAllMetingTijdstempels() {
        return metingTijdstempelService.getAllMetingTijdstempels();
    }

    @PostMapping
    public MetingTijdstempel createMetingTijdstempel(@RequestBody MetingTijdstempel metingTijdstempel) {
        return metingTijdstempelService.saveMetingTijdstempel(metingTijdstempel);
    }
}