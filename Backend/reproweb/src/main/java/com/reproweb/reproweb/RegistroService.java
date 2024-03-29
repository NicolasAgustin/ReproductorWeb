package com.reproweb.reproweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistroService {
    
    @Autowired
    private UsuariosRepo urepo;

    /**
     * Intento guardar un usuario en la base de datos
     */
    boolean saveUser(Usuario newUser){
        try{
            urepo.save(newUser);
            System.out.println("Usuario guardado: " + newUser.getEmail() + " " + newUser.getUsername());
            return true;
        } catch(Exception e){
            return false;
        }
    }

    Usuario getUserByEmail(String email) {
        Usuario found = urepo.findByEmail(email);
        return found;
    }

}
