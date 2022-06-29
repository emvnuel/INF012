package io.github.emvnuel.chamados.dto;

import io.github.emvnuel.chamados.model.Cliente;

import javax.validation.constraints.NotEmpty;

public record ClienteRequest(@NotEmpty String nome, @NotEmpty String cnpj, @NotEmpty String endereco) {

    public Cliente toModel() {
        return new Cliente(nome, cnpj, endereco);
    }
}
