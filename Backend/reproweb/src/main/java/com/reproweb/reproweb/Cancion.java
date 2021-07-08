package com.reproweb.reproweb;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "Canciones")
public class Cancion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    private String rawTitulo;
    private String path;
    private String titulo;

    public Cancion(){ }
    public Cancion(String titulo, String path){
        this.titulo = titulo.toLowerCase();
        this.rawTitulo = titulo;
        this.path = path;
    }
}