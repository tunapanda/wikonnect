const { QueryBuilder } = require('objection');

class SearchQueryBuilder extends QueryBuilder {
  hydrateSearch(searchResults) {
    const ids = searchResults.map(result => result._id);

    return this.whereIn('id', ids);
  }
}

module.exports = SearchQueryBuilder;