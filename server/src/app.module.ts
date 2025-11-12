import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatasourceModule } from './modules/datasource/datasource.module';
import { TasksModule } from './modules/tasks/presentation/tasks.module';
import { UsersModule } from './modules/users/presentation/users.module';

@Module({
  imports: [DatasourceModule, TasksModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
