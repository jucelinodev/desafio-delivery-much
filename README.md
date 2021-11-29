# Desafio Delivery Much

API desenvolvida para o desafio da Delivery Much.

### Requisitos

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker-Compose](https://docs.docker.com/compose/install/)
- [Nodejs](https://nodejs.org/)

### Instalação:

- Clone o repositório:

```
$ git clone https://github.com/jucelinodev/desafio-delivery-much.git
```

- Entre no diretório:

```
$ cd /desafio-delivery-much
```

- Para instalar todas as dependências você deve rodar o seguinte comando:

```
$ npm install
```

- Renomeie ".env.example" para ".env" e confira todas as credenciais dos serviços:

```
APP_HOST=localhost
APP_PORT=3333
MONGODB_URI=mongodb://localhost:27017/mercadinho_seu_ze
AMPQ_URI=amqp://guest:guest@localhost:5672
AMPQ_EXCHANGE=stock
AMQP_QUEUE_INCREASE=stock.increase
AMQP_QUEUE_DECREASE=stock.decrease

```

- Para rodar os testes execute o seguinte comando:

```
$ npm test
```

- Para subir os serviços RabbitMQ e MongoDB execute o seguinte comando:

```
$ docker-compose up
```

- Para popular o banco com produtos do arquivo products.csv execute o seguinte comando:

```
$ npm run seeder:products
```

- Para iniciar o servidor em modo de desenvolvimento:

```
$ npm run dev
```

- Para gerar uma build de produção:

```
$ npm run build
```

- Para iniciar servidor em produção após gerar a build:

```
$ npm start
```

### Observações

- Certifique-se que todas as portas padrão estão desocupadas para cada serviço: 3333 (Node), 27017 (MongoDB), 5672 (RabbitMQ)

- Os nomes dos produtos são unicos, certifique-se que já não tenha eles populados no seu banco, caso tenha, irá retornar um erro no seeder.
