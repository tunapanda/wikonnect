/**
 * This class generates URLs for files based on the URLs set in the
 * configuration.
 *
 * It includes a basic cache buster that adds a parameter with the full version
 * to core and library files (e.g. ?version=1.2.3). You can also implement other
 * means of busting caches by implementing IUrlGenerator yourself. It would for
 * example be possible to adding a generic cache buster string instead of adding
 * the version. If you decide to do this, you must be aware of the fact that the
 * JavaScript client generates URLs dynamically in two cases (at the time of
 * writing), both in h5peditor.js:contentUpgrade. This function uses
 * H5PIntegration.pluginCacheBuster, which can be customized by overriding
 * H5PEditor.cacheBusterGenerator.
 *
 * UrlGenerator requires these values to be set in config:
 * - baseUrl
 * - contentUserDataUrl
 * - coreUrl
 * - downloadUrl
 * - editorLibraryUrl
 * - h5pVersion
 * - librariesUrl
 * - paramsUrl
 * - playUrl
 * - setFinishedUrl
 * - temporaryFilesUrl
 *
 * The UrlGenerator can also be used to inject CSRF tokens into URLs for POST
 * requests that are sent by the H5P editor core (Joubel's code) over which you
 * don't have any control. You can then check the CSRF tokens in your middleware
 * to authenticate requests.
 */
module.exports = /** @class */ (function () {
  /**
   * @param config the config
   * @param csrfProtection (optional) If used, you must pass in a function
   * that returns a CSRF query parameter for the user for who a URL is
   * generated; the query parameter will be appended to URLs like this:
   * "baseUrl/ajax/?name=value&action=..." You must specify which routes you
   * want to be protected. If you don't pass in a csrfProtection object, no
   * CSRF tokens will be added to URLs.
   */
  function UrlGenerator(config, csrfProtection) {
    const _this = this;
    this.config = config;
    this.csrfProtection = csrfProtection;
    //All AJAX requests base relative URL
    this.ajaxBaseUrl = function () {
      return '/api/v1/h5p';
    };
    //All Static content request base relative URL
    this.staticFileBaseUrl = function () {
      return _this.config.baseUrl;
    };
    this.baseUrl = function () {
      return _this.config.baseUrl;
    };
    this.ajaxEndpoint = function (user) {
      let _a, _b;
      if (((_a = _this.csrfProtection) === null || _a === void 0 ? void 0 : _a.queryParamGenerator) && ((_b = _this.csrfProtection) === null || _b === void 0 ? void 0 : _b.protectAjax)) {
        let qs = _this.csrfProtection.queryParamGenerator(user);
        if (qs && qs.name && qs.value) {
          return '' + _this.ajaxBaseUrl() + _this.config.ajaxUrl + '?' + qs.name + '=' + qs.value + '&action=';
        }
      }
      return '' + _this.ajaxBaseUrl() + _this.config.ajaxUrl + '?action=';
    };
    this.contentUserData = function (user) {
      let _a, _b, _c, _d;
      if (((_a = _this.csrfProtection) === null || _a === void 0 ? void 0 : _a.queryParamGenerator) && ((_b = _this.csrfProtection) === null || _b === void 0 ? void 0 : _b.protectContentUserData)) {
        let qs = _this.csrfProtection.queryParamGenerator(user);
        return '' + _this.ajaxBaseUrl() + ((_c = _this.config) === null || _c === void 0 ? void 0 : _c.contentUserDataUrl) + '?' + qs.name + '=' + qs.value;
      }
      return '' + _this.ajaxBaseUrl() + ((_d = _this.config) === null || _d === void 0 ? void 0 : _d.contentUserDataUrl);
    };
    /**
     * Also adds a cache buster based on IH5PConfig.h5pVersion.
     * @param file
     */
    this.coreFile = function (file) {
      return '' + _this.staticFileBaseUrl() + _this.config.coreUrl + '/' + file + '?version=' + _this.config.h5pVersion;
    };
    this.coreFiles = function () {
      return '' + _this.staticFileBaseUrl() + _this.config.coreUrl + '/js';
    };
    this.downloadPackage = function (contentId) {
      return '' + _this.staticFileBaseUrl() + _this.config.downloadUrl + '/' + contentId;
    };
    /**
     * Also adds a cache buster based on IH5PConfig.h5pVersion.
     * @param file
     */
    this.editorLibraryFile = function (file) {
      return '' + _this.staticFileBaseUrl() + _this.config.editorLibraryUrl + '/' + file + '?version=' + _this.config.h5pVersion;
    };
    this.editorLibraryFiles = function () {
      return '' + _this.staticFileBaseUrl() + _this.config.editorLibraryUrl + '/';
    };
    this.libraryFile = function (library, file) {
      if (file.startsWith('http://') || file.startsWith('https://')) {
        return file;
      }
      return '' + _this.staticFileBaseUrl() + _this.config.librariesUrl + '/' + library.machineName + '-' + library.majorVersion + '.' + library.minorVersion + '/' + file + '?version=' + library.majorVersion + '.' + library.minorVersion + '.' + library.patchVersion;
    };
    this.parameters = function () {
      return '' + _this.staticFileBaseUrl() + _this.config.paramsUrl;
    };
    this.play = function () {
      return '' + _this.staticFileBaseUrl() + _this.config.playUrl;
    };
    this.setFinished = function (user) {
      let _a, _b;
      if (((_a = _this.csrfProtection) === null || _a === void 0 ? void 0 : _a.queryParamGenerator) && ((_b = _this.csrfProtection) === null || _b === void 0 ? void 0 : _b.protectSetFinished)) {
        let qs = _this.csrfProtection.queryParamGenerator(user);
        return '' + _this.ajaxBaseUrl() + _this.config.setFinishedUrl + '?' + qs.name + '=' + qs.value;
      }
      return '' + _this.ajaxBaseUrl() + _this.config.setFinishedUrl;
    };
    this.temporaryFiles = function () {
      return _this.staticFileBaseUrl() + '/temporary-storage/1000';
    };
  }

  return UrlGenerator;
}());
