package org.example.java.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class MetingTijdstempelModel {

    @Id
    private Long metingID;

    private String metingTijdstempel;


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
