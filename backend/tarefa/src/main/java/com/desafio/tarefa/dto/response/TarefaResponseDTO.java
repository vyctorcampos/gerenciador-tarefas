package com.desafio.tarefa.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "DTO de resposta para tarefas")
public class TarefaResponseDTO {

    @Schema(description = "ID único da tarefa", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID id;
         @Schema(description = "Título da tarefa", example = "Desenvolver API REST")
    private String titulo;
    
    @Schema(description = "Descrição detalhada da tarefa", example = "Criar API REST para gerenciamento de tarefas com autenticação JWT")
    private String descricao;
    
    @Schema(description = "Nome do responsável pela tarefa", example = "João Silva")
    private String responsavel;
    
    @Schema(description = "Nível de prioridade da tarefa", example = "Alta")
    private String prioridade;
    
    @Schema(description = "Data limite para conclusão da tarefa", example = "2025-12-31")
    private LocalDate deadline;
    
    @Schema(description = "Status atual da tarefa", example = "Em andamento")
    private String situacao;

   
}
