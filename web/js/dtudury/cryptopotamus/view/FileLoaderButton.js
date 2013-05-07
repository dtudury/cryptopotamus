/**
 * Created with JetBrains WebStorm.
 * User: dtudury
 * Date: 5/7/13
 * Time: 10:08 AM
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		"Backbone",
		"dtudury/cryptopotamus/Configurations"
	], function(Backbone, Configurations) {
		return Backbone.View.extend({
			tagName: "input",
			events: {
				"change": "loadConfigurations"
			},
			render: function() {
				this.el.setAttribute("type", "file");
				return this;
			},
			loadConfigurations: function(changeEvent) {
				if(this.el.readyState = FileReader.DONE) {
					var file = this.el.files[0];
					var fileReader = new FileReader();
					fileReader.onload = function(onloadEvent) {
						var data = fileReader.result;
						Configurations.reset(JSON.parse(data));
					};
					fileReader.readAsText(file);
				}
			}
		});
	});