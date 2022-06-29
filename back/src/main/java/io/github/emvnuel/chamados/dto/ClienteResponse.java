package io.github.emvnuel.chamados.dto;


import io.github.emvnuel.chamados.model.Cliente;

import java.time.LocalDate;

public record ClienteResponse(Long id, String nome, String cnpj, String endereco, LocalDate criadoEm) {

    public ClienteResponse(Cliente cliente) {
        this(cliente.getId(), cliente.getNome(), cliente.getCnpj(), cliente.getEndereco(), cliente.getCadastradoEm());
    }
}
