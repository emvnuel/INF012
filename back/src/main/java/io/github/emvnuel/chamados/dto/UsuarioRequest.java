package io.github.emvnuel.chamados.dto;

import io.github.emvnuel.chamados.model.Usuario;

import javax.validation.constraints.NotEmpty;

public record UsuarioRequest(
        @NotEmpty String uid,
        @NotEmpty String nome) {

    public Usuario toModel() {
        return new Usuario(uid, nome);
    }
}
