package com.example.spring.boot.backend.Configuration;

import com.example.spring.boot.backend.DTO.BookDTO;
import com.example.spring.boot.backend.Service.BookService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(BookService bookService){
        return args -> {
            bookService.createBook(new BookDTO("987","123", LocalDateTime.now()));
            bookService.createBook(new BookDTO("654","456", LocalDateTime.now()));
            bookService.createBook(new BookDTO("321","789", LocalDateTime.now()));
            System.out.println("Datos de inicio ingresados");
        };
    }
}
