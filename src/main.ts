import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
     transform: true,
        forbidNonWhitelisted: true,
      }
    )
  );
  const config = new DocumentBuilder()
  .setTitle('Imtihon API')
  .setDescription('The Imtihon API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const docummentFactory = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api-docs',app,docummentFactory)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
