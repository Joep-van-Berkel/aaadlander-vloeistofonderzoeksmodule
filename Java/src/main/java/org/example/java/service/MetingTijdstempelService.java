package org.example.java.service;

import org.example.java.model.MetingTijdstempel;
import org.example.java.repository.MetingTijdstempelRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MetingTijdstempelService {

    private final MetingTijdstempelRepository metingTijdstempelRepository;

    public MetingTijdstempelService(MetingTijdstempelRepository metingTijdstempelRepository) {
        this.metingTijdstempelRepository = metingTijdstempelRepository;
    }

    public MetingTijdstempel createMetingTijdstempel() {
        MetingTijdstempel metingTijdstempel = new MetingTijdstempel();
        metingTijdstempel.setMetingTijdstempel(LocalDateTime.now());
        return metingTijdstempelRepository.save(metingTijdstempel);
    }

    public List<MetingTijdstempel> getAllMetingTijdstempels() {
        return metingTijdstempelRepository.findAll();
    }
}