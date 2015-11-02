exports.definition = {
	config : {
		columns : {
			id : "INTEGER",
			date : "TEXT",
			link : "TEXT",
			title : "TEXT",
			content : "TEXT",
			excerpt : "TEXT",
			featured_image : "TEXT"
		},
		URL : Alloy.CFG.baseurl + Alloy.CFG.api.service + 'posts?_embed',
		debug : 1,
		useStrictValidation : 1,
		initFetchWithLocalData : true,
		parentNode : function(data) {
			_.each(data, function(value, key) {
				data[key].title = value.title.rendered;
				data[key].excerpt = value.excerpt.rendered.replace(/<(?:.|\n)*?>/gm, '');
				data[key].content = value.content.rendered.replace(/<(?:.|\n)*?>/gm, '');

				// Get images url from _embedded tag
				if (data[key].featured_image > 0) {
					try {
						data[key].featured_image = _.findWhere(value._embedded['http://v2.wp-api.org/attachment'][0], {
							id : value.featured_image
						}).source_url;
					} catch (error) {
						console.error(error);
						data[key].featured_image = 0;
					}
				}
			});
			return data;
		},
		adapter : {
			type : "sqlrest",
			collection_name : "posts",
			idAttribute : "id"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection : function(Collection) {
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
