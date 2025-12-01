# 🔗 URLs do Projeto

## 📍 URLs de Acesso à Aplicação

### Desenvolvimento Local
```
http://localhost:3000
```

### Produção (Docker)
```
http://localhost:3000
```
Depois do deploy: substituir `localhost` pelo IP ou domínio do servidor

---

## 🌐 Imagens Externas

A aplicação atualmente usa imagens do Unsplash para avatares:

### URLs de Imagens:
- **Avatar do Sidebar**: `https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face`
- **Avatar do Perfil**: `https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face`

### Para Personalizar:
Edite os arquivos:
- `src/components/Sidebar.js` (linha ~54)
- `src/components/AssociadoProfile.js` (linha ~241)

Ou substitua por:
- URL de sua própria imagem
- Imagens hospedadas em CDN
- Imagens locais em `/public/img/`

---

## ⚙️ Configuração de API (Futuro)

Atualmente a aplicação usa **dados mockados** (hardcoded). 

Para conectar a uma API backend, configure as variáveis de ambiente:

### Criar arquivo `.env` na raiz do projeto:

```env
# URL da API Backend
REACT_APP_API_URL=http://localhost:8080/api

# Ambiente
REACT_APP_ENV=development

# Outras variáveis
REACT_APP_VERSION=1.0.0
```

### Exemplo de uso no código:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

fetch(`${API_URL}/rules`)
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 🚀 URLs de Deploy

### Vercel
Após o deploy: `https://seu-projeto.vercel.app`

### Netlify
Após o deploy: `https://seu-projeto.netlify.app`

### GitHub Pages
Após o deploy: `https://seu-usuario.github.io/configuracao-regras`

---

## 📱 Configurações de CORS

Se for conectar uma API externa, configure o CORS no backend:

```
Access-Control-Allow-Origin: https://seu-site.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 🔍 Verificar URLs

Para ver todas as URLs usadas na aplicação, execute:

```bash
# Linux/Mac
grep -r "http" src/

# Windows (PowerShell)
Select-String -Path src\ -Pattern "http"
```

---

**Nota**: Aplicação atual é 100% frontend sem backend. Dados são mockados localmente.












