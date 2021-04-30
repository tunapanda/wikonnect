import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service me;
  @service SeoTags;
  @service socket;
  @service router;

  queryParams = { campaign_id: '', points: '', enduser_id: '', partner_id: '' };

  constructor(properties) {
    super(properties);
    this.router.on('routeDidChange', () => {
      if (this.me.isAuthenticated) {
        this.store.query('notification', {
          recipientId: this.me.user.id,
        });
      }
    });
  }

  async model(params) {
    let mojaLocalStorage = {
      partner_id: params.campaign_id,
      enduser_id: params.points,
      campaign_id: params.enduser_id,
      points: params.partner_id,
    };

    window.localStorage.setItem(
      'moja_campaign',
      JSON.stringify(mojaLocalStorage)
    );
    if (this.me.isAuthenticated) {
      return {
        chapters: await this.store.query('chapter', { approved: true }),
        notifications: await this.store.query('notification', {
          recipientId: this.me.user.id,
        }),
      };
    }
    return {
      chapters: await this.store.query('chapter', { approved: true }),
    };
  }

  beforeModel() {
    return this._loadMe();
  }

  afterModel() {
    this.socket.roleChanged();
    this.socket.eventHandlers();

    this.headTags = this.SeoTags.build();
    if (this.me.isAuthenticated) {
      return {
        notifications: this.store.query('notification', {
          recipientId: this.me.user.id,
        }),
      };
    }
  }

  _loadMe() {
    return this.me.load();
  }
}
