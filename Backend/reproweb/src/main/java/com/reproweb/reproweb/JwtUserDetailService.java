package com.reproweb.reproweb;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// @Service
// public class JwtUserDetailService implements UserDetailsService {
    
//     @Autowired
//     private UsuariosRepo urepo;

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

//         Usuario u = urepo.findByUsername(username);

// 		if (u.getUsername().equals(username)) {
// 			return new User("techgeeknext", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",new ArrayList<>());
// 		} else {
// 			throw new UsernameNotFoundException("User not found with username: " + username);
// 		}
// 	}

// }
