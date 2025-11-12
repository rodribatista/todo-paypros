import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatasourceModule } from './modules/datasource/datasource.module';
import { TasksModule } from './modules/tasks/presentation/tasks.module';

@Module({
  imports: [DatasourceModule, TasksModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
