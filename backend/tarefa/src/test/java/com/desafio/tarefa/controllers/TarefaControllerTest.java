package com.desafio.tarefa.controllers;

import com.desafio.tarefa.service.impl.TarefaServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TarefaController.class)
class TarefaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TarefaServiceImpl tarefaService;

    @Test
    @WithMockUser
    void testListarTarefasSuccess() throws Exception {
        when(tarefaService.listarTodos()).thenReturn(java.util.Collections.emptyList());

        mockMvc.perform(get("/api/tarefas"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testListarTarefasEmpty() throws Exception {
        when(tarefaService.listarTodos()).thenReturn(java.util.Collections.emptyList());

        mockMvc.perform(get("/api/tarefas"))
                .andExpect(status().isOk());
    }
}
