package io.github.emvnuel.chamados.dto;

import io.github.emvnuel.chamados.model.Assunto;
import io.github.emvnuel.chamados.model.Chamado;
import io.github.emvnuel.chamados.model.Status;
import io.github.emvnuel.chamados.repository.ClienteRepository;

public record ChamadoRequest(Long clienteId, Assunto assunto, Status status, String complemento) {

    public Chamado toModel(ClienteRepository repository) {
        return new Chamado(
            repository.findById(clienteId).orElseThrow(IllegalStateException::new),
            assunto,
            status,
            complemento
        );
    }
}
