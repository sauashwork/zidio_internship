package com.project.lms.LibraryManagementSystem.service;

import com.project.lms.LibraryManagementSystem.model.Publisher;
import com.project.lms.LibraryManagementSystem.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;

    public void addPublisher(Publisher publisher) {
        publisherRepository.save(publisher);
    }

    public Publisher findPublisherByIdAndName(Long id, String name) {
        return publisherRepository.findByIdAndName(id, name);
    }

    public Publisher getPublisherById(Long id) {
        return this.publisherRepository.findAll()
                .stream().filter(publisher -> publisher.getPersonId().getId().equals(id)).findFirst().orElse(null);
    }

    public List<Publisher> getPublisherByName(String name) {
        return this.publisherRepository.findAll()
                .stream().filter(publisher -> publisher.getPersonId().getName().equals(name)).toList();
    }

    public List<Publisher> getPublisherByEmail(String email) {
        return this.publisherRepository.findAll()
                .stream().filter(publisher -> publisher.getEmail().equals(email)).toList();
    }

    public List<Publisher> getPublisherByCity(String city) {
        return this.publisherRepository.findAll()
                .stream().filter(publisher -> publisher.getCity().equals(city)).toList();
    }

    public List<Publisher> getPublisherByState(String state) {
        return this.publisherRepository.findAll()
                .stream().filter(publisher -> publisher.getState().equals(state)).toList();
    }

    public List<Publisher> getPublisherByCountry(String country) {
        return this.publisherRepository.findAll()
                .stream().filter(publisher -> publisher.getCountry().equals(country)).toList();
    }

    public List<Publisher> getPublisherByZip(String zip) {
        return this.publisherRepository.findAll()
                .stream().filter(publisher -> publisher.getZip().equals(zip)).toList();
    }

    public Publisher getPublisherByPhone(String phone) {
        return this.publisherRepository.findPublisherByPhone(phone);
    }

    public List<Publisher> getAllPublishers() {
        return this.publisherRepository.findAll();
    }

    public Publisher deletePublisherById(Long id) {
        Publisher publisher = this.getPublisherById(id);
        this.publisherRepository.delete(publisher);
        return publisher;
    }

    public List<Publisher> deletePublisherByName(String name) {
        List<Publisher> publishers = this.getPublisherByName(name);
        publishers.forEach(publisher -> this.publisherRepository.delete(publisher));
        return publishers;
    }

    public List<Publisher> deletePublisherByState(String state) {
        List<Publisher> publishers = this.getPublisherByState(state);
        publishers.forEach(publisher -> this.publisherRepository.delete(publisher));
        return publishers;
    }

    public List<Publisher> deletePublisherByCountry(String country) {
        List<Publisher> publishers = this.getPublisherByCountry(country);
        publishers.forEach(publisher -> this.publisherRepository.delete(publisher));
        return publishers;
    }

    public List<Publisher> deletePublisherByCity(String city) {
        List<Publisher> publishers = this.getPublisherByCity(city);
        publishers.forEach(publisher -> this.publisherRepository.delete(publisher));
        return publishers;
    }

    public List<Publisher> deletePublisherByEmail(String email) {
        List<Publisher> publishers = this.getPublisherByEmail(email);
        publishers.forEach(publisher -> this.publisherRepository.delete(publisher));
        return publishers;
    }

    public List<Publisher> deletePublisherByZip(String zip) {
        List<Publisher> publishers = this.getPublisherByZip(zip);
        publishers.forEach(publisher -> this.publisherRepository.delete(publisher));
        return publishers;
    }

    public Publisher deletePublisherByPhone(String phone) {
        Publisher publisher = this.getPublisherByPhone(phone);
        this.publisherRepository.delete(publisher);
        return publisher;
    }

    public void deleteAllPublishers() {
        this.publisherRepository.deleteAll();
    }

    public Publisher updatePublisher(Publisher publisher) {
        Publisher oldPublisher = this.getPublisherById(publisher.getPersonId().getId());
        oldPublisher.setPersonId(publisher.getPersonId());
        oldPublisher.getPersonId().setId(publisher.getPersonId().getId());
        oldPublisher.getPersonId().setName(publisher.getPersonId().getName());
        oldPublisher.setCity(publisher.getCity());
        oldPublisher.setCountry(publisher.getCountry());
        oldPublisher.setEmail(publisher.getEmail());
        oldPublisher.setPhone(publisher.getPhone());
        oldPublisher.setState(publisher.getState());
        oldPublisher.setZip(publisher.getZip());
        oldPublisher.setCreatedOn(publisher.getCreatedOn());
        oldPublisher.setUpdatedOn(LocalDateTime.now());
        this.publisherRepository.save(oldPublisher);
        return oldPublisher;
    }

    public Publisher minorUpdatePublisher(Publisher publisher) {
        Publisher oldPublisher = this.getPublisherById(publisher.getPersonId().getId());
        oldPublisher.setPersonId(publisher.getPersonId());
        oldPublisher.getPersonId().setId(publisher.getPersonId().getId());
        oldPublisher.getPersonId().setName(publisher.getPersonId().getName());
        oldPublisher.setCity(publisher.getCity());
        oldPublisher.setCountry(publisher.getCountry());
        oldPublisher.setEmail(publisher.getEmail());
        oldPublisher.setPhone(publisher.getPhone());
        oldPublisher.setState(publisher.getState());
        oldPublisher.setZip(publisher.getZip());
        oldPublisher.setCreatedOn(publisher.getCreatedOn());
        oldPublisher.setUpdatedOn(LocalDateTime.now());
        this.publisherRepository.save(oldPublisher);
        return oldPublisher;
    }
}
