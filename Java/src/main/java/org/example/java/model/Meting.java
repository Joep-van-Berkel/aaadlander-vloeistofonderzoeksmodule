package org.example.java.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(MetingId.class)
public class Meting {

    @Id
    private Long metingID;

    @Id
    private Double temperatuur;

    @ManyToOne
    @JoinColumn(name = "metingID", insertable = false, updatable = false)
    private MetingTijdstempel metingTijdstempel;

    // Getters and Setters
    public Long getMetingID() {
        return metingID;
    }

    public void setMetingID(Long metingID) {
        this.metingID = metingID;
    }

    public Double getTemperatuur() {
        return temperatuur;
    }

    public void setTemperatuur(Double temperatuur) {
        this.temperatuur = temperatuur;
    }

    public MetingTijdstempel getMetingTijdstempel() {
        return metingTijdstempel;
    }

    public void setMetingTijdstempel(MetingTijdstempel metingTijdstempel) {
        this.metingTijdstempel = metingTijdstempel;
    }
}