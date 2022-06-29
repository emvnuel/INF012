package io.github.emvnuel.chamados.controller;

import io.github.emvnuel.chamados.dto.UsuarioRequest;
import io.github.emvnuel.chamados.dto.UsuarioResponse;
import io.github.emvnuel.chamados.dto.UsuarioUpdateRequest;
import io.github.emvnuel.chamados.model.Usuario;
import io.github.emvnuel.chamados.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @PostMapping
    public ResponseEntity<?> criarUsuario(@Valid @RequestBody UsuarioRequest request, ServletUriComponentsBuilder builder) {
        Usuario usuario = request.toModel();
        repository.save(usuario);
        URI uri = builder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(usuario.getUid()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @Transactional(readOnly = true)
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obterUsuarioPorUid(@PathVariable String id) {
        return repository.findById(id)
                .map(usuario -> new UsuarioResponse(usuario)).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarUsuario(@Valid @RequestBody UsuarioUpdateRequest request, @PathVariable String id) throws IOException {
        return repository.findById(id)
                .map(usuario -> {
                    usuario.atualizar(request.nome(), request.foto());
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());

    }


}
