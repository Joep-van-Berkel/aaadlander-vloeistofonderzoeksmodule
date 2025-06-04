package org.example.java.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MetingTijdstempel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long metingID;

    private String metingTijdstempel;

    // Getters and Setters
    public Long getMetingID() {
        return metingID;
    }

    public void setMetingID(Long metingID) {
        this.metingID = metingID;
    }

    public String getMetingTijdstempel() {
        return metingTijdstempel;
    }

    public void setMetingTijdstempel(String metingTijdstempel) {
        this.metingTijdstempel = metingTijdstempel;
    }
}