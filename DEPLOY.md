# 🚀 Guia de Publicação do Projeto

Este guia apresenta várias opções para publicar o sistema de Configuração de Regras.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Git configurado
- Conta na plataforma escolhida (se aplicável)

---

## 🐳 Opção 1: Docker (Recomendado para produção)

### Build da imagem de produção

```bash
docker build -f Dockerfile.prod -t club-paulistano:latest .
```

### Executar container

```bash
docker run -d -p 3000:80 --name club-paulistano club-paulistano:latest
```

Acesse: http://localhost:3000

### Com Docker Compose (recomendado)

Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "3000:80"
    restart: unless-stopped
    container_name: club-paulistano
```

Execute:

```bash
docker-compose up -d
```

---

## ☁️ Opção 2: Vercel (Mais fácil para React)

### Passo a passo:

1. **Instale a CLI da Vercel** (se não tiver):
```bash
npm install -g vercel
```

2. **No diretório do projeto, execute**:
```bash
vercel
```

3. **Siga as instruções** na tela.

4. **Para deploy em produção**:
```bash
vercel --prod
```

### Ou via GitHub:

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe seu repositório
4. A Vercel detectará automaticamente o Create React App

---

## 🌐 Opção 3: Netlify

### Via CLI:

1. **Instale a CLI da Netlify**:
```bash
npm install -g netlify-cli
```

2. **Build do projeto**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=build
```

### Via GitHub:

1. Faça push do código para o GitHub
2. Acesse [netlify.com](https://netlify.com)
3. Importe seu repositório
4. Configurações:
   - Build command: `npm run build`
   - Publish directory: `build`

---

## 🚢 Opção 4: GitHub Pages

### 1. Instale gh-pages:

```bash
npm install --save-dev gh-pages
```

### 2. Atualize package.json:

Adicione:
```json
"homepage": "https://SEU_USUARIO.github.io/configuracao-regras",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

### 3. Deploy:

```bash
npm run deploy
```

---

## ☸️ Opção 5: Kubernetes

### Criar arquivo de deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: club-paulistano
spec:
  replicas: 2
  selector:
    matchLabels:
      app: club-paulistano
  template:
    metadata:
      labels:
        app: club-paulistano
    spec:
      containers:
      - name: web
        image: club-paulistano:latest
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: club-paulistano-service
spec:
  selector:
    app: club-paulistano
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

Aplique com:

```bash
kubectl apply -f k8s-deployment.yaml
```

---

## 🏗️ Opção 6: Servidor próprio

### 1. Build local:

```bash
npm run build
```

### 2. Copie a pasta `build` para o servidor:

```bash
scp -r build/* usuario@servidor:/var/www/html/
```

### 3. Configure Nginx (no servidor):

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔐 Variáveis de Ambiente (se necessário)

Se precisar de variáveis de ambiente, crie um arquivo `.env`:

```
REACT_APP_API_URL=https://api.exemplo.com
REACT_APP_ENV=production
```

---

## 📊 Monitoramento Pós-Deploy

### Health Check:

Adicione um endpoint de health check ou use ferramentas como:
- **Uptime Robot** (gratuito)
- **Pingdom**
- **StatusCake**

---

## 🆘 Troubleshooting

### Erro 404 ao atualizar página (GitHub Pages, etc.)

Configurar o servidor para redirecionar todas as rotas para `index.html` (já incluído no `nginx.conf`).

### Build falha

```bash
# Limpe o cache e tente novamente
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problemas com rotas no SPA

Garanta que o servidor esteja configurado para servir `index.html` em todas as rotas.

---

## 📞 Suporte

Para dúvidas sobre deployment, abra uma issue no GitHub ou entre em contato.

---

**Última atualização:** Dezembro 2024












