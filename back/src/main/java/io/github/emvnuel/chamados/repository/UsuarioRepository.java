package io.github.emvnuel.chamados.repository;

import io.github.emvnuel.chamados.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
}
