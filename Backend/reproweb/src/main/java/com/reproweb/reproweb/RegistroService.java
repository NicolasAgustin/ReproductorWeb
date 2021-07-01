package com.reproweb.reproweb;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
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

    Usuario getUserByEmail(String email) {
        // Example<Usuario> user = Example.of(u);
        Usuario found = urepo.findByEmail(email);
        return found;
        // Optional<Usuario> userFound = urepo.findOne(user);
        // if(userFound.isPresent()){
        //     throw new Exception("USER NOT FOUND");
        // } else {
        //     return userFound.get();
        // }
    }

}
