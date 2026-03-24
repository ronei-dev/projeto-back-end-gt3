# Backend API - Projeto Node.js com Express e Sequelize

## Descrição Geral

Este projeto consiste em uma API backend desenvolvida com Node.js, utilizando o framework Express e o ORM Sequelize para interação com banco de dados relacional (PostgreSQL).

A aplicação tem como objetivo gerenciar recursos como usuários, produtos e categorias, oferecendo endpoints RESTful para operações de criação, leitura, atualização e remoção (CRUD), além de autenticação baseada em JWT.

Também inclui documentação de API com Swagger e testes automatizados com Jest e Supertest.

---

## Estrutura do Projeto
project-root/
├── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ └── database.js
│ ├── controllers/
│ │ ├── AuthController.js
│ │ ├── CategoryController.js
│ │ ├── ProductController.js
│ │ └── UserController.js
│ ├── database/
│ │ └── index.js
│ ├── middleware/
│ │ └── auth.js
│ ├── models/
│ │ ├── Category.js
│ │ ├── Product.js
│ │ ├── ProductImage.js
│ │ ├── ProductOption.js
│ │ └── User.js
│ ├── routes/
│ │ ├── categoryRoutes.js
│ │ ├── productRoutes.js
│ │ └── userRoutes.js
│ └── services/
│ └── ProductService.js
│
├── tests/
│ ├── category.test.js
│ ├── product.test.js
│ └── user.test.js
│
├── .env
├── package.json
├── package-lock.json
└── README.md


---

## Funcionalidades Principais
- Autenticação de usuários com JWT
- Criptografia de senhas com bcrypt
- CRUD de usuários
- CRUD de produtos
- CRUD de categorias
- Associação entre produtos e categorias
- Gerenciamento de imagens e opções de produtos
- Middleware de autenticação para rotas protegidas
- Documentação da API com Swagger
- Testes automatizados com Jest e Supertest

---

## Requisitos de Sistema
- Node.js (versão 18 ou superior recomendada)
- NPM ou Yarn
- PostgreSQL (versão 12 ou superior)

Dependências principais:

- express
- sequelize
- pg
- pg-hstore
- jsonwebtoken
- bcryptjs
- dotenv
- swagger-jsdoc
- swagger-ui-express

Dependências de Desenvolvimento (npm install --save-dev):

- nodemon
- sequelize-cli
- jest
- supertest

---

## Instruções de Instalação

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd project-root
```

2. Instalar dependências
```bash
npm install
```

3. Configurar variáveis de ambiente

Crie ou edite o arquivo .env com base no exemplo:
```bash
PORT=3000

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
DB_PORT=5432

JWT_SECRET=sua_chave_secreta
```

4. Configurar banco de dados

Certifique-se de que o PostgreSQL está em execução e que o banco foi criado.

Execute as migrations (caso aplicável):
```bash
npx sequelize-cli db:migrate
```

5. Como Usar
Executar em modo desenvolvimento
```bash
npm run dev
```

Executar em modo produção
```bash
npm start
```

Acessar API
Por padrão:
```bash
http://localhost:3000
```

## Documentação Swagger
Se configurado no projeto:
```bash
http://localhost:3000/api-docs
```

## Autenticação
A API utiliza JWT para autenticação.

Fluxo básico:

Criar usuário
Realizar login
Receber token JWT
Enviar token no header das requisições protegidas:
```bash
Authorization: Bearer <token>
```

## Testes
Para executar os testes automatizados:
```bash
npm test
```
Os testes cobrem:

Usuários
Produtos
Categorias


## Scripts Disponíveis
```bash
npm run dev     # Executa com nodemon
npm start       # Executa em modo produção
npm test        # Executa testes
```

## Informações Adicionais
Arquitetura

O projeto segue uma arquitetura em camadas:

Controllers: controlam requisições e respostas
Services: lógica de negócio
Models: representação das entidades no banco
Routes: definição de endpoints
Middleware: autenticação e validações


## Contribuição
Fork o projeto
Crie uma branch para sua feature
Commit suas alterações
Abra um Pull Request

## Licença
Este projeto está sob a licença ISC.