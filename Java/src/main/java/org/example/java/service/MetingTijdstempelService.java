package org.example.java.service;

import org.example.java.model.MetingTijdstempelModel;
import org.example.java.repository.MetingTijdstempelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetingTijdstempelService {

    private final MetingTijdstempelRepository metingTijdstempelRepository;

    public MetingTijdstempelService(MetingTijdstempelRepository metingTijdstempelRepository) {
        this.metingTijdstempelRepository = metingTijdstempelRepository;
    }

    public List<MetingTijdstempelModel> getAllMetingTijdstempels() {
        return metingTijdstempelRepository.findAll();
    }

    public MetingTijdstempelModel saveMetingTijdstempel(MetingTijdstempelModel metingTijdstempelModel) {
        return metingTijdstempelRepository.save(metingTijdstempelModel);
    }
}