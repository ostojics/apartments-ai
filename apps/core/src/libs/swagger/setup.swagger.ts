import type {INestApplication} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from '@nestjs/swagger';
import {AppConfigName} from 'src/config/app.config';
import {GlobalConfig} from '../../config/config.interface';

const SWAGGER_PATH = 'swagger';
const APP_NAME = 'HostElite API';
const APP_DESCRIPTION = 'HostElite API description';

function setupSwagger(app: INestApplication): OpenAPIObject {
  const configService = app.get(ConfigService<GlobalConfig>);

  const {url, appVersion} = configService.getOrThrow(AppConfigName, {
    infer: true,
  });

  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(appVersion)
    .addBearerAuth()
    .addServer(url)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    customSiteTitle: APP_NAME,
    jsonDocumentUrl: 'swagger/json',
  });

  return document;
}

export default setupSwagger;
