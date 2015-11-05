exports.definition = {
  config: {
    columns: {
      id: "INTEGER PRIMARY KEY AUTOINCREMENT",
      link: "TEXT",
      title: "TEXT",
      content: "TEXT",
      startdate: "TEXT",
      enddate: "TEXT",
      location: "TEXT",
      type: "TEXT",
      icon: "TEXT"
    },
    adapter: {
      type: "sql",
      collection_name: "agenda",
      idAttribute: "id"
    }
  },
  extendModel: function(Model) {
    _.extend(Model.prototype, {
      parser: function(json) {
        return {
          id: json.session_id,
          link: json.link,
          title: json.session_title,
          content: json.session_content,
          startdate: json.session_startdate,
          enddate: json.session_enddate,
          location: json.session_location,
          type: json.session_type,
          icon: json.session_icon
        };
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
