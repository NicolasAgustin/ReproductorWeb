package com.reproweb.reproweb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class RegistroController {
    
    @Autowired
    private RegistroService rservice;

    @PostMapping("/register")
    public void registerUser(@RequestBody Usuario newUser){
        System.out.println("Metodo: registerUser -> VERBO: POST " + newUser.getUsername() + " " + newUser.getEmail());
        if(rservice.saveUser(newUser)){
            System.out.println("User " + newUser.getUsername() + " saved");
        } else {
            System.out.println("User " + newUser.getUsername() + " not saved");
        }
    }

    @PostMapping("/login")
    public void loginUser(@RequestBody UserLoginRequest user){
        System.out.println("username:" + user.getEmail() + " password:" + user.getPassword());
        Usuario userFound = rservice.getUserByEmail(user.getEmail());
        if(userFound != null) {
            if(userFound.getPassword().equals(user.getPassword())){
                System.out.println("Logeo con exito");
            } else {
                System.out.println("Contrasena incorrecta");
            }
        } else {
            System.out.println("User not found");
        }
    }

}
