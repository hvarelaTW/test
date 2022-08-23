import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';
import { yapeTracing } from '@yaperos/lib-node-telemetry';

async function bootstrap() {
  yapeTracing.startDefaultInstrumentation('ms-node-tracing');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
    { bufferLogs: true },
  );

  const rpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    grpcClientOptions,
  );
  //kafka consumer
  //await app.connectMicroservice(getKafkaConfig());
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await rpcApp.listen();
  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
