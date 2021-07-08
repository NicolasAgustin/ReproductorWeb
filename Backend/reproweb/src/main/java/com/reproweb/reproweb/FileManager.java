package com.reproweb.reproweb;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class FileManager {
    
    private String[] paths;
    private File root;
    private String rootPath;

    public FileManager(){
        // Path al directorio principal
        this.rootPath = "C:\\Users\\Nico\\Desktop\\Musica";
        // Obtengo el directorio principal
        this.root = new File(this.rootPath);
        // Obtengo los paths de todos los archivos dentro del directorio
        this.paths = this.root.list();
        for(String x: this.paths){
            System.out.println(x);
        } 
    }

    /**
     * Crea una lista con todas las canciones del directorio
     * @return
     */
    public List<Cancion> makeCancionesArray(){
        // Si el arreglo de paths no es nulo
        if(this.paths != null){
            List<Cancion> lista = new ArrayList<Cancion>(); 
            // Recorro cada path y agrego a la lista de canciones una nueva instancia de Cancion con el nombre de la cancion y el path absoluto
            for(int i=0;i < this.paths.length;i++){
                String aux = this.rootPath + "\\" + this.paths[i];
                lista.add(new Cancion(this.paths[i], aux));
            }
            return lista;
        }
        return null;
    }
}
