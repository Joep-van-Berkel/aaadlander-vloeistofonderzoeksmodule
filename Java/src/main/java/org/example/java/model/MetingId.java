package org.example.java.model;

import java.io.Serializable;
import java.util.Objects;

public class MetingId implements Serializable {
    private Long metingId;
    private Double temperatuur;

    // Default constructor
    public MetingId() {}

    // Getters, Setters, equals, and hashCode
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MetingId metingId1 = (MetingId) o;
        return Objects.equals(metingId, metingId1.metingId) &&
                Objects.equals(temperatuur, metingId1.temperatuur);
    }

    @Override
    public int hashCode() {
        return Objects.hash(metingId, temperatuur);
    }
}