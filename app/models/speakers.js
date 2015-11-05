exports.definition = {
  config: {
    columns: {
      id: "INTEGER PRIMARY KEY",
      name: "TEXT",
      title: "TEXT",
      bio: "TEXT",
      featured_image: "TEXT",
      thumbnail: "TEXT",
      event_id: "INTEGER"
    },
    adapter: {
      type: "sql",
      collection_name: "speakers",
      idAttribute: "id"
    }
  },
  extendModel: function(Model) {
    _.extend(Model.prototype, {
      parser: function(json) {
        var item = {
          id: json.speaker_id,
          name: json.speaker_name,
          title: json.speaker_job,
          bio: json.speaker_bio,
          event_id: json.event_id
        };

        // Parse better_featured_image into media model parser
        if (json.better_featured_image) {
          var mediaModel = Alloy.createModel('media', json.better_featured_image),
            mediaJson = mediaModel.config.parentNode([json.better_featured_image])[0];

          item.featured_image = mediaJson.source_url;
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
