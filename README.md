<div align="center">
<img src="./assets/img/SabiaLogo.png" height="100px">
<h1>Projeto Final Indivídual </h1>
</div>


## 🎲 Introdução
**Qual o projeto?:** Uma plataforma digital inclusiva voltada para auxiliar crianças e jovens com deficiências cognitivas (TEA, TDAH, dislexia e outros) no ambiente escolar. O sistema será FullStack: backend em Node.js/Express e frontend web em Next.js para professores/responsáveis,


## ⚒ Tecnologias Utilizadas


<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge" /> | <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma Badge" /> | <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js Badge" />  | <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite Badge" /> | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge" /> 

## ⚙ Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |

## ✅❌ Respostas

| Código | Descrição |
|---|---|
| `201` | Criado com sucesso (created).|
| `200` | Requisição executada com sucesso (success).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `401` | Dados de acesso inválidos.|
| `404` | Registro pesquisado não encontrado (Not found).|


## 🔐 Autenticação
O projeto implementa autenticação JWT com endpoints para:
| Método HTTP | Endpoint         | Descrição                         |
|-------------|------------------|-----------------------------------|
| `POST`         | /auth/register      | Cria um novo usuário      |
| `POST`         | /auth/login      | Faz o login do usuário    |

## 🔁 API Endpoints

## 🐤 Usuários
| Método HTTP | Endpoint         | Descrição                         |
|-------------|------------------|-----------------------------------|
| `GET`       | auth/users           | Retorna todos os usuários            |
| `GET`      | auth/profile/:id/       | Retorna um usuário específico           |
`DELETE`  | /auth/users/:id | Deleta um usuário específico 


## 📚 Atividades
| Método HTTP | Endpoint         | Descrição                         |
|-------------|------------------|-----------------------------------|
| `GET`       | /activities      | Retorna todas as atividades       |
| `GET`       | /activities/:id  | Retorna uma atividade específica   |
| `POST`      | /activities      | Cria uma nova atividade           | 
| `PUT`       | /activities/:id  | Atualiza uma atividade específica |
| `DELETE`    | /activities/:id  | Deleta uma atividade específica   |

## 📊 Progressos
| Método HTTP | Endpoint         | Descrição                         |
|-------------|------------------|-----------------------------------|
| `GET`       | /progress        | Retorna todos os progressos       |
| `POST`      | /progress        | Cria um novo progresso            |
| `PUT`       | /progress/:id    | Atualiza um progresso específico  |
| `DELETE`    | /progress/:id    | Deleta um progresso específico    |


## 🎯 Listar
As ações de `listar` permitem o envio dos seguintes parâmetros:

| Parâmetro | Descrição |
|---|---|
| `filtro` | Filtra dados pelo valor informado. |
| `page` | Informa qual página deve ser retornada. |

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/mariccardoso/PF-backend-sabia.git
```

2. Acesse o diretório do projeto:

```bash
cd PF-backend-sabia
```

3. Instale as dependências do projeto:

```bash
npm install
```

2. Crie o arquivo `.env` com a variável `DATABASE_URL` apontando para o banco de dados desejado.

```
JWT_SECRET_KEY=
PORT=
DATABASE_URL="file:./banco_relacionamento.db"
```

3. Execute as migrações:

```bash
npx prisma migrate dev
```

4. Inicie o servidor:

```bash
npm run dev
```

## 📂 Estrutura de Diretórios
```
pgsql
📁 database         → Arquivos de configuração do Prisma
|
📁 src
    ├── 📁 controllers      → Lógica de negócio
    ├── 📁 models           → Definição das entidades
    ├── 📁 routes           → Definição das rotas da API
    ├── 📁 middlewares      → Autenticação e tratamento de erros
└── 📄 server.js        → Ponto de entrada da aplicação
```

## 🧠 Arquitetura e Boas Práticas
Neste projeto, seguimos algumas boas práticas de desenvolvimento:

### 🧱 Arquitetura MVC (Model - Controller)
- Models: Lógica de acesso e manipulação de dados.
- Controllers: Lógica de negócio e controle de fluxo.
- (Não utilizamos Views por ser uma API REST).

### 🗂 Estrutura de Pastas
- Organização modular e reutilizável.
- Separação clara entre responsabilidades.
- Facilidade de manutenção e escalabilidade.

### ⚙️ Armazenamento Temporário
- Simulação com arrays em memória.
- Uso de async/await para futura integração com banco real.
- Identificadores únicos gerenciados manualmente.

### 🛡 Tratamento de Erros
- try/catch aplicado em todas as rotas críticas.
- Retorno de mensagens de erro claras e padronizadas.

### 🧪 Validação de Dados
- Validações básicas implementadas nos Controllers.

## 🤝 Contribuições
Contribuições são super bem-vindas! Siga os passos:

1. Faça um fork do repositório.
2. Crie sua branch: git checkout -b feature/NovaFuncionalidade
3. Commit: git commit -m 'feat: adiciona nova funcionalidade'
4. Push: git push origin feature/NovaFuncionalidade
5. Crie um Pull Request 🚀

### Feito com ❤ por Mariana Dev


