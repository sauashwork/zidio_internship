package com.zidio.zidioBackend.controller;

import com.zidio.zidioBackend.entity.UserSays;
import com.zidio.zidioBackend.repository.UserSaysRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/userSays")
public class UserSaysController {

    @Autowired
    private UserSaysRepository userSaysRepository;

    @GetMapping
    public List<UserSays> getAllUserSays() {
        return userSaysRepository.findAll();
    }
    @PostMapping
    public UserSays createUserSays(@RequestBody UserSays userSays) {
        return userSaysRepository.save(userSays);
    }

    @PutMapping
    public UserSays updateUserSays(@RequestBody UserSays userSays) {
        return userSaysRepository.save(userSays);
    }

    @DeleteMapping("/{id}")
    public void deleteUserSays(@PathVariable Long id) {
        userSaysRepository.deleteById(id);
    }
//
//    @DeleteMapping
//    public void deleteAllUserSays() {
//        userSaysRepository.deleteAll();
//    }
}
