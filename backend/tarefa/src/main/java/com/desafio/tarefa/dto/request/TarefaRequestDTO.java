package com.desafio.tarefa.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Schema(description = "DTO para criação/atualização de tarefas")
public class TarefaRequestDTO {

    @Schema(description = "Título da tarefa", example = "Desenvolver API REST", required = true)
    private String titulo;
    
    @Schema(description = "Descrição detalhada da tarefa", example = "Criar API REST para gerenciamento de tarefas com autenticação JWT", required = true)
    private String descricao;
    
    @Schema(description = "Nome do responsável pela tarefa", example = "João Silva", required = true)
    private String responsavel;
    
    @Schema(description = "Nível de prioridade da tarefa", example = "Alta", allowableValues = {"Alta", "Media", "Baixa"}, required = true)
    private String prioridade;
    
    @Schema(description = "Data limite para conclusão da tarefa", example = "2025-12-31", required = true)
    private LocalDate deadline;
    
    @Schema(description = "Status atual da tarefa", example = "Em andamento", allowableValues = {"Em andamento", "Concluida"}, required = true)
    private String situacao;

    // Construtores
    public TarefaRequestDTO() {}

    public TarefaRequestDTO(String titulo, String descricao, String responsavel, String prioridade, LocalDate deadline, String situacao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.responsavel = responsavel;
        this.prioridade = prioridade;
        this.deadline = deadline;
        this.situacao = situacao;
    }

    // Getters e Setters
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }
}
