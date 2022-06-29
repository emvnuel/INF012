package io.github.emvnuel.chamados.repository;

import io.github.emvnuel.chamados.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
