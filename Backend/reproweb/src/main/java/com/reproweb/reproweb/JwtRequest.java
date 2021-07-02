package com.reproweb.reproweb;

import lombok.Data;

@Data
public class JwtRequest {

    private static final long serialVersionUID = 5926468583005150707L;

	private String email;
	private String password;

	//default constructor for JSON Parsing
	public JwtRequest(){}

	public JwtRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
