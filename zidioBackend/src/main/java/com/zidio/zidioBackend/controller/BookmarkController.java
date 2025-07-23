package com.zidio.zidioBackend.controller;

import com.zidio.zidioBackend.entity.Bookmark;
import com.zidio.zidioBackend.entity.Job;
import com.zidio.zidioBackend.repository.BookmarkRepository;
import com.zidio.zidioBackend.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/bookmarks")
public class BookmarkController {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private BookmarkService bookmarkService;

    @DeleteMapping("/{jobId}/{studentId}")
    public ResponseEntity<String> deleteBookmarkByJobIdStudentId(Long jobId, Long studentId) {
        bookmarkRepository.deleteByJobIdAndStudentId(jobId, studentId);
        return ResponseEntity.ok("Bookmark deleted successfully");
    }

    @GetMapping("/{jobId}/{studentId}")
    public ResponseEntity<Bookmark> getBookmarkByJobIdStudentId(Long jobId, Long studentId) {
        return bookmarkService.getBookmarkByJobIdAndStudentId(jobId, studentId);
    }

//    @PostMapping("/{jobId}/{studentId}")
//    public ResponseEntity<Bookmark> createBookmark(@PathVariable Long jobId, @PathVariable Long studentId) {
//        return bookmarkService.createBookmark(jobId, studentId);
//    }
     @PostMapping
    public ResponseEntity<Bookmark> createBookmark(@RequestBody Bookmark bookmark) {
        return bookmarkService.createBookmark(bookmark.getJobId(), bookmark.getStudentId());
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Job>> getAllBookmarksByStudentId(@PathVariable Long studentId) {
        return bookmarkService.getAllBookmarksByStudentId(studentId);
    }

    @GetMapping
    public List<Bookmark> getAllBookmarks() {
        return bookmarkRepository.findAll();
    }
}
