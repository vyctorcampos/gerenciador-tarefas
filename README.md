# Gerenciador de Tarefas

Sistema completo de gerenciamento de tarefas.

## Tecnologias Utilizadas

### Backend
- **Java 21**
- **Spring Boot 3.3.4**
- **Spring Security**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Swagger/OpenAPI**

### Frontend
- **Angular 17**
- **TypeScript**
- **Bootstrap**
- **RxJS**

## Estrutura do Projeto

```
tarefas/
├── backend/                 # Backend Spring Boot
│   └── tarefa/
│       ├── src/main/java/
│       │   ├── controllers/    # Controllers REST
│       │   ├── service/        # Lógica de negócio
│       │   ├── repository/     # Acesso a dados
│       │   ├── model/          # Entidades JPA
│       │   ├── dto/            # Objetos de transferência
│       │   ├── mapper/         # Mapeamento MapStruct
│       │   └── config/         # Configurações
│       ├── src/main/resources/
│       ├── Dockerfile          # Containerização do backend
│       └── init-scripts/       # Scripts de inicialização do banco
├── frontend/               # Frontend Angular
│   └── gerenciador-tarefas/
│       ├── src/app/
│       │   ├── components/     # Componentes Angular
│       │   ├── services/       # Serviços HTTP
│       │   ├── models/         # Interfaces TypeScript
│       │   └── guards/         # Guards de autenticação
│       ├── src/assets/
│       └── Dockerfile          # Containerização do frontend
├── docker-compose.yml      # Orquestração Docker
└── README.md              # Este arquivo
```

### rodar projeto

**docker-campose up --build -d** - na pasta rapiz do projeto

### 3. Acesse a aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Swagger**: http://localhost:8081/swagger-ui.html
- **PostgreSQL**: localhost:5432

## Autenticação

O sistema utiliza JWT para autenticação. Para acessar as funcionalidades:

1. **Registre-se** em `/register`
2. **Faça login** em `/login`
3. **Use o token JWT** retornado para as requisições

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário

### Tarefas
- `GET /api/tarefas` - Listar todas as tarefas
- `POST /api/tarefas/buscar` - Buscar tarefas com filtros
- `POST /api/tarefas` - Criar nova tarefa
- `PUT /api/tarefas/{id}` - Atualizar tarefa
- `DELETE /api/tarefas/{id}` - Excluir tarefa

## 🐳 Serviços Docker

### PostgreSQL
- **Porta**: 5432
- **Database**: quadro_tarefa
- **Usuário**: postgres
- **Senha**: senha
- **Volume**: Dados persistentes

### Backend Spring Boot
- **Porta**: 8081 (mapeada para 8080 interno)
- **Dependência**: PostgreSQL (aguarda health check)
- **Perfil**: docker
- **JWT Secret**: Configurado via variável de ambiente

### Frontend Angular
- **Porta**: 3001 (mapeada para 4200 interno)
- **Dependência**: Backend
- **Hot Reload**: Configurado para desenvolvimento
- **Volume**: Código fonte sincronizado
