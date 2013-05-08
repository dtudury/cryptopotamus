/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 10:30 PM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone"
	], function(Backbone) {
		return Backbone.View.extend({
			tagName: "button",
			events: {
				"click": "removeItem"
			},
			initialize: function() {
				this.el.appendChild(document.createTextNode("X"));
			},
			removeItem: function() {
				console.log("click");
				this.model.destroy();
			}
		});
	}
);