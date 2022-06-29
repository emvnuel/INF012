package io.github.emvnuel.chamados.dto;

import javax.validation.constraints.NotEmpty;

public record UsuarioUpdateRequest(@NotEmpty String nome, String foto) {
}
