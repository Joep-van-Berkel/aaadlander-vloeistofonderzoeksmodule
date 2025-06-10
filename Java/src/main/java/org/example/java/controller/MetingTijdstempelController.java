package org.example.java.controller;

import org.example.java.model.MetingTijdstempel;
import org.example.java.service.MetingTijdstempelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/meting-tijdstempels")
public class MetingTijdstempelController {

    private final MetingTijdstempelService metingTijdstempelService;

    public MetingTijdstempelController(MetingTijdstempelService metingTijdstempelService) {
        this.metingTijdstempelService = metingTijdstempelService;
    }

    @PostMapping
    public Long createMetingTijdstempel() {
        MetingTijdstempel metingTijdstempel = metingTijdstempelService.createMetingTijdstempel();
        return metingTijdstempel.getMetingID();
    }

    @GetMapping
    public List<MetingTijdstempel> getAllMetingTijdstempels() {
        return metingTijdstempelService.getAllMetingTijdstempels();
    }
}