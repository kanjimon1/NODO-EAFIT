package com.example.spring.boot.backend.Entities;

import jakarta.persistence.*;

import java.util.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String author;
    private LocalDateTime publication;

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

    @Column(name = "publication")
    @Temporal(TemporalType.TIMESTAMP)
    public void setPublication(LocalDateTime publication) {
        this.publication = publication;
    }
}
