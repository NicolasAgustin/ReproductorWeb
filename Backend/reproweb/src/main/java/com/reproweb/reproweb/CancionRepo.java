package com.reproweb.reproweb;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CancionRepo extends JpaRepository<Cancion,Long> {
    List<Cancion> findByTituloLike(String titulo);
    List<Cancion> findByTitulo(String titulo);
}