package io.github.emvnuel.chamados.repository;

import io.github.emvnuel.chamados.model.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChamadoReposiory extends JpaRepository<Chamado, Long> {
}
