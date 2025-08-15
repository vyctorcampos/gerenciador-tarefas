package com.desafio.tarefa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springdoc.core.models.GroupedOpenApi;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

import java.util.List;

@Configuration
public class OpenApiConfig {

    private static final String SECURITY_SCHEME_NAME = "bearer-jwt";

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Gerenciamento de Tarefas")
                        .description("API REST completa para gerenciamento de tarefas com autenticação JWT, desenvolvida em Java 21 e Spring Boot 3.3.4")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Equipe de Desenvolvimento")
                                .email("dev@tarefas.local")
                                .url("https://github.com/desafio-tarefas"))
                        .license(new License()
                                .name("MIT")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Servidor de Desenvolvimento"),
                        new Server().url("https://api.tarefas.com").description("Servidor de Produção")
                ))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, new SecurityScheme()
                                .name(SECURITY_SCHEME_NAME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("JWT token para autenticação. Use o endpoint /auth/login para obter o token"))
                );
    }

    @Bean
    public GroupedOpenApi authGroup() {
        return GroupedOpenApi.builder()
                .group("Autenticação")
                .pathsToMatch("/auth/**")
                .build();
    }

    @Bean
    public GroupedOpenApi tarefasGroup() {
        return GroupedOpenApi.builder()
                .group("Tarefas")
                .pathsToMatch("/api/tarefas/**")
                .build();
    }

    @Bean
    public GroupedOpenApi publicGroup() {
        return GroupedOpenApi.builder()
                .group("Público")
                .pathsToMatch("/swagger-ui/**", "/api-docs/**", "/error", "/actuator/**")
                .build();
    }
}


