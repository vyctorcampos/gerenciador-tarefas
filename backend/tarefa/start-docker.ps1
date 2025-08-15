Write-Host "🚀 Iniciando sistema de Tarefas com Docker..." -ForegroundColor Green

Write-Host "📋 Verificando se o Docker está rodando..." -ForegroundColor Yellow
try {
    docker info | Out-Null
    Write-Host "✅ Docker está rodando" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está rodando. Inicie o Docker Desktop primeiro." -ForegroundColor Red
    exit 1
}

Write-Host "🧹 Limpando containers existentes..." -ForegroundColor Yellow
docker-compose down -v

Write-Host "🔨 Construindo e iniciando os serviços..." -ForegroundColor Yellow
docker-compose up --build -d

Write-Host "⏳ Aguardando os serviços iniciarem..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "📊 Status dos serviços:" -ForegroundColor Yellow
docker-compose ps

Write-Host ""
Write-Host "🎉 Sistema iniciado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "📚 Swagger: http://localhost:8080/swagger-ui.html" -ForegroundColor Cyan
Write-Host "🗄️  PostgreSQL: localhost:5432" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Comandos úteis:" -ForegroundColor Yellow
Write-Host "  - Ver logs: docker-compose logs -f" -ForegroundColor White
Write-Host "  - Parar: docker-compose down" -ForegroundColor White
Write-Host "  - Reiniciar: docker-compose restart" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Usuário padrão para testes:" -ForegroundColor Yellow
Write-Host "  - Login: admin" -ForegroundColor White
Write-Host "  - Senha: 123456" -ForegroundColor White
