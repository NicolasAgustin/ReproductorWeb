package com.reproweb.reproweb;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ReprowebApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReprowebApplication.class, args);
	}

	@Bean
	public CommandLineRunner onInit(CancionRepo crepo){ 
		return (args) -> {
			System.out.println("Metodo onInit: Web Service deployed");
			Cancion c1 = new Cancion("Genesis - Grimes", "C:\\Users\\Musica\\Genesis.mp3");
			crepo.save(c1);
		};
	}

}
