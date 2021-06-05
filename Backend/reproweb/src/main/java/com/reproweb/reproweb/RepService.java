package com.reproweb.reproweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RepService{

    @Autowired
    private CancionRepo cancionesRepo;

    public List<Cancion> getSongs(){
        return cancionesRepo.findAll();
    }

    public List<Cancion> getSongNames(String value){
        return cancionesRepo.findByTituloLike("%"+value+"%");
    }

    public List<Cancion> getSongName(String value){
        return cancionesRepo.findByTitulo(value);
    }

    public boolean guardarCancion(Cancion c) {
        try {
            c.setRawTitulo(c.getTitulo().toLowerCase());
            cancionesRepo.save(c);
            return true;
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            return false;
        }
    }
}
