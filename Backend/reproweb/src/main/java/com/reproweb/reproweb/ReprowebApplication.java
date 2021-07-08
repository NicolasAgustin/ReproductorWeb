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

			// Al inicio de la aplicacion creo el array de canciones del directorio local
			List<Cancion> lista = fm.makeCancionesArray();
			// Guardo en el repositorio cada cancion
			for(Cancion c: lista){
				System.out.println("Saved " + c.getRawTitulo());
				crepo.save(c);
			}

			// Usuario por defecto del sistema, con el fin de testing
			Usuario u = new Usuario();
			u.setEmail("nico@gmail.com");
			u.setPassword("pass123");
			u.setUsername("nicolas");
			/////////////////////////////////////////////////////////

			urepo.save(u);
		};
	}

}
