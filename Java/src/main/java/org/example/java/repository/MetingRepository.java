package org.example.java.repository;

import org.example.java.model.Meting;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MetingRepository extends JpaRepository<Meting, Long> {
    List<Meting> findByMetingID(Long metingID);
}