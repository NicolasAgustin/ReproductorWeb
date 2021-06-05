package com.reproweb.reproweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RepService{

    @Autowired
    private CancionRepo songRepo;

    public List<Cancion> getSongs(){
        return songRepo.findAll();
    }

    public List<Cancion> getSongNames(String value){
        return songRepo.findByTituloLike("%"+value+"%");
    }

    public List<Cancion> getSongName(String value){
        return songRepo.findByTitulo(value);
    }

}
