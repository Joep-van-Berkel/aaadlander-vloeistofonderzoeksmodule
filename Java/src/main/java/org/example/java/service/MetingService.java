package org.example.java.service;

import org.example.java.model.MetingModel;
import org.example.java.repository.MetingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetingService {

    private final MetingRepository metingRepository;

    public MetingService(MetingRepository metingRepository){
        this.metingRepository = metingRepository;
    }

    public List<MetingModel> getAllMetingen(){
        return metingRepository.findAll();
    }

    public MetingModel saveMeting(MetingModel metingModel){
        return metingRepository.save(metingModel);
    }
}
