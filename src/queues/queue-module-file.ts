import { Module } from '@nestjs/common';
import { ConsumerService } from './queue-consumer-file';
import { ProducerService } from './queue-producer-file';

@Module({
    providers: [ProducerService, ConsumerService],
    exports: [ProducerService],
})
export class QueueModule { }