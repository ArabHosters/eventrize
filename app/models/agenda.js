exports.definition = {
  config: {
    columns: {
      id: "INTEGER PRIMARY KEY",
      link: "TEXT",
      title: "TEXT",
      content: "TEXT",
      startdate: "TEXT",
      enddate: "TEXT",
      location: "TEXT",
      type: "TEXT",
      icon: "TEXT",
      event_id: "INTEGER",
      lang: "TEXT"
    },
    adapter: {
      type: "sql",
      collection_name: "agenda",
      idAttribute: "id"
    }
  },
  extendModel: function(Model) {
    _.extend(Model.prototype, {
      initialize: function() {
        this.set({
          startdatePretty: require('alloy/moment')(this.get('startdate')).format('h:mm a'),
          enddatePretty: require('alloy/moment')(this.get('enddate')).format('h:mm a')
        });
      },
      parser: function(json) {
        return {
          id: json.session_id,
          link: json.link,
          title: json.session_title,
          content: Alloy.Globals.decodeHTMLEntities(json.session_content),
          startdate: json.session_startdate,
          enddate: json.session_enddate,
          location: json.session_location,
          type: json.session_type,
          icon: json.session_icon,
          event_id: json.event_id,
          lang: Ti.Locale.currentLanguage
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
