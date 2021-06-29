package com.reproweb.reproweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistroService {
    
    @Autowired
    private UsuariosRepo urepo;

    boolean saveUser(Usuario newUser){
        try{
            urepo.save(newUser);
            return true;
        } catch(Exception e){
            return false;
        }
        
    }

}
