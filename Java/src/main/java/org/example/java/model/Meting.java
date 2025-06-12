package org.example.java.model;

import jakarta.persistence.*;

@Entity
public class Meting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long temperatuurID;

    @Column(name = "metingID", nullable = false)
    private Long metingID;

    @Column(nullable = false)
    private Double temperatuur;

    // Getters and Setters
    public Long getMeasurementID() {
        return temperatuurID;
    }

    public void setMeasurementID(Long measurementID) {
        this.temperatuurID = measurementID;
    }

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
}