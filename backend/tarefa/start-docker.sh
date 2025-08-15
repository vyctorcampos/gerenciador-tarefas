#!/bin/bash

echo "🚀 Iniciando sistema de Tarefas com Docker..."

echo "📋 Verificando se o Docker está rodando..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker primeiro."
    exit 1
fi
echo "✅ Docker está rodando"

echo "🧹 Limpando containers existentes..."
docker-compose down -v

echo "🔨 Construindo e iniciando os serviços..."
docker-compose up --build -d

echo "⏳ Aguardando os serviços iniciarem..."
sleep 30

echo "📊 Status dos serviços:"
docker-compose ps

echo ""
echo "🎉 Sistema iniciado com sucesso!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8080"
echo "📚 Swagger: http://localhost:8080/swagger-ui.html"
echo "🗄️  PostgreSQL: localhost:5432"
echo ""
echo "📋 Comandos úteis:"
echo "  - Ver logs: docker-compose logs -f"
echo "  - Parar: docker-compose down"
echo "  - Reiniciar: docker-compose restart"
echo ""
echo "🔑 Usuário padrão para testes:"
echo "  - Login: admin"
echo "  - Senha: 123456"

