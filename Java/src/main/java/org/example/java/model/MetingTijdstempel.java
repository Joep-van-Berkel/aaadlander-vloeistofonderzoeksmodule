package org.example.java.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class MetingTijdstempel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long metingID;

    private LocalDateTime metingTijdstempel;

    // Getters and Setters
    public Long getMetingID() {
        return metingID;
    }

    public void setMetingID(Long metingID) {
        this.metingID = metingID;
    }

    public LocalDateTime getMetingTijdstempel() {
        return metingTijdstempel;
    }

    public void setMetingTijdstempel(LocalDateTime metingTijdstempel) {
        this.metingTijdstempel = metingTijdstempel;
    }
}