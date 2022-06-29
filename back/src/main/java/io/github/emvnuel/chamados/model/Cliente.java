package io.github.emvnuel.chamados.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "CLIENTES")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cnpj;
    private String endereco;
    private LocalDate cadastradoEm;

    protected Cliente() {
    }

    public Cliente(String nome, String cnpj, String endereco) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.endereco = endereco;
        this.cadastradoEm = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public String getEndereco() {
        return endereco;
    }

    public LocalDate getCadastradoEm() {
        return cadastradoEm;
    }

}
