exports.definition = {
  config: {
    columns: {
      id: "INTEGER PRIMARY KEY",
      title: "TEXT",
      featured_image: "TEXT",
      thumbnail: "TEXT",
      event_id: "INTEGER"
    },
    adapter: {
      type: "sql",
      collection_name: "sponsors",
      idAttribute: "id"
    }
  },
  extendModel: function(Model) {
    _.extend(Model.prototype, {
      parser: function(json) {
        return json;
      }
    });

    return Model;
  },
  extendCollection: function(Collection) {
    _.extend(Collection.prototype, {
      // extended functions and properties go here

      // For Backbone v1.1.2, uncomment the following to override the
      // fetch method to account for a breaking change in Backbone.
      /*
      fetch: function(options) {
      	options = options ? _.clone(options) : {};
      	options.reset = true;
      	return Backbone.Collection.prototype.fetch.call(this, options);
      }
      */
    });

    return Collection;
  }
};
