import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import config from 'wikonnect/config/environment';

export default class HeadDataService extends Service {
  @tracked title;
  @tracked theme;

  environment = config.environment;
}
