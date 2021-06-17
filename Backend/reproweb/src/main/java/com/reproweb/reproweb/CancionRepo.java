package com.reproweb.reproweb;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CancionRepo extends JpaRepository<Cancion,Long> {
    List<Cancion> findByTituloLike(String titulo);
    List<Cancion> findByTitulo(String titulo);
    Optional<Cancion> findById(Long id);
}