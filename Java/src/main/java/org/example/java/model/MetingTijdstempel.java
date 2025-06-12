package org.example.java.model;

import jakarta.persistence.*;

@Entity
public class MetingTijdstempel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long metingID;

    @Column(nullable = false)
    private String tijdstempel;

    // Getters and Setters
    public Long getMetingID() {
        return metingID;
    }

    public void setMetingID(Long metingID) {
        this.metingID = metingID;
    }

    public String getTijdstempel() {
        return tijdstempel;
    }

    public void setTijdstempel(String tijdstempel) {
        this.tijdstempel = tijdstempel;
    }
}