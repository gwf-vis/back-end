import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { RepositoryModule } from './repository/repository.module';
import { ConfigModule } from 'nestjs-config';
import { ServiceModule } from './service/service.module';
import * as path from 'path';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '*/**!(*.d).config.{ts,js}'), {
      path: path.resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`),
    }),
    ControllersModule,
    RepositoryModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
