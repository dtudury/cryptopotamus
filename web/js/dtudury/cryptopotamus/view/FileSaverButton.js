/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone",
		"dtudury/cryptopotamus/Configurations",
		"FileSaver"
	], function(Backbone, Configurations) {
		return Backbone.View.extend({
			tagName: "button",
			events: {
				"click": "saveConfigurations"
			},
			initialize: function() {
				this.el.appendChild(document.createTextNode("Save"));
			},
			saveConfigurations: function() {
				var blob = new Blob([JSON.stringify(Configurations)], {type: "text/plain;charset=utf-8"})
				saveAs(blob, "cryptopotamus.txt");
			}
		});
	}
);


