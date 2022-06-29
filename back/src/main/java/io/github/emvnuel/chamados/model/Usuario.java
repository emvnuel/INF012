package io.github.emvnuel.chamados.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USUARIOS")
public class Usuario {

    @Id
    private String uid;
    private String nome;
    @Column(length = 1000000000)
    private String foto;

    protected Usuario() {
    }

    public Usuario(String uid, String nome) {
        this.uid = uid;
        this.nome = nome;
    }

    public String getUid() {
        return uid;
    }

    public String getNome() {
        return nome;
    }

    public String getFoto() {
        return foto;
    }

    public void atualizar(String nome, String foto) {
        this.nome = nome;
        this.foto = foto;
    }

}
