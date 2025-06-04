package org.example.java.service;

import org.example.java.model.Meting;
import org.example.java.repository.MetingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetingService {

    private final MetingRepository metingRepository;

    public MetingService(MetingRepository metingRepository){
        this.metingRepository = metingRepository;
    }

    public List<Meting> getAllMetingen(){
        return metingRepository.findAll();
    }

    public Meting saveMeting(Meting meting){
        return metingRepository.save(meting);
    }
}
