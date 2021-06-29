package com.reproweb.reproweb;

import java.util.List;

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
	public CommandLineRunner onInit(CancionRepo crepo, FileManager fm){ 
		return (args) -> {

			List<Cancion> lista = fm.makeCancionesArray();
			for(Cancion c: lista){
				System.out.println("Saved " + c.getRawTitulo());
				crepo.save(c);
			}
			// System.out.println("Metodo onInit: Web Service deployed");
			// Cancion c1 = new Cancion("Pictures of you - The cure", "C:\\Users\\Nico\\Desktop\\Musica\\Pictures.mp3");
			// crepo.save(c1);
			// Cancion c2 = new Cancion("Dancing with myself - Billy Idol", "C:\\Users\\Nico\\Desktop\\Musica\\Dancing.mp3");
			// crepo.save(c2);
		};
	}

}
