exports.definition = {
  config: {
    columns: {
      id: "INTEGER PRIMARY KEY",
      name: "TEXT",
      link: "TEXT",
      sponsor_info: "TEXT",
      sponsor_category: "TEXT",
      featured_image: "TEXT",
      thumbnail: "TEXT",
      event_id: "INTEGER",
      menu_order: "INTEGER",
      lang: "TEXT"
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
        var item = {
          id: json.sponsor_id,
          name: json.sponsor_name,
          link: json.sponsor_website,
          info: json.sponsor_info,
          category: json.sponsor_category,
          event_id: json.event_id,
          menu_order: json.menu_order,
          lang: Ti.Locale.currentLanguage
        };

        // Parse better_featured_image into media model parser
        if (json.better_featured_image) {
          var mediaModel = Alloy.createModel('media', json.better_featured_image),
            mediaJson = mediaModel.config.parentNode([json.better_featured_image])[0];

          item.featured_image = mediaJson.source_url || '';
          item.thumbnail = mediaJson.thumbnail || mediaJson.source_url;
        }
        return item;
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
