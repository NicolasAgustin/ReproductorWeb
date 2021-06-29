package com.reproweb.reproweb;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Para testear con curl:
 *      Metodo GET: curl -X GET http://localhost:8080/canciones
 *      Metodo POST: curl -X POST -H "Content-type: application/json" -d '{(clave:valor)}' http://localhost:8080/canciones/submit
 */

@RestController
@CrossOrigin
@RequestMapping("/canciones")
public class ReproductorController {

    @Autowired
    private RepService rservice; 

    @GetMapping
    public List<Cancion> getAll(){
        return rservice.getSongs();
    }

    @GetMapping("/buscar/{nombre}")
    public List<Cancion> getSongsByName(@PathVariable("nombre") String nombre){
        System.out.println("Connected: buscar cancion por nombre");
        return rservice.getSongNames(nombre.toLowerCase());
    }

    @PostMapping("/submit")
    public void postSong(@RequestBody Cancion received){
        System.out.println("Metodo: postSong -> HTTP: POST " + received.getTitulo() + " " + received.getPath());
        if(rservice.guardarCancion(received)){
            System.out.println("Song " + received.getTitulo() + " saved");
        } else {
            System.out.println("Song " + received.getTitulo() + " not saved");
        }
    }

    @GetMapping(
        value = "/getFile/{id}",
        produces = MediaType.APPLICATION_OCTET_STREAM_VALUE
        )
    public @ResponseBody byte[] getFile(@PathVariable("id") Long id) throws IOException {
        InputStream in = null;
        try{
            Optional<Cancion> cancionResult = rservice.getSongById(id);

            Cancion tmp = cancionResult.get();

            File audioFile = new File(tmp.getPath());

            System.out.println("Metodo getFile" + audioFile.getAbsolutePath());

            in = new FileInputStream(audioFile);

            return in.readAllBytes();
        }catch(Exception e){
            return null;
        } finally {
            if(in != null){
                in.close();
            }
        }
    }

    @GetMapping("/getSong/{id}")
    public Cancion getSongById(@PathVariable("id") Long id){
        Optional<Cancion> result = rservice.getSongById(id);
        return result.get();
    }

}


