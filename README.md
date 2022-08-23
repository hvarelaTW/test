# ms-nest-template

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- [Installation](#installation)
- [Running the app](#running-the-app)
- [Test](#test)
- [Observability](#observability )
  - [Logs](#logs)
  - [Telemetry](#telemetry)
    - [Tracing](#tracing)
    - [Metrics](#metrics)
- [Prisma](#prisma)
- [GRPC](#grpc)
- [Graphql](#graphql)
- [Sending events](#sending-events)

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test:unit

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Observability

### Logs

The logs were implemented using [lib-node-log](https://github.com/yaperos/lib-node-log). We have create a generic function
to send x-request-id, x-correlation-id, method name, service and others fields to generate logs. You can find it
[here](./src/common/utils/request-log-info.ts)

**How to use it**

**NOTE:** The isGlobal property defaults to true, which allows you to use the logs module globally without reimporting it into other modules.
If you need know more about configuration of the lib, you can review the documentation [here](https://github.com/yaperos/lib-node-log/blob/main/README.md)

- Import the YapeLoggerModule and pinoConfig.

    ```javascript
    import { pinoConfig, YapeLoggerModule } from '@yaperos/lib-node-log';

    @Module({
      imports: [
        LoggerModule.forRoot(pinoConfig as any),
        YapeLoggerModule.forRoot({
            isGlobal: true,
            datadog: { apiKey: process.env.DD_API_KEY },
        }),
    ...
    ```

- Then, create an object from RequestLogInfo globally in your class and inject YapeLoggerService and @REQUEST in the constructor of the service that you want logs.

    ```javascript

    import { RequestLogInfo, YapeLoggerService } from '@yaperos/lib-node-log';

    @Controller()
    export class AppController {
    private readonly requestLogInfo: RequestLogInfo;

    constructor(@Inject(REQUEST) private request, private logger: YapeLoggerService) {
        this.requestLogInfo = setRequestLogInfo(
            request,
            AppController.name,
            this.getHello.name,
            'MS-NEST-TEMPLATE',
            'APP-CONTROLLER',
        );
    }

    @Get()
    async getHello(): Promise<string> {
      this.logger.log('Hello', this.requestLogInfo );
      this.logger.debug('debugging', this.requestLogInfo );
      this.logger.error('error', this.requestLogInfo );
      this.logger.warn('warning', this.requestLogInfo );
      this.logger.verbose('verbose', this.requestLogInfo);
      ...
    }
      ...
    ```

A request to getHello will produce the following logs:

```json lines
{"level":"info","time":"2022-01-25T15:16:31.598Z","context":"",
   "x-request-id":"adfeffce-61e1-4dff-9802-fe8a5e71b9ab",
   "x-correlation-id":"44444","msg":"Hello"}
{"level":"debug","time":"2022-01-25T15:16:31.598Z","context":"",
   "x-request-id":"adfeffce-61e1-4dff-9802-fe8a5e71b9ab",
   "x-correlation-id":"44444","msg":"debugging"}
{"level":"error","time":"2022-01-25T15:16:31.598Z","context":"",
   "x-request-id":"adfeffce-61e1-4dff-9802-fe8a5e71b9ab",
   "x-correlation-id":"44444","msg":"error"}
{"level":"warn","time":"2022-01-25T15:16:31.598Z","context":"",
   "x-request-id":"adfeffce-61e1-4dff-9802-fe8a5e71b9ab",
   "x-correlation-id":"44444","msg":"warning"}
```

**Access the request id**

Sometimes you may need to access the request id at your controllers. Here are
some examples of how to do it:

- http

```bash
...
export class UserController {
  constructor(@Inject(REQUEST) private request) {
  }

  @Get()
  findAll() {
    // Sample code to access the reqId in the context of http, inject REQUEST
    // at constructor
    console.log(this.request.headers['x-request-id']);
...
```

- rpc

```bash
...
  constructor(@Inject(REQUEST) private request) {
  }

  @GrpcMethod('HeroService')
  findOne(data: HeroById, metadata: Metadata): Hero {
    // Sample code to access the reqId in the context of grpc
   const reqId = this.request.headers['x-request-id']
   console.log(reqId)
...
```

- graphql

```bash
...
  constructor(@Inject(REQUEST) private request) {
  }

  @Query(() => Recipe)
  async recipe(@Args('id') id: string, @Context() context: any):Promise<Recipe>
  {
    // Sample code to access the reqId in the context of graphql
    console.log(this.request.headers['x-request-id']);
...
```

### Telemetry

### Tracing

OneAgent is responsible for collecting all monitoring data within your monitored environment, in our case,
for tracing and metrics. A single OneAgent per host is required to collect all relevant monitoring data—even if your
hosts are deployed within Docker containers, microservices architectures, or cloud-based infrastructure.

- Endpoints:
  - `http://localhost:3000/tracing/example-custom-span`
  - `http://localhost:3000/tracing/example-yape-span-with-name`
  - `http://localhost:3000/tracing/example-yape-span`
  - `http://localhost:3000/tracing/example-yape-trace-interceptor`

For more information about how to configure your application check [lib-node-telemetry](https://github.com/yaperos/lib-node-telemetry) documentation.

### Metrics

**Prometheus implementation** (Default metric provider)

- Endpoints:
  - `http://localhost:3000/metrics` Prometheus scrapping endpoint
  - `http://localhost:3000/prometheus/metrics/count`
  - `http://localhost:3000/prometheus/metrics/gauge`
  - `http://localhost:3000/prometheus/metrics/exception-test`

For more information about how to configure your application check [lib-node-telemetry](https://github.com/yaperos/lib-node-telemetry#metrics) documentation.

**Dynatrace implementation**

- Endpoints:
  - `http://localhost:3000/dynatrace/metrics/count`
  - `http://localhost:3000/dynatrace/metrics/gauge`
  - `http://localhost:3000/dynatrace/metrics/exception-test`

For more information about how to configure your application check [lib-node-telemetry](https://github.com/yaperos/lib-node-telemetry#dynatrace-required-configurations-1) documentation.

## Prisma

It is not necessary to perform the following steps, they have already been
performed and the generated code is already part of the code base, these are
provided as documentation and reference. Only the Set the database connection
step is required, and you may need to edit the .env file, according to your
environment conditions.

Prisma is an open-source ORM for Node.js and
TypeScript. [NestJS - Prsima](https://docs.nestjs.com/recipes/prisma#prisma)

### Installing and basic configuration

```bash
#  installing the Prisma CLI as a development dependency
npm install prisma --save-dev
```

We recommend using the Prisma CLI. As a best practice, it's recommended to
invoke the CLI locally by prefixing it with
npx:

```bash
#  installing the Prisma CLI as a development dependency
npx prisma init
```

This command creates a new **prisma** directory with the following contents:

**.env**: A dotenv file, typically used to store your database credentials in a
group of environment variables.

**schema.prisma**: Specifies your database connection and contains the database
schema.

### Set the database connection

Open up **.env** and adjust the DATABASE_URL or set DATABASE_URL as in
environment variable. We provide a docker-compose file to test prisma more
easily. So before nunning the migrations you should execute

```bash
# postgres server running at 5432
# adminer web UI running at http://localhost:8080/
$ docker-compose up
```

```bash
# Set environment variable DATABASE_URL
export DATABASE_URL=postgresql://postgres:password@localhost:5432/userdb?schema=public
```

Then execute:

```bash
# Environment variables loaded from .env
# Prisma schema loaded from prisma/schema.prisma
# Datasource "db": PostgreSQL database "userdb", schema "public" at
# "localhost:5432"
npx prisma migrate dev --name init
```

after that the migrations files will be created inside prisma folder and
executed on the db

Then you can try the following, for instance to create a new user:

```bash
curl --location --request POST 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw ' { "name": "person",  "email": "person@gmail.com" }'
```

## gRPC

gRPC is a modern, open source, high performance RPC framework that can run
in any environment. It can efficiently connect services in and across data
centers with pluggable support for load balancing, tracing, health checking and
authentication.
[NestJs - gRPC](https://docs.nestjs.com/microservices/grpc)

### gRPC in this project

We have already implemented the basic set up to use gRPC in the
project as can be seen in the `main.ts` file.

Also, we included some sample `hero` files to test the gRPC functionality.

In order to test the gRPC functionality we recommend use the
[bloomrpc](https://github.com/bloomrpc/bloomrpc) tool.

In this case you just have to download it, start the application and send
requests to `0.0.0.0:5000`.

### About gRPC messages identification and metadata

All messages received by gRPC will be intercepted (GrpcLoggingInterceptor)
to retrieve the metadata sent by the client and also generate a unique
identifier for all incoming messages. We recommend the following flow:

1. The mobile app will identify each call made to the bff with a unique and custom
    request header called
   X-Correlation-Id.
1. The bff, through its grpc client, will add this header as part of the metadata of
   all messages it sends to any gRPC
   server in response to the original request made by the app. The objective is to use it for monitoring purposes to
   identify with this metadata value all subsequent messages initiated as part of this event or message flow, and in
   this way the logs belonging to the same flow or operation can be easily identified in any component of our
   distributed architecture.
1. In each gRPC server all received messages will be identified with a unique value,
   called X-Message-Id, to identify
   all related operations in the context of the server itself.

More about
[gRPC Metadata](https://docs.nestjs.com/microservices/grpc#grpc-metadata)

### About gRPC Exceptions

We recommend the use the error codes defined
in the canonical error codes for gRPC APIs in file
[code.Proto](https://github.com/googleapis/googleapis/blob/master/google/rpc)
and use RpcException from **@nestjs/microservices**, and only use the grpc.
Status codes provided by **@grpc/grpc-js**

### About gRPC Client

In the repo
[ms-grpc-client-sample](https://github.com/yaperos/ms-grpc-client-sample)
is an example client to connect to
this gRPC server.

## Graphql

GraphQL is a powerful query language for APIs and a runtime for fulfilling those
queries with your existing data. It's an elegant approach that solves many
problems typically found with REST APIs.
[NestJs - Graphql](https://docs.nestjs.com/graphql/quick-start)

### Graphql in this project

We have already implemented the basic set up to use Graphql in the project as
can be seen in the `main.ts` file.

Also, we included some sample `recipe` files to test the Graphql functionality.

In order to test the Graphql functionality you can open (after starting the app)
in your browser `http://localhost:3000/graphql` to use the Graphql playground.
In the playground, try this query:

```bash
query($id: String!){
  recipe(id: $id){
    title
    id
    ingredients
  }
}
```

with this query variables

```bash
{
  "id": "1"
}
```

or try this curl

```bash
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json'
-H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000'
--data-binary '{"query":"query($id: String!){\n  recipe(id: $id){\n    title\n    id\n    ingredients\n  }\n}","variables":{"id":"1"}}' --compressed
```

## Sending events

The template uses the [lib-nest-kafkalizer](https://github.com/yaperos/lib-nest-kafkalizer) to send and receive events.
In order to execute the example included in the template follow the steps:

- Run a kafka environment

```bash
docker-compose --file docker-compose-kafka.yml up --build --detach
```

- Create the schemas used in the examples
  - Schema for Json example

    ```bash
    curl --location --request POST 'localhost:8081/subjects/user-value/versions' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "schemaType": "JSON",
        "schema": "{\"type\":\"object\",\"properties\":{\"idNumber\":{\"type\":\"integer\"},\"birthday\":{\"type\":\"string\"}}}"
    }'
    ```

    - Schema for proto example

    ```shell
    curl --location -g --request POST 'http://localhost:8081/subjects/movement-history-value/versions' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "schemaType": "PROTOBUF",
        "schema": "syntax = \"proto3\";\npackage test;\n\nmessage PaymentEvent {\n  string user_id = 1;\n  float amount = 2;\n  string payment_method = 3;\n  bool is_block = 4;\n}\n"
    }'

    ````

    - Endpoints:
      - `http://localhost:3000/produce-event/proto-format`
      - `http://localhost:3000/produce-event/json-format`

For more information about how to produce and consume events check [lib-nest-kafkalizer documentation](https://github.com/yaperos/lib-nest-kafkalizer).
