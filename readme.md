
#  API FindAFriend

A FindAFriend API é uma aplicação desenvolvida como parte de um desafio de um bootcamp de desenvolvimento com Node.js. Essa API foi criada para facilitar a adoção de animais, conectando pessoas interessadas em adotar animais de estimação a organizações que cuidam de animais em busca de novos lares.


## Funcionalidades

- Cadastro de Pets: Permite que as organizações adicionem informações sobre animais disponíveis para adoção, incluindo detalhes como nome, idade, raça, características e fotos.

- Listagem de Pets por Cidade: Os usuários podem listar todos os pets disponíveis para adoção em uma cidade específica.

- Filtragem de Pets por Características: Os usuários têm a opção de filtrar pets com base em suas características, tornando mais fácil encontrar o animal de estimação perfeito.

- Visualização de Detalhes de um Pet: Os detalhes de um pet podem ser visualizados para obter informações completas sobre o animal em busca de um lar.

- Cadastro de ORGs: As organizações podem se cadastrar, fornecendo informações como nome, endereço e número de WhatsApp.

- Login como ORG: As organizações podem realizar login como administradores, permitindo que acessem recursos de administração.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env


`NODE_ENV = "dev"`

`HTTP_PORT = 3000`

`DATABASE_URL = "postgresql://prisma:prisma@localhost:5432/tests?schema=public"`

`JWT_SECRET = "secret_hash"`
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/alisson-moura/find-a-friend-api.git
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o container com banco de dados

```bash
  docker compose up -d
```

Execute as migrations do Prisma

```bash
  npx prisma migrate dev
```

Inicie o servidor

```bash
  npm run start:dev
```


**Documentação online:**  [Swagger](https://localhost:3000/documentation)



## Rodando os testes

Para rodar os testes de unidade, rode o seguinte comando

```bash
  npm run test:unit
```

Para rodar os testes de integração, rode o seguinte comando

```bash
  npm run test:e2e
```


## Stack utilizada

- **Runtime**: Node.js
- **Linguagem**: Typescript
- **Libs**: Fastify, Prisma, Zod
- **Banco de dados:** PostgreSQL


## Autores

- [@alisson](https://www.github.com/alisson-moura)

