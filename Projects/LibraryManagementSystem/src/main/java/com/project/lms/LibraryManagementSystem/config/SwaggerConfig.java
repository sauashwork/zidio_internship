package com.project.lms.LibraryManagementSystem.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;


@OpenAPIDefinition(
        info=@Info(
                title="Welcome to Library Management System",
                description =
                        "Library Management System where you can explore a vast collection of books, along with detailed information about their authors, publishers, and more. Our system is designed to make it easy for you to access all the information you need about your favorite books." +
                        "<br/><br/>" +
                        "**Features**:" +
                        "<br/><font color=\"green\">📚**Book Details**:</font> Utilize the Book Controller to access comprehensive details about any book in our library. Whether you're searching by id, book name, author, or any other factor, our system allows you to quickly retrieve the information you're looking for. See the example provided in each API endpoint to understand the required fields and simply hit execute to get the details of the API call." +
                        "<br/><br/><font color=\"green\">✍️**Author Details**:</font> Need more information about a specific author? Our Author Controller is here to help. Easily find details about the authors of your favorite books and explore their other works. If you provide details of an author, those details will automatically be included in the author databases. If you only need to add author details, you can do so in the Author Controller. See the example provided in each API endpoint to understand the required fields and simply hit execute to get the details of the API call." +
                        "<br/><br/><font color=\"green\">📢**Publisher Details**:</font> Explore information about the publishers behind the books. Use the Publisher Controller to discover more about the publishing houses associated with the books in our library. If you provide details of an publisher, those details will automatically be included in the publisher databases. If you only need to add publisher details, you can do so in the Publisher Controller. See the example provided in each API endpoint to understand the required fields and simply hit execute to get the details of the API call." +
                        "<br/><br/>" +
                        "We are dedicated to providing you with a seamless and enriching library experience. Happy reading!📖",
                summary = "Swagger API Documentation for Library Management System",
                version = "1.0.0",
                termsOfService = "http://swagger.io/terms/",
                contact = @Contact(
                        name = "Saumya Raj 📧",
                        email = "Onlycoding143@gmail.com"
                ),
                license = @License(
                        name = "LMS License 1.0.0"
                )
        ),
        servers = @Server(
                description = "Local Environment",
                url = "http://localhost:8080"
        )
)
public class SwaggerConfig {

}
