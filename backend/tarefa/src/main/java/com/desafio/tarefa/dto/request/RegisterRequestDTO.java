package com.desafio.tarefa.dto.request;

import com.desafio.tarefa.model.UserRole;

public record RegisterRequestDTO(String login, String password, UserRole role) {

}
