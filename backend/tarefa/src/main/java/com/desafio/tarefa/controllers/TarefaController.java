package com.desafio.tarefa.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.tarefa.dto.request.TarefaFiltroRequestDTO;
import com.desafio.tarefa.dto.request.TarefaRequestDTO;
import com.desafio.tarefa.dto.response.TarefaResponseDTO;
import com.desafio.tarefa.service.TarefaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/tarefas")
@Tag(name = "Tarefas", description = "Endpoints para gerenciamento de tarefas")
@SecurityRequirement(name = "bearer-jwt")
public class TarefaController {

    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @PostMapping
    @Operation(
            summary = "Criar nova tarefa",
            description = "Cria uma nova tarefa no sistema",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Tarefa criada com sucesso",
                            content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Dados inválidos"),
                    @ApiResponse(responseCode = "401", description = "Não autorizado")
            }
    )
    public ResponseEntity<TarefaResponseDTO> criarTarefa(@RequestBody TarefaRequestDTO tarefaRequestDto) {
    	TarefaResponseDTO novaTarefa = tarefaService.criarTarefa(tarefaRequestDto);
        return new ResponseEntity<>(novaTarefa, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(
            summary = "Listar todas as tarefas",
            description = "Retorna uma lista com todas as tarefas do usuário autenticado",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de tarefas retornada com sucesso",
                            content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class))),
                    @ApiResponse(responseCode = "401", description = "Não autorizado")
            }
    )
    public ResponseEntity<List<TarefaResponseDTO>> listarTodasTarefas() {
        List<TarefaResponseDTO> tarefas = tarefaService.listarTodos();
        return ResponseEntity.ok(tarefas);
    }

    @PostMapping("/buscar")
    @Operation(
            summary = "Buscar tarefas com filtros",
            description = "Retorna uma lista de tarefas filtradas por título/descrição, responsável e situação",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Lista de tarefas filtradas retornada com sucesso",
                            content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class))),
                    @ApiResponse(responseCode = "401", description = "Não autorizado")
            }
    )
    public ResponseEntity<List<TarefaResponseDTO>> buscarTarefasComFiltros(@RequestBody TarefaFiltroRequestDTO filtros) {
        List<TarefaResponseDTO> tarefas = tarefaService.buscarComFiltros(filtros);
        return ResponseEntity.ok(tarefas);
    }

    @PutMapping("/{id}") 
    @Operation(
            summary = "Atualizar tarefa",
            description = "Atualiza uma tarefa existente pelo ID",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Tarefa atualizada com sucesso",
                            content = @Content(schema = @Schema(implementation = TarefaResponseDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Dados inválidos"),
                    @ApiResponse(responseCode = "401", description = "Não autorizado"),
                    @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
            }
    )
    public ResponseEntity<TarefaResponseDTO> atualizarTarefa(@PathVariable UUID id, @RequestBody TarefaRequestDTO tarefaRequestDto) {
    	TarefaResponseDTO tarefaAtualizada = tarefaService.atualizarTarefa(id, tarefaRequestDto);
        return ResponseEntity.ok(tarefaAtualizada);
    }

    @DeleteMapping("/{id}")
    @Operation(
            summary = "Remover tarefa",
            description = "Remove uma tarefa pelo ID",
            responses = {
                    @ApiResponse(responseCode = "204", description = "Tarefa removida com sucesso"),
                    @ApiResponse(responseCode = "401", description = "Não autorizado"),
                    @ApiResponse(responseCode = "404", description = "Tarefa não encontrada")
            }
    )
    public ResponseEntity<Void> removerTarefa(@PathVariable UUID id) {
        tarefaService.removerTarefa(id);
        return ResponseEntity.noContent().build();
    }
}

