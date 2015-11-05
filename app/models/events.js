exports.definition = {
  config: {
    columns: {
      id: "INTEGER",
      date: "TEXT",
      link: "TEXT",
      title: "TEXT",
      content: "TEXT",
      featured_image: "TEXT",
      thumbnail: "TEXT",
      start_date: "TEXT",
      end_date: "TEXT"
    },
    URL: Alloy.CFG.baseurl + Alloy.CFG.api.service + 'event',
    debug: false,
    useStrictValidation: true,
    initFetchWithLocalData: false,
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
        item.content = value.content.rendered.replace(/<(?:.|\n)*?>/gm, '');
        item.start_date = value.event_meta.start_date;
        item.end_date = value.event_meta.end_date;

        // Parse better_featured_image into media model parser
        if (value.better_featured_image) {
          var mediaModel = Alloy.createModel('media', value.better_featured_image),
            mediaJson = mediaModel.config.parentNode([value.better_featured_image])[0];

          item.featured_image = mediaJson.source_url;
          item.thumbnail = mediaJson.thumbnail || mediaJson.source_url;
        }

        items.push(item);

        // Create agenda records
        _.each(value.event_sessions, function(session) {
          var agendaModel = Alloy.createModel('agenda');

          // Reformat data according the schema
          session = agendaModel.parser(_.extend(session, {
            event_id: value.id
          }));
          agendaModel.save(session);


          // Create agenda and speakers relation records
          _.each(session.speaker_id, function(speakerId) {
            var agendaSpeakersModel = Alloy.createModel('agenda_speakers', {
              event_id: value.id,
              speaker_id: speakerId
            });
            agendaSpeakersModel.save();
          });
        });

        // Create speaker records
        _.each(value.event_speakers, function(speaker) {
          var speakerModel = Alloy.createModel('speakers');

          // Reformat data according the schema
          speaker = speakerModel.parser(speaker);
          speakerModel.save(speaker);
        });

        // Create sponsors records
        _.each(value.event_sponsors, function(sponsor) {
          var sponsorsModel = Alloy.createModel('sponsors');

          // Reformat data according the schema
          sponsor = sponsorsModel.parser(_.extend(sponsor, {
            event_id: value.id
          }));
          sponsorsModel.save(sponsor);
        });
      });
      return items;
    },
    adapter: {
      type: "sqlrest",
      collection_name: "events",
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
