package com.desafio.tarefa;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class TarefaApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void testApplicationStarts() {
        assert true;
    }
}
