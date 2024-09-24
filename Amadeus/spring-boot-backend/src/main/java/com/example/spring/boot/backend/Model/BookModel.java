package com.example.spring.boot.backend.Model;

import java.time.LocalDateTime;
import java.text.SimpleDateFormat;

public class BookModel {
    private Long id;
    private String title;
    private String author;
    private LocalDateTime publication;
    private String summary;  // Campo adicional que no existe en la entidad

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDateTime getPublication() {
        return publication;
    }

    public void setPublication(LocalDateTime publication) {
        this.publication = publication;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getFormattedPublicationDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        return sdf.format(this.publication);
    }
}
