package org.example.java.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(MetingId.class)
public class MetingModel {

    @Id
    private Long metingId;

    @Id
    private Double temperatuur;

    // Getters and Setters
    public Long getMetingId() {
        return metingId;
    }

    public void setMetingId(Long metingId) {
        this.metingId = metingId;
    }

    public Double getTemperatuur() {
        return temperatuur;
    }

    public void setTemperatuur(Double temperatuur) {
        this.temperatuur = temperatuur;
    }
}