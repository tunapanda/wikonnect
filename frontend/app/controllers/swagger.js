import Controller from '@ember/controller';
import Swag from 'swagger-ui';
import { inject } from '@ember/service';

const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset
} = Swag;


export default class SwaggerController extends Controller {


  @inject
  me;

  swaggerConfig = {
    url: 'assets/swagger.json',
    deepLinking: false,
    presets: [
      SwaggerUIStandalonePreset,
      SwaggerUIBundle.presets.apis,
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: 'StandaloneLayout',
    docExpansion: 'none',
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
    defaultModelsExpandDepth: -1,
    defaultModelExpandDepth: 1,
    validatorUrl: 'https://online.swagger.io/validator'
  }
}
