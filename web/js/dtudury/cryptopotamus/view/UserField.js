/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 9:56 PM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone"
	], function(Backbone) {
		return Backbone.View.extend({
			tagName: "input",
			events: {
				"change": "updateUser"
			},
			initialize: function() {
				this.el.setAttribute("type", "text");
				this.el.setAttribute("size", "25");
			},
			render: function() {
				this.el.setAttribute("value", this.model.get("user"));
				return this;
			},
			updateUser: function() {
				this.model.set("user", this.el.value);
			}
		});
	}
);