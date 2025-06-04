package org.example.java.controller;

import org.example.java.model.Meting;
import org.example.java.service.MetingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/metingen")
public class MetingController {

    private final MetingService metingService;

    public MetingController(MetingService metingService) {
        this.metingService = metingService;
    }

    @GetMapping
    public List<Meting> getAllMetingen() {
        return metingService.getAllMetingen();
    }

    @PostMapping
    public Meting createMeting(@RequestBody Meting meting) {
        return metingService.saveMeting(meting);
    }
}