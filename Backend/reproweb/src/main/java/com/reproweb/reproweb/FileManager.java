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
        this.rootPath = "C:\\Users\\Nico\\Desktop\\Musica";
        this.root = new File(this.rootPath);
        this.paths = this.root.list();
        for(String x: this.paths){
            System.out.println(x);
        } 
    }

    public List<Cancion> makeCancionesArray(){

        if(this.paths != null){

            List<Cancion> lista = new ArrayList<Cancion>(); 
            for(int i=0;i < this.paths.length;i++){
                String aux = this.rootPath + "\\" + this.paths[i];
                lista.add(new Cancion(this.paths[i], aux));
            }
            return lista;
        }
        return null;
    }


}
