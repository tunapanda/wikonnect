import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ChapterIndexRoute extends Route {
  @service me;
  @service SeoTags;

  model(params) {
    return this.store.findRecord('chapter', params.chapter_slug);
  }

  async afterModel(model) {
    const origin = window.location.origin;
    const chapterUrl = `/chapter/${model.id}`;

    const headers = [
      //GRAPH SPECIFIC META
      {
        type: 'meta',
        tagId: 'ogImage',
        attrs: {
          property: 'og:image',
          content: model.imageUrl,
        },
      },
      {
        type: 'meta',
        tagId: 'ogUrl',
        attrs: {
          property: 'og:url',
          content: `${origin}${chapterUrl}`,
        },
      },
      {
        type: 'meta',
        tagId: 'ogTitle',
        attrs: {
          property: 'og:title',
          content: model.name,
        },
      },
      {
        type: 'meta',
        tagId: 'description',
        attrs: {
          name: 'description',
          content: model.description.substr(0, 160),
        },
      },
      //TWITTER SPECIFIC META
      {
        type: 'meta',
        tagId: 'twitterTitle',
        attrs: {
          name: 'twitter:title',
          content: model.title,
        },
      },
      {
        type: 'meta',
        tagId: 'twitterImage',
        attrs: {
          name: 'twitter:image',
          content: model.imageUrl,
        },
      },
      {
        type: 'meta',
        tagId: 'twitterDescription',
        attrs: {
          name: 'twitter:description',
          content: model.description.substr(0, 160),
        },
      },
      {
        type: 'meta',
        tagId: 'twitterCard',
        attrs: {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      },
      // oEmbed Tags
      {
        type: 'link',
        rel: 'alternate',
        attrs: {
          type: 'application/json+oembed',
          href: `${origin}/api/v1/oembed?url=${origin}${chapterUrl}&format=json`,
          title: model.name,
        },
      },
      {
        type: 'link',
        attrs: {
          rel: 'alternate',
          type: 'text/xml+oembed',
          href: `${origin}/api/v1/oembed?url=${origin}${chapterUrl}&format=xml`,
          title: model.name,
        },
      },
    ];
    this.headTags = this.SeoTags.build(
      'View Chapter - Wikonnect',
      chapterUrl,
      headers
    );

    return {
      comments: await this.store.query('comment', { chapterId: model.id }),
    };
  }
}
