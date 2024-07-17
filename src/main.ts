import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AtGuard } from './modules/common/guards/at.guards';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const port = configService.get('port');
  const cors = configService.get('cors');
  const appGlobalPrefix = configService.get('appGlobalPrefix');

  if (cors) {
    app.enableCors();
  }

  /* 设置 HTTP 标头来帮助保护应用免受一些众所周知的 Web 漏洞的影响 */
  app.use(
    helmet({
      contentSecurityPolicy: false, //取消https强制转换
    }),
  );

  if (appGlobalPrefix) app.setGlobalPrefix('api');
  // 这里使用需要手动注入依赖
  // app.useGlobalGuards(new AtGuard());

  // 设置swagger
  const config = new DocumentBuilder()
    .setTitle('APIS')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(port);

  console.log(`Application is running on1: ${await app.getUrl()}`);
}
bootstrap();
