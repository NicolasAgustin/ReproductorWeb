package com.reproweb.reproweb;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailService implements UserDetailsService {
    
    @Autowired
    private UsuariosRepo urepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuario u = urepo.findByEmail(email);

		if (u != null) {
			return new User(u.getEmail(), passwordEncoder.encode(u.getPassword()), new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with email: " + email);
		}
		// "$2a$04$tGp/Dh2vD6GzX33hy0g/4.24g9ssaX7x1jKmgR/noCpmQdIIyDR4G"
	}

	public UserDetails createUser(Usuario user) {
		return new User(user.getEmail(), passwordEncoder.encode(user.getPassword()), new ArrayList<>());
	}

}
