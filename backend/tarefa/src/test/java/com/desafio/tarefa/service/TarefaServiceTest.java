package com.desafio.tarefa.service;

import com.desafio.tarefa.service.impl.TarefaServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TarefaServiceTest {

    @Mock
    private com.desafio.tarefa.repository.TarefaRepository tarefaRepository;

    @Mock
    private com.desafio.tarefa.mapper.TarefaMapper tarefaMapper;

    @Mock
    private com.desafio.tarefa.validates.TarefaValidates tarefaValidates;

    @InjectMocks
    private TarefaServiceImpl tarefaService;

    @Test
    void testListarTodosEmpty() {
        when(tarefaRepository.findAll()).thenReturn(Arrays.asList());

        var result = tarefaService.listarTodos();

        assertNotNull(result);
        assertTrue(result.isEmpty());
        
        verify(tarefaRepository).findAll();
    }

    @Test
    void testListarTodosWithData() {
        var tarefa = new com.desafio.tarefa.model.Tarefa();
        var tarefaResponseDTO = new com.desafio.tarefa.dto.response.TarefaResponseDTO();
        
        when(tarefaRepository.findAll()).thenReturn(Arrays.asList(tarefa));
        when(tarefaMapper.toResponseDto(tarefa)).thenReturn(tarefaResponseDTO);

        var result = tarefaService.listarTodos();

        assertNotNull(result);
        assertEquals(1, result.size());
        
        verify(tarefaRepository).findAll();
        verify(tarefaMapper).toResponseDto(tarefa);
    }
}
