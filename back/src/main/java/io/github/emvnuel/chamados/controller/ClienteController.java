package io.github.emvnuel.chamados.controller;

import io.github.emvnuel.chamados.dto.ClienteRequest;
import io.github.emvnuel.chamados.dto.ClienteResponse;
import io.github.emvnuel.chamados.model.Cliente;
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
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteRepository repository;

    public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @PostMapping
    public ResponseEntity<ClienteResponse> salvarCliente(@Valid @RequestBody ClienteRequest request, ServletUriComponentsBuilder builder) {
        Cliente cliente = repository.save(request.toModel());
        URI uri = builder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(cliente.getId()).toUri();
        return ResponseEntity.created(uri).body(new ClienteResponse(cliente));
    }

    @Transactional(readOnly = true)
    @GetMapping
    public ResponseEntity<List<ClienteResponse>> buscar() {
        return ResponseEntity.ok(repository.findAll().stream().map(ClienteResponse::new).collect(Collectors.toList()));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> apagar(@PathVariable Long id) {
        return repository.findById(id)
                .map(cliente -> {
                    repository.delete(cliente);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
