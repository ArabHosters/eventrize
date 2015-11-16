exports.definition = {
  config: {
    columns: {
      id: "INTEGER",
      date: "TEXT",
      link: "TEXT",
      title: "TEXT",
      content: "TEXT",
      excerpt: "TEXT",
      featured_image: "TEXT",
      thumbnail: "TEXT",
      menu_order: "INTEGER"
    },
    URL: Alloy.CFG.baseurl + Alloy.CFG.api.service + 'pages?fields=id,date,link,title,content,excerpt,featured_image,menu_order,better_featured_image&filter[connected_type]=pages_to_event&filter[connected_items]=' + Alloy.Globals.lastActiveEvent.id,
    debug: false,
    useStrictValidation: true,
    initFetchWithLocalData: true,
    parentNode: function(data) {
      var items = [];
      _.each(data, function(value, key) {
        var item = {
          featured_image: "",
          thumbnail: ""
        };
        item.id = value.id;
        item.date = value.date;
        item.link = value.link;
        item.title = value.title.rendered;
        item.menu_order = value.title.menu_order;
        item.content = value.content.rendered.replace(/<(?:.|\n)*?>/gm, '');
        item.excerpt = value.excerpt.rendered.replace(/<(?:.|\n)*?>/gm, '');

        // Parse better_featured_image into media model parser
        if (value.better_featured_image) {
          var mediaModel = Alloy.createModel('media', value.better_featured_image),
            mediaJson = mediaModel.config.parentNode([value.better_featured_image])[0];

          item.featured_image = mediaJson.source_url;
          item.thumbnail = mediaJson.thumbnail || mediaJson.source_url;
        }

        items.push(item);
      });
      return items;
    },
    adapter: {
      type: "sqlrest",
      collection_name: "pages",
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
      fetch: function(options) {
        options = options ? _.clone(options) : {};
        options.reset = true;
        return Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    return Collection;
  }
};
