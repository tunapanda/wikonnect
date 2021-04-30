import Service, { inject as service } from '@ember/service';
import config from 'wikonnect/config/environment';

export default class SeoTagsService extends Service {
  @service router;

  /**
   *
   * @param {string} title  - Current page title
   * @param {string} pathname - Current page relative URL
   * @param {Array.<Object>} headersToOverride - Array of head tags to override
   * @param {boolean}index - If crawler should index current page
   * @param {boolean}follow - If crawler should follow links in current page
   * @returns {({tagId: string, type: string, content: string}|{tagId: string, type: string, attrs: {name: string, content: string}}|{tagId: string, type: string, attrs: {property: string, content: string}}|{tagId: string, type: string, attrs: {property: string, content: string}}|{tagId: string, type: string, attrs: {property: string, content: string}})[]}
   */
  build(title, pathname, headersToOverride, index, follow) {
    const origin = config.appUrl;

    const site = config.APP.instance_name;
    const openGraphCanonicalUrl = pathname ? `${origin}${pathname}` : origin;
    const openGraphImageUrl = `${origin}/images/wikonnect-primary.png`;
    const openGraphTitle = title
      ? title
      : `${config.APP.instance_name} - An open-source e-learning platform`;

    const openGraphThemeColor = '#F57010';
    const openGraphDescription =
      'Wikonnect is an open-source e-learning platform designed to allow anyone to learn, ' +
      'create educational content, and contribute to building the platform';

    let tags = [
      {
        type: 'title',
        tagId: 'title',
        content: openGraphTitle,
      },

      //GRAPH SPECIFIC META
      {
        type: 'meta',
        tagId: 'description',
        attrs: {
          name: 'description',
          content: openGraphDescription,
        },
      },
      {
        type: 'meta',
        tagId: 'ogType',
        attrs: {
          property: 'og:type',
          content: 'website',
        },
      },
      {
        type: 'meta',
        tagId: 'ogLocale',
        attrs: {
          property: 'og:locale',
          content: 'en_us',
        },
      },
      {
        type: 'meta',
        tagId: 'ogLocaleAlt',
        attrs: {
          property: 'og:locale:alternate',
          content: 'sw_ke',
        },
      },
      {
        type: 'meta',
        tagId: 'themeColor',
        attrs: {
          name: 'theme-color',
          content: openGraphThemeColor,
        },
      },
      {
        type: 'meta',
        tagId: 'themeColorMicrosoft',
        attrs: {
          name: 'msapplication-TileColor',
          content: openGraphThemeColor,
        },
      },
      {
        type: 'meta',
        tagId: 'themeColorApple',
        attrs: {
          name: 'apple-mobile-web-app-status-bar-style',
          content: openGraphThemeColor,
        },
      },
      {
        type: 'meta',
        tagId: 'ogSiteName',
        attrs: {
          property: 'og:site_name',
          content: site,
        },
      },
      {
        type: 'meta',
        tagId: 'ogImage',
        attrs: {
          property: 'og:image',
          content: openGraphImageUrl,
        },
      },
      {
        type: 'meta',
        tagId: 'ogUrl',
        attrs: {
          property: 'og:url',
          content: openGraphCanonicalUrl,
        },
      },
      {
        type: 'meta',
        tagId: 'ogTitle',
        attrs: {
          property: 'og:title',
          content: openGraphTitle,
        },
      },

      //TWITTER SPECIFIC META
      {
        type: 'meta',
        tagId: 'twitterTitle',
        attrs: {
          name: 'twitter:title',
          content: openGraphTitle,
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
      {
        type: 'meta',
        tagId: 'twitterImage',
        attrs: {
          name: 'twitter:image',
          content: openGraphImageUrl,
        },
      },
      {
        type: 'meta',
        tagId: 'twitterImageAlt',
        attrs: {
          name: 'twitter:image:alt',
          content: openGraphTitle,
        },
      },
      {
        type: 'meta',
        tagId: 'twitterDescription',
        attrs: {
          name: 'twitter:description',
          content: openGraphDescription,
        },
      },
    ];

    if (headersToOverride) {
      tags = [...new Set([...tags, ...headersToOverride])];
    }

    if ((index && index == false) || (follow && follow == false)) {
      tags.push({
        type: 'meta',
        tagId: 'robots',
        attrs: {
          name: 'robots',
          content:
            index == false && follow == false
              ? 'noindex,nofollow'
              : index == false
              ? 'noindex'
              : 'nofollow',
        },
      });
    }

    return tags;
  }
}
