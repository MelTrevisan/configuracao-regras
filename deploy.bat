@echo off
REM Script de deploy para Windows (PowerShell)

echo 🚀 Iniciando deploy do Club Athletico Paulistano...

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker não está instalado. Instale o Docker primeiro.
    exit /b 1
)

echo ✅ Docker encontrado

REM Parar container existente (se houver)
docker ps -a --format "{{.Names}}" | findstr /C:"club-paulistano" >nul 2>&1
if not errorlevel 1 (
    echo ℹ️  Parando container existente...
    docker stop club-paulistano 2>nul
    docker rm club-paulistano 2>nul
    echo ✅ Container antigo removido
)

REM Build da imagem
echo ℹ️  Fazendo build da imagem...
docker build -f Dockerfile.prod -t club-paulistano:latest .

if errorlevel 1 (
    echo ❌ Falha no build
    exit /b 1
)

echo ✅ Build concluído!

REM Executar container
echo ℹ️  Iniciando container...
docker run -d -p 3000:80 --name club-paulistano --restart unless-stopped club-paulistano:latest

REM Aguardar um pouco
timeout /t 3 /nobreak >nul

REM Verificar se está rodando
docker ps --format "{{.Names}}" | findstr /C:"club-paulistano" >nul 2>&1
if errorlevel 1 (
    echo ❌ Falha ao iniciar o container
    docker logs club-paulistano
    exit /b 1
)

echo ✅ Deploy concluído com sucesso! 🎉
echo.
echo Acesse: http://localhost:3000
echo.
echo Comandos úteis:
echo   Ver logs: docker logs club-paulistano
echo   Parar: docker stop club-paulistano
echo   Remover: docker rm club-paulistano

pause












