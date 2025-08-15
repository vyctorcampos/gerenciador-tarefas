package com.desafio.tarefa.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.desafio.tarefa.dto.request.TarefaRequestDTO;
import com.desafio.tarefa.dto.request.TarefaFiltroRequestDTO;
import com.desafio.tarefa.dto.response.TarefaResponseDTO;
import com.desafio.tarefa.mapper.TarefaMapper;
import com.desafio.tarefa.model.Tarefa;
import com.desafio.tarefa.repository.TarefaRepository;
import com.desafio.tarefa.repository.UserRepository;
import com.desafio.tarefa.service.TarefaService;
import com.desafio.tarefa.validates.TarefaValidates;

@Service
@Transactional
public class TarefaServiceImpl implements TarefaService {

	@Autowired
	TarefaRepository tarefaRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TarefaMapper tarefaMapper;
	
	@Autowired
	TarefaValidates tarefaValidates;  

    @Override
    public TarefaResponseDTO criarTarefa(TarefaRequestDTO tarefaRequestDto) {
        Tarefa tarefa = tarefaMapper.toEntity(tarefaRequestDto);
        Tarefa tarefaSalva = tarefaRepository.save(tarefa);
        return tarefaMapper.toResponseDto(tarefaSalva);
    }

    @Override
    public TarefaResponseDTO atualizarTarefa(UUID id, TarefaRequestDTO tarefaRequestDTO) {
        Tarefa tarefaExistente = tarefaValidates.validarTarefaExistePorId(id);

        tarefaExistente.setTitulo(tarefaRequestDTO.getTitulo());
        tarefaExistente.setDescricao(tarefaRequestDTO.getDescricao());
        tarefaExistente.setResponsavel(tarefaRequestDTO.getResponsavel());
        tarefaExistente.setPrioridade(tarefaRequestDTO.getPrioridade());
        tarefaExistente.setDeadline(tarefaRequestDTO.getDeadline());
        tarefaExistente.setSituacao(tarefaRequestDTO.getSituacao());

        Tarefa tarefaAtualizada = tarefaRepository.save(tarefaExistente);
        return tarefaMapper.toResponseDto(tarefaAtualizada);
    }

    @Override
    public void removerTarefa(UUID id) {
        Tarefa tarefaExistente = tarefaValidates.validarTarefaExistePorId(id);
        tarefaRepository.deleteById(tarefaExistente.getId());
    }
	
    @Override
    @Transactional(readOnly = true)
    public List<TarefaResponseDTO> listarTodos() {
        List<Tarefa> tarefas = tarefaRepository.findAll();
        return tarefas.stream()
                .map(tarefaMapper::toResponseDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TarefaResponseDTO> buscarComFiltros(TarefaFiltroRequestDTO filtros) {
        try {
            List<Tarefa> tarefas;
            
            if (filtros == null || (filtros.getTituloDescricao() == null && 
                                   filtros.getResponsavel() == null && 
                                   filtros.getSituacao() == null)) {
                tarefas = tarefaRepository.findAll();
            } else {

                tarefas = aplicarFiltrosRobustos(filtros);
            }
            
            return tarefas.stream()
                    .map(tarefaMapper::toResponseDto)
                    .toList();
        } catch (Exception e) {

            System.err.println("Erro ao buscar tarefas com filtros: " + e.getMessage());
            List<Tarefa> todasTarefas = tarefaRepository.findAll();
            return todasTarefas.stream()
                    .map(tarefaMapper::toResponseDto)
                    .toList();
        }
    }
    

    private List<Tarefa> aplicarFiltrosRobustos(TarefaFiltroRequestDTO filtros) {
        String tituloDescricao = filtros.getTituloDescricao();
        String responsavel = filtros.getResponsavel();
        String situacao = filtros.getSituacao();
        
        if (tituloDescricao != null) {
            tituloDescricao = tituloDescricao.trim();
            if (tituloDescricao.isEmpty()) tituloDescricao = null;
        }
        
        if (responsavel != null) {
            responsavel = responsavel.trim();
            if (responsavel.isEmpty()) responsavel = null;
        }
        
        if (situacao != null) {
            situacao = situacao.trim();
            if (situacao.isEmpty()) situacao = null;
        }
        
        List<Tarefa> resultado = null;
        
        if (tituloDescricao != null) {
            resultado = tarefaRepository.findByTituloContainingIgnoreCaseOrDescricaoContainingIgnoreCase(
                tituloDescricao, tituloDescricao);
        }
        
        if (responsavel != null) {
            List<Tarefa> porResponsavel = tarefaRepository.findByResponsavelContainingIgnoreCase(responsavel);
            if (resultado == null) {
                resultado = porResponsavel;
            } else {

                resultado = resultado.stream()
                    .filter(tarefa -> porResponsavel.stream()
                        .anyMatch(r -> r.getId().equals(tarefa.getId())))
                    .toList();
            }
        }
        

        if (situacao != null) {
            List<Tarefa> porSituacao = tarefaRepository.findBySituacao(situacao);
            if (resultado == null) {
                resultado = porSituacao;
            } else {

                resultado = resultado.stream()
                    .filter(tarefa -> porSituacao.stream()
                        .anyMatch(s -> s.getId().equals(tarefa.getId())))
                    .toList();
            }
        }
        
        if (resultado == null) {
            resultado = tarefaRepository.findAll();
        }
        
        return resultado;
    }
}