import { ClientProvider, KafkaOptions, Transport } from '@nestjs/microservices';
import {
  SASLMechanism,
  SASLOptions,
} from '@nestjs/microservices/external/kafka.interface';
import { KafkalizerModuleOptions } from '@yaperos/lib-nest-kafkalizer';

export function getKafkaConfig(): ClientProvider {
  const {
    KAFKA_CLIENT_SASL_KEY: username,
    KAFKA_CLIENT_SASL_SECRET: password,
  } = process.env;
  const mechanism: SASLMechanism = 'plain';
  const sasl: SASLOptions =
    username && password ? { username, password, mechanism } : null;
  const ssl = !!sasl;

  const kafkaOptions: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        ssl,
        sasl,
      },
    },
  };

  return {
    ...kafkaOptions,
  };
}

const schemaRegistryOptions = {
  url: 'http://localhost:8081',
  auth: {
    username: process.env.SCHEMA_REGISTRY_KEY,
    password: process.env.SCHEMA_REGISTRY_SECRET,
  },
};

export const kafkalizerOptions: KafkalizerModuleOptions = {
  schemaRegistryOptions: schemaRegistryOptions,
  kafkaOptions: getKafkaConfig(),
};
