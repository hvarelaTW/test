import { Module } from '@nestjs/common';
import { PrometheusMetricsController } from './prometheus-metrics.controller';
import { PrometheusMetricsService } from './prometheus-metrics.service';
import { YapeMetricsServiceModule } from '@yaperos/lib-node-telemetry';
import { CommonsModule } from '../commons/commons.module';

@Module({
  imports: [YapeMetricsServiceModule.register({}), CommonsModule.register({})],
  providers: [PrometheusMetricsService],
  controllers: [PrometheusMetricsController],
})
export class PrometheusMetricsModule {}
