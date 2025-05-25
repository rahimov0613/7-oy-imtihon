import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('voting system')
    .setDescription('API for voting system')
    .setVersion('1.0');

  const documentFactory = () => SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api', app, documentFactory(),)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
