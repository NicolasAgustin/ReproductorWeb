package com.reproweb.reproweb;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailService jwtInMemoryUserDetailsService;

	@Autowired
	private RegistroService regService;

    @PostMapping("/login")
	public ResponseEntity<?> generateAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		System.out.println("En generateAuthenticationToken: " + authenticationRequest.getEmail() + " " + authenticationRequest.getPassword());

		authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

		final UserDetails userDetails = jwtInMemoryUserDetailsService.loadUserByUsername(authenticationRequest.getEmail());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUserAndSendToken(@RequestBody Usuario newUser) throws Exception {

		System.out.println("En register");

		regService.saveUser(newUser);

		final UserDetails userDetails = jwtInMemoryUserDetailsService.createUser(newUser);
		final String token = jwtTokenUtil.generateToken(userDetails);
	
		return ResponseEntity.ok(new JwtResponse(token)); 
	}

	private void authenticate(String email, String password) throws Exception {
		System.out.println("authenticate -> email: " + email + " password: " + password);
		Objects.requireNonNull(email);
		Objects.requireNonNull(password);
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("Credenciales invalidas", e);
		}
	}

}
