## WireCard Dev Backend Challenge

API capaz de criar pagamentos entre compradores e vendedores, com métodos de boleto e cartão de crédito, em NodeJS, utilizando Express e banco de dados Postgres.

### 📚 Bibliotecas utilizadas

- Express;
- Sequelize;
- Youch;
- Yup;
- Nodemon;
- Sucrase;
- Prettier + ESLInt;
- Dotenv;

### ✅ Ferramenta de lint utilizada

Foi utilizado o ESLInt, com a StyleGuide do AirBnB.

### ⚠️ Instruções de instalação

Banco de dados:

```
docker run --name (umnomeparaseucontainer) -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres 
```

Execute na raiz do projeto:

```
npm install ou yarn install
yarn sequelize db:migrate
```
