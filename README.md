# Desafio Atlantis

## Objetivo

Criar uma aplicação web full stack utilizando **Next.js**, **TailwindCSS**, **Laravel** e **MySQL**. O foco do teste é avaliar sua capacidade técnica, organização de código e boas práticas.

## Requisitos

- Criar um frontend responsivo em **Next.js** + **TailwindCSS**.
- Criar uma **API RESTful** em **Laravel 11** com **MySQL** e autenticação **JWT**.
- Implementar um **CRUD de produtos**.
- O frontend deve consumir a API e armazenar o token JWT.
- Seguir boas práticas de organização de código.
- Usar as bibliotecas no frontend que você quiser, por exemplo, **shadcn**.

## Detalhes do Frontend

- Criar um formulário para cadastrar produtos com os seguintes campos:
  - **Nome** (string).
  - **Descrição** (texto).
  - **Preço** (float).
  - **Disponível em estoque** (boolean).
- Implementar validação nos campos do formulário.
- Criar uma página de listagem dos produtos cadastrados.
- Permitir edição e exclusão dos produtos.

## Detalhes do Backend

- Criar uma API **Laravel** com os seguintes endpoints:
  - `POST /login` → Retorna o token **JWT**.
  - `GET /produtos` → Lista produtos.
  - `POST /produtos` → Cria produto.
  - `PUT /produtos/{id}` → Atualiza produto.
  - `DELETE /produtos/{id}` → Remove produto.
- Configurar **CORS** para permitir requisições do frontend.

## Arquitetura do Sistema

O sistema foram utiliza as seguintes tecnologias:

- **Linguagens:** PHP, TypeScript
- **Banco de Dados:** MySQL
- **Frameworks:** Laravel^11, Next.js
- **Arquitetura da API:** MVC, RESTful
- **Outras Tecnologias:** React, Docker, JWT

## Como Iniciar o Sistema

### Passo 1: Download dos Arquivos

Clone o repositório:

```bash
git clone https://github.com/andre-albuquerque01/challenge-freela-atlantis.git
```

### Passo 2: Configuração do Back-end

Entre na pasta back-end:

```bash
cd /Api
```

Inicialize os pacotes do Laravel:

```php
composer install
```

Crie um arquivo `.env` na raiz do seu projeto e configure as variáveis de ambiente conforme necessário.
Execute `php artisan config:cache` para aplicar as configurações do arquivo `.env`.

Inicie o servidor da API:

```bash
./vendor/bin/sail up
```

Para desativar o servidor da API:

```bash
./vendor/bin/sail down
```

### Passo 3: Configuração do Front-end

Entre na pasta front-end:

```bash
cd /app
```

Baixe as dependências do Node.js:

```bash
npm i
```

Inicie o servidor do Next.js:

```bash
npm run dev
```

### Passo 4: Acesso ao sistema

Abra o navegador e acesse `http://localhost:3000` para utilizar o serviço.
