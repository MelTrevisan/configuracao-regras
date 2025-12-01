# Sistema de Configuração de Regras

Sistema desenvolvido em React para criação e gerenciamento de regras de validação, similar ao Azure DevOps Query Builder.

## 🚀 Funcionalidades

- **Criação de Regras**: Interface intuitiva para criação de regras de validação
- **Múltiplos Módulos**: Suporte para Candidatos, Associados e Visitantes
- **Tipos de Dados**: Suporte para Texto, Número, Data, Booleano e Lista
- **Operadores Dinâmicos**: Operadores específicos para cada tipo de dado
- **Teste de Fórmulas**: Simulação de regras com dados de teste
- **Cadastros de Domínio**: Gerenciamento de listas de domínio por módulo
- **Histórico**: Controle de versões e alterações

## 🛠️ Tecnologias

- **React 18.2.0**
- **Lucide React** (ícones)
- **CSS3** (estilização)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/configuracao-regras.git
cd configuracao-regras
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse http://localhost:3000

## 🎯 Como Usar

### Criando uma Nova Regra

1. Acesse **Configurações** no menu
2. Clique em **Nova Regra**
3. Preencha as informações básicas:
   - Nome da Regra
   - Módulo (Candidatos, Associados, Visitantes)
   - Tipo de Regra
   - Status
4. Selecione campos e tipos de dados
5. Configure operadores e valores
6. Teste a fórmula
7. Salve a regra

### Gerenciando Cadastros

1. Acesse **Cadastros** no menu
2. Escolha o módulo desejado:
   - Visitantes
   - Associados
   - Candidatos
3. Adicione, edite ou remova valores das listas

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── App.js                 # Componente principal
│   ├── Sidebar.js             # Menu lateral
│   ├── RulesConfiguration.js  # Lista de regras
│   ├── RuleBuilder.js         # Criação/edição de regras
│   └── DomainLists.js         # Cadastros de domínio
├── styles/
│   ├── App.css
│   ├── Sidebar.css
│   ├── RulesConfiguration.css
│   ├── RuleBuilder.css
│   └── DomainLists.css
└── index.js                   # Ponto de entrada
```

## 🐳 Docker

### Desenvolvimento

```bash
# Build da imagem de desenvolvimento
docker build -t configuracao-regras .

# Executar container
docker run -p 3000:3000 configuracao-regras
```

### Produção

```bash
# Build da imagem de produção otimizada
npm run docker:build

# Executar container
npm run docker:run

# Ou usar Docker Compose (recomendado)
docker-compose up -d

# Parar container
npm run docker:stop
```

### Deploy rápido

**Windows:**
```bash
deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

Acesse: http://localhost:3000

## 📝 Scripts Disponíveis

### Desenvolvimento
- `npm start` - Inicia servidor de desenvolvimento
- `npm test` - Executa testes
- `npm run build` - Cria build de produção

### Deploy
- `npm run docker:build` - Build da imagem Docker de produção
- `npm run docker:run` - Executa container em produção
- `npm run docker:stop` - Para e remove container

### Outros
- `npm run eject` - Ejecta configurações (não recomendado)

## 🚀 Publicação

Veja o arquivo [DEPLOY.md](DEPLOY.md) para guia completo de publicação com várias opções:
- Docker/Docker Compose
- Vercel
- Netlify
- GitHub Pages
- Kubernetes
- Servidor próprio

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Desenvolvido por

**Melissa Trevisan** - Diretor

---

Para dúvidas ou sugestões, entre em contato através dos issues do GitHub.

