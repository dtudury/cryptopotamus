/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 11:55 AM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone",
		"dtudury/cryptopotamus/Configurations",
		"dtudury/cryptopotamus/view/ConfigurationListItem",
	], function(Backbone, Configurations, ConfigurationListItem) {
		return Backbone.View.extend({
			tagName: "ul",
			initialize: function() {
				this.listenTo(Configurations, "all", this.render);
			},
			render: function() {
				console.log("Configurations:all", arguments);

				while (this.el.firstChild) {
					this.el.removeChild(this.el.firstChild);
				}
				Configurations.each(function(configuration) {
					var fileSaverButton = new ConfigurationListItem({model:configuration});
					this.el.appendChild(fileSaverButton.render().el);
				}, this);
				return this;
			}
		});
	}
);
