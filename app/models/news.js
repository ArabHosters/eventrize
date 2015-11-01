exports.definition = {
  config: {
    columns: {
      "id": "INTEGER",
      "date": "TEXT",
      "link": "TEXT",
      "title": "TEXT",
      "content": "TEXT",
      "thumbnail": "TEXT",
      "thumbnail_full": "TEXT",
      "image":"TEXT",
      "short_desc":"TEXT"
      
    },
    //"URL": Alloy.CFG.api.baseurl + Alloy.CFG.wpJson + 'news',
    "debug": 1, //debug mode enabled
    //"parentNode": "posts",
    adapter: {
      "type": "sql",
      "idAttribute": "id",
      "collection_name": "news"
    }
  },
  extendModel: function(Model) {
    _.extend(Model.prototype, {
      // extended functions and properties go here
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
