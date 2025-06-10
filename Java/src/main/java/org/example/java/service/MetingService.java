package org.example.java.service;

import org.example.java.model.Meting;
import org.example.java.repository.MetingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetingService {

    private final MetingRepository metingRepository;

    public MetingService(MetingRepository metingRepository) {
        this.metingRepository = metingRepository;
    }

    public List<Meting> saveAllMetingen(List<Meting> metingen) {
        return metingRepository.saveAll(metingen);
    }

    public List<Meting> getMetingenByMetingID(Long metingID) {
        return metingRepository.findByMetingID(metingID);
    }
}