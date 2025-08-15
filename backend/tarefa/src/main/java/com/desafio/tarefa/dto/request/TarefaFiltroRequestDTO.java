package com.desafio.tarefa.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor
@AllArgsConstructor 
public class TarefaFiltroRequestDTO {
    private String tituloDescricao;
    private String responsavel;
    private String situacao;
}
