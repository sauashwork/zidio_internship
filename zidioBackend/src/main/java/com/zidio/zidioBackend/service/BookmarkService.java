package com.zidio.zidioBackend.service;

import com.zidio.zidioBackend.entity.Bookmark;
import com.zidio.zidioBackend.entity.Job;
import com.zidio.zidioBackend.repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private JobService jobService;

    public ResponseEntity<Bookmark> getBookmarkByJobIdAndStudentId(Long jobId, Long studentId) {
        if (jobId == null || studentId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<Bookmark> bookmark = bookmarkRepository.findByJobIdAndStudentId(jobId, studentId);
        return bookmark.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public ResponseEntity<Bookmark> createBookmark(Long jobId, Long studentId) {
        if (jobId == null || studentId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Bookmark bookmark = new Bookmark();
        bookmark.setJobId(jobId);
        bookmark.setStudentId(studentId);

        Bookmark savedBookmark = bookmarkRepository.save(bookmark);
        return ResponseEntity.ok(savedBookmark);
    }

    public ResponseEntity<List<Job>> getAllBookmarksByStudentId(Long studentId) {
        if (studentId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Long> jobIds = bookmarkRepository.findByStudentId(studentId)
                .stream()
                .map(Bookmark::getJobId)
                .collect(Collectors.toList());

        List<Job> jobs = jobService.getJobsByIds(jobIds);
        return ResponseEntity.ok(jobs);
    }
}
