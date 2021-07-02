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
	public CommandLineRunner onInit(CancionRepo crepo, FileManager fm, UsuariosRepo urepo){ 
		return (args) -> {

			List<Cancion> lista = fm.makeCancionesArray();
			for(Cancion c: lista){
				System.out.println("Saved " + c.getRawTitulo());
				crepo.save(c);
			}

			Usuario u = new Usuario();
			u.setEmail("nickrak10@gmail.com");
			u.setPassword("pass123");
			u.setUsername("nicolas");

			urepo.save(u);


		};
	}

}
