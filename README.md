# Kanban API Project

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Knex.js](https://img.shields.io/badge/Knex.js-E18F12?style=for-the-badge&logo=knexdotjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E941C?style=for-the-badge&logo=vitest&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

Este projeto é uma API RESTful simples para um sistema de gerenciamento de tarefas Kanban, desenvolvida para prática e aprimoramento de conhecimentos em Node.js com TypeScript e um conjunto robusto de ferramentas.

## 🚀 Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias e bibliotecas:

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superconjunto tipado de JavaScript para maior segurança e escalabilidade do código.
- **Fastify**: Framework web rápido e de baixo overhead para construção da API.
- **Knex.js**: Construtor de consultas SQL flexível para interagir com o banco de dados.
- **SQLite3**: Banco de dados leve e baseado em arquivo, ideal para desenvolvimento e testes.
- **Zod**: Biblioteca de declaração e validação de schemas para garantir a integridade dos dados de entrada.
- **Dotenv**: Para carregar variáveis de ambiente de arquivos `.env`.
- **@fastify/cookie**: Plugin para Fastify que facilita o trabalho com cookies.
- **Vitest**: Framework de testes rápido para testes de unidade e integração.
- **Supertest**: Biblioteca para testar APIs HTTP, integrando-se bem com o Vitest.
- **tsx**: Executa arquivos TypeScript diretamente no Node.js em desenvolvimento e para scripts (como migrations).
- **tsup**: Ferramenta de build para compilar o código TypeScript para JavaScript otimizado para produção.

## ✨ Funcionalidades Principais

- **API RESTful**: Endpoints bem definidos para criação, leitura, atualização e exclusão de tarefas.
- **Gerenciamento de Tarefas**: Criação, atualização de status e detalhes, listagem e exclusão de tarefas.
- **Tipagem Forte**: Uso extensivo de TypeScript para um código mais seguro e manutenível.
- **Validação de Dados**: Validação robusta dos dados de entrada com Zod.
- **Persistência de Dados**: Armazenamento de tarefas e informações no SQLite com gerenciamento de esquema via Knex Migrations.
- **Sessões Simples**: Utilização de cookies para simular sessões de usuário e vincular tarefas a um "usuário" específico.
- **Testes Abrangentes**: Testes de unidade e integração com Vitest e Supertest para garantir a qualidade do código.

## ⚙️ Configuração e Execução

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/en/) (versão 18 ou superior é recomendada) e [npm](https://www.npmjs.com/) instalados.

### 1. Clonar o Repositório

```bash
git clone [https://github.com/esdrasslopes/kanban-api.git](https://github.com/esdrasslopes/kanban-api.git) # Substitua pelo URL do seu repositório
cd kanban-api
```
