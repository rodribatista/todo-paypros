import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatasourceModule } from './modules/datasource/datasource.module';
import { TasksModule } from './modules/tasks/presentation/tasks.module';
import { UsersModule } from './modules/users/presentation/users.module';
import { AuthModule } from './modules/auth/presentation/auth.module';

@Module({
  imports: [DatasourceModule, TasksModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
