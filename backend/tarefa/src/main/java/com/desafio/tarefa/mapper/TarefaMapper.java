package com.desafio.tarefa.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.desafio.tarefa.dto.request.TarefaRequestDTO;
import com.desafio.tarefa.dto.response.TarefaResponseDTO;
import com.desafio.tarefa.model.Tarefa;

@Mapper(componentModel = "spring")
public interface TarefaMapper {

    TarefaMapper INSTANCE = Mappers.getMapper(TarefaMapper.class);

    Tarefa toEntity(TarefaRequestDTO dto);

    TarefaResponseDTO toResponseDto(Tarefa entity);
}

