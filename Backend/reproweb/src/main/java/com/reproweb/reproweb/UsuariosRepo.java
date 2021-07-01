package com.reproweb.reproweb;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuariosRepo extends JpaRepository<Usuario,Long> {
    Usuario findByUsername(String username);
    Usuario findByEmail(String email);
}
