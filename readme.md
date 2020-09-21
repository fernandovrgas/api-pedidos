# Api de Pedidos

<p align="center">API Node para pedidos usando usando Sequelize com banco de dados Mysql.</p>

## Informações técnicas

API desenvolvida em ambiente de estudo. Tecnologias utilizadas:

* **MYSQL2**: Lib para banco de dados não relacional. Facilita muito o trabalho principalmente considerando o uso de JSON
* **Express**: muito útil para as definições de rotas da API
* **Nodemon**: apenas para ambiente de desenvolvimento. O Nodemon é muito útil porque carreta as alterações de forma automática. Deste modo não é necessario reiniciar o servidor sempre que precisar ver uma alteração feita na aplicação
* **Sequelize**: ORM para abstração do banco mysql na API
* **.editorconfig**: Referente a um pligin utilizado no VS Code para ajudar nos padroes de codificação.

## 👨🏼‍💻 Autor

- [Fernando Vargas](https://github.com/fernandovrgas)

## 🚀 Tecnologias

- ⚡ Express — A web framework for Node.js
- 💾 Sequelize — SQL dialect ORM for Node.js

## ✋🏻 Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)

## 🔥 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta do projeto;
3. Rode `yarn` para instalar as dependências;
4. Altere as credencias dentro de `/src/config/database.js`;
5. Rode `yarn sequelize db:create` para criar o banco de dados;
6. Rode `yarn sequelize db:migrate` para executar as migrations;
7. Rode `yarn dev` para iniciar o servidor.
8. Importe o arquivo `Insomnia.json` desse repositório no Insomnia;