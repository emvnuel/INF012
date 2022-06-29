package io.github.emvnuel.chamados.dto;

import io.github.emvnuel.chamados.model.Usuario;

public record UsuarioResponse(String uid, String nome, String foto) {

    public UsuarioResponse(Usuario usuario) {
        this(usuario.getUid(), usuario.getNome(), usuario.getFoto());
    }

}
