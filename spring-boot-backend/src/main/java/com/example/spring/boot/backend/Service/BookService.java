package com.example.spring.boot.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.spring.boot.backend.Repositories.BookRepository;
import com.example.spring.boot.backend.Model.BookModel;
import com.example.spring.boot.backend.Entities.Book;
import com.example.spring.boot.backend.DTO.BookDTO;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<BookModel> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream()
                .map(this::convertToModel)
                .collect(Collectors.toList());
    }

    public BookModel getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Libro no encontrado"));
        return convertToModel(book);
    }

    public BookModel createBook(BookDTO bookDTO) {
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setPublication(bookDTO.getPublication());

        book = bookRepository.save(book);
        System.out.println("libro creado: " + book.getTitle());
        return convertToModel(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    private BookModel convertToModel(Book book) {
        BookModel model = new BookModel();
        model.setId(book.getId());
        model.setTitle(book.getTitle());
        model.setAuthor(book.getAuthor());
        model.setPublication(book.getPublication());
        // Aqui podrias agregar logica para establecer el summary
        return model;
    }
}
