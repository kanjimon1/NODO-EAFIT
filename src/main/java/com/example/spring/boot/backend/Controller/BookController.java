package com.example.spring.boot.backend.Controller;
import com.example.spring.boot.backend.DTO.BookDTO;
import com.example.spring.boot.backend.Model.BookModel;
import com.example.spring.boot.backend.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import java.net.URI;
import java.util.List;

@Controller
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    /*public List<BookModel> getAllBooks() {
        return bookService.getAllBooks();
    }*/
    // Constructor para inyeccion de dependencias
    /*public BookController(BookService bookService) {
        this.bookService = bookService;
    }*/

    @GetMapping
    public String getAllBooks(Model model){
        List<BookModel> books = bookService.getAllBooks();
        //model.addAttribute("message", "Hello, Thymeleaf!");
        model.addAttribute("books",books);
        return  "book-list";
    }

    @GetMapping("/{id}")
    public BookModel getBook(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PostMapping
    public ResponseEntity<BookModel> createBook(@RequestBody BookDTO bookDTO) {
        BookModel createdBook = bookService.createBook(bookDTO);
        return ResponseEntity.created(URI.create("/api/books/" + createdBook.getId()))
                .body(createdBook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
