package com.reproweb.reproweb;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String email;
    private String password;

    public UserLoginRequest(String email, String pass){
        this.email = email;
        this.password = pass;
    }

}
