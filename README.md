# My Personal Library - Backend

## Sobre o projeto

Este é o backend para uma aplicação de biblioteca pessoal que permite aos usuários gerenciar seus livros, adicionar comentários e buscar informações sobre livros usando a API do Google Books.

## Como executar o projeto

### Pré-requisitos

- Docker
- Docker Compose

### Passos para executar

1. Clone o repositório
   ```bash
   git clone <url-do-repositório>
   cd my-personal-library-backend
   ```

2. Execute os containers com Docker Compose
   ```bash
   docker-compose up -d
   ```

3. O servidor estará disponível em `http://localhost:3000`

## Principais funcionalidades

- **Autenticação**: Sistema de login e registro de usuários usando JWT.
- **Gerenciamento de livros**: Adicionar, listar, atualizar e remover livros da biblioteca pessoal.
- **Integração com Google Books API**: Buscar informações detalhadas sobre livros.
- **Sistema de comentários**: Adicionar e gerenciar comentários sobre os livros.

## Tecnologias utilizadas

- NestJS
- MongoDB
- JWT para autenticação
- Docker e Docker Compose para containerização

## Endpoints principais

- `/auth`: Endpoints de autenticação (login e registro)
- `/users`: Gerenciamento de usuários
- `/books`: Gerenciamento de livros
- `/google-books`: Busca de livros na API do Google Books
- `/comments`: Gerenciamento de comentários sobre livros
