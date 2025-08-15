# Gerenciador de Tarefas

Sistema completo de gerenciamento de tarefas com backend em Spring Boot e frontend em Angular, totalmente containerizado com Docker.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 21**
- **Spring Boot 3.3.4**
- **Spring Security** com JWT
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **MapStruct** para mapeamento de objetos
- **Swagger/OpenAPI** para documentação

### Frontend
- **Angular 17**
- **TypeScript**
- **Bootstrap** para estilização
- **RxJS** para operações reativas

### Infraestrutura
- **Docker** e **Docker Compose**
- **PostgreSQL** como banco de dados

## 📋 Funcionalidades

- ✅ **Autenticação JWT** com login e registro
- ✅ **CRUD completo** de tarefas
- ✅ **Filtros avançados** por título, descrição, responsável e situação
- ✅ **Sistema de prioridades** (Alta, Média, Baixa)
- ✅ **Controle de status** (Em andamento, Concluída)
- ✅ **Interface responsiva** e moderna
- ✅ **Validações** no backend e frontend
- ✅ **Containerização completa** com Docker

## 🏗️ Estrutura do Projeto

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

## 🚀 Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Portas 3001, 8081 e 5432 disponíveis

### 1. Clone o repositório
```bash
git clone https://github.com/vyctorcampos/gerenciador-tarefas.git
cd gerenciador-tarefas
```

### 2. Execute com Docker (Recomendado)
```bash
# Inicia todos os serviços
docker-compose up -d

# Para ver os logs
docker-compose logs -f

# Para parar todos os serviços
docker-compose down
```

### 3. Acesse a aplicação
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8081
- **Swagger**: http://localhost:8081/swagger-ui.html
- **PostgreSQL**: localhost:5432

## 🔐 Autenticação

O sistema utiliza JWT para autenticação. Para acessar as funcionalidades:

1. **Registre-se** em `/register`
2. **Faça login** em `/login`
3. **Use o token JWT** retornado para as requisições

## 📊 Endpoints da API

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

## 🧪 Testes

### Backend
```bash
# Dentro do container
docker exec -it tarefas-backend mvn test

# Ou localmente
cd backend/tarefa
mvn test
```

### Frontend
```bash
# Dentro do container
docker exec -it tarefas-frontend ng test

# Ou localmente
cd frontend/gerenciador-tarefas
npm test
```

## 🔧 Comandos Úteis

```bash
# Ver status dos serviços
docker-compose ps

# Ver logs de um serviço específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Rebuild de um serviço
docker-compose up -d --build backend

# Parar e remover tudo
docker-compose down -v

# Acessar container
docker exec -it tarefas-backend bash
docker exec -it tarefas-frontend bash
docker exec -it tarefas-postgres psql -U postgres -d quadro_tarefa
```

## 🚨 Solução de Problemas

### Porta já em uso
Se você encontrar erro de porta já em uso, o Docker Compose está configurado para usar:
- **Backend**: Porta 8081 (evita conflito com 8080)
- **Frontend**: Porta 3001 (evita conflito com 3000)
- **PostgreSQL**: Porta 5432

### Verificar portas em uso
```bash
# Windows
netstat -ano | findstr :8080
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :8080
lsof -i :3000
```

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Vyctor Campos**
- GitHub: [@vyctorcampos](https://github.com/vyctorcampos)

## 🙏 Agradecimentos

- Spring Boot Team
- Angular Team
- Docker Team
- Comunidade open source
