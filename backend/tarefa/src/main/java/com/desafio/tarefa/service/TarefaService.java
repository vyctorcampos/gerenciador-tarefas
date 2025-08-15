                                                     package com.desafio.tarefa.service;

import java.util.List;
import java.util.UUID;

import com.desafio.tarefa.dto.request.TarefaRequestDTO;
import com.desafio.tarefa.dto.request.TarefaFiltroRequestDTO;
import com.desafio.tarefa.dto.response.TarefaResponseDTO;

public interface TarefaService {

	TarefaResponseDTO criarTarefa(TarefaRequestDTO tarefaRequestDto);

	void removerTarefa(UUID id);
	
	List<TarefaResponseDTO> listarTodos();

	TarefaResponseDTO atualizarTarefa(UUID id, TarefaRequestDTO tarefaRequestDTO);

	List<TarefaResponseDTO> buscarComFiltros(TarefaFiltroRequestDTO filtros);

}
