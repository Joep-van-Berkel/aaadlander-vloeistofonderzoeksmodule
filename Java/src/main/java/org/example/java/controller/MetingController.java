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

    @GetMapping("/{metingID}")
    public List<Meting> getMetingenByMetingID(@PathVariable Long metingID) {
        return metingService.getMetingenByMetingID(metingID);
    }

    @PostMapping("/bulk")
    public List<Meting> createBulkMetingen(@RequestParam Long metingID, @RequestBody List<Double> temperaturen) {
        List<Meting> metingen = temperaturen.stream()
                .map(temp -> {
                    Meting meting = new Meting();
                    meting.setMetingID(metingID);
                    meting.setTemperatuur(temp);
                    return meting;
                })
                .toList();
        return metingService.saveAllMetingen(metingen);
    }
}