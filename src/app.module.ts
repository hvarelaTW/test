import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { graphqlConfig } from './common/config/graphql.config';
import { HelloUserModule } from './hello-user/hello-user.module';
import { HeroModule } from './hero/hero.module';
import { RecipesModule } from './recipes/recipes.module';
import { UserModule } from './user/user.module';
import { pinoConfig, YapeLoggerModule } from '@yaperos/lib-node-log';
import { SampleLogsModule } from './sample-logs/sample-logs.module';
import { KafkalizerModule } from '@yaperos/lib-nest-kafkalizer';
import { kafkalizerOptions } from './kafkalizer-event/kafka-configuration';
import { PublisherController } from './kafkalizer-event/publisher.controller';
import { ConsumerController } from './kafkalizer-event/consumer.controller';
import { AppTracingModule } from './telemetry/tracing/app-tracing.module';
import { AppMetricsModule } from './telemetry/metrics/app-metrics.module';
import { MetricProviderOptions } from '@yaperos/lib-node-telemetry';

@Module({
  imports: [
    UserModule,
    HeroModule,
    HelloUserModule,
    RecipesModule,
    SampleLogsModule,
    GraphQLModule.forRoot(graphqlConfig),
    LoggerModule.forRoot(pinoConfig as any),
    YapeLoggerModule.forRoot({
      isGlobal: true,
      isStdoutEnabled: true,
      datadog: { apiKey: process.env.DD_API_KEY },
      obfuscation: { keys: ['field1', 'personal.name'], mask: '****' },
    }),
    KafkalizerModule.forRoot(kafkalizerOptions),
    AppTracingModule,
    AppMetricsModule.register({
      provider: MetricProviderOptions.PROMETHEUS,
    }),
  ],
  controllers: [AppController, PublisherController, ConsumerController],
  providers: [AppService],
})
export class AppModule {}
