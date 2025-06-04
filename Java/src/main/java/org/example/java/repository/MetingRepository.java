package org.example.java.repository;

import org.example.java.model.MetingModel;
import org.example.java.model.MetingId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetingRepository extends JpaRepository<MetingModel, MetingId> {
}