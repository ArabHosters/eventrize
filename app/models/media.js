exports.definition = {
  config: {
    columns: {
      id: "INTEGER",
      title: "TEXT",
      media_type: "TEXT",
      thumbnail: "TEXT",
      source_url: "TEXT",
      lang: "TEXT"
    },
    URL: Alloy.CFG.baseurl + Alloy.CFG.api.service + 'media?post_parent={post_parent}',
    debug: false,
    useStrictValidation: true,
    initFetchWithLocalData: true,
    parentNode: function(data) {
      var items = [];
      _.each(data, function(value, key) {
        var item = {};
        item.id = value.id;
        if (value.title) {
          item.title = value.title.rendered || '';
        }
        try {
          item.thumbnail = value.media_details.sizes.thumbnail.source_url;
        } catch (exp) {
          console.warn("No thambnail there", exp);
        }
        item.media_type = value.media_type;
        item.source_url = value.source_url;
        item.lang = Ti.Locale.currentLanguage;

        items.push(item);
      });
      return items;
    },
    adapter: {
      type: "sqlrest",
      collection_name: "media",
      idAttribute: "id"
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
