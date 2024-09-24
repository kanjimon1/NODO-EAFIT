package com.example.spring.boot.backend.DTO;

//import java.util.Date;
import java.time.LocalDateTime;

public class BookDTO {
    private String title;
    private String author;
    private LocalDateTime publication;

    public BookDTO(String title, String author, LocalDateTime publication) {
        this.title = title;
        this.author = author;
        this.publication = publication;
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
}
