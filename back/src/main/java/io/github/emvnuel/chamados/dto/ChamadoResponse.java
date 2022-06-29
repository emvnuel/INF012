package io.github.emvnuel.chamados.dto;

import io.github.emvnuel.chamados.model.Assunto;
import io.github.emvnuel.chamados.model.Chamado;
import io.github.emvnuel.chamados.model.Status;

import java.time.LocalDate;

public record ChamadoResponse(Long id, String nomeCliente, Long idCliente, Status status, Assunto assunto, String complemento, LocalDate criadoEm) {

    public ChamadoResponse(Chamado chamado) {
        this(chamado.getId(), chamado.getCliente().getNome(), chamado.getCliente().getId(), chamado.getStatus(), chamado.getAssunto(), chamado.getComplemento(), chamado.getCriadoEm());
    }
}
