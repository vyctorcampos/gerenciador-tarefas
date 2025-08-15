package com.desafio.tarefa.validates;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.desafio.tarefa.model.Tarefa;
import com.desafio.tarefa.repository.TarefaRepository;

@Component
public class TarefaValidates {

    private final TarefaRepository tarefaRepository;

    public TarefaValidates(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public Tarefa validarTarefaExistePorId(UUID id) {
        return tarefaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com o ID: " + id));
    }
}
