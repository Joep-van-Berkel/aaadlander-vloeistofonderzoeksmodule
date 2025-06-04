package org.example.java.model;

import java.io.Serializable;
import java.util.Objects;

public class MetingId implements Serializable {
    private Long metingID;
    private Double temperatuur;

    // Default constructor
    public MetingId() {}

    // Getters, Setters, equals, and hashCode
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MetingId metingId = (MetingId) o;
        return Objects.equals(metingID, metingId.metingID) &&
                Objects.equals(temperatuur, metingId.temperatuur);
    }

    @Override
    public int hashCode() {
        return Objects.hash(metingID, temperatuur);
    }
}