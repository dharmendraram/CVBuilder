package com.resumebuilderapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ResumebuilderapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResumebuilderapiApplication.class, args);
	}

}
