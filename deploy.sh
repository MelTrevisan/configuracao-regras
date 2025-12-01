#!/bin/bash

# Script de deploy para produção

set -e  # Para em caso de erro

echo "🚀 Iniciando deploy do Club Athletico Paulistano..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado. Instale o Docker primeiro."
    exit 1
fi

print_success "Docker encontrado"

# Parar container existente (se houver)
if docker ps -a --format '{{.Names}}' | grep -q "^club-paulistano$"; then
    print_info "Parando container existente..."
    docker stop club-paulistano || true
    docker rm club-paulistano || true
    print_success "Container antigo removido"
fi

# Build da imagem
print_info "Fazendo build da imagem..."
docker build -f Dockerfile.prod -t club-paulistano:latest .

print_success "Build concluído!"

# Executar container
print_info "Iniciando container..."
docker run -d -p 3000:80 --name club-paulistano --restart unless-stopped club-paulistano:latest

# Aguardar um pouco para o container iniciar
sleep 3

# Verificar se está rodando
if docker ps --format '{{.Names}}' | grep -q "^club-paulistano$"; then
    print_success "Deploy concluído com sucesso! 🎉"
    echo ""
    echo "Acesse: http://localhost:3000"
    echo ""
    echo "Comandos úteis:"
    echo "  Ver logs: docker logs club-paulistano"
    echo "  Parar: docker stop club-paulistano"
    echo "  Remover: docker rm club-paulistano"
else
    print_error "Falha ao iniciar o container"
    docker logs club-paulistano
    exit 1
fi












