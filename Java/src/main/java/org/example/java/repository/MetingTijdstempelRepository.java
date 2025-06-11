package org.example.java.repository;

import org.example.java.model.MetingTijdstempel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MetingTijdstempelRepository extends JpaRepository<MetingTijdstempel, Long> {
    List<MetingTijdstempel> findAllByOrderByMetingIDDesc();
}