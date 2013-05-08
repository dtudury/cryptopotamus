/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 10:05 PM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone"
	], function(Backbone) {
		return Backbone.View.extend({
			tagName: "input",
			events: {
				"change": "updateSite"
			},
			initialize: function() {
				this.el.setAttribute("type", "text");
				this.el.setAttribute("size", "25");
			},
			render: function() {
				this.el.setAttribute("value", this.model.get("site"));
				return this;
			},
			updateSite: function() {
				this.model.set("site", this.el.value);
			}
		});
	}
);