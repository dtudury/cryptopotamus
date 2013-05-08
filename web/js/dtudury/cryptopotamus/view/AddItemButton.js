/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 10:11 PM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone",
		"dtudury/cryptopotamus/Configurations"
	], function(Backbone, Configuration) {
		return Backbone.View.extend({
			tagName: "li",
			events: {
				"click": "addItem"
			},
			initialize: function() {
				var button = document.createElement("button");
				button.appendChild(document.createTextNode("ADD NEW CONFIGURATION"));
				this.el.appendChild(button);
			},
			addItem: function() {
				Configuration.add({user:"userName", site:"siteName"});
			}
		});
	}
);