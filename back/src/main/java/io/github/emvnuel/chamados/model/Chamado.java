package io.github.emvnuel.chamados.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "CHAMADOS")
public class Chamado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Enumerated(EnumType.STRING)
    private Assunto assunto;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String complemento;

    private LocalDate criadoEm;

    protected Chamado() {
    }

    public Chamado(Cliente cliente, Assunto assunto, Status status, String complemento) {
        this.cliente = cliente;
        this.assunto = assunto;
        this.status = status;
        this.complemento = complemento;
        this.criadoEm = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Assunto getAssunto() {
        return assunto;
    }

    public Status getStatus() {
        return status;
    }

    public String getComplemento() {
        return complemento;
    }

    public LocalDate getCriadoEm() {
        return criadoEm;
    }

}
