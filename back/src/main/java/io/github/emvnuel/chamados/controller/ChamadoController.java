package io.github.emvnuel.chamados.controller;

import io.github.emvnuel.chamados.dto.ChamadoRequest;
import io.github.emvnuel.chamados.dto.ChamadoResponse;
import io.github.emvnuel.chamados.model.Chamado;
import io.github.emvnuel.chamados.repository.ChamadoReposiory;
import io.github.emvnuel.chamados.repository.ClienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chamados")
public class ChamadoController {

    private final ChamadoReposiory repository;
    private final ClienteRepository clienteRepository;

    public ChamadoController(ChamadoReposiory repository, ClienteRepository clienteRepository) {
        this.repository = repository;
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    @PostMapping
    public ResponseEntity<?> salvarChamado(@Valid @RequestBody ChamadoRequest request, ServletUriComponentsBuilder builder) {
        Chamado chamado = repository.save(request.toModel(clienteRepository));
        URI uri = builder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(chamado.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @Transactional(readOnly = true)
    @GetMapping
    public ResponseEntity<List<ChamadoResponse>> buscar() {
        return ResponseEntity.ok(repository.findAll().stream().map(ChamadoResponse::new).collect(Collectors.toList()));
    }

    @Transactional(readOnly = true)
    @GetMapping("/{id}")
    public ResponseEntity<ChamadoResponse> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(chamado -> ResponseEntity.ok(new ChamadoResponse(chamado)))
                .orElse(ResponseEntity.notFound().build());
    }

}
